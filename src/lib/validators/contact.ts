import { z } from 'zod';

const contactFields = {
  fullName: z.string().min(1, 'Full name is required'),
  companyName: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().regex(/^\+254\d{9}$/, 'Phone must be in format +254XXXXXXXXX').optional().or(z.literal('')),
  secondaryPhone: z.string().optional(),
  message: z.string().optional(),
  source: z.enum(['website', 'whatsapp', 'referral', 'social_media', 'cold_outreach', 'other']).default('website'),
  tags: z.array(z.string()).optional(),
};

export const createContactSchema = z.object(contactFields).refine(data => data.email || data.phone, {
  message: "Either email or phone must be provided",
  path: ["email"]
});

export const updateContactSchema = z.object({
  ...contactFields,
  status: z.enum(['new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost', 'inactive']).optional(),
  notes: z.string().optional(),
  assignedTo: z.string().uuid().optional().nullable(),
}).partial();
