import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { contactSchema } from '@/lib/validators';
import { rateLimit, getClientIP } from '@/lib/rateLimit';
import {
  sendEmail,
  contactConfirmationEmail,
  adminNotificationEmail,
} from '@/lib/mailer';
import { notifyTelegram } from '@/lib/notify';
import { siteConfig } from '@/lib/constants';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  const ip = getClientIP(request);
  const limit = rateLimit(`contact:${ip}`, { maxRequests: 5, windowMs: 60 * 60 * 1000 });

  if (!limit.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        services: data.services,
        budget: data.budget,
        timeline: data.timeline,
        description: data.description,
        source: data.source,
        fileUrl: data.fileUrl || null,
      },
    });

    await Promise.all([
      sendEmail({
        to: data.email,
        subject: 'We received your project inquiry — Oak & Code',
        html: contactConfirmationEmail(data.name),
      }),
      sendEmail({
        to: siteConfig.email,
        subject: `🆕 New Lead: ${data.name} from ${data.city}`,
        html: adminNotificationEmail(data),
      }),
      notifyTelegram(
        `🆕 <b>New website lead</b>\n\n<b>${data.name}</b> (${data.city})\n📧 ${data.email}\n📱 ${data.phone}\n\n${data.description}`
      ),
    ]);

    return NextResponse.json({ success: true, id: contact.id }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Invalid form data', details: error.errors }, { status: 400 });
    }
    console.error('[Contact API]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}