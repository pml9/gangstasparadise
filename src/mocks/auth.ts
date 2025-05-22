import { AgeGroup, SessionFormat } from '../types/common';
import type { 
  RegisterRequest, 
  LoginRequest, 
  AuthResponse, 
  UserSession,
  UserProfile
} from '../types/user';

const PASSWORD = 'Password123!'; // For demo purposes only
const NOW = new Date('2025-05-20T10:00:00Z');

export const mockCurrentUser: UserProfile = {
  id: 'current-user-id',
  email: 'user@example.com',
  name: 'Alex Johnson',
  emailVerified: '2025-01-15T10:00:00Z',
  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
  ageGroup: AgeGroup.ESTABLISHED_ADULTS,
  bio: 'Passionate about learning and teaching new skills. Love to connect with people from different generations!',
  motivation: 'I believe in lifelong learning and want to share my knowledge with others.',
  location: {
    lat: 52.52,
    lng: 13.405,
    address: 'Main Street 1, 10115 Berlin',
    city: 'Berlin',
    country: 'Germany'
  },
  contactEmail: true,
  contactPhone: false,
  phoneNumber: '+491701234567',
  preferredFormat: SessionFormat.BOTH,
  createdAt: '2023-01-15T10:00:00Z',
  updatedAt: '2025-05-19T15:30:00Z',
  teachingSkills: [
    {
      id: 'ts1',
      name: 'Digital Photography',
      description: 'Learn how to take professional photos with your smartphone or camera',
      category: { id: 'cat1', name: 'Digital Skills', description: 'Modern technology and digital tools' },
      level: 'ADVANCED',
      experienceYears: 5,
      isTeaching: true
    },
    {
      id: 'ts2',
      name: 'Sourdough Bread Making',
      description: 'Traditional bread making techniques passed down through generations',
      category: { id: 'cat2', name: 'Culinary Arts', description: 'Cooking and baking skills' },
      level: 'INTERMEDIATE',
      experienceYears: 3,
      isTeaching: true
    },
    {
      id: 'ts3',
      name: 'Financial Planning',
      description: 'Personal finance management and investment strategies',
      category: { id: 'cat3', name: 'Finance', description: 'Money management and financial skills' },
      level: 'ADVANCED',
      experienceYears: 8,
      isTeaching: true
    }
  ],
  learningSkills: [
    {
      id: 'ls1',
      name: 'Knitting',
      description: 'Basic knitting techniques and patterns',
      category: { id: 'cat4', name: 'Crafts', description: 'Handicrafts and DIY projects' },
      level: 'BEGINNER',
      isTeaching: false
    },
    {
      id: 'ls2',
      name: 'Meditation',
      description: 'Mindfulness and stress reduction techniques',
      category: { id: 'cat5', name: 'Wellness', description: 'Health and wellbeing practices' },
      level: 'BEGINNER',
      isTeaching: false
    },
    {
      id: 'ls3',
      name: 'Gardening',
      description: 'Organic gardening and plant care',
      category: { id: 'cat6', name: 'Gardening', description: 'Horticulture and plant care' },
      level: 'BEGINNER',
      isTeaching: false
    }
  ],
  averageRating: 4.8,
  totalSessions: 12,
  onboardingCompleted: true,
  password: PASSWORD,
};

export const mockRegisterRequest: RegisterRequest = {
  name: 'Alex Johnson',
  email: 'user@example.com',
  password: PASSWORD,
  ageGroup: AgeGroup.ESTABLISHED_ADULTS,
  acceptTerms: true,
  phoneNumber: '+491701234567',
};

export const mockLoginRequest: LoginRequest = {
  email: 'user@example.com',
  password: PASSWORD,
};

export const mockAuthResponse: AuthResponse = {
  user: mockCurrentUser,
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjdXJyZW50LXVzZXItaWQiLCJpYXQiOjE3MTYxOTk2MDB9.abcdef1234567890',
  refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjdXJyZW50LXVzZXItaWQiLCJpYXQiOjE3MTYxOTk2MDB9.ghijklmnopqrstuv',
};

const expires = new Date(NOW);
expires.setDate(expires.getDate() + 7);

export const mockUserSession: UserSession = {
  user: mockCurrentUser,
  expires: expires.toISOString(),
};
