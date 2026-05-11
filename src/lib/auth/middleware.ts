import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { verifyAccessToken, TokenPayload } from './jwt';
import { UnauthorizedError } from '../utils/errors';
import { logger } from '../monitoring/logger';

export interface AuthenticatedRequest extends NextRequest {
  user: TokenPayload;
}

export async function adminAuth(request: NextRequest): Promise<TokenPayload> {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('Missing or invalid Authorization header');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = await verifyAccessToken(token);
    
    // Check if role is admin or editor
    if (payload.role !== 'admin' && payload.role !== 'editor') {
      throw new UnauthorizedError('Insufficient role privileges');
    }

    return payload;
  } catch (error: any) {
    logger.debug({ err: error }, 'Token verification failed');
    
    if (error.code === 'ERR_JWT_EXPIRED') {
      const err = new UnauthorizedError('Token expired');
      err.code = 'TOKEN_EXPIRED';
      throw err;
    }
    
    throw new UnauthorizedError('Invalid token');
  }
}
