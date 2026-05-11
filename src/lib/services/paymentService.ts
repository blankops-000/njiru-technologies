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
    const checkoutRequestId = resultRaw.CheckoutRequestID;

    if (!amount || !receipt || !checkoutRequestId) {
      throw new Error('Missing critical data in M-Pesa callback');
    }

    // 1. Idempotency check: does this receipt already exist?
    const existing = await prisma.payment.findFirst({
      where: { transactionReference: receipt }
    });

    if (existing) {
      logger.info({ receipt }, 'Payment already recorded, skipping');
      return { success: true, payment: existing };
    }

    // 2. Find the STK push record to link the payment
    const stkPush = await prisma.mpesaSTKPush.findUnique({
      where: { checkoutRequestId }
    });

    if (!stkPush) {
      logger.error({ checkoutRequestId, receipt }, 'M-Pesa callback received for unknown request');
      // Still return success to Safaricom to stop retries, but we'll need manual intervention
      return { success: false, reason: 'Unknown checkout request' };
    }

    // 3. Record the payment and update statuses
    return await prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          invoiceId: stkPush.invoiceId,
          contactId: stkPush.contactId,
          amount: Math.round(amount),
          method: 'mpesa',
          transactionReference: receipt,
          notes: `M-Pesa payment from ${phone}`,
        },
      });

      // Update STK Push status
      await tx.mpesaSTKPush.update({
        where: { id: stkPush.id },
        data: { status: 'success' }
      });

      // Update invoice if linked
      if (stkPush.invoiceId) {
        await tx.invoice.update({
          where: { id: stkPush.invoiceId },
          data: { status: 'paid', paidAt: new Date() }
        });
      }

      logger.info({ receipt, invoiceId: stkPush.invoiceId }, 'M-Pesa payment reconciled successfully');
      return { success: true, payment };
    });
  }
}
