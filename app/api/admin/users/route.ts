import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { canManageUsers } from '@/lib/rbac';
import bcrypt from 'bcrypt';

// GET all users (super_admin only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !canManageUsers(session.user?.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Don't return password
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST create new user (super_admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !canManageUsers(session.user?.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.email || !data.password || !data.role) {
      return NextResponse.json(
        { error: 'ກະລຸນາໃສ່ຂໍ້ມູນໃຫ້ຄົບຖ້ວນ' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (data.password.length < 8) {
      return NextResponse.json(
        { error: 'ລະຫັດຜ່ານຕ້ອງມີຢ່າງໜ້ອຍ 8 ຕົວອັກສອນ' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'ອີເມວນີ້ຖືກໃຊ້ແລ້ວ' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: data.name || data.email.split('@')[0],
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
