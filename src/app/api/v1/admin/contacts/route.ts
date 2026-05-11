import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';
import { adminAuth } from '@/lib/auth/middleware';

export const dynamic = 'force-dynamic';
import { ContactService } from '@/lib/services/contactService';

async function listContactsHandler(req: NextRequest) {
  await adminAuth(req);

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const skip = (page - 1) * limit;

  // Contacts contain PII which is encrypted in DB. 
  // We cannot easily filter by name/email here unless we decrypt all.
  // In production, use blind indexing for search.
  
  const [contactsRaw, total] = await Promise.all([
    prisma.contact.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { projects: true } }
      }
    }),
    prisma.contact.count()
  ]);

  // Decrypt PII for response
  const contacts = contactsRaw.map(c => ContactService.decryptContact(c));

  return NextResponse.json(successResponse(contacts, {
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
  }));
}

export const GET = withErrorHandler(listContactsHandler);
