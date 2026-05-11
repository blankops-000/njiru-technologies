import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
import { signAccessToken, generateRefreshToken, hashRefreshToken } from '@/lib/auth/jwt';
import { loginLimiter } from '@/lib/rate-limit';
import { withErrorHandler } from '@/lib/utils/with-error-handler';
import { successResponse, errorResponse } from '@/lib/utils/api-response';
import { loginSchema } from '@/lib/validators/auth';
import { UnauthorizedError } from '@/lib/utils/errors';

async function loginHandler(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const { success, limit, remaining } = await loginLimiter.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      errorResponse(429, 'Too many login attempts, please try again later', 'RATE_LIMITED'),
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
  const data = loginSchema.parse(body);

  const user = await prisma.adminUser.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid email or password');
  }

  // Generate tokens
  const payload = { sub: user.id, role: user.role };
  const accessToken = await signAccessToken(payload);
  const refreshToken = generateRefreshToken();
  const hashedRefreshToken = hashRefreshToken(refreshToken);

  // Calculate 7 days expiry
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  // Store refresh token
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: hashedRefreshToken,
      expiresAt,
    },
  });

  // Update last login
  await prisma.adminUser.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  const response = NextResponse.json(
    successResponse({
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
      }
    }),
    { status: 200 }
  );

  // Set refresh token in httpOnly cookie
  response.cookies.set({
    name: 'refresh_token',
    value: refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: expiresAt,
    path: '/',
  });

  return response;
}

export const POST = withErrorHandler(loginHandler);
