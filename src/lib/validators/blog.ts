import { z } from 'zod';

export const createBlogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  featuredImageUrl: z.string().url().optional().nullable(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
});

export const updateBlogPostSchema = createBlogPostSchema.partial().extend({
  publishedAt: z.string().datetime().optional().nullable(),
});
