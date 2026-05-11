import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';
import { adminAuth } from '@/lib/auth/middleware';

export const dynamic = 'force-dynamic';
import { InvoiceService } from '@/lib/services/invoiceService';
import { createInvoiceSchema } from '@/lib/validators/invoice';

async function listInvoicesHandler(req: NextRequest) {
  await adminAuth(req);

  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      contact: { select: { fullName: true, companyName: true } },
      project: { select: { title: true } }
    }
  });

  return NextResponse.json(successResponse(invoices));
}

async function createInvoiceHandler(req: NextRequest) {
  await adminAuth(req);

  const body = await req.json();
  const data = createInvoiceSchema.parse(body);

  const invoice = await InvoiceService.createInvoice(data);

  return NextResponse.json(successResponse(invoice), { status: 201 });
}

export const GET = withErrorHandler(listInvoicesHandler);
export const POST = withErrorHandler(createInvoiceHandler);
