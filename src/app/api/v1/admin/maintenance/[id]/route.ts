import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';
import { adminAuth } from '@/lib/auth/middleware';
import { MaintenanceService } from '@/lib/services/maintenanceService';
import { updateMaintenancePlanSchema } from '@/lib/validators/maintenance';

export const dynamic = 'force-dynamic';

async function updateMaintenanceHandler(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await adminAuth(req);
  
  const body = await req.json();
  const data = updateMaintenancePlanSchema.parse(body);
  
  const updated = await MaintenanceService.updatePlan(id, data);

  return NextResponse.json(successResponse(updated));
}

export const PATCH = withErrorHandler(updateMaintenanceHandler);
