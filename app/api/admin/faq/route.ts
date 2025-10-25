import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidateByTag } from '@/lib/cache';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const faqs = await prisma.fAQ.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(faqs);
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

    const faq = await prisma.fAQ.create({
      data: {
        question: data.question,
        questionTh: data.questionTh || null,
        questionEn: data.questionEn || null,
        questionZh: data.questionZh || null,
        answer: data.answer,
        answerTh: data.answerTh || null,
        answerEn: data.answerEn || null,
        answerZh: data.answerZh || null,
        category: data.category || 'ທົ່ວໄປ',
        order: data.order || 0,
        published: data.published !== false,
      },
    });

    // Revalidate FAQs cache
    await revalidateByTag('faqs');

    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
