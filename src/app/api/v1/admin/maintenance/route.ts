import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';
import { adminAuth } from '@/lib/auth/middleware';

export const dynamic = 'force-dynamic';
import { MaintenanceService } from '@/lib/services/maintenanceService';
import { createMaintenancePlanSchema } from '@/lib/validators/maintenance';

async function listMaintenanceHandler(req: NextRequest) {
  await adminAuth(req);

  const plans = await prisma.maintenancePlan.findMany({
    orderBy: { nextBillingDate: 'asc' },
    include: {
      contact: { select: { fullName: true, companyName: true } }
    }
  });

  return NextResponse.json(successResponse(plans));
}

async function createMaintenanceHandler(req: NextRequest) {
  await adminAuth(req);

  const body = await req.json();
  const data = createMaintenancePlanSchema.parse(body);

  const plan = await MaintenanceService.createPlan(data);

  return NextResponse.json(successResponse(plan), { status: 201 });
}

export const GET = withErrorHandler(listMaintenanceHandler);
export const POST = withErrorHandler(createMaintenanceHandler);
