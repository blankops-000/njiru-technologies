import { NextRequest, NextResponse } from 'next/server';
import { contactFormLimiter } from '@/lib/rate-limit';
import { ContactService } from '@/lib/services/contactService';
import { createContactSchema } from '@/lib/validators/contact';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse, errorResponse } from '@/lib/utils/api-response';

export const dynamic = 'force-dynamic';

async function createContactHandler(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const { success, limit, remaining } = await contactFormLimiter.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      errorResponse(429, 'Too many requests, please try again later', 'RATE_LIMITED'),
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
        }
      }
    );
  }

  const body = await req.json();
  const data = createContactSchema.parse(body);

  const contact = await ContactService.createContact(data);

  return NextResponse.json(
    successResponse({ message: 'Message received successfully', id: contact.id }),
    { status: 201 }
  );
}

export const POST = withErrorHandler(createContactHandler);
