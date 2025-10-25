import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';
import { revalidateByTag } from '@/lib/cache';

// GET single post
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const params = await context.params;
    const post = await prisma.blogPost.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT update post
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const params = await context.params;
    const data = await request.json();
    const slug = data.slug || slugify(data.title);

    // Check if slug exists (excluding current post)
    const existing = await prisma.blogPost.findFirst({
      where: {
        slug,
        NOT: { id: params.id },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }

    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        title: data.title,
        titleTh: data.titleTh,
        titleEn: data.titleEn,
        titleZh: data.titleZh,
        slug,
        excerpt: data.excerpt,
        excerptTh: data.excerptTh,
        excerptEn: data.excerptEn,
        excerptZh: data.excerptZh,
        content: data.content,
        contentTh: data.contentTh,
        contentEn: data.contentEn,
        contentZh: data.contentZh,
        image: data.image,
        category: data.category,
        published: data.published,
        featured: data.featured,
        readTime: data.readTime,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        seoKeywords: data.seoKeywords,
        publishedAt: data.published && !data.publishedAt ? new Date() : data.publishedAt,
      },
    });

    // Revalidate blog cache
    await revalidateByTag('blog');

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE post
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const params = await context.params;
    await prisma.blogPost.delete({
      where: { id: params.id },
    });

    // Revalidate blog cache
    await revalidateByTag('blog');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
