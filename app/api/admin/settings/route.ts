import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settings = await prisma.siteSettings.findFirst();

    return NextResponse.json(settings || {});
  } catch (error) {
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

    // Upsert settings
    const existing = await prisma.siteSettings.findFirst();

    if (existing) {
      const settings = await prisma.siteSettings.update({
        where: { id: existing.id },
        data,
      });
      return NextResponse.json(settings);
    } else {
      const settings = await prisma.siteSettings.create({
        data,
      });
      return NextResponse.json(settings, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
