import { SignJWT, jwtVerify } from 'jose';
import crypto from 'crypto';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET environment variable is missing or less than 32 characters');
  }
  return new TextEncoder().encode(secret);
};

export interface TokenPayload {
  sub: string; // user id
  role: string;
}

export async function signAccessToken(payload: TokenPayload): Promise<string> {
  const secret = getJwtSecret();
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m') // Short-lived
    .sign(secret);
}

export async function verifyAccessToken(token: string): Promise<TokenPayload> {
  const secret = getJwtSecret();
  const { payload } = await jwtVerify(token, secret, {
    clockTolerance: '10s',
  });
  
  return payload as unknown as TokenPayload;
}

export function generateRefreshToken(): string {
  return crypto.randomUUID();
}

export function hashRefreshToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}
