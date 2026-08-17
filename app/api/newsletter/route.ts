import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { newsletterSchema } from '@/lib/validators';
import { rateLimit, getClientIP } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  const ip = getClientIP(request);
  const limit = rateLimit(`newsletter:${ip}`, { maxRequests: 5, windowMs: 60 * 60 * 1000 });

  if (!limit.success) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { email } = newsletterSchema.parse(body);

    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Already subscribed!' }, { status: 409 });
    }

    await prisma.newsletterSubscriber.create({ data: { email } });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
}
