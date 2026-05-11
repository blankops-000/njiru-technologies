import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';
import { adminAuth } from '@/lib/auth/middleware';

export const dynamic = 'force-dynamic';
import { BlogService } from '@/lib/services/blogService';
import { createBlogPostSchema } from '@/lib/validators/blog';

async function listBlogAdminHandler(req: NextRequest) {
  await adminAuth(req);
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' }, include: { author: { select: { name: true }} }});
  return NextResponse.json(successResponse(posts));
}

async function createBlogAdminHandler(req: NextRequest) {
  const user = await adminAuth(req);
  const body = await req.json();
  const data = createBlogPostSchema.parse(body);
  const post = await BlogService.createPost(data, user.sub);
  return NextResponse.json(successResponse(post), { status: 201 });
}

export const GET = withErrorHandler(listBlogAdminHandler);
export const POST = withErrorHandler(createBlogAdminHandler);
