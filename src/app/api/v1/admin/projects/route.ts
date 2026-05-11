import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';
import { adminAuth } from '@/lib/auth/middleware';

export const dynamic = 'force-dynamic';
import { ProjectService } from '@/lib/services/projectService';
import { createProjectSchema } from '@/lib/validators/project';

async function listProjectsHandler(req: NextRequest) {
  await adminAuth(req);

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      contact: { select: { fullName: true, companyName: true } },
      service: { select: { name: true } }
    }
  });

  return NextResponse.json(successResponse(projects));
}

async function createProjectHandler(req: NextRequest) {
  await adminAuth(req);

  const body = await req.json();
  const data = createProjectSchema.parse(body);

  const project = await ProjectService.createProject(data);

  return NextResponse.json(successResponse(project), { status: 201 });
}

export const GET = withErrorHandler(listProjectsHandler);
export const POST = withErrorHandler(createProjectHandler);
