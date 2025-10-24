import { NextResponse } from 'next/server';
import { getCachedFAQs } from '@/lib/cache';

export async function GET() {
  try {
    const faqs = await getCachedFAQs();
    return NextResponse.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
