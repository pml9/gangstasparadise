import { SessionFormat, Location, PaginationParams, PaginatedResponse } from './common';
import { Review } from './review';
import { AgeGroup } from './common';

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  sessionFormat: SessionFormat;
  location?: Location;
  createdAt: string;
  updatedAt: string;
  teacher: SkillTeacher;
  averageRating?: number;
  totalSessions?: number;
  image: string;
  reviews: Review[];
}

export interface SkillTeacher {
  id: string;
  name: string;
  image?: string;
  ageGroup: AgeGroup;
  averageRating?: number;
  totalSessions?: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface SkillSearchParams extends PaginationParams {
  query?: string;
  categoryId?: string;
  format?: SessionFormat;
  radius?: number; // in kilometers
  lat?: number;
  lng?: number;
  minRating?: number;
  ageGroups?: string[];
  availableFrom?: string; // ISO date string
  availableTo?: string;   // ISO date string
}

export interface CreateSkillRequest {
  name: string;
  description: string;
  categoryId: string;
  sessionFormat: SessionFormat;
  location?: Location;
  isTeaching: boolean;
  level?: string;
  experienceYears?: number;
}

export interface UpdateSkillRequest extends Partial<CreateSkillRequest> {
  id: string;
}

export interface SkillResponse extends Skill {}
export interface SkillsResponse extends PaginatedResponse<Skill> {}

export interface FavoriteSkill {
  id: string;
  userId: string;
  skillId: string;
  skill: Skill;
  createdAt: string;
}

export interface SkillRecommendation {
  skill: Skill;
  matchScore: number;
  reason: string;
}
