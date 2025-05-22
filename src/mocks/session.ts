import { SessionStatus, SessionFormat } from '../types/common';
import type { 
  Session, 
  Review, 
  CreateSessionRequest, 
  UpdateSessionRequest, 
  SessionAvailabilityRequest,
  SessionAvailabilityResponse,
  CreateReviewRequest,
  SessionStats
} from '../types/session';
import { mockSkills } from './skill';
import { mockCurrentUser } from './auth';
import { mockOtherUsers } from './user';
import { AgeGroup } from '../types/common';

// Mock reviews for completed sessions
const mockReviews: Record<string, Review[]> = {
  'session-1': [
    {
      id: 'review-1',
      rating: 5,
      comment: 'Great session! Very informative and well-structured.',
      createdAt: '2025-05-10T16:30:00Z',
      reviewer: {
        id: mockCurrentUser.id,
        name: mockCurrentUser.name,
        image: mockCurrentUser.image as string
      }
    },
    {
      id: 'review-2',
      rating: 4,
      comment: 'Good session, but could use more hands-on examples.',
      createdAt: '2025-05-10T16:35:00Z',
      reviewer: {
        id: mockOtherUsers[0].id,
        name: mockOtherUsers[0].name,
        image: mockOtherUsers[0].image as string
      }
    }
  ]
};

export const mockSessions: Session[] = [
  // Upcoming sessions
  {
    id: 'session-4',
    title: 'Traditional Knitting Techniques',
    description: 'Learn traditional knitting patterns passed down through generations',
    startTime: '2025-06-02T10:00:00Z',
    endTime: '2025-06-02T12:00:00Z',
    format: SessionFormat.IN_PERSON,
    location: {
      lat: 52.52,
      lng: 13.40,
      address: 'Crafters Hub, 10115 Berlin'
    },
    status: SessionStatus.SCHEDULED,
    notes: 'Bring your own knitting needles and yarn',
    createdAt: '2025-05-15T11:20:00Z',
    updatedAt: '2025-05-15T11:20:00Z',
    skill: {
      id: 'skill-8',
      name: 'Knitting',
      category: { id: 'cat3', name: 'Arts & Crafts', description: 'Creative and artistic skills', icon: '🎨' }
    },
    teacher: {
      id: 'user-5',
      name: 'Margaret Smith',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60',
      ageGroup: AgeGroup.WISDOM_KEEPERS
    },
    learner: {
      id: mockCurrentUser.id,
      name: mockCurrentUser.name,
      image: mockCurrentUser.image,
      ageGroup: mockCurrentUser.ageGroup
    },
    reviews: []
  },
  {
    id: 'session-5',
    title: 'Social Media for Beginners',
    description: 'Learn how to use social media to connect with family and friends',
    startTime: '2025-05-28T15:00:00Z',
    endTime: '2025-05-28T16:30:00Z',
    format: SessionFormat.VIRTUAL,
    meetingLink: 'https://meet.example.com/social123',
    status: SessionStatus.SCHEDULED,
    notes: 'Please have a smartphone or computer ready',
    createdAt: '2025-05-10T14:30:00Z',
    updatedAt: '2025-05-18T10:15:00Z',
    skill: {
      id: 'skill-9',
      name: 'Social Media Basics',
      category: { id: 'cat1', name: 'Technology', description: 'Digital skills and technology', icon: '💻' }
    },
    teacher: {
      id: mockCurrentUser.id,
      name: mockCurrentUser.name,
      image: mockCurrentUser.image,
      ageGroup: mockCurrentUser.ageGroup
    },
    learner: {
      id: 'user-6',
      name: 'Robert Johnson',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60',
      ageGroup: AgeGroup.WISDOM_KEEPERS
    },
    reviews: []
  },
  {
    id: 'session-6',
    title: 'Family History Research',
    description: 'Learn how to trace your family tree and preserve family stories',
    startTime: '2025-06-05T17:00:00Z',
    endTime: '2025-06-05T19:00:00Z',
    format: SessionFormat.BOTH,
    meetingLink: 'https://meet.example.com/genealogy123',
    location: {
      lat: 52.52,
      lng: 13.40,
      address: 'Community Center, 10115 Berlin'
    },
    status: SessionStatus.SCHEDULED,
    notes: 'Bring any family documents or photos you might have',
    createdAt: '2025-05-12T09:15:00Z',
    updatedAt: '2025-05-12T09:15:00Z',
    skill: {
      id: 'skill-10',
      name: 'Genealogy',
      category: { id: 'cat8', name: 'Life Skills', description: 'Practical life skills', icon: '🏠' }
    },
    teacher: {
      id: 'user-7',
      name: 'Elizabeth Chen',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
      ageGroup: AgeGroup.EXPERIENCED_GUIDES
    },
    learner: {
      id: mockCurrentUser.id,
      name: mockCurrentUser.name,
      image: mockCurrentUser.image,
      ageGroup: mockCurrentUser.ageGroup
    },
    reviews: []
  },
  // Original session
  {
    id: 'session-1',
    title: 'JavaScript Fundamentals - Interactive Session',
    description: 'Hands-on JavaScript fundamentals with practical examples',
    startTime: '2025-05-25T14:00:00Z',
    endTime: '2025-05-25T15:30:00Z',
    format: SessionFormat.VIRTUAL,
    meetingLink: 'https://meet.example.com/abc123',
    status: SessionStatus.SCHEDULED,
    notes: 'Please have Node.js installed',
    createdAt: '2025-05-01T10:00:00Z',
    updatedAt: '2025-05-18T09:15:00Z',
    skill: {
      id: mockSkills[0].id,
      name: mockSkills[0].name,
      category: mockSkills[0].category
    },
    teacher: {
      id: mockCurrentUser.id,
      name: mockCurrentUser.name,
      image: mockCurrentUser.image,
      ageGroup: mockCurrentUser.ageGroup
    },
    learner: {
      id: mockOtherUsers[0].id,
      name: mockOtherUsers[0].name,
      image: mockOtherUsers[0].image,
      ageGroup: mockOtherUsers[0].ageGroup
    },
    reviews: []
  },
  // Completed session
  {
    id: 'session-8',
    title: 'Digital Photography Basics',
    description: 'Learn how to take great photos with your smartphone',
    startTime: '2025-05-05T10:00:00Z',
    endTime: '2025-05-05T12:00:00Z',
    format: SessionFormat.BOTH,
    meetingLink: 'https://meet.example.com/photo123',
    location: {
      lat: 52.52,
      lng: 13.40,
      address: 'Central Park, 10115 Berlin'
    },
    status: SessionStatus.COMPLETED,
    notes: 'Bring your smartphone with camera',
    createdAt: '2025-04-15T14:10:00Z',
    updatedAt: '2025-05-05T12:30:00Z',
    skill: {
      id: 'skill-12',
      name: 'Smartphone Photography',
      category: { id: 'cat1', name: 'Technology', description: 'Digital skills and technology', icon: '💻' }
    },
    teacher: {
      id: mockCurrentUser.id,
      name: mockCurrentUser.name,
      image: mockCurrentUser.image,
      ageGroup: mockCurrentUser.ageGroup
    },
    learner: {
      id: 'user-9',
      name: 'Sophia Martinez',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
      ageGroup: AgeGroup.YOUNG_LEARNERS
    },
    reviews: [
      {
        id: 'review-3',
        rating: 5,
        comment: 'Excellent teacher! I learned so much about my phone camera.',
        createdAt: '2025-05-05T13:15:00Z',
        reviewer: {
          id: 'user-9',
          name: 'Sophia Martinez',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60'
        }
      }
    ]
  },
  // Original completed session
  {
    id: 'session-2',
    title: 'Italian Pasta Making',
    description: 'Learn to make fresh pasta from scratch',
    startTime: '2025-05-10T18:00:00Z',
    endTime: '2025-05-10T20:00:00Z',
    format: SessionFormat.IN_PERSON,
    location: {
      lat: 52.52,
      lng: 13.40,
      address: 'Pasta Street 42, 10115 Berlin'
    },
    status: SessionStatus.COMPLETED,
    notes: 'All ingredients will be provided',
    createdAt: '2025-04-20T14:30:00Z',
    updatedAt: '2025-05-10T20:15:00Z',
    skill: {
      id: mockSkills[1].id,
      name: mockSkills[1].name,
      category: mockSkills[1].category
    },
    teacher: {
      id: 'user-2',
      name: 'Marco Rossi',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
      ageGroup: AgeGroup.EXPERIENCED_GUIDES
    },
    learner: {
      id: mockCurrentUser.id,
      name: mockCurrentUser.name,
      image: mockCurrentUser.image,
      ageGroup: mockCurrentUser.ageGroup
    },
    reviews: mockReviews['session-1'] || []
  },
  // Cancelled session
  {
    id: 'session-7',
    title: 'DIY Home Repairs',
    description: 'Basic home maintenance skills everyone should know',
    startTime: '2025-05-22T11:00:00Z',
    endTime: '2025-05-22T13:00:00Z',
    format: SessionFormat.IN_PERSON,
    location: {
      lat: 52.52,
      lng: 13.40,
      address: 'Community Workshop, 10115 Berlin'
    },
    status: SessionStatus.CANCELLED,
    notes: 'All tools will be provided',
    createdAt: '2025-04-25T16:20:00Z',
    updatedAt: '2025-05-20T10:30:00Z',
    skill: {
      id: 'skill-11',
      name: 'Home Maintenance',
      category: { id: 'cat8', name: 'Life Skills', description: 'Practical life skills', icon: '🏠' }
    },
    teacher: {
      id: 'user-8',
      name: 'James Wilson',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
      ageGroup: AgeGroup.EXPERIENCED_GUIDES
    },
    learner: {
      id: mockCurrentUser.id,
      name: mockCurrentUser.name,
      image: mockCurrentUser.image,
      ageGroup: mockCurrentUser.ageGroup
    },
    reviews: []
  },
  // Original cancelled session
  {
    id: 'session-3',
    title: 'Morning Yoga Flow',
    description: 'Energizing morning yoga session',
    startTime: '2025-05-15T07:00:00Z',
    endTime: '2025-05-15T08:00:00Z',
    format: SessionFormat.BOTH,
    meetingLink: 'https://meet.example.com/yoga123',
    status: SessionStatus.CANCELLED,
    notes: 'Please bring your own yoga mat',
    createdAt: '2025-04-28T11:20:00Z',
    updatedAt: '2025-05-14T19:45:00Z',
    skill: {
      id: mockSkills[2].id,
      name: mockSkills[2].name,
      category: mockSkills[2].category
    },
    teacher: {
      id: 'user-3',
      name: 'Priya Patel',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60',
      ageGroup: AgeGroup.EXPERIENCED_GUIDES
    },
    learner: {
      id: mockCurrentUser.id,
      name: mockCurrentUser.name,
      image: mockCurrentUser.image,
      ageGroup: mockCurrentUser.ageGroup
    },
    reviews: []
  }
];

// Mock requests and responses
export const mockCreateSessionRequest: CreateSessionRequest = {
  skillId: mockSkills[0].id,
  title: 'JavaScript Fundamentals',
  description: 'Learn the basics of JavaScript programming',
  startTime: '2025-06-01T14:00:00Z',
  endTime: '2025-06-01T15:30:00Z',
  format: SessionFormat.VIRTUAL,
  notes: 'Please bring your laptop with Node.js installed'
};

export const mockUpdateSessionRequest: UpdateSessionRequest = {
  title: 'JavaScript Fundamentals - Updated',
  description: 'Learn the basics of JavaScript programming with hands-on exercises',
  startTime: '2025-06-02T14:00:00Z',
  endTime: '2025-06-02T15:30:00Z',
  format: SessionFormat.VIRTUAL,
  notes: 'Please bring your laptop with Node.js and VS Code installed',
  status: SessionStatus.SCHEDULED
};

export const mockSessionAvailabilityRequest: SessionAvailabilityRequest = {
  skillId: mockSkills[0].id,
  date: '2025-06-01',
  timezone: 'Europe/Berlin'
};

export const mockSessionAvailabilityResponse: SessionAvailabilityResponse = {
  date: '2025-06-01',
  slots: [
    { startTime: '09:00', endTime: '10:00', available: true },
    { startTime: '10:00', endTime: '11:00', available: true },
    { startTime: '11:00', endTime: '12:00', available: false },
    { startTime: '14:00', endTime: '15:00', available: true },
    { startTime: '15:00', endTime: '16:00', available: true },
  ]
};

export const mockCreateReviewRequest: CreateReviewRequest = {
  rating: 5,
  comment: 'Great session! The teacher was very knowledgeable and patient.'
};

export const mockSessionStats: SessionStats = {
  totalSessions: 18,
  completedSessions: 10,
  upcomingSessions: 4,
  cancellationRate: 0.17, // 17%
  averageRating: 4.7
};
