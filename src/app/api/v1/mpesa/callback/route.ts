import { NextRequest, NextResponse } from 'next/server';
import { PaymentService } from '@/lib/services/paymentService';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';

// M-Pesa webhook callback
async function mpesaCallbackHandler(req: NextRequest) {
  const body = await req.json();
  await PaymentService.recordMpesaPayment(body);
  
  // Safaricom expects a simple success response to acknowledge receipt
  return NextResponse.json(successResponse({ acknowledged: true }));
}

export const POST = withErrorHandler(mpesaCallbackHandler);
