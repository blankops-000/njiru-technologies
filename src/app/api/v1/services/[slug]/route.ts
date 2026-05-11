import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';
import { NotFoundError } from '@/lib/utils/errors';

async function getServiceHandler(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const service = await prisma.service.findFirst({
    where: { slug, isActive: true },
  });

  if (!service) {
    throw new NotFoundError('Service not found');
  }

  const response = NextResponse.json(successResponse(service));
  response.headers.set('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');
  return response;
}

export const GET = withErrorHandler(getServiceHandler);
