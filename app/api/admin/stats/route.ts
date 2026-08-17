import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const user = requireAuth(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [
    totalContacts,
    newContacts,
    totalProjects,
    totalSubscribers,
    recentContacts,
    settings,
  ] = await Promise.all([
    prisma.contact.count(),
    prisma.contact.count({ where: { status: 'NEW' } }),
    prisma.project.count(),
    prisma.newsletterSubscriber.count({ where: { active: true } }),
    prisma.contact.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
    prisma.siteSettings.findUnique({ where: { id: 'default' } }),
  ]);

  return NextResponse.json({
    totalContacts,
    newContacts,
    totalProjects,
    totalSubscribers,
    recentContacts,
    settings,
  });
}

export async function PATCH(request: NextRequest) {
  const user = requireAuth(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const settings = await prisma.siteSettings.update({
      where: { id: 'default' },
      data: body,
    });
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 400 });
  }
}
