import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidateByTag } from '@/lib/cache';

// GET all products
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const products = await prisma.product.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST new product
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const product = await prisma.product.create({
      data: {
        name: data.name,
        nameTh: data.nameTh,
        nameEn: data.nameEn,
        nameZh: data.nameZh,
        description: data.description,
        descriptionTh: data.descriptionTh,
        descriptionEn: data.descriptionEn,
        descriptionZh: data.descriptionZh,
        price: data.price,
        image: data.image,
        features: data.features || [],
        featuresTh: data.featuresTh || [],
        featuresEn: data.featuresEn || [],
        featuresZh: data.featuresZh || [],
        benefits: data.benefits || [],
        benefitsTh: data.benefitsTh || [],
        benefitsEn: data.benefitsEn || [],
        benefitsZh: data.benefitsZh || [],
        category: data.category || 'ກັວຊາ',
        inStock: data.inStock !== false,
        featured: data.featured || false,
        order: data.order || 0,
      },
    });

    // Revalidate products cache
    await revalidateByTag('products');

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
