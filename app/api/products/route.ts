import { NextResponse } from 'next/server';
import { getCachedProducts } from '@/lib/cache';

export async function GET() {
  try {
    const products = await getCachedProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
