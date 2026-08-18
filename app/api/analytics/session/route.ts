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

  if (/mobile|android|iphone|ipod|blackberry|windows phone/.test(ua)) {
    return 'mobile';
  }

  return 'desktop';
}

function getBrowser(userAgent: string): string {
  if (/edg\//i.test(userAgent)) return 'Edge';
  if (/opr\//i.test(userAgent)) return 'Opera';
  if (/chrome\//i.test(userAgent)) return 'Chrome';
  if (/firefox\//i.test(userAgent)) return 'Firefox';
  if (/safari\//i.test(userAgent)) return 'Safari';

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
    /*
     * Read the body safely.
     *
     * request.json() throws an exception when the request body
     * is empty. Reading text first lets us handle that properly.
     */
    const rawBody = await request.text();

    if (!rawBody.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Request body is empty',
        },
        { status: 400 }
      );
    }

    let body: SessionRequest;

    try {
      body = JSON.parse(rawBody) as SessionRequest;
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON body',
        },
        { status: 400 }
      );
    }

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

    if (sessionId.length > 100 || visitorId.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid visitor identifiers',
        },
        { status: 400 }
      );
    }

    if (path.length > 500) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid path',
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

    /*
     * Upsert keeps the endpoint safe when multiple requests
     * arrive at almost the same time.
     */
    const session = await prisma.visitorSession.upsert({
      where: {
        sessionId,
      },

      update: {
        lastSeenAt: new Date(),
        exitPage: path,
      },

      create: {
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