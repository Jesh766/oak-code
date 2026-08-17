import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const user = requireAuth(request);

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const currentPassword = String(
      body.currentPassword || ''
    );

    const newPassword = String(
      body.newPassword || ''
    );

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        {
          error:
            'Current password and new password are required.',
        },
        { status: 400 }
      );
    }

    if (newPassword.length < 12) {
      return NextResponse.json(
        {
          error:
            'New password must be at least 12 characters long.',
        },
        { status: 400 }
      );
    }

    const admin = await prisma.adminUser.findUnique({
      where: {
        id: user.userId,
      },
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Admin account not found.' },
        { status: 404 }
      );
    }

    const currentPasswordValid =
      await bcrypt.compare(
        currentPassword,
        admin.password
      );

    if (!currentPasswordValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect.' },
        { status: 401 }
      );
    }

    const newPasswordHash =
      await bcrypt.hash(newPassword, 12);

    await prisma.adminUser.update({
      where: {
        id: admin.id,
      },
      data: {
        password: newPasswordHash,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully.',
    });
  } catch (error) {
    console.error('[Change Password]', error);

    return NextResponse.json(
      { error: 'Unable to change password.' },
      { status: 500 }
    );
  }
}