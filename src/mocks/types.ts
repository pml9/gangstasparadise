import { Session, Skill, UserProfile } from '@/types';

export interface MockApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface MockApiError {
  message: string;
  status?: number;
}

export interface MockAuthResponse {
  user: Omit<UserProfile, 'password'>;
  token: string;
  expiresAt: string;
}

export interface MockSessionResponse extends Session {}

export interface MockSkillResponse extends Skill {}

export interface MockDashboardStats {
  totalSessions: number;
  hoursTaught: number;
  hoursLearned: number;
  averageRating: number;
  upcomingSessions: number;
  pendingRequests: number;
}

export interface MockActivityItem {
  id: string;
  type: 'session' | 'review' | 'achievement' | 'message';
  title: string;
  description: string;
  timestamp: string;
}

export interface MockPaginationParams {
  page?: number;
  limit?: number;
}

export interface MockSkillFilters extends MockPaginationParams {
  category?: string;
  format?: 'IN_PERSON' | 'VIRTUAL' | 'BOTH';
  search?: string;
}

export interface MockSessionFilters extends MockPaginationParams {
  userId?: string;
  status?: 'UPCOMING' | 'PAST' | 'ALL';
}
