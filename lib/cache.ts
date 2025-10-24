import { unstable_cache } from 'next/cache';
import { prisma } from './prisma';

// Products cache (1 hour)
export const getCachedProducts = unstable_cache(
  async () => {
    return await prisma.product.findMany({
      where: { inStock: true },
      orderBy: { order: 'asc' },
    });
  },
  ['products-list'],
  { 
    revalidate: 3600, // 1 hour
    tags: ['products'] 
  }
);

// Blog posts cache (30 minutes)
export const getCachedBlogPosts = unstable_cache(
  async () => {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 50, // Limit to 50 latest posts
      select: {
        id: true,
        title: true,
        titleTh: true,
        titleEn: true,
        titleZh: true,
        slug: true,
        excerpt: true,
        excerptTh: true,
        excerptEn: true,
        excerptZh: true,
        // Don't include content - saves 90% bandwidth
        image: true,
        category: true,
        publishedAt: true,
        readTime: true,
        views: true,
      },
    });
    return posts;
  },
  ['blog-posts-list'],
  { 
    revalidate: 1800, // 30 minutes
    tags: ['blog'] 
  }
);

// Single blog post cache (1 hour)
export const getCachedBlogPost = (slug: string) => unstable_cache(
  async () => {
    return await prisma.blogPost.findUnique({
      where: { slug },
    });
  },
  [`blog-post-${slug}`],
  { 
    revalidate: 3600, // 1 hour
    tags: ['blog', `blog-${slug}`] 
  }
)();

// FAQs cache (1 hour)
export const getCachedFAQs = unstable_cache(
  async () => {
    return await prisma.fAQ.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    });
  },
  ['faqs-list'],
  { 
    revalidate: 3600, // 1 hour
    tags: ['faqs'] 
  }
);

// About sections cache (1 hour)
export const getCachedAboutSections = unstable_cache(
  async () => {
    return await prisma.aboutSection.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    });
  },
  ['about-sections-list'],
  { 
    revalidate: 3600, // 1 hour
    tags: ['about'] 
  }
);

// Benefits cache (1 hour)
export const getCachedBenefits = unstable_cache(
  async () => {
    return await prisma.benefitItem.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    });
  },
  ['benefits-list'],
  { 
    revalidate: 3600, // 1 hour
    tags: ['benefits'] 
  }
);

// Cache revalidation helper
export async function revalidateByTag(tag: string) {
  const { revalidateTag } = await import('next/cache');
  revalidateTag(tag);
}

// Revalidate multiple tags
export async function revalidateByTags(tags: string[]) {
  const { revalidateTag } = await import('next/cache');
  tags.forEach(tag => revalidateTag(tag));
}
