import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface SessionRequest {
  sessionId?: string;
  visitorId?: string;
  path?: string;
  referrer?: string;
  title?: string;
}

function getDeviceType(userAgent: string): string {
  const ua = userAgent.toLowerCase();

  if (/tablet|ipad|playbook|silk/.test(ua)) {
    return 'tablet';
  }

  if (
    /mobile|android|iphone|ipod|blackberry|windows phone/.test(ua)
  ) {
    return 'mobile';
  }

  return 'desktop';
}

function getBrowser(userAgent: string): string {
  if (/edg\//i.test(userAgent)) return 'Edge';
  if (/opr\//i.test(userAgent)) return 'Opera';
  if (/chrome\//i.test(userAgent) && !/edg\//i.test(userAgent)) return 'Chrome';
  if (/firefox\//i.test(userAgent)) return 'Firefox';
  if (/safari\//i.test(userAgent) && !/chrome\//i.test(userAgent)) return 'Safari';

  return 'Other';
}

function getOS(userAgent: string): string {
  if (/windows/i.test(userAgent)) return 'Windows';
  if (/macintosh|mac os/i.test(userAgent)) return 'macOS';
  if (/android/i.test(userAgent)) return 'Android';
  if (/iphone|ipad|ipod/i.test(userAgent)) return 'iOS';
  if (/linux/i.test(userAgent)) return 'Linux';

  return 'Other';
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SessionRequest;

    const sessionId = body.sessionId?.trim();
    const visitorId = body.visitorId?.trim();
    const path = body.path?.trim() || '/';

    if (!sessionId || !visitorId) {
      return NextResponse.json(
        {
          success: false,
          error: 'sessionId and visitorId are required',
        },
        { status: 400 }
      );
    }

    // Keep IDs within reasonable limits.
    if (sessionId.length > 100 || visitorId.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid visitor identifiers',
        },
        { status: 400 }
      );
    }

    const userAgent = request.headers.get('user-agent') || '';
    const referrer =
      body.referrer?.trim() ||
      request.headers.get('referer') ||
      null;

    const deviceType = getDeviceType(userAgent);
    const browser = getBrowser(userAgent);
    const os = getOS(userAgent);

    const existingSession = await prisma.visitorSession.findUnique({
      where: {
        sessionId,
      },
    });

    if (existingSession) {
      const updatedSession = await prisma.visitorSession.update({
        where: {
          sessionId,
        },
        data: {
          lastSeenAt: new Date(),
          exitPage: path,
        },
      });

      return NextResponse.json({
        success: true,
        session: {
          id: updatedSession.id,
          sessionId: updatedSession.sessionId,
          visitorId: updatedSession.visitorId,
        },
      });
    }

    const session = await prisma.visitorSession.create({
      data: {
        sessionId,
        visitorId,

        entryPage: path,
        exitPage: path,
        landingPage: path,

        referrer,

        deviceType,
        browser,
        os,

        pageCount: 0,
        durationMs: 0,
      },
    });

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        sessionId: session.sessionId,
        visitorId: session.visitorId,
      },
    });
  } catch (error) {
    console.error('Analytics session error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Unable to create analytics session',
      },
      { status: 500 }
    );
  }
}