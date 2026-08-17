import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const user = requireAuth(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const service = searchParams.get('service');

  const contacts = await prisma.contact.findMany({
    where: {
      ...(status ? { status: status as 'NEW' | 'READ' | 'REPLIED' } : {}),
      ...(service ? { services: { has: service } } : {}),
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(contacts);
}

export async function PATCH(request: NextRequest) {
  const user = requireAuth(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id, status } = await request.json();
    const contact = await prisma.contact.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 400 });
  }
}
