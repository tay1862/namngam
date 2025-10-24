import { NextResponse } from 'next/server';
import { getCachedBlogPosts } from '@/lib/cache';

export async function GET() {
  try {
    const posts = await getCachedBlogPosts();

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

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json([], { status: 200 }); // Return empty array on error
  }
}
