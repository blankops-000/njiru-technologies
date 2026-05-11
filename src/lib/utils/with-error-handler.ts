import { NextRequest, NextResponse } from 'next/server';
import { AppError } from './errors';
import * as Sentry from '@sentry/nextjs';
import { logger } from '../monitoring/logger';
import { errorResponse } from './api-response';
import { ZodError } from 'zod';

export function withErrorHandler(
  handler: (req: NextRequest, ...args: any[]) => Promise<NextResponse>
) {
  return async (req: NextRequest, ...args: any[]): Promise<NextResponse> => {
    try {
      return await handler(req, ...args);
    } catch (error: any) {
      if (error instanceof AppError) {
        logger.warn({ err: error, path: req.nextUrl.pathname }, 'App error handled');
        return NextResponse.json(
          errorResponse(error.statusCode, error.message, error.code, error.details),
          { status: error.statusCode }
        );
      }

      if (error instanceof ZodError) {
        logger.warn({ err: error, path: req.nextUrl.pathname }, 'Validation error');
        return NextResponse.json(
          errorResponse(400, 'Validation Error', 'VALIDATION_ERROR', (error as any).errors),
          { status: 400 }
        );
      }

      logger.error({ err: error, path: req.nextUrl.pathname }, 'Unhandled application error');
      Sentry.captureException(error);

      return NextResponse.json(
        errorResponse(500, 'Internal Server Error', 'INTERNAL_SERVER_ERROR'),
        { status: 500 }
      );
    }
  };
}
