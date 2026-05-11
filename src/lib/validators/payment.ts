import { z } from 'zod';

export const createPaymentSchema = z.object({
  invoiceId: z.string().uuid().optional().nullable(),
  projectId: z.string().uuid().optional().nullable(),
  contactId: z.string().uuid(),
  amount: z.number().int().positive(),
  method: z.enum(['mpesa', 'bank_transfer', 'cash', 'paypal', 'crypto', 'other']),
  transactionReference: z.string().optional(),
  paymentDate: z.string().datetime().optional().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  notes: z.string().optional(),
});
