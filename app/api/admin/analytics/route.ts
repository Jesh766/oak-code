import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const user = requireAuth(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [totalSessions, totalPageViews, topPagesRaw, deviceRaw, recentSessions, allSessions] =
    await Promise.all([
      prisma.visitorSession.count(),
      prisma.pageView.count(),
      prisma.pageView.groupBy({
        by: ['path'],
        _count: { path: true },
        orderBy: { _count: { path: 'desc' } },
        take: 5,
      }),
      prisma.visitorSession.groupBy({
        by: ['deviceType'],
        _count: { deviceType: true },
      }),
      prisma.visitorSession.findMany({
        take: 10,
        orderBy: { startedAt: 'desc' },
        select: {
          id: true,
          visitorId: true,
          entryPage: true,
          exitPage: true,
          pageCount: true,
          deviceType: true,
          browser: true,
          referrer: true,
          startedAt: true,
          lastSeenAt: true,
        },
      }),
      prisma.visitorSession.findMany({ select: { startedAt: true, lastSeenAt: true } }),
    ]);

  const avgDurationMs =
    allSessions.length > 0
      ? allSessions.reduce(
          (sum, s) => sum + (new Date(s.lastSeenAt).getTime() - new Date(s.startedAt).getTime()),
          0
        ) / allSessions.length
      : 0;

  return NextResponse.json({
    totalSessions,
    totalPageViews,
    avgDurationMs: Math.round(avgDurationMs),
    topPages: topPagesRaw.map((p) => ({ path: p.path, views: p._count.path })),
    deviceBreakdown: deviceRaw.map((d) => ({ device: d.deviceType, count: d._count.deviceType })),
    recentSessions,
  });
}