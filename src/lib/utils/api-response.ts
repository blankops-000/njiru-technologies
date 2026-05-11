export function successResponse<T>(data: T, meta?: any) {
  return {
    success: true,
    data,
    ...(meta && { meta }),
  };
}

export function errorResponse(statusCode: number, error: string, code?: string, details?: any) {
  return {
    success: false,
    error,
    ...(code && { code }),
    ...(details && { details }),
  };
}
