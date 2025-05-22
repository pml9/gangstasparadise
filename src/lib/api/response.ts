import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';

export function apiResponse<T>({
  data,
  status = 200,
  message,
  meta,
}: {
  data?: T;
  status?: number;
  message?: string;
  meta?: any;
}) {
  const response: ApiResponse<T> = {
    success: status >= 200 && status < 300,
    data,
    message,
    meta,
  };

  if (status >= 400) {
    response.error = message;
  }

  return NextResponse.json(response, { status });
}

export function successResponse<T>(data: T, status = 200, meta?: any) {
  return apiResponse({ data, status, meta });
}

export function errorResponse(message: string, status = 400, errorDetails?: string) {
  return apiResponse({ 
    message,
    status,
    ...(errorDetails && { error: errorDetails })
  });
}

export function notFoundResponse(message = 'Resource not found') {
  return apiResponse({ message, status: 404 });
}

export function unauthorizedResponse(message = 'Unauthorized') {
  return apiResponse({ message, status: 401 });
}

export function forbiddenResponse(message = 'Forbidden') {
  return apiResponse({ message, status: 403 });
}

export function serverErrorResponse(message = 'Internal server error') {
  return apiResponse({ message, status: 500 });
}
