import prisma from '../prisma';
import { z } from 'zod';
import { createBlogPostSchema, updateBlogPostSchema } from '../validators/blog';
import sanitizeHtml from 'sanitize-html';

export class BlogService {
  static async createPost(data: z.infer<typeof createBlogPostSchema>, authorId: string) {
    const safeContent = data.content ? sanitizeHtml(data.content) : null;
    
    return await prisma.blogPost.create({
      data: {
        ...data,
        content: safeContent,
        authorId,
        publishedAt: data.status === 'published' ? new Date() : null,
      },
    });
  }

  static async updatePost(id: string, data: z.infer<typeof updateBlogPostSchema>) {
    const updateData: any = { ...data };
    
    if (data.content) {
      updateData.content = sanitizeHtml(data.content);
    }
    
    if (data.status === 'published' && !data.publishedAt) {
      updateData.publishedAt = new Date();
    }
    
    if (data.publishedAt) {
      updateData.publishedAt = new Date(data.publishedAt);
    }

    return await prisma.blogPost.update({
      where: { id },
      data: updateData,
    });
  }
}
