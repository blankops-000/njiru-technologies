export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';
import { adminAuth } from '@/lib/auth/middleware';
import { updateContactSchema } from '@/lib/validators/contact';


async function updateContactHandler(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await adminAuth(req);
  
  const body = await req.json();
  const data = updateContactSchema.parse(body);
  
  const { ContactService } = await import('@/lib/services/contactService');
  const updated = await ContactService.updateContact(id, data);
  const decrypted = ContactService.decryptContact(updated);

  return NextResponse.json(successResponse(decrypted));
}

export const PATCH = withErrorHandler(updateContactHandler);
