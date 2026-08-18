import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface AnalyticsEventRequest {
  sessionId?: string;
  name?: string;
  path?: string;
  value?: string;
}

const ALLOWED_EVENT_NAMES = new Set([
  'whatsapp_click',
  'phone_click',
  'email_click',
  'contact_submit',
  'chat_open',
  'chat_handoff',
  'project_view',
  'pricing_click',
  'resume_download',
  'newsletter_signup',
  'cta_click',
]);

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AnalyticsEventRequest;

    const sessionId = body.sessionId?.trim();
    const name = body.name?.trim();
    const path = body.path?.trim() || null;
    const value = body.value?.trim() || null;

    if (!sessionId || !name) {
      return NextResponse.json(
        {
          success: false,
          error: 'sessionId and name are required',
        },
        { status: 400 }
      );
    }

    if (sessionId.length > 100 || name.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid analytics data',
        },
        { status: 400 }
      );
    }

    if (!ALLOWED_EVENT_NAMES.has(name)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unsupported analytics event',
        },
        { status: 400 }
      );
    }

    const session = await prisma.visitorSession.findUnique({
      where: {
        sessionId,
      },
    });

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: 'Analytics session not found',
        },
        { status: 404 }
      );
    }

    const event = await prisma.analyticsEvent.create({
      data: {
        sessionId,
        name,
        path,
        value,
      },
    });

    await prisma.visitorSession.update({
      where: {
        sessionId,
      },
      data: {
        lastSeenAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      event: {
        id: event.id,
        name: event.name,
        createdAt: event.createdAt,
      },
    });
  } catch (error) {
    console.error('Analytics event error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Unable to record analytics event',
      },
      { status: 500 }
    );
  }
}