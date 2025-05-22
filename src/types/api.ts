import { Session, Review, SessionStats } from './session';
import { Skill, SkillCategory } from './skill';
import { UserProfile, UserSkill } from './user';

// Common API response type
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

// Auth API Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  ageGroup: string;
}

export interface AuthResponse {
  user: Omit<UserProfile, 'password'>;
  token: string;
  refreshToken: string;
  expiresAt: string;
}

// User API Types
export interface UpdateProfileRequest {
  name?: string;
  bio?: string;
  motivation?: string;
  contactEmail?: boolean;
  contactPhone?: boolean;
  phoneNumber?: string;
  preferredFormat?: 'IN_PERSON' | 'VIRTUAL' | 'BOTH';
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
}

// Skill API Types
export interface CreateSkillRequest {
  name: string;
  description: string;
  categoryId: string;
  sessionFormat: 'IN_PERSON' | 'VIRTUAL' | 'BOTH';
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  isTeaching: boolean;
  level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  experienceYears?: number;
}

export interface UpdateSkillRequest extends Partial<CreateSkillRequest> {
  id: string;
}

export interface SkillResponse extends Omit<Skill, 'teacher'> {
  teacher: {
    id: string;
    name: string;
    image?: string;
    ageGroup: string;
    averageRating?: number;
    totalSessions?: number;
  };
  averageRating?: number;
  totalSessions?: number;
}

// Session API Types
export interface CreateSessionRequest {
  skillId: string;
  title: string;
  description?: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  format: 'IN_PERSON' | 'VIRTUAL';
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  notes?: string;
}

export interface UpdateSessionRequest extends Partial<CreateSessionRequest> {
  status?: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  meetingLink?: string;
}

export interface SessionAvailabilityRequest {
  skillId: string;
  date: string; // ISO date string
  timezone?: string;
}

export interface TimeSlot {
  startTime: string; // Format: "HH:MM"
  endTime: string;   // Format: "HH:MM"
  available: boolean;
}

export interface SessionAvailabilityResponse {
  date: string; // ISO date string
  slots: TimeSlot[];
}

export interface CreateReviewRequest {
  rating: number; // 1-5
  comment?: string;
}

// Dashboard API Types
export interface DashboardStatsResponse {
  stats: {
    totalSessions: number;
    hoursTaught: number;
    hoursLearned: number;
    averageRating: number;
    upcomingSessions: number;
    pendingRequests: number;
  };
  recentActivity: Array<{
    id: string;
    type: 'session' | 'review' | 'achievement' | 'message';
    title: string;
    description: string;
    timestamp: string;
    meta?: Record<string, unknown>;
  }>;
  upcomingSessions: Session[];
  skillProgress: Array<{
    skill: Pick<Skill, 'id' | 'name' | 'category' | 'image'>;
    currentLevel: string;
    progress: number; // 0-100
    hoursCompleted: number;
    targetHours: number;
    lastSession?: string;
  }>;
  recommendations: {
    skills: Skill[];
    sessions: Session[];
  };
}

// Search API Types
export interface SearchParams {
  query?: string;
  category?: string;
  format?: 'IN_PERSON' | 'VIRTUAL' | 'BOTH';
  distance?: number;
  location?: {
    lat: number;
    lng: number;
  };
  minRating?: number;
  page?: number;
  limit?: number;
  sortBy?: 'relevance' | 'rating' | 'distance' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResponse {
  results: Array<{
    type: 'skill' | 'user' | 'session';
    data: SkillResponse | UserProfile | Session;
    score: number;
  }>;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    filters?: {
      categories: Array<{ id: string; name: string; count: number }>;
      formats: Array<{ value: string; label: string; count: number }>;
      ageGroups: Array<{ value: string; label: string; count: number }>;
    };
  };
}
