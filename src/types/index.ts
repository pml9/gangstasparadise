// Common types
export * from './common';

// Domain-specific types
export * from './user';
export * from './skill';
export * from './session';
export * from './dashboard';

// Re-export commonly used types for convenience
export type { Location, TimeSlot, PaginationParams, PaginatedResponse, SessionStatus } from './common';

// Type utilities
export type Nullable<T> = T | null;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// API response wrapper for consistency
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    [key: string]: unknown;
  };
}

// API error response
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
  timestamp?: string;
  path?: string;
}
