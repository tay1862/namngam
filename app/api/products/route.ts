import { NextResponse } from 'next/server';
import { getCachedProducts } from '@/lib/cache';
import { checkRateLimit, apiLimiter } from '@/lib/rate-limit';

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = await checkRateLimit(apiLimiter, ip);
  
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: rateLimitResult.error },
      { status: 429 }
    );
  }
  
  try {
    const products = await getCachedProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
