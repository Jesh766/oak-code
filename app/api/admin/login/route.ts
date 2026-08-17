import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { loginSchema } from '@/lib/validators';
import { signToken } from '@/lib/auth';
import { rateLimit, getClientIP } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  const ip = getClientIP(request);
  const limit = rateLimit(`login:${ip}`, { maxRequests: 10, windowMs: 15 * 60 * 1000 });

  if (!limit.success) {
    return NextResponse.json({ error: 'Too many login attempts.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ userId: user.id, email: user.email, name: user.name });

    const response = NextResponse.json({
      success: true,
      user: { email: user.email, name: user.name },
    });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_token');
  return response;
}
