import { AgeGroup, Location, SessionFormat, SkillLevel } from './common';
import { SkillCategory } from './skill';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  emailVerified?: string | null;
  image?: string | null;
  ageGroup: AgeGroup;
  bio?: string;
  motivation?: string;
  location?: Location;
  contactEmail: boolean;
  contactPhone: boolean;
  phoneNumber?: string;
  preferredFormat: SessionFormat;
  createdAt: string;
  updatedAt: string;
  teachingSkills: UserSkill[];
  learningSkills: UserSkill[];
  averageRating?: number;
  totalSessions?: number;
  onboardingCompleted: boolean;
  password?: string; // Only used for mock data, should be excluded in responses
}

export interface UserSkill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  level?: SkillLevel;
  experienceYears?: number;
  isTeaching: boolean;
}

// SkillCategory is now imported from ./skill

export interface UpdateUserProfileRequest {
  name?: string;
  bio?: string;
  motivation?: string;
  contactEmail?: boolean;
  contactPhone?: boolean;
  phoneNumber?: string;
  preferredFormat?: SessionFormat;
  location?: Location;
}

export interface UserAvailability {
  id: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // Format: "HH:MM"
  endTime: string;   // Format: "HH:MM"
  recurring: boolean;
}

export interface UpdateUserAvailabilityRequest {
  availability: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    recurring: boolean;
  }[];
}

// Auth related types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
  ageGroup: AgeGroup;
  acceptTerms: boolean;
  phoneNumber?: string;
}

export interface AuthResponse {
  user: Omit<UserProfile, 'password'>;
  accessToken: string;
  refreshToken: string;
}

export interface UserSession {
  user: Omit<UserProfile, 'password'>;
  expires: string;
}
