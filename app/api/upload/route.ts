import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { uploadLimiter, checkRateLimit } from '@/lib/rate-limit';
import { sanitizeFilename } from '@/lib/sanitize';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimitResult = await checkRateLimit(uploadLimiter, ip);
    if (!rateLimitResult.success) {
      return NextResponse.json({ error: rateLimitResult.error }, { status: 429 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'ປະເພດໄຟລ໌ບໍ່ຖືກຕ້ອງ. ອະນຸຍາດສະເພາະຮູບພາບເທົ່ານັ້ນ.' 
      }, { status: 400 });
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: 'ໄຟລ໌ໃຫຍ່ເກີນໄປ. ຂະໜາດສູງສຸດ 5MB.' 
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Optimize image with sharp
    let optimizedBuffer: Buffer = buffer;
    if (file.type !== 'image/gif') {
      try {
        optimizedBuffer = await sharp(Buffer.from(buffer))
          .resize(1920, 1920, { 
            fit: 'inside', 
            withoutEnlargement: true 
          })
          .jpeg({ quality: 85, progressive: true })
          .toBuffer();
      } catch (error) {
        console.error('Image optimization error:', error);
        // Use original if optimization fails
      }
    }

    // Generate unique filename with sanitization
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const ext = file.name.split('.').pop() || 'jpg';
    const sanitizedName = sanitizeFilename(file.name.split('.')[0]);
    const filename = `${timestamp}-${randomStr}-${sanitizedName}.${ext}`;
    
    // Create uploads directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Save file
    const filepath = join(uploadDir, filename);
    await writeFile(filepath, optimizedBuffer);

    // Return public URL
    const url = `/uploads/${filename}`;
    
    return NextResponse.json({ 
      url,
      filename,
      size: optimizedBuffer.length,
      originalSize: file.size,
      type: file.type,
      optimized: optimizedBuffer.length < file.size
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'ອັບໂຫຼດລົ້ມເຫລວ' 
    }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
