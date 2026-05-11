import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';
import { adminAuth } from '@/lib/auth/middleware';

export const dynamic = 'force-dynamic';
import { createServiceSchema } from '@/lib/validators/service';

async function listServicesAdminHandler(req: NextRequest) {
  await adminAuth(req);
  const services = await prisma.service.findMany({ orderBy: { sortOrder: 'asc' }});
  return NextResponse.json(successResponse(services));
}

async function createServiceAdminHandler(req: NextRequest) {
  await adminAuth(req);
  const body = await req.json();
  const data = createServiceSchema.parse(body);
  const service = await prisma.service.create({ data });
  return NextResponse.json(successResponse(service), { status: 201 });
}

export const GET = withErrorHandler(listServicesAdminHandler);
export const POST = withErrorHandler(createServiceAdminHandler);
