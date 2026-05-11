import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';
import { adminAuth } from '@/lib/auth/middleware';
import { updateServiceSchema } from '@/lib/validators/service';

async function updateServiceAdminHandler(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await adminAuth(req);
  const body = await req.json();
  const data = updateServiceSchema.parse(body);
  const updated = await prisma.service.update({ where: { id }, data });
  return NextResponse.json(successResponse(updated));
}

async function deleteServiceAdminHandler(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await adminAuth(req);
  await prisma.service.delete({ where: { id }});
  return NextResponse.json(successResponse({ success: true }));
}

export const PATCH = withErrorHandler(updateServiceAdminHandler);
export const DELETE = withErrorHandler(deleteServiceAdminHandler);
