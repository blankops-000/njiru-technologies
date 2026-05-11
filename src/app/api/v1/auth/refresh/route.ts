import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
import { signAccessToken, generateRefreshToken, hashRefreshToken } from '@/lib/auth/jwt';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse } from '@/lib/utils/api-response';
import { UnauthorizedError } from '@/lib/utils/errors';
import { refreshSchema } from '@/lib/validators/auth';

async function refreshHandler(req: NextRequest) {
  // Get token from cookie or body
  let rawToken = req.cookies.get('refresh_token')?.value;
  
  if (!rawToken) {
    try {
      const body = await req.json();
      const parsed = refreshSchema.parse(body);
      rawToken = parsed.refreshToken;
    } catch (e) {
      // Body empty or invalid
    }
  }

  if (!rawToken) {
    throw new UnauthorizedError('Refresh token required');
  }

  const tokenHash = hashRefreshToken(rawToken);

  // Find token in DB
  const tokenRecord = await prisma.refreshToken.findFirst({
    where: { tokenHash },
    include: { user: true },
  });

  if (!tokenRecord) {
    throw new UnauthorizedError('Invalid refresh token');
  }

  if (tokenRecord.revoked) {
    // SECURITY: A revoked token is being used! 
    // This could mean the token was compromised.
    // Proactive defense: Revoke all other active tokens for this user
    await prisma.refreshToken.updateMany({
      where: { userId: tokenRecord.userId, revoked: false },
      data: { revoked: true }
    });
    
    throw new UnauthorizedError('Token revoked. Please login again.');
  }

  if (tokenRecord.expiresAt < new Date()) {
    throw new UnauthorizedError('Refresh token expired');
  }

  // Token is valid. Rotate it.
  
  // 1. Revoke the old token
  await prisma.refreshToken.update({
    where: { id: tokenRecord.id },
    data: { revoked: true },
  });

  // 2. Issue new tokens
  const payload = { sub: tokenRecord.user.id, role: tokenRecord.user.role };
  const newAccessToken = await signAccessToken(payload);
  const newRefreshToken = generateRefreshToken();
  const newHashedRefreshToken = hashRefreshToken(newRefreshToken);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  // 3. Store new refresh token
  await prisma.refreshToken.create({
    data: {
      userId: tokenRecord.user.id,
      tokenHash: newHashedRefreshToken,
      expiresAt,
    },
  });

  const response = NextResponse.json(
    successResponse({ accessToken: newAccessToken }),
    { status: 200 }
  );

  // Set new cookie
  response.cookies.set({
    name: 'refresh_token',
    value: newRefreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: expiresAt,
    path: '/',
  });

  return response;
}

export const POST = withErrorHandler(refreshHandler);
