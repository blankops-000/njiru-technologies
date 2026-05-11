import { z } from 'zod';

export const createMaintenancePlanSchema = z.object({
  contactId: z.string().uuid(),
  planType: z.enum(['basic', 'standard', 'premium']),
  amount: z.number().int().positive(),
  startDate: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  nextBillingDate: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  autoRenew: z.boolean().default(true),
  features: z.array(z.string()).optional(),
});

export const updateMaintenancePlanSchema = z.object({
  status: z.enum(['active', 'paused', 'cancelled', 'expired']).optional(),
  nextBillingDate: z.string().datetime().optional().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  endDate: z.string().datetime().optional().nullable().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  amount: z.number().int().positive().optional(),
  autoRenew: z.boolean().optional(),
});
