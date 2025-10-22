import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { newsletterLimiter, checkRateLimit } from '@/lib/rate-limit';
import { isValidEmail, sanitizeHtml } from '@/lib/sanitize';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimitResult = await checkRateLimit(newsletterLimiter, ip);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: rateLimitResult.error },
        { status: 429 }
      );
    }

    const { email } = await request.json();

    // Validate and sanitize email
    const sanitizedEmail = sanitizeHtml(email?.trim() || '');
    
    if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'ອີເມວບໍ່ຖືກຕ້ອງ' },
        { status: 400 }
      );
    }

    // Check email length
    if (sanitizedEmail.length > 255) {
      return NextResponse.json(
        { error: 'ອີເມວຍາວເກີນໄປ' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await prisma.subscriber.findUnique({
      where: { email: sanitizedEmail.toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'ອີເມວນີ້ສະໝັກແລ້ວ' },
        { status: 400 }
      );
    }

    // Save to database
    await prisma.subscriber.create({
      data: {
        email: sanitizedEmail.toLowerCase(),
        status: 'active',
        source: 'website',
      },
    });

    return NextResponse.json(
      { success: true, message: 'ສະໝັກສຳເລັດແລ້ວ' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json(
      { error: 'ເກີດຂໍ້ຜິດພາດ ກະລຸນາລອງໃໝ່' },
      { status: 500 }
    );
  }
}
