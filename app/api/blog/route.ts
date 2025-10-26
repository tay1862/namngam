import { NextResponse } from 'next/server';
import { getCachedBlogPosts } from '@/lib/cache';
import { checkRateLimit, apiLimiter } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic'; // Disable caching for this route temporarily
export const revalidate = 0; // Revalidate on every request

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = await checkRateLimit(apiLimiter, ip);
  
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: rateLimitResult.error },
      { status: 429 }
    );
  }
  
  try {
    console.log('[Blog API] Fetching blog posts...');
    const posts = await getCachedBlogPosts();
    console.log(`[Blog API] Found ${posts.length} posts`);

    // Format for frontend
    const formattedPosts = posts.map(post => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      // Don't include content in list view - saves 90% bandwidth
      date: post.publishedAt 
        ? post.publishedAt.toLocaleDateString('lo-LA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : new Date().toLocaleDateString('lo-LA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
      category: post.category,
      image: post.image || '/placeholder-blog.jpg',
      readTime: post.readTime || '5 ນາທີ',
    }));

    console.log(`[Blog API] Returning ${formattedPosts.length} formatted posts`);
    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('[Blog API] Error:', error);
    return NextResponse.json([], { status: 200 }); // Return empty array on error
  }
}
