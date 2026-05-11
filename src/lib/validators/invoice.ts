import { z } from 'zod';

export const createInvoiceSchema = z.object({
  projectId: z.string().uuid().optional().nullable(),
  contactId: z.string().uuid(),
  amount: z.number().int().positive('Amount must be positive'),
  dueDate: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  notes: z.string().optional(),
});

export const updateInvoiceSchema = z.object({
  status: z.enum(['draft', 'sent', 'paid', 'overdue', 'cancelled']).optional(),
  notes: z.string().optional(),
  paidAt: z.string().datetime().optional().nullable(),
});
