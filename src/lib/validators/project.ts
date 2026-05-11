import { z } from 'zod';

export const createProjectSchema = z.object({
  contactId: z.string().uuid(),
  serviceId: z.string().uuid(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  budget: z.number().int().positive().optional(),
  paymentStructure: z.string().optional(),
  startDate: z.string().datetime().optional().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  deadline: z.string().datetime().optional().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  techStack: z.array(z.string()).optional(),
  adminNotes: z.string().optional(),
});

export const updateProjectSchema = createProjectSchema.partial().extend({
  status: z.enum(['discovery', 'design', 'development', 'testing', 'delivered', 'completed', 'cancelled']).optional(),
  actualDeliveryDate: z.string().datetime().optional().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  deliverables: z.array(z.string()).optional(),
  clientVisibleNotes: z.string().optional(),
});
