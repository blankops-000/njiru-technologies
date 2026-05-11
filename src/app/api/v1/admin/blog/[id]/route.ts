import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';
import { adminAuth } from '@/lib/auth/middleware';
import { BlogService } from '@/lib/services/blogService';
import { updateBlogPostSchema } from '@/lib/validators/blog';

async function updateBlogAdminHandler(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await adminAuth(req);
  const body = await req.json();
  const data = updateBlogPostSchema.parse(body);
  const updated = await BlogService.updatePost(id, data);
  return NextResponse.json(successResponse(updated));
}

async function deleteBlogAdminHandler(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await adminAuth(req);
  await prisma.blogPost.delete({ where: { id }});
  return NextResponse.json(successResponse({ success: true }));
}

export const PATCH = withErrorHandler(updateBlogAdminHandler);
export const DELETE = withErrorHandler(deleteBlogAdminHandler);
