import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const section = await prisma.aboutSection.findUnique({
      where: { id: params.id },
    });

    if (!section) {
      return NextResponse.json({ error: 'Section not found' }, { status: 404 });
    }

    return NextResponse.json(section);
  } catch (error) {
    console.error('Error fetching section:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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

    const section = await prisma.aboutSection.update({
      where: { id: params.id },
      data: {
        title: data.title,
        titleTh: data.titleTh,
        titleEn: data.titleEn,
        titleZh: data.titleZh,
        description: data.description,
        descriptionTh: data.descriptionTh,
        descriptionEn: data.descriptionEn,
        descriptionZh: data.descriptionZh,
        image: data.image,
        backgroundType: data.backgroundType,
        backgroundImage: data.backgroundImage,
        backgroundColor: data.backgroundColor,
        videoUrl: data.videoUrl,
        published: data.published,
        order: data.order,
      },
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error('Error updating section:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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
    await prisma.aboutSection.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting section:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
