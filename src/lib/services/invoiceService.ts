import prisma from '../prisma';
import { z } from 'zod';
import { createInvoiceSchema, updateInvoiceSchema } from '../validators/invoice';
import { NotFoundError } from '../utils/errors';

export class InvoiceService {
  static async createInvoice(data: z.infer<typeof createInvoiceSchema>) {
    // Ensure contact exists
    const contact = await prisma.contact.findUnique({ where: { id: data.contactId }});
    if (!contact) throw new NotFoundError('Contact not found');

    // Generate Invoice Number safely. 
    // In production with high concurrency, use a dedicated sequence table or Postgres sequence.
    // For now, using a transaction to count and generate.
    const result = await prisma.$transaction(async (tx) => {
      const year = new Date().getFullYear();
      
      // Get highest invoice number for current year
      const lastInvoice = await tx.invoice.findFirst({
        where: { invoiceNumber: { startsWith: `INV-${year}-` } },
        orderBy: { invoiceNumber: 'desc' },
      });

      let nextNum = 1;
      if (lastInvoice) {
        const parts = lastInvoice.invoiceNumber.split('-');
        if (parts.length === 3) {
          nextNum = parseInt(parts[2], 10) + 1;
        }
      }

      const invoiceNumber = `INV-${year}-${nextNum.toString().padStart(3, '0')}`;

      return await tx.invoice.create({
        data: {
          projectId: data.projectId,
          contactId: data.contactId,
          amount: data.amount,
          dueDate: new Date(data.dueDate),
          notes: data.notes,
          invoiceNumber,
          status: 'draft',
        },
      });
    });

    return result;
  }

  static async updateInvoice(id: string, data: z.infer<typeof updateInvoiceSchema>) {
    const updateData: any = { ...data };
    if (data.paidAt !== undefined) {
      updateData.paidAt = data.paidAt ? new Date(data.paidAt) : null;
    }
    
    // Auto-set paidAt when status changes to paid
    if (data.status === 'paid' && !updateData.paidAt) {
      updateData.paidAt = new Date();
    }

    return await prisma.invoice.update({
      where: { id },
      data: updateData,
    });
  }
}
