import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    || `blog-${Date.now()}`;
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} ນາທີ`;
}

async function fixBlogPosts() {
  console.log('🔧 Fixing blog posts...\n');

  // Get all blog posts
  const posts = await prisma.blogPost.findMany();
  
  console.log(`Found ${posts.length} blog posts\n`);

  let fixed = 0;

  for (const post of posts) {
    const updates: any = {};
    let needsUpdate = false;

    // Fix missing slug
    if (!post.slug || post.slug === '') {
      updates.slug = generateSlug(post.title);
      needsUpdate = true;
      console.log(`  ✓ Adding slug: "${post.title}" → "${updates.slug}"`);
    }

    // Fix missing publishedAt for published posts
    if (post.published && !post.publishedAt) {
      updates.publishedAt = new Date();
      needsUpdate = true;
      console.log(`  ✓ Adding publishedAt for: "${post.title}"`);
    }

    // Fix missing readTime
    if (!post.readTime || post.readTime === '') {
      updates.readTime = calculateReadTime(post.content);
      needsUpdate = true;
      console.log(`  ✓ Calculating readTime: "${post.title}" → ${updates.readTime}`);
    }

    // Update if needed
    if (needsUpdate) {
      await prisma.blogPost.update({
        where: { id: post.id },
        data: updates,
      });
      fixed++;
      console.log(`  ✅ Fixed: "${post.title}"\n`);
    }
  }

  console.log(`\n🎉 Done! Fixed ${fixed} out of ${posts.length} posts`);
}

fixBlogPosts()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
