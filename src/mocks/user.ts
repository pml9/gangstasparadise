import { AgeGroup, SessionFormat } from '../types/common';
import type { 
  UserProfile, 
  UpdateUserProfileRequest, 
  UserAvailability,
  UpdateUserAvailabilityRequest,
  UserSkill
} from '../types/user';

// Mock other users
export const mockOtherUsers: UserProfile[] = [
  {
    id: 'user-4',
    email: 'david.chen@example.com',
    name: 'David Chen',
    emailVerified: '2024-01-15T10:00:00Z',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
    ageGroup: AgeGroup.ESTABLISHED_ADULTS,
    bio: 'Tech enthusiast and coding mentor',
    motivation: 'Love to share my knowledge with the next generation',
    location: {
      lat: 52.53,
      lng: 13.41,
      address: 'Friedrichstr. 100, 10117 Berlin',
      city: 'Berlin',
      country: 'Germany'
    },
    contactEmail: true,
    contactPhone: true,
    phoneNumber: '+491701234568',
    preferredFormat: SessionFormat.BOTH,
    createdAt: '2023-03-10T14:30:00Z',
    updatedAt: '2025-05-18T09:15:00Z',
    teachingSkills: [],
    learningSkills: [],
    averageRating: 4.7,
    totalSessions: 8,
    onboardingCompleted: true
  },
  {
    id: 'user-5',
    email: 'emma.wilson@example.com',
    name: 'Emma Wilson',
    emailVerified: '2024-02-20T11:20:00Z',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60',
    ageGroup: AgeGroup.EXPERIENCED_GUIDES,
    bio: 'Retired teacher with a passion for history and crafts',
    motivation: 'Enjoy sharing traditional skills with younger generations',
    location: {
      lat: 52.515,
      lng: 13.38,
      address: 'Unter den Linden 77, 10117 Berlin',
      city: 'Berlin',
      country: 'Germany'
    },
    contactEmail: true,
    contactPhone: false,
    preferredFormat: SessionFormat.IN_PERSON,
    createdAt: '2023-04-05T16:45:00Z',
    updatedAt: '2025-05-17T14:30:00Z',
    teachingSkills: [],
    learningSkills: [],
    averageRating: 4.9,
    totalSessions: 15,
    onboardingCompleted: true
  },
  {
    id: 'user-6',
    email: 'james.brown@example.com',
    name: 'James Brown',
    emailVerified: '2024-03-15T09:10:00Z',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
    ageGroup: AgeGroup.WISDOM_KEEPERS,
    bio: 'Retired carpenter with decades of woodworking experience',
    motivation: 'Passing on traditional craftsmanship skills',
    location: {
      lat: 52.51,
      lng: 13.39,
      address: 'Potsdamer Platz 1, 10785 Berlin',
      city: 'Berlin',
      country: 'Germany'
    },
    contactEmail: false,
    contactPhone: true,
    phoneNumber: '+491701234569',
    preferredFormat: SessionFormat.IN_PERSON,
    createdAt: '2023-02-28T13:20:00Z',
    updatedAt: '2025-05-16T11:45:00Z',
    teachingSkills: [],
    learningSkills: [],
    averageRating: 4.8,
    totalSessions: 10,
    onboardingCompleted: true
  }
];

const mockLocation = {
  lat: 52.52,
  lng: 13.405,
  address: 'Main Street 1, 10115 Berlin',
  city: 'Berlin',
  country: 'Germany'
} as const;

export const mockUpdateProfileRequest: UpdateUserProfileRequest = {
  name: 'Alex Johnson Updated',
  bio: 'Updated bio with more details about my interests and experiences.',
  motivation: 'I want to learn and share even more!',
  contactEmail: true,
  contactPhone: true,
  phoneNumber: '+491701234567',
  preferredFormat: SessionFormat.VIRTUAL,
  location: mockLocation
};

export const mockUserSkill: UserSkill = {
  id: 'skill-1',
  name: 'JavaScript',
  description: 'Modern JavaScript development with React and Node.js',
  category: { id: 'cat1', name: 'Technology' },
  level: 'ADVANCED',
  experienceYears: 5,
  isTeaching: true
};

export const mockUserSkills: UserSkill[] = [
  {
    id: 'skill-1',
    name: 'JavaScript',
    description: 'Modern JavaScript development with React and Node.js',
    category: { id: 'cat1', name: 'Technology' },
    level: 'ADVANCED',
    experienceYears: 5,
    isTeaching: true
  },
  {
    id: 'skill-2',
    name: 'Cooking Italian',
    description: 'Traditional Italian cuisine and pasta making',
    category: { id: 'cat4', name: 'Cooking' },
    level: 'INTERMEDIATE',
    experienceYears: 3,
    isTeaching: true
  },
  {
    id: 'skill-3',
    name: 'Spanish',
    description: 'Conversational Spanish',
    category: { id: 'cat2', name: 'Languages' },
    level: 'BEGINNER',
    experienceYears: 1,
    isTeaching: false
  }
];

export const mockUserAvailability: UserAvailability[] = [
  {
    id: 'avail-1',
    dayOfWeek: 1, // Monday
    startTime: '09:00',
    endTime: '12:00',
    recurring: true
  },
  {
    id: 'avail-2',
    dayOfWeek: 3, // Wednesday
    startTime: '14:00',
    endTime: '18:00',
    recurring: true
  },
  {
    id: 'avail-3',
    dayOfWeek: 5, // Friday
    startTime: '10:00',
    endTime: '16:00',
    recurring: true
  }
];

export const mockUpdateAvailabilityRequest: UpdateUserAvailabilityRequest = {
  availability: [
    {
      dayOfWeek: 2, // Tuesday
      startTime: '10:00',
      endTime: '15:00',
      recurring: true
    },
    {
      dayOfWeek: 4, // Thursday
      startTime: '13:00',
      endTime: '17:00',
      recurring: true
    }
  ]
};
