import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';
import { adminAuth } from '@/lib/auth/middleware';
import { ProjectService } from '@/lib/services/projectService';
import { updateProjectSchema } from '@/lib/validators/project';

export const dynamic = 'force-dynamic';

async function updateProjectHandler(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await adminAuth(req);
  
  const body = await req.json();
  const data = updateProjectSchema.parse(body);
  
  const updated = await ProjectService.updateProject(id, data, user.sub);

  return NextResponse.json(successResponse(updated));
}

export const PATCH = withErrorHandler(updateProjectHandler);
