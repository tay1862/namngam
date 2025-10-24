import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const sections = await prisma.aboutSection.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(sections);
  } catch (error) {
    console.error('Error fetching about sections:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const section = await prisma.aboutSection.create({
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
        published: data.published ?? true,
        order: data.order ?? 0,
      },
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error('Error creating about section:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
