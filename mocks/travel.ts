import { TravelRequest, TravelStatus } from '../src/types';

export const mockTravelRequests: TravelRequest[] = [
  // Pending travel requests
  {
    id: 1,
    user_id: 4,
    user: {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@workhub.com'
    },
    destination: 'New York, NY',
    departure_date: '2024-04-15',
    return_date: '2024-04-18',
    purpose: 'Client presentation and contract negotiation with Fortune 500 company',
    status: 'pending',
    estimated_cost: 2850.00,
    actual_cost: null,
    manager_comments: null,
    created_at: '2024-03-10T14:30:00Z',
    updated_at: '2024-03-10T14:30:00Z'
  },
  {
    id: 2,
    user_id: 7,
    user: {
      id: 7,
      name: 'David Martinez',
      email: 'david.martinez@workhub.com'
    },
    destination: 'Austin, TX',
    departure_date: '2024-04-22',
    return_date: '2024-04-25',
    purpose: 'SXSW Tech Conference - market research and networking',
    status: 'pending',
    estimated_cost: 1950.00,
    actual_cost: null,
    manager_comments: null,
    created_at: '2024-03-12T09:45:00Z',
    updated_at: '2024-03-12T09:45:00Z'
  },
  {
    id: 3,
    user_id: 8,
    user: {
      id: 8,
      name: 'Rachel Kim',
      email: 'rachel.kim@workhub.com'
    },
    destination: 'Los Angeles, CA',
    departure_date: '2024-04-10',
    return_date: '2024-04-12',
    purpose: 'Product launch event and media interviews',
    status: 'pending',
    estimated_cost: 1650.00,
    actual_cost: null,
    manager_comments: null,
    created_at: '2024-03-13T16:20:00Z',
    updated_at: '2024-03-13T16:20:00Z'
  },

  // Approved travel requests
  {
    id: 4,
    user_id: 5,
    user: {
      id: 5,
      name: 'James Wilson',
      email: 'james.wilson@workhub.com'
    },
    destination: 'Seattle, WA',
    departure_date: '2024-03-28',
    return_date: '2024-03-30',
    purpose: 'AWS re:Invent follow-up meetings and technical workshops',
    status: 'approved',
    estimated_cost: 1450.00,
    actual_cost: null,
    manager_comments: 'Essential for our cloud migration project. Approved.',
    created_at: '2024-03-05T11:15:00Z',
    updated_at: '2024-03-06T08:30:00Z'
  },
  {
    id: 5,
    user_id: 6,
    user: {
      id: 6,
      name: 'Lisa Brown',
      email: 'lisa.brown@workhub.com'
    },
    destination: 'Chicago, IL',
    departure_date: '2024-04-02',
    return_date: '2024-04-05',
    purpose: 'Trade show participation and lead generation activities',
    status: 'approved',
    estimated_cost: 1750.00,
    actual_cost: null,
    manager_comments: 'Important for Q2 sales targets. Approved for full budget.',
    created_at: '2024-03-08T13:45:00Z',
    updated_at: '2024-03-09T10:20:00Z'
  },

  // Completed travel requests
  {
    id: 6,
    user_id: 9,
    user: {
      id: 9,
      name: 'Tom Anderson',
      email: 'tom.anderson@workhub.com'
    },
    destination: 'San Francisco, CA',
    departure_date: '2024-03-01',
    return_date: '2024-03-03',
    purpose: 'DevOps summit and infrastructure planning sessions',
    status: 'completed',
    estimated_cost: 1900.00,
    actual_cost: 1875.50,
    manager_comments: 'Great value from the conference. Completed under budget.',
    created_at: '2024-02-20T15:30:00Z',
    updated_at: '2024-03-04T09:15:00Z'
  },
  {
    id: 7,
    user_id: 4,
    user: {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@workhub.com'
    },
    destination: 'Boston, MA',
    departure_date: '2024-02-28',
    return_date: '2024-03-02',
    purpose: 'Harvard Business Review summit on digital transformation',
    status: 'completed',
    estimated_cost: 2200.00,
    actual_cost: 2150.75,
    manager_comments: 'Excellent networking opportunities. Well executed trip.',
    created_at: '2024-02-15T10:45:00Z',
    updated_at: '2024-03-03T14:30:00Z'
  },

  // Rejected travel request
  {
    id: 8,
    user_id: 7,
    user: {
      id: 7,
      name: 'David Martinez',
      email: 'david.martinez@workhub.com'
    },
    destination: 'Miami, FL',
    departure_date: '2024-04-08',
    return_date: '2024-04-12',
    purpose: 'Beach conference and team building activities',
    status: 'rejected',
    estimated_cost: 3200.00,
    actual_cost: null,
    manager_comments: 'Budget constraints for Q1. Please reschedule for Q2 if still relevant.',
    created_at: '2024-03-11T12:20:00Z',
    updated_at: '2024-03-12T08:45:00Z'
  },

  // Draft travel requests (not submitted)
  {
    id: 9,
    user_id: 8,
    user: {
      id: 8,
      name: 'Rachel Kim',
      email: 'rachel.kim@workhub.com'
    },
    destination: 'Denver, CO',
    departure_date: '2024-05-15',
    return_date: '2024-05-17',
    purpose: 'Mountain tech summit and startup ecosystem exploration',
    status: 'draft',
    estimated_cost: 1350.00,
    actual_cost: null,
    manager_comments: null,
    created_at: '2024-03-13T17:15:00Z',
    updated_at: '2024-03-13T17:15:00Z'
  },
  {
    id: 10,
    user_id: 5,
    user: {
      id: 5,
      name: 'James Wilson',
      email: 'james.wilson@workhub.com'
    },
    destination: 'Atlanta, GA',
    departure_date: '2024-05-20',
    return_date: '2024-05-23',
    purpose: 'Cloud security conference and certification training',
    status: 'draft',
    estimated_cost: 1600.00,
    actual_cost: null,
    manager_comments: null,
    created_at: '2024-03-12T20:30:00Z',
    updated_at: '2024-03-12T20:30:00Z'
  }
];

// Helper functions for filtering and querying
export const getTravelByUserId = (userId: number): TravelRequest[] => {
  return mockTravelRequests.filter(request => request.user_id === userId);
};

export const getTravelByStatus = (status: TravelStatus): TravelRequest[] => {
  return mockTravelRequests.filter(request => request.status === status);
};

export const getTravelById = (id: number): TravelRequest | undefined => {
  return mockTravelRequests.find(request => request.id === id);
};

export const getTravelByDestination = (destination: string): TravelRequest[] => {
  return mockTravelRequests.filter(request => 
    request.destination.toLowerCase().includes(destination.toLowerCase())
  );
};

export const getUpcomingTravel = (): TravelRequest[] => {
  const today = new Date().toISOString().split('T')[0];
  return mockTravelRequests.filter(request => 
    (request.status === 'approved' || request.status === 'pending') && 
    request.departure_date > today
  );
};

export const getPendingTravelForManager = (managerId: number): TravelRequest[] => {
  // This would need to be implemented with user data to find employees under this manager
  return mockTravelRequests.filter(request => request.status === 'pending');
};

// Generate stats for dashboard
export const getTravelStats = () => {
  const total = mockTravelRequests.length;
  const pending = mockTravelRequests.filter(t => t.status === 'pending').length;
  const approved = mockTravelRequests.filter(t => t.status === 'approved').length;
  const completed = mockTravelRequests.filter(t => t.status === 'completed').length;

  const totalEstimatedCost = mockTravelRequests
    .filter(t => t.estimated_cost)
    .reduce((sum, t) => sum + (t.estimated_cost || 0), 0);

  const totalActualCost = mockTravelRequests
    .filter(t => t.actual_cost)
    .reduce((sum, t) => sum + (t.actual_cost || 0), 0);

  const upcomingTrips = getUpcomingTravel().length;

  return {
    total_requests: total,
    pending_requests: pending,
    approved_requests: approved,
    completed_requests: completed,
    total_estimated_cost: totalEstimatedCost,
    total_actual_cost: totalActualCost,
    upcoming_trips: upcomingTrips
  };
};

// Mock destinations for quick selection
export const popularDestinations = [
  'New York, NY',
  'San Francisco, CA',
  'Los Angeles, CA',
  'Chicago, IL',
  'Boston, MA',
  'Seattle, WA',
  'Austin, TX',
  'Denver, CO',
  'Miami, FL',
  'Atlanta, GA',
  'Las Vegas, NV',
  'Washington, DC'
];

// Mock travel purposes for quick selection
export const commonTravelPurposes = [
  'Client meeting',
  'Conference attendance',
  'Training workshop',
  'Product launch',
  'Sales presentation',
  'Team building',
  'Market research',
  'Partnership negotiation',
  'Technical consultation',
  'Industry summit'
]; 