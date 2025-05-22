import { AgeGroup, SessionFormat } from '../types/common';
import type { 
  Skill, 
  SkillCategory, 
  SkillSearchParams, 
  CreateSkillRequest, 
  UpdateSkillRequest,
  FavoriteSkill,
  SkillRecommendation
} from '../types/skill';
import { mockReviews } from './review';

// Skill Categories
export const mockSkillCategories: SkillCategory[] = [
  { 
    id: 'cat1', 
    name: 'Technology', 
    description: 'Digital skills and technology', 
    icon: '💻' 
  },
  { 
    id: 'cat2', 
    name: 'Languages', 
    description: 'Language learning and practice', 
    icon: '🌐' 
  },
  { 
    id: 'cat3', 
    name: 'Arts & Crafts', 
    description: 'Creative and artistic skills', 
    icon: '🎨' 
  },
  { 
    id: 'cat4', 
    name: 'Cooking', 
    description: 'Culinary skills and recipes', 
    icon: '🍳' 
  },
  { 
    id: 'cat5', 
    name: 'Music', 
    description: 'Music lessons and instruments', 
    icon: '🎵' 
  },
  { 
    id: 'cat6', 
    name: 'Fitness', 
    description: 'Exercise and wellness', 
    icon: '💪' 
  },
  { 
    id: 'cat7', 
    name: 'Academic', 
    description: 'School and academic subjects', 
    icon: '📚' 
  },
  { 
    id: 'cat8', 
    name: 'Life Skills', 
    description: 'Practical life skills', 
    icon: '🏠' 
  },
];

// Mock skills
export const mockSkills: Skill[] = [
  {
    id: 'skill-1',
    name: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript programming including variables, functions, and control flow.',
    category: mockSkillCategories[0],
    sessionFormat: SessionFormat.VIRTUAL,
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop&q=80',
    createdAt: '2025-01-10T09:00:00Z',
    updatedAt: '2025-05-15T14:30:00Z',
    teacher: {
      id: 'user-1',
      name: 'Sarah Miller',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
      ageGroup: AgeGroup.ESTABLISHED_ADULTS,
      averageRating: 4.7,
      totalSessions: 42
    },
    averageRating: 4.8,
    totalSessions: 28,
    reviews: mockReviews.filter(review => review.skillId === 'skill-1')
  },
  {
    id: 'skill-2',
    name: 'Italian Cooking',
    description: 'Learn to cook authentic Italian pasta dishes from scratch.',
    category: mockSkillCategories[3],
    sessionFormat: SessionFormat.IN_PERSON,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 52.52,
      lng: 13.40,
      address: 'Pasta Street 42, 10115 Berlin',
      city: 'Berlin',
      country: 'Germany'
    },
    createdAt: '2025-02-15T10:00:00Z',
    updatedAt: '2025-05-18T16:45:00Z',
    teacher: {
      id: 'user-2',
      name: 'Marco Rossi',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
      ageGroup: AgeGroup.EXPERIENCED_GUIDES,
      averageRating: 4.9,
      totalSessions: 87
    },
    averageRating: 4.9,
    totalSessions: 35,
    reviews: mockReviews.filter(review => review.skillId === 'skill-2')
  },
  {
    id: 'skill-3',
    name: 'Yoga for Beginners',
    description: 'Gentle yoga sessions to improve flexibility and reduce stress.',
    category: mockSkillCategories[5],
    sessionFormat: SessionFormat.BOTH,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 52.53,
      lng: 13.41,
      address: 'Yoga Studio, Main Street 5, 10115 Berlin',
      city: 'Berlin',
      country: 'Germany'
    },
    createdAt: '2025-03-01T14:00:00Z',
    updatedAt: '2025-05-19T11:20:00Z',
    teacher: {
      id: 'user-3',
      name: 'Priya Patel',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60',
      ageGroup: AgeGroup.ESTABLISHED_ADULTS,
      averageRating: 4.6,
      totalSessions: 53
    },
    averageRating: 4.7,
    totalSessions: 19,
    reviews: mockReviews.filter(review => review.skillId === 'skill-3')
  },
  {
    id: 'skill-4',
    name: 'Digital Photography',
    description: 'Master the art of digital photography with your smartphone or camera. Learn composition, lighting, and editing techniques.',
    category: mockSkillCategories[2],
    sessionFormat: SessionFormat.BOTH,
    image: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 52.51,
      lng: 13.39,
      address: 'Creative Hub, Art Street 15, 10119 Berlin',
      city: 'Berlin',
      country: 'Germany'
    },
    createdAt: '2025-03-10T11:20:00Z',
    updatedAt: '2025-05-20T09:15:00Z',
    teacher: {
      id: 'user-4',
      name: 'James Wilson',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
      ageGroup: AgeGroup.ESTABLISHED_ADULTS,
      averageRating: 4.9,
      totalSessions: 64
    },
    averageRating: 4.8,
    totalSessions: 42,
    reviews: mockReviews.filter(review => review.skillId === 'skill-4')
  },
  {
    id: 'skill-5',
    name: 'Knitting & Crochet',
    description: 'Learn traditional knitting and crochet techniques to create beautiful handmade items.',
    category: mockSkillCategories[2],
    sessionFormat: SessionFormat.IN_PERSON,
    image: 'https://images.unsplash.com/photo-1534214526114-0ea4d47b04f2?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 52.54,
      lng: 13.42,
      address: 'Craft Corner, Handmade Street 8, 10117 Berlin',
      city: 'Berlin',
      country: 'Germany'
    },
    createdAt: '2025-01-22T14:30:00Z',
    updatedAt: '2025-05-17T16:20:00Z',
    teacher: {
      id: 'user-5',
      name: 'Margaret Johnson',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=60',
      ageGroup: AgeGroup.WISDOM_KEEPERS,
      averageRating: 4.9,
      totalSessions: 112
    },
    averageRating: 4.9,
    totalSessions: 87,
    reviews: mockReviews.filter(review => review.skillId === 'skill-5')
  },
  {
    id: 'skill-6',
    name: 'Financial Planning Basics',
    description: 'Essential financial skills for all ages - budgeting, saving, and smart investing.',
    category: mockSkillCategories[7],
    sessionFormat: SessionFormat.VIRTUAL,
    image: 'https://images.unsplash.com/photo-1554224155-3a58922a22c3?w=800&auto=format&fit=crop&q=80',
    createdAt: '2025-04-05T10:00:00Z',
    updatedAt: '2025-05-19T13:45:00Z',
    teacher: {
      id: 'user-6',
      name: 'Robert Chen',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=60',
      ageGroup: AgeGroup.EXPERIENCED_GUIDES,
      averageRating: 4.8,
      totalSessions: 76
    },
    averageRating: 4.7,
    totalSessions: 53,
    reviews: mockReviews.filter(review => review.skillId === 'skill-6')
  },
  {
    id: 'skill-7',
    name: 'Gardening for Beginners',
    description: 'Learn to grow your own vegetables, herbs, and flowers in small spaces or gardens.',
    category: mockSkillCategories[7],
    sessionFormat: SessionFormat.IN_PERSON,
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 52.50,
      lng: 13.38,
      address: 'Community Garden, Green Street 22, 10115 Berlin',
      city: 'Berlin',
      country: 'Germany'
    },
    createdAt: '2025-02-18T09:15:00Z',
    updatedAt: '2025-05-16T11:30:00Z',
    teacher: {
      id: 'user-7',
      name: 'Elena Rodriguez',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
      ageGroup: AgeGroup.ESTABLISHED_ADULTS,
      averageRating: 4.7,
      totalSessions: 92
    },
    averageRating: 4.8,
    totalSessions: 64,
    reviews: mockReviews.filter(review => review.skillId === 'skill-7')
  },
  {
    id: 'skill-8',
    name: 'Social Media for Small Business',
    description: 'Learn how to effectively use social media to grow your small business or personal brand.',
    category: mockSkillCategories[0],
    sessionFormat: SessionFormat.VIRTUAL,
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=80',
    createdAt: '2025-03-25T13:00:00Z',
    updatedAt: '2025-05-20T15:20:00Z',
    teacher: {
      id: 'user-8',
      name: 'Alex Kim',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60',
      ageGroup: AgeGroup.YOUNG_LEARNERS,
      averageRating: 4.8,
      totalSessions: 38
    },
    averageRating: 4.6,
    totalSessions: 29,
    reviews: mockReviews.filter(review => review.skillId === 'skill-8')
  }
];

// Mock search params
export const mockSkillSearchParams: SkillSearchParams = {
  query: 'JavaScript',
  page: 1,
  limit: 10,
  categoryId: 'cat1',
  format: SessionFormat.VIRTUAL,
  radius: 10,
  lat: 52.52,
  lng: 13.405,
  minRating: 4,
  ageGroups: [AgeGroup.ESTABLISHED_ADULTS, AgeGroup.EXPERIENCED_GUIDES]
};

// Mock create/update requests
export const mockCreateSkillRequest: CreateSkillRequest = {
  name: 'Yoga for Beginners',
  description: 'Gentle yoga sessions for beginners',
  categoryId: 'cat6',
  sessionFormat: SessionFormat.BOTH,
  location: {
    lat: 52.52,
    lng: 13.405,
    address: 'Yoga Studio, Main Street 1, 10115 Berlin',
    city: 'Berlin',
    country: 'Germany'
  },
  isTeaching: true,
  level: 'BEGINNER',
  experienceYears: 3
};

export const mockUpdateSkillRequest: UpdateSkillRequest = {
  id: 'skill-123',
  name: 'Yoga for All Levels',
  description: 'Yoga sessions suitable for all levels',
  categoryId: 'cat6',
  sessionFormat: SessionFormat.BOTH,
  isTeaching: true
};

// Mock favorites
export const mockFavoriteSkill: FavoriteSkill = {
  id: 'fav-1',
  userId: 'current-user-id',
  skillId: 'skill-1',
  skill: mockSkills[0],
  createdAt: '2025-05-10T14:30:00Z'
};

export const mockFavoriteSkills: FavoriteSkill[] = [
  { 
    ...mockFavoriteSkill, 
    id: 'fav-1', 
    skill: mockSkills[0] 
  },
  { 
    id: 'fav-2', 
    userId: 'current-user-id', 
    skillId: 'skill-2', 
    skill: mockSkills[1],
    createdAt: '2025-05-12T16:45:00Z'
  }
];

// Mock recommendations
export const mockSkillRecommendations: SkillRecommendation[] = [
  {
    skill: mockSkills[2],
    matchScore: 0.92,
    reason: 'Matches your interest in technology and teaching style'
  },
  {
    skill: mockSkills[1],
    matchScore: 0.88,
    reason: 'Popular among users with similar learning goals'
  }
];
