import { DashboardStatsResponse } from '@/types/api';
import { mockCurrentUser } from './auth';
import { mockSessions } from './session';
import { mockSkills, mockSkillCategories } from './skill';
import { SkillGoal } from '@/types';

export const mockDashboardStats: DashboardStatsResponse = {
  stats: {
    totalSessions: 24,
    hoursTaught: 18.5,
    hoursLearned: 32.0,
    averageRating: 4.7,
    upcomingSessions: 3,
    pendingRequests: 2,
  },
  recentActivity: [
    {
      id: 'act-1',
      type: 'session',
      title: 'Upcoming Session: JavaScript Fundamentals',
      description: 'Session scheduled for May 25, 2025 at 14:00',
      timestamp: '2025-05-20T09:15:00Z',
      meta: {
        sessionId: 'session-1',
        skillId: 'skill-1',
      },
    },
    {
      id: 'act-2',
      type: 'review',
      title: 'New Review Received',
      description: 'Sarah left you a 5-star review for your JavaScript session',
      timestamp: '2025-05-19T16:30:00Z',
      meta: {
        rating: 5,
        skillId: 'skill-1',
      },
    },
    {
      id: 'act-3',
      type: 'achievement',
      title: 'Skill Mastery: JavaScript',
      description: 'You\'ve completed 10+ hours of JavaScript training',
      timestamp: '2025-05-18T11:20:00Z',
      meta: {
        skillId: 'skill-1',
        hoursCompleted: 12.5,
      },
    },
  ],
  upcomingSessions: mockSessions.filter(s => s.status === 'SCHEDULED'),
  skillProgress: [
    {
      skill: {
        id: 'skill-1',
        name: 'JavaScript Fundamentals',
        category: mockSkillCategories[0],
        image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop&q=80',
      },
      currentLevel: 'INTERMEDIATE',
      progress: 65,
      hoursCompleted: 13,
      targetHours: 20,
      lastSession: '2025-05-18T14:30:00Z',
    },
    {
      skill: {
        id: 'skill-4',
        name: 'Italian Language',
        category: mockSkillCategories[1],
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80',
      },
      currentLevel: 'BEGINNER',
      progress: 30,
      hoursCompleted: 6,
      targetHours: 20,
      lastSession: '2025-05-15T16:45:00Z',
    },
    {
      skill: {
        id: 'skill-5',
        name: 'Yoga',
        category: mockSkillCategories[5],
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=920&q=80',
      },
      currentLevel: 'ADVANCED',
      progress: 85,
      hoursCompleted: 34,
      targetHours: 40,
      lastSession: '2025-05-19T08:30:00Z',
    },
  ],
  recommendations: {
    skills: mockSkills.filter(skill => 
      skill.category.id === 'cat1' || skill.category.id === 'cat3'
    ),
    sessions: mockSessions.filter(session => 
      session.skill.category.id === 'cat1' || 
      session.skill.category.id === 'cat3'
    ),
  },
};

export const mockSkillGoals: SkillGoal[] = [
  {
    id: 'goal-1',
    userId: mockCurrentUser.id,
    skill: {
      id: 'skill-1',
      name: 'JavaScript Fundamentals',
      category: mockSkillCategories[0],
    },
    targetHours: 20,
    completedHours: 13,
    deadline: '2025-07-01T00:00:00Z',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-05-15T16:45:00Z',
  },
  {
    id: 'goal-2',
    userId: mockCurrentUser.id,
    skill: {
      id: 'skill-4',
      name: 'Italian Language',
      category: mockSkillCategories[1],
    },
    targetHours: 20,
    completedHours: 6,
    deadline: '2025-08-15T00:00:00Z',
    createdAt: '2025-03-10T14:30:00Z',
    updatedAt: '2025-05-15T16:45:00Z',
  },
];
