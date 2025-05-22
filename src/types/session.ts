import { SessionStatus, TimeSlot, Location, SessionFormat } from './common';
import { Skill } from './skill';
import { UserProfile } from './user';

export interface Session {
  id: string;
  title: string;
  description?: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  format: SessionFormat;
  location?: Location;
  meetingLink?: string;
  status: SessionStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  
  // Relations
  skill: Pick<Skill, 'id' | 'name' | 'category'>;
  teacher: Pick<UserProfile, 'id' | 'name' | 'image' | 'ageGroup'>;
  learner: Pick<UserProfile, 'id' | 'name' | 'image' | 'ageGroup'>;
  reviews?: Review[];
}

export interface Review {
  id: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: string;
  reviewer: {
    id: string;
    name: string;
    image?: string;
  };
}

export interface CreateSessionRequest {
  skillId: string;
  title: string;
  description?: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  format: 'IN_PERSON' | 'VIRTUAL';
  location?: Location;
  notes?: string;
}

export interface UpdateSessionRequest extends Partial<CreateSessionRequest> {
  status?: SessionStatus;
  meetingLink?: string;
}

export interface SessionAvailabilityRequest {
  skillId: string;
  date: string; // ISO date string
  timezone?: string;
}

export interface SessionAvailabilityResponse {
  date: string; // ISO date string
  slots: TimeSlot[];
}

export interface CreateReviewRequest {
  rating: number;
  comment?: string;
}

export interface SessionStats {
  totalSessions: number;
  completedSessions: number;
  upcomingSessions: number;
  cancellationRate: number;
  averageRating: number;
}
