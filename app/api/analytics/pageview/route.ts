import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface PageViewRequest {
  sessionId?: string;
  path?: string;
  title?: string;
  referrer?: string;
  durationMs?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PageViewRequest;

    const sessionId = body.sessionId?.trim();
    const path = body.path?.trim() || '/';
    const title = body.title?.trim() || null;
    const referrer = body.referrer?.trim() || null;

    if (!sessionId) {
      return NextResponse.json(
        {
          success: false,
          error: 'sessionId is required',
        },
        { status: 400 }
      );
    }

    if (sessionId.length > 100 || path.length > 500) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid analytics data',
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

    const pageView = await prisma.pageView.create({
      data: {
        sessionId,
        path,
        title,
        referrer,
        durationMs: 0,
      },
    });

    await prisma.visitorSession.update({
      where: {
        sessionId,
      },
      data: {
        lastSeenAt: new Date(),
        exitPage: path,
        pageCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      pageView: {
        id: pageView.id,
        path: pageView.path,
        enteredAt: pageView.enteredAt,
      },
    });
  } catch (error) {
    console.error('Analytics page view error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Unable to record page view',
      },
      { status: 500 }
    );
  }
}