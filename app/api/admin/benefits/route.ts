import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const benefits = await prisma.benefitItem.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(benefits);
  } catch (error) {
    console.error('Error fetching benefits:', error);
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

    const benefit = await prisma.benefitItem.create({
      data: {
        title: data.title,
        titleEn: data.titleEn,
        description: data.description,
        icon: data.icon,
        image: data.image,
        published: data.published ?? true,
        order: data.order ?? 0,
      },
    });

    return NextResponse.json(benefit);
  } catch (error) {
    console.error('Error creating benefit:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
