import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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

    const benefit = await prisma.benefitItem.update({
      where: { id: params.id },
      data: {
        title: data.title,
        titleEn: data.titleEn,
        description: data.description,
        icon: data.icon,
        image: data.image,
        published: data.published,
        order: data.order,
      },
    });

    return NextResponse.json(benefit);
  } catch (error) {
    console.error('Error updating benefit:', error);
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
    await prisma.benefitItem.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting benefit:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
