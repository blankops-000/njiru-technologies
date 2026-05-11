import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';
import { adminAuth } from '@/lib/auth/middleware';

export const dynamic = 'force-dynamic';
import { PaymentService } from '@/lib/services/paymentService';
import { createPaymentSchema } from '@/lib/validators/payment';

async function listPaymentsHandler(req: NextRequest) {
  await adminAuth(req);

  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      contact: { select: { fullName: true, companyName: true } },
      invoice: { select: { invoiceNumber: true } }
    }
  });

  return NextResponse.json(successResponse(payments));
}

async function createPaymentHandler(req: NextRequest) {
  await adminAuth(req);

  const body = await req.json();
  const data = createPaymentSchema.parse(body);

  const payment = await PaymentService.recordPayment(data);

  return NextResponse.json(successResponse(payment), { status: 201 });
}

export const GET = withErrorHandler(listPaymentsHandler);
export const POST = withErrorHandler(createPaymentHandler);
