import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';
import { adminAuth } from '@/lib/auth/middleware';
import { InvoiceService } from '@/lib/services/invoiceService';
import { updateInvoiceSchema } from '@/lib/validators/invoice';

export const dynamic = 'force-dynamic';

async function updateInvoiceHandler(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await adminAuth(req);
  
  const body = await req.json();
  const data = updateInvoiceSchema.parse(body);
  
  const updated = await InvoiceService.updateInvoice(id, data);

  return NextResponse.json(successResponse(updated));
}

export const PATCH = withErrorHandler(updateInvoiceHandler);
