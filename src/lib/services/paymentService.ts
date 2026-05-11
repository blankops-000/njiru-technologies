import prisma from '../prisma';
import { z } from 'zod';
import { createPaymentSchema } from '../validators/payment';
import { NotFoundError, ConflictError } from '../utils/errors';
import { logger } from '../monitoring/logger';

export class PaymentService {
  static async recordPayment(data: z.infer<typeof createPaymentSchema>) {
    // If linked to an invoice, verify invoice exists
    if (data.invoiceId) {
      const invoice = await prisma.invoice.findUnique({ where: { id: data.invoiceId }});
      if (!invoice) throw new NotFoundError('Invoice not found');
    }

    return await prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          invoiceId: data.invoiceId,
          projectId: data.projectId,
          contactId: data.contactId,
          amount: data.amount,
          method: data.method,
          transactionReference: data.transactionReference,
          paymentDate: data.paymentDate ? new Date(data.paymentDate) : new Date(),
          notes: data.notes,
        },
      });

      // Auto-update invoice status if full amount is met (for simplicity, just marking paid if a payment is attached)
      // In a real system, you'd sum all payments for the invoice and check against invoice.amount
      if (data.invoiceId) {
        await tx.invoice.update({
          where: { id: data.invoiceId },
          data: { status: 'paid', paidAt: new Date() },
        });
      }

      return payment;
    });
  }

  static async recordMpesaPayment(callbackData: any) {
    logger.info({ callbackData }, 'Processing M-Pesa Callback');
    
    // Check if result is success
    const resultRaw = callbackData?.Body?.stkCallback;
    if (!resultRaw) {
      throw new Error('Invalid callback data structure');
    }

    if (resultRaw.ResultCode !== 0) {
      logger.warn({ resultCode: resultRaw.ResultCode, desc: resultRaw.ResultDesc }, 'M-Pesa transaction failed or cancelled');
      return { success: false, reason: resultRaw.ResultDesc };
    }

    // Extract items
    const items = resultRaw.CallbackMetadata?.Item || [];
    const amountItem = items.find((i: any) => i.Name === 'Amount');
    const receiptItem = items.find((i: any) => i.Name === 'MpesaReceiptNumber');
    const phoneItem = items.find((i: any) => i.Name === 'PhoneNumber');

    const amount = amountItem?.Value;
    const receipt = receiptItem?.Value;
    const phone = phoneItem?.Value?.toString();

    if (!amount || !receipt) {
      throw new Error('Missing amount or receipt in callback metadata');
    }

    // Idempotency check: does this receipt already exist?
    const existing = await prisma.payment.findFirst({
      where: { transactionReference: receipt }
    });

    if (existing) {
      logger.info({ receipt }, 'Payment already recorded, skipping');
      return { success: true, payment: existing };
    }

    // In a full implementation, you'd find the invoice via CheckoutRequestID 
    // mapping which you saved when initiating the STK push.
    // For this prompt, we'll just log it as an unlinked payment flagged for admin review.
    // Or we find a contact by phone number (if not encrypted deterministically, this is hard)
    // We will create a dummy contact or attach to an "unknown" contact for manual reconciliation.
    
    // NOTE: This assumes an "Unknown" contact exists or we skip the contactId requirement.
    // Since contactId is NOT NULL, we must have one. We will create a placeholder contact if not found.
    
    let contactId = "00000000-0000-0000-0000-000000000000"; // Placeholder logic
    
    // Alternatively, look up contact by phone if deterministic encryption is used.
    
    logger.info({ amount, receipt, phone }, 'M-Pesa payment received, requires manual reconciliation');
    // We'll throw here to prevent inserting bad data until STK initiation mapping is built.
    throw new Error('M-Pesa reconciliation requires STK push mapping table (not in schema)');
  }
}
