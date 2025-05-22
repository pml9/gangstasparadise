import { SearchResponse } from '@/types/api';
import { mockSkills } from './skill';
import { mockCurrentUser } from './auth';
import { mockOtherUsers } from './user';
import { mockSessions } from './session';

export const mockSearchResults: SearchResponse = {
  results: [
    // Skill results
    {
      type: 'skill',
      data: {
        ...mockSkills[0],
        teacher: {
          id: mockOtherUsers[0].id,
          name: mockOtherUsers[0].name,
          image: mockOtherUsers[0].image as string,
          ageGroup: mockOtherUsers[0].ageGroup,
          averageRating: 4.8,
          totalSessions: 24
        },
        averageRating: 4.8,
        totalSessions: 15
      },
      score: 0.95
    },
    {
      type: 'skill',
      data: {
        ...mockSkills[1],
        teacher: {
          id: mockOtherUsers[1].id,
          name: mockOtherUsers[1].name,
          image: mockOtherUsers[1].image as string,
          ageGroup: mockOtherUsers[1].ageGroup,
          averageRating: 4.9,
          totalSessions: 35
        },
        averageRating: 4.9,
        totalSessions: 20
      },
      score: 0.92
    },
    // User results
    {
      type: 'user',
      data: {
        ...mockOtherUsers[2],
        teachingSkills: [{
          ...mockSkills[2],
          isTeaching: true
        }],
        learningSkills: [{
          ...mockSkills[0],
          isTeaching: false
        }],
        averageRating: 4.7,
        totalSessions: 12
      },
      score: 0.88
    },
    // Session results
    {
      type: 'session',
      data: {
        ...mockSessions[0],
        skill: mockSkills[0],
        teacher: {
          id: mockOtherUsers[0].id,
          name: mockOtherUsers[0].name,
          image: mockOtherUsers[0].image,
          ageGroup: mockOtherUsers[0].ageGroup
        },
        learner: {
          id: mockCurrentUser.id,
          name: mockCurrentUser.name,
          image: mockCurrentUser.image,
          ageGroup: mockCurrentUser.ageGroup
        }
      },
      score: 0.85
    },
    {
      type: 'session',
      data: {
        ...mockSessions[1],
        skill: mockSkills[1],
        teacher: {
          id: mockOtherUsers[1].id,
          name: mockOtherUsers[1].name,
          image: mockOtherUsers[1].image,
          ageGroup: mockOtherUsers[1].ageGroup
        },
        learner: {
          id: mockCurrentUser.id,
          name: mockCurrentUser.name,
          image: mockCurrentUser.image,
          ageGroup: mockCurrentUser.ageGroup
        }
      },
      score: 0.82
    }
  ],
  meta: {
    total: 15,
    page: 1,
    limit: 10,
    totalPages: 2,
    filters: {
      categories: [
        { id: 'cat1', name: 'Technology', count: 8 },
        { id: 'cat2', name: 'Languages', count: 4 },
        { id: 'cat3', name: 'Arts & Crafts', count: 3 }
      ],
      formats: [
        { value: 'IN_PERSON', label: 'In-person', count: 7 },
        { value: 'VIRTUAL', label: 'Virtual', count: 5 },
        { value: 'BOTH', label: 'Both', count: 3 }
      ],
      ageGroups: [
        { value: 'YOUNG_LEARNERS', label: 'Young Learners (16-29)', count: 5 },
        { value: 'ESTABLISHED_ADULTS', label: 'Established Adults (30-49)', count: 7 },
        { value: 'EXPERIENCED_GUIDES', label: 'Experienced Guides (50-64)', count: 3 },
        { value: 'WISDOM_KEEPERS', label: 'Wisdom Keepers (65+)', count: 2 }
      ]
    }
  }
};

export const mockRecentSearches = [
  { id: '1', query: 'JavaScript', type: 'skill', timestamp: '2025-05-20T10:30:00Z' },
  { id: '2', query: 'Cooking', type: 'skill', timestamp: '2025-05-19T15:45:00Z' },
  { id: '3', query: 'Yoga', type: 'skill', timestamp: '2025-05-18T09:20:00Z' },
  { id: '4', query: 'Spanish', type: 'skill', timestamp: '2025-05-17T14:10:00Z' },
  { id: '5', query: 'Marco', type: 'user', timestamp: '2025-05-16T11:25:00Z' }
];

export const mockPopularSearches = [
  { id: 'p1', query: 'JavaScript', count: 128 },
  { id: 'p2', query: 'Cooking', count: 95 },
  { id: 'p3', query: 'Yoga', count: 87 },
  { id: 'p4', query: 'Spanish', count: 76 },
  { id: 'p5', query: 'Photography', count: 64 },
  { id: 'p6', query: 'Guitar', count: 52 },
  { id: 'p7', query: 'Woodworking', count: 48 },
  { id: 'p8', query: 'Meditation', count: 42 }
];

export const mockSearchSuggestions = (query: string) => {
  const allSkills = [
    'JavaScript', 'React', 'Cooking', 'Yoga', 'Spanish', 'Photography',
    'Guitar', 'Woodworking', 'Meditation', 'Gardening', 'Knitting',
    'Financial Planning', 'Public Speaking', 'Data Analysis', 'Graphic Design'
  ];
  
  return {
    skills: allSkills
      .filter(skill => skill.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5)
      .map((skill, index) => ({
        id: `suggestion-${index}`,
        type: 'skill' as const,
        name: skill,
        category: 'Skills',
        icon: '🔍'
      })),
    users: mockOtherUsers
      .filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3)
      .map((user, index) => ({
        id: `user-suggestion-${index}`,
        type: 'user' as const,
        name: user.name,
        image: user.image,
        description: user.ageGroup
      }))
  };
};
