import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';
import { adminAuth } from '@/lib/auth/middleware';

export const dynamic = 'force-dynamic';

async function statsHandler(req: NextRequest) {
  await adminAuth(req);

  // Run in parallel for performance
  const [
    totalProjects,
    activeProjects,
    totalContacts,
    unpaidInvoices,
    totalRevenueRaw,
    recentContacts,
    recentProjects,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: { notIn: ['completed', 'cancelled'] } } }),
    prisma.contact.count(),
    prisma.invoice.count({ where: { status: { in: ['sent', 'overdue'] } } }),
    prisma.payment.aggregate({ _sum: { amount: true } }),
    prisma.contact.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, fullName: true, email: true, status: true, createdAt: true }
    }),
    prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { contact: { select: { fullName: true } }, service: { select: { name: true } } }
    }),
  ]);

  return NextResponse.json(successResponse({
    totalProjects,
    activeProjects,
    totalContacts,
    unpaidInvoices,
    totalRevenue: totalRevenueRaw._sum.amount || 0,
    recentContacts,
    recentProjects,
  }));
}

export const GET = withErrorHandler(statsHandler);
