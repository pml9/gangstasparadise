import { mockCurrentUser } from './auth';
import { mockSessions } from './session';
import { mockSkills } from './skill';
import { Session, Skill, UserProfile } from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to filter and paginate results
const paginate = <T>(items: T[], page: number, limit: number) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    data: items.slice(start, end),
    meta: {
      total: items.length,
      page,
      limit,
      totalPages: Math.ceil(items.length / limit),
    },
  };
};

export const mockApi = {
  // Auth API
  auth: {
    login: async (email: string, password: string) => {
      await delay(500);
      
      if (email === mockCurrentUser.email && password === 'password123') {
        const { password: _, ...userWithoutPassword } = mockCurrentUser;
        return {
          user: userWithoutPassword,
          token: 'mock-jwt-token',
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        };
      }
      
      throw new Error('Invalid credentials');
    },
    
    getSession: async (token?: string) => {
      await delay(300);
      
      if (!token) {
        throw new Error('No token provided');
      }
      
      const { password: _, ...userWithoutPassword } = mockCurrentUser;
      return {
        user: userWithoutPassword,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
    },
  },
  
  // User API
  users: {
    getProfile: async (userId: string): Promise<UserProfile> => {
      await delay(400);
      const { password: _, ...userWithoutPassword } = mockCurrentUser;
      return userWithoutPassword as UserProfile;
    },
    
    updateProfile: async (userId: string, updates: Partial<UserProfile>) => {
      await delay(500);
      return {
        ...mockCurrentUser,
        ...updates,
        id: userId,
      };
    },
  },
  
  // Skills API
  skills: {
    list: async (params?: {
      page?: number;
      limit?: number;
      category?: string;
      format?: 'IN_PERSON' | 'VIRTUAL' | 'BOTH';
      search?: string;
    }) => {
      await delay(400);
      
      let filteredSkills = [...mockSkills];
      
      // Apply filters
      if (params?.category) {
        filteredSkills = filteredSkills.filter(
          skill => skill.category.id === params.category
        );
      }
      
      if (params?.format) {
        filteredSkills = filteredSkills.filter(
          skill => skill.sessionFormat === params.format || skill.sessionFormat === 'BOTH'
        );
      }
      
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredSkills = filteredSkills.filter(
          skill => 
            skill.name.toLowerCase().includes(searchLower) ||
            skill.description.toLowerCase().includes(searchLower)
        );
      }
      
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      
      return paginate<Skill>(filteredSkills, page, limit);
    },
    
    getById: async (id: string): Promise<Skill> => {
      await delay(300);
      const skill = mockSkills.find(s => s.id === id);
      if (!skill) throw new Error('Skill not found');
      return skill;
    },
  },
  
  // Sessions API
  sessions: {
    list: async (params?: {
      userId?: string;
      status?: 'UPCOMING' | 'PAST' | 'ALL';
      page?: number;
      limit?: number;
    }) => {
      await delay(400);
      
      let filteredSessions = [...mockSessions];
      
      // Filter by user
      if (params?.userId) {
        filteredSessions = filteredSessions.filter(
          session => 
            session.teacher.id === params.userId || 
            session.learner.id === params.userId
        );
      }
      
      // Filter by status
      if (params?.status === 'UPCOMING') {
        const now = new Date();
        filteredSessions = filteredSessions.filter(
          session => new Date(session.startTime) > now
        );
      } else if (params?.status === 'PAST') {
        const now = new Date();
        filteredSessions = filteredSessions.filter(
          session => new Date(session.endTime) < now
        );
      }
      
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      
      return paginate<Session>(filteredSessions, page, limit);
    },
    
    getById: async (id: string): Promise<Session> => {
      await delay(300);
      const session = mockSessions.find(s => s.id === id);
      if (!session) throw new Error('Session not found');
      return session;
    },
    
    create: async (data: any) => {
      await delay(500);
      const newSession: Session = {
        ...data,
        id: `session-${Date.now()}`,
        status: 'SCHEDULED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reviews: [],
      };
      
      // In a real app, you would add this to your sessions array
      // mockSessions.push(newSession);
      
      return newSession;
    },
    
    update: async (id: string, updates: any) => {
      await delay(500);
      const session = mockSessions.find(s => s.id === id);
      if (!session) throw new Error('Session not found');
      
      const updatedSession = {
        ...session,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      // In a real app, you would update the session in the array
      // const index = mockSessions.findIndex(s => s.id === id);
      // mockSessions[index] = updatedSession;
      
      return updatedSession;
    },
  },
  
  // Dashboard API
  dashboard: {
    getStats: async (userId: string) => {
      await delay(400);
      
      // Mock statistics
      return {
        totalSessions: 12,
        hoursTaught: 8.5,
        hoursLearned: 5.2,
        averageRating: 4.7,
        upcomingSessions: 2,
        pendingRequests: 1,
      };
    },
    
    getRecentActivity: async (userId: string) => {
      await delay(300);
      
      // Mock recent activity
      return [
        {
          id: 'activity-1',
          type: 'session',
          title: 'New session scheduled',
          description: 'Italian Pasta Making with Marco Rossi',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        },
        {
          id: 'activity-2',
          type: 'review',
          title: 'New review received',
          description: '5 stars for your JavaScript session!',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        },
      ];
    },
  },
};

export default mockApi;
