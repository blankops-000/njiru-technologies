import { z } from 'zod';

export const createServiceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  category: z.enum(['website', 'mobile', 'ai_automation', 'branding', 'package']),
  startingPrice: z.number().int().optional().nullable(),
  timeline: z.string().optional(),
  features: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export const updateServiceSchema = createServiceSchema.partial();
