import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auditSchema } from '@/lib/validators';
import { rateLimit, getClientIP } from '@/lib/rateLimit';
import { sendEmail, auditConfirmationEmail } from '@/lib/mailer';
import { siteConfig } from '@/lib/constants';

export async function POST(request: NextRequest) {
  const ip = getClientIP(request);
  const limit = rateLimit(`audit:${ip}`, { maxRequests: 3, windowMs: 60 * 60 * 1000 });

  if (!limit.success) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const data = auditSchema.parse(body);

    await prisma.auditRequest.create({
      data: { name: data.name, email: data.email, website: data.website },
    });

    await Promise.all([
      sendEmail({
        to: data.email,
        subject: 'Your Free Website Audit — Oak & Code',
        html: auditConfirmationEmail(data.name),
      }),
      sendEmail({
        to: siteConfig.email,
        subject: `🔍 Audit Request: ${data.name} — ${data.website}`,
        html: `<p>New audit request from ${data.name} (${data.email}) for ${data.website}</p>`,
      }),
    ]);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('[Audit API]', error);
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}
