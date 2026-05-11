import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';

async function listServicesHandler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  const services = await prisma.service.findMany({
    where: {
      isActive: true,
      ...(category && { category }),
    },
    orderBy: { sortOrder: 'asc' },
  });

  const response = NextResponse.json(successResponse(services));
  response.headers.set('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');
  return response;
}

export const GET = withErrorHandler(listServicesHandler);
