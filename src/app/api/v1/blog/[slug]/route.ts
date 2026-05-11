import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';
import { NotFoundError } from '@/lib/utils/errors';

async function getBlogBySlugHandler(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await prisma.blogPost.findFirst({
    where: { slug, status: 'published' },
    include: {
      author: {
        select: { name: true, avatarUrl: true }
      }
    }
  });

  if (!post) {
    throw new NotFoundError('Blog post not found');
  }

  return NextResponse.json(successResponse(post));
}

export const GET = withErrorHandler(getBlogBySlugHandler);
