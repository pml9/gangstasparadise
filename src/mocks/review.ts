import { Review, CreateReviewInput } from '@/types/review';

// Mock reviews for skills
export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    userName: 'Alex Johnson',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
    rating: 5,
    comment: 'Sarah is an amazing teacher! The JavaScript course was well-structured and easy to follow. I learned so much in just a few sessions.',
    date: '2025-05-18',
    skillId: 'skill-1',
    userId: 'user-4'
  },
  {
    id: 'rev-2',
    userName: 'Taylor Smith',
    userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60',
    rating: 4,
    comment: 'Great course! Would have loved more advanced topics covered, but the fundamentals were explained very well.',
    date: '2025-05-15',
    skillId: 'skill-2',
    userId: 'user-5'
  },
  {
    id: 'rev-3',
    userName: 'Jamie Wilson',
    userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
    rating: 5,
    comment: 'Marco is a true Italian chef! His pasta-making class was incredible. I can now make fresh pasta from scratch!',
    date: '2025-05-20',
    skillId: 'skill-2',
    userId: 'user-6'
  },
  {
    id: 'rev-4',
    userName: 'Morgan Lee',
    userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
    rating: 5,
    comment: 'Best yoga class I\'ve ever taken. Priya is very attentive and explains each pose in detail. Highly recommend!',
    date: '2025-05-19',
    skillId: 'skill-3',
    userId: 'user-7'
  },
  {
    id: 'rev-5',
    userName: 'Casey Kim',
    userImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60',
    rating: 4,
    comment: 'Very relaxing session. The virtual option is convenient, though I think in-person would be even better.',
    date: '2025-05-17',
    skillId: 'skill-3',
    userId: 'user-8'
  }
];

// Mock create review input
export const mockCreateReviewInput: CreateReviewInput = {
  skillId: 'skill-1',
  rating: 5,
  comment: 'This is a new review I\'m adding. The course was fantastic!',
  userId: 'current-user-id'
};

// Function to get reviews by skill ID
export const getReviewsBySkillId = (skillId: string): Review[] => {
  return mockReviews.filter(review => review.skillId === skillId);
};

// Function to calculate average rating for a skill
export const getAverageRating = (skillId: string): number => {
  const skillReviews = getReviewsBySkillId(skillId);
  if (skillReviews.length === 0) return 0;
  
  const sum = skillReviews.reduce((total, review) => total + review.rating, 0);
  return parseFloat((sum / skillReviews.length).toFixed(1));
};
