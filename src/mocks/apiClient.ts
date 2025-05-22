import { delay } from '@/lib/utils';
import { mockCurrentUser } from './auth';
import { mockOtherUsers } from './user';
import { mockSessions } from './session';
import { mockSkills, mockSkillCategories } from './skill';
import { mockDashboardStats } from './dashboard';
import { mockSearchResults, mockRecentSearches, mockPopularSearches } from './search';
import { onboardingSteps, onboardingProgress, mockOnboardingData } from './onboarding';
import { SessionStatus } from '@/types/common';

// Helper function to simulate API delay
const simulateApiCall = async <T>(data: T, minDelay = 300, maxDelay = 800): Promise<T> => {
  const delayTime = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
  await delay(delayTime);
  return data;
};

export const mockApiClient = {
  // Auth API
  auth: {
    login: async (email: string, password: string) => {
      if (email === mockCurrentUser.email && password === 'password123') {
        const { password: _, ...userWithoutPassword } = mockCurrentUser;
        return simulateApiCall({
          user: userWithoutPassword,
          token: 'mock-jwt-token',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        });
      }
      throw new Error('Invalid credentials');
    },

    register: async (data: any) => {
      return simulateApiCall({
        user: {
          id: `user-${Date.now()}`,
          email: data.email,
          name: data.name,
          ageGroup: data.ageGroup,
          onboardingCompleted: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: 'mock-jwt-token',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });
    },

    getSession: async (token?: string) => {
      if (!token) throw new Error('No token provided');
      const { password: _, ...userWithoutPassword } = mockCurrentUser;
      return simulateApiCall({
        user: userWithoutPassword,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });
    },

    logout: async () => {
      return simulateApiCall({ success: true });
    },
  },

  // User API
  users: {
    getProfile: async (userId: string) => {
      const user = userId === mockCurrentUser.id 
        ? mockCurrentUser 
        : mockOtherUsers.find(u => u.id === userId);
      
      if (!user) throw new Error('User not found');
      
      const { password: _, ...userWithoutPassword } = user;
      return simulateApiCall(userWithoutPassword);
    },

    updateProfile: async (userId: string, updates: any) => {
      if (userId !== mockCurrentUser.id) throw new Error('Unauthorized');
      
      const updatedUser = {
        ...mockCurrentUser,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      return simulateApiCall(updatedUser);
    },

    updateAvatar: async (userId: string, file: File) => {
      if (userId !== mockCurrentUser.id) throw new Error('Unauthorized');
      
      // In a real app, we would upload the file and get a URL
      const imageUrl = URL.createObjectURL(file);
      
      return simulateApiCall({
        ...mockCurrentUser,
        image: imageUrl,
        updatedAt: new Date().toISOString(),
      });
    },
  },

  // Skills API
  skills: {
    list: async (params: any = {}) => {
      let filteredSkills = [...mockSkills];
      
      // Apply filters
      if (params.categoryId) {
        filteredSkills = filteredSkills.filter(
          skill => skill.category.id === params.categoryId
        );
      }
      
      if (params.format) {
        filteredSkills = filteredSkills.filter(
          skill => skill.sessionFormat === params.format || skill.sessionFormat === 'BOTH'
        );
      }
      
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        filteredSkills = filteredSkills.filter(
          skill => skill.name.toLowerCase().includes(searchLower) ||
                  skill.description.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const start = (page - 1) * limit;
      const end = start + limit;
      
      return simulateApiCall({
        data: filteredSkills.slice(start, end),
        meta: {
          total: filteredSkills.length,
          page,
          limit,
          totalPages: Math.ceil(filteredSkills.length / limit),
        },
      });
    },

    getById: async (id: string) => {
      const skill = mockSkills.find(s => s.id === id);
      if (!skill) throw new Error('Skill not found');
      return simulateApiCall(skill);
    },
  },

  // Sessions API
  sessions: {
    list: async (params: any = {}) => {
      let filteredSessions = [...mockSessions];
      
      // Filter by user ID if provided
      if (params.userId) {
        filteredSessions = filteredSessions.filter(
          session => session.teacher.id === params.userId || 
                   session.learner?.id === params.userId
        );
      }
      
      // Filter by status
      if (params.status === 'UPCOMING') {
        const now = new Date();
        filteredSessions = filteredSessions.filter(
          session => new Date(session.startTime) > now && 
                   session.status === 'SCHEDULED'
        );
      } else if (params.status === 'PAST') {
        const now = new Date();
        filteredSessions = filteredSessions.filter(
          session => new Date(session.endTime) < now || 
                   session.status === 'COMPLETED' || 
                   session.status === 'CANCELLED'
        );
      }
      
      // Apply pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const start = (page - 1) * limit;
      const end = start + limit;
      
      return simulateApiCall({
        data: filteredSessions.slice(start, end),
        meta: {
          total: filteredSessions.length,
          page,
          limit,
          totalPages: Math.ceil(filteredSessions.length / limit),
        },
      });
    },

    getById: async (id: string) => {
      const session = mockSessions.find(s => s.id === id);
      if (!session) throw new Error('Session not found');
      return simulateApiCall(session);
    },

    create: async (data: any) => {
      const newSession = {
        id: `session-${Date.now()}`,
        ...data,
        status: 'SCHEDULED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      mockSessions.push(newSession);
      return simulateApiCall(newSession);
    },

    update: async (id: string, updates: any) => {
      const sessionIndex = mockSessions.findIndex(s => s.id === id);
      if (sessionIndex === -1) throw new Error('Session not found');
      
      mockSessions[sessionIndex] = {
        ...mockSessions[sessionIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      return simulateApiCall(mockSessions[sessionIndex]);
    },

    cancel: async (id: string) => {
      const sessionIndex = mockSessions.findIndex(s => s.id === id);
      if (sessionIndex === -1) throw new Error('Session not found');
      
      mockSessions[sessionIndex] = {
        ...mockSessions[sessionIndex],
        status: SessionStatus.CANCELLED,
        updatedAt: new Date().toISOString(),
      };
      
      return simulateApiCall({ success: true });
    },
  },

  // Dashboard API
  dashboard: {
    getStats: async (userId: string) => {
      return simulateApiCall(mockDashboardStats);
    },
  },

  // Search API
  search: {
    search: async (query: string, filters: any = {}) => {
      // In a real app, we would filter results based on the query and filters
      return simulateApiCall({
        ...mockSearchResults,
        query,
        filters,
      });
    },

    getRecentSearches: async (userId: string) => {
      return simulateApiCall(mockRecentSearches);
    },

    getPopularSearches: async () => {
      return simulateApiCall(mockPopularSearches);
    },

    getSearchSuggestions: async (query: string) => {
      // Simple implementation - in a real app, this would be more sophisticated
      const suggestions = {
        skills: mockSkills
          .filter(skill => 
            skill.name.toLowerCase().includes(query.toLowerCase()) ||
            skill.description.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5),
        users: mockOtherUsers
          .filter(user => 
            user.name.toLowerCase().includes(query.toLowerCase()) ||
            user.bio?.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 3),
      };
      
      return simulateApiCall(suggestions);
    },
  },

  // Onboarding API
  onboarding: {
    getSteps: async () => {
      return simulateApiCall(onboardingSteps);
    },

    getProgress: async (userId: string) => {
      return simulateApiCall(onboardingProgress);
    },

    saveStep: async (userId: string, stepId: string, data: any) => {
      // In a real app, we would save this data to the server
      return simulateApiCall({
        success: true,
        stepId,
        data,
      });
    },

    completeOnboarding: async (userId: string) => {
      // In a real app, we would mark onboarding as complete for this user
      return simulateApiCall({
        success: true,
        user: {
          ...mockCurrentUser,
          onboardingCompleted: true,
        },
      });
    },
  },

  // Categories API
  categories: {
    list: async () => {
      return simulateApiCall(mockSkillCategories);
    },
  },
};

export default mockApiClient;
