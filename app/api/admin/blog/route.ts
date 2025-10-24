import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';
import { revalidateByTag } from '@/lib/cache';

// GET all blog posts
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST new blog post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const slug = data.slug || slugify(data.title);

    // Check if slug exists
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }

    const post = await prisma.blogPost.create({
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
        category: data.category || 'ທົ່ວໄປ',
        published: data.published || false,
        featured: data.featured || false,
        readTime: data.readTime || '5 ນາທີ',
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        seoKeywords: data.seoKeywords || [],
        publishedAt: data.published ? new Date() : null,
      },
    });

    // Revalidate blog cache
    await revalidateByTag('blog');

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
