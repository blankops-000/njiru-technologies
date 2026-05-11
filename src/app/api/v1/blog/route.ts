import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';

async function listBlogHandler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
      skip,
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImageUrl: true,
        publishedAt: true,
        tags: true,
        author: {
          select: { name: true, avatarUrl: true }
        }
      }
    }),
    prisma.blogPost.count({ where: { status: 'published' } })
  ]);

  return NextResponse.json(successResponse(posts, {
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
  }));
}

export const GET = withErrorHandler(listBlogHandler);
