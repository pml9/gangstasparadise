// Common enums used across the application
export enum AgeGroup {
  YOUNG_LEARNERS = 'YOUNG_LEARNERS',
  ESTABLISHED_ADULTS = 'ESTABLISHED_ADULTS',
  EXPERIENCED_GUIDES = 'EXPERIENCED_GUIDES',
  WISDOM_KEEPERS = 'WISDOM_KEEPERS',
}

export enum SessionFormat {
  IN_PERSON = 'IN_PERSON',
  VIRTUAL = 'VIRTUAL',
  BOTH = 'BOTH',
}

export enum SessionStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
  city?: string;
  country?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ErrorResponse {
  error: string;
  message?: string;
  statusCode: number;
  timestamp?: string;
  path?: string;
}

// Common form field types
export type SkillLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export interface TimeSlot {
  startTime: string; // ISO string
  endTime: string;   // ISO string
  available: boolean;
}
