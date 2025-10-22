import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        published: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        image: true,
        category: true,
        publishedAt: true,
        readTime: true,
        views: true,
      },
    });

    // Format for frontend
    const formattedPosts = posts.map(post => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
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
