import { Skill } from './skill';
import { Session } from './session';

export interface DashboardStats {
  totalSessions: number;
  hoursTaught: number;
  hoursLearned: number;
  averageRating: number;
  upcomingSessions: number;
  pendingRequests: number;
}

export interface ActivityTimelineItem {
  id: string;
  type: 'session' | 'review' | 'achievement' | 'message';
  title: string;
  description: string;
  timestamp: string;
  meta?: Record<string, unknown>;
}

export interface SkillProgress {
  skill: Pick<Skill, 'id' | 'name' | 'category' | 'image'>;
  currentLevel: string;
  progress: number; // 0-100
  hoursCompleted: number;
  targetHours: number;
  lastSession?: string;
}

export interface DashboardResponse {
  stats: DashboardStats;
  recentActivity: ActivityTimelineItem[];
  upcomingSessions: Session[];
  skillProgress: SkillProgress[];
  recommendations: {
    skills: Skill[];
    sessions: Session[];
  };
}

export interface UserMetrics {
  sessionsHosted: number;
  sessionsAttended: number;
  hoursTeaching: number;
  hoursLearning: number;
  averageRating: number;
  lastActive: string;
  skillDistribution: Array<{
    skillName: string;
    count: number;
  }>;
  monthlyActivity: Array<{
    month: string;
    teaching: number;
    learning: number;
  }>;
}

export interface SkillGoal {
  id: string;
  userId: string;
  skill: Pick<Skill, 'id' | 'name' | 'category'>;

  targetHours: number;
  completedHours: number;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSkillGoalRequest {
  skillId: string;
  targetHours: number;
  deadline?: string;
}

export interface UpdateSkillGoalRequest extends Partial<CreateSkillGoalRequest> {
  completedHours?: number;
}
