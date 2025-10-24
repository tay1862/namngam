import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { canManageUsers } from '@/lib/rbac';
import bcrypt from 'bcrypt';

// GET single user
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !canManageUsers(session.user?.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const params = await context.params;
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT update user
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !canManageUsers(session.user?.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const params = await context.params;
    const data = await request.json();

    // Prevent self-demotion (can't change own role)
    if (params.id === session.user?.id && data.role && data.role !== session.user?.role) {
      return NextResponse.json(
        { error: 'ບໍ່ສາມາດປ່ຽນສິດທິ່ຂອງຕົນເອງໄດ້' },
        { status: 400 }
      );
    }

    // Check if email already taken by another user
    if (data.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: data.email,
          NOT: { id: params.id },
        },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'ອີເມວນີ້ຖືກໃຊ້ແລ້ວ' },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData: any = {
      name: data.name,
      email: data.email,
      role: data.role,
    };

    // Hash new password if provided
    if (data.password) {
      if (data.password.length < 8) {
        return NextResponse.json(
          { error: 'ລະຫັດຜ່ານຕ້ອງມີຢ່າງໜ້ອຍ 8 ຕົວອັກສອນ' },
          { status: 400 }
        );
      }
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE user
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !canManageUsers(session.user?.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const params = await context.params;

    // Prevent self-deletion
    if (params.id === session.user?.id) {
      return NextResponse.json(
        { error: 'ບໍ່ສາມາດລົບບັນຊີຕົນເອງໄດ້' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Delete user
    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: 'ລົບຜູ້ໃຊ້ສຳເລັດ' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
