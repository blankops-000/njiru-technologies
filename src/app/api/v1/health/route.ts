import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse, errorResponse } from '@/lib/utils/api-response';

async function healthHandler() {
  try {
    // Check DB connection
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json(successResponse({ status: 'ok', db: 'connected' }));
  } catch (error) {
    return NextResponse.json(errorResponse(503, 'Database unavailable'), { status: 503 });
  }
}

export const GET = withErrorHandler(healthHandler);
