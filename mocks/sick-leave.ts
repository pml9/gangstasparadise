import { SickLeaveRequest } from '../src/types';
import { mockUsers } from './users';

export const mockSickLeaveRequests: SickLeaveRequest[] = [
  // Pending requests (recent)
  {
    id: 1,
    user_id: 4,
    user: {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@workhub.com'
    },
    start_date: '2024-03-15',
    end_date: '2024-03-17',
    status: 'pending',
    manager_comments: null,
    created_at: '2024-03-10T09:30:00Z',
    updated_at: '2024-03-10T09:30:00Z'
  },
  {
    id: 2,
    user_id: 7,
    user: {
      id: 7,
      name: 'David Martinez',
      email: 'david.martinez@workhub.com'
    },
    start_date: '2024-03-20',
    end_date: '2024-03-22',
    status: 'pending',
    manager_comments: null,
    created_at: '2024-03-12T14:15:00Z',
    updated_at: '2024-03-12T14:15:00Z'
  },
  {
    id: 3,
    user_id: 8,
    user: {
      id: 8,
      name: 'Rachel Kim',
      email: 'rachel.kim@workhub.com'
    },
    start_date: '2024-03-25',
    end_date: '2024-03-25',
    status: 'pending',
    manager_comments: null,
    created_at: '2024-03-13T11:45:00Z',
    updated_at: '2024-03-13T11:45:00Z'
  },

  // Approved requests
  {
    id: 4,
    user_id: 5,
    user: {
      id: 5,
      name: 'James Wilson',
      email: 'james.wilson@workhub.com'
    },
    start_date: '2024-03-05',
    end_date: '2024-03-07',
    status: 'approved',
    manager_comments: 'Get well soon! Take the time you need to recover.',
    created_at: '2024-03-01T10:20:00Z',
    updated_at: '2024-03-02T08:15:00Z'
  },
  {
    id: 5,
    user_id: 6,
    user: {
      id: 6,
      name: 'Lisa Brown',
      email: 'lisa.brown@workhub.com'
    },
    start_date: '2024-02-28',
    end_date: '2024-03-01',
    status: 'approved',
    manager_comments: 'Approved. Hope you feel better!',
    created_at: '2024-02-26T16:30:00Z',
    updated_at: '2024-02-27T09:10:00Z'
  },
  {
    id: 6,
    user_id: 9,
    user: {
      id: 9,
      name: 'Tom Anderson',
      email: 'tom.anderson@workhub.com'
    },
    start_date: '2024-02-20',
    end_date: '2024-02-23',
    status: 'approved',
    manager_comments: 'Take care of yourself. See you when you\'re feeling better.',
    created_at: '2024-02-18T13:45:00Z',
    updated_at: '2024-02-19T07:30:00Z'
  },

  // Rejected request (rare case)
  {
    id: 7,
    user_id: 4,
    user: {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@workhub.com'
    },
    start_date: '2024-02-15',
    end_date: '2024-02-16',
    status: 'rejected',
    manager_comments: 'Please provide medical documentation for sick leave during project deadline week.',
    created_at: '2024-02-13T12:15:00Z',
    updated_at: '2024-02-14T10:45:00Z'
  },

  // Historical approved requests
  {
    id: 8,
    user_id: 7,
    user: {
      id: 7,
      name: 'David Martinez',
      email: 'david.martinez@workhub.com'
    },
    start_date: '2024-02-08',
    end_date: '2024-02-09',
    status: 'approved',
    manager_comments: 'Approved. Rest well!',
    created_at: '2024-02-06T15:20:00Z',
    updated_at: '2024-02-07T08:45:00Z'
  },
  {
    id: 9,
    user_id: 8,
    user: {
      id: 8,
      name: 'Rachel Kim',
      email: 'rachel.kim@workhub.com'
    },
    start_date: '2024-01-30',
    end_date: '2024-02-02',
    status: 'approved',
    manager_comments: 'Take your time to recover fully.',
    created_at: '2024-01-28T09:10:00Z',
    updated_at: '2024-01-29T11:20:00Z'
  },
  {
    id: 10,
    user_id: 5,
    user: {
      id: 5,
      name: 'James Wilson',
      email: 'james.wilson@workhub.com'
    },
    start_date: '2024-01-25',
    end_date: '2024-01-26',
    status: 'approved',
    manager_comments: 'Hope you feel better soon!',
    created_at: '2024-01-23T14:30:00Z',
    updated_at: '2024-01-24T09:15:00Z'
  }
];

// Helper functions for filtering and querying
export const getSickLeaveByUserId = (userId: number): SickLeaveRequest[] => {
  return mockSickLeaveRequests.filter(request => request.user_id === userId);
};

export const getSickLeaveByStatus = (status: 'pending' | 'approved' | 'rejected'): SickLeaveRequest[] => {
  return mockSickLeaveRequests.filter(request => request.status === status);
};

export const getSickLeaveById = (id: number): SickLeaveRequest | undefined => {
  return mockSickLeaveRequests.find(request => request.id === id);
};

export const getPendingSickLeaveForManager = (managerId: number): SickLeaveRequest[] => {
  const managerEmployees = mockUsers.filter(user => user.manager_id === managerId);
  const employeeIds = managerEmployees.map(emp => emp.id);
  
  return mockSickLeaveRequests.filter(
    request => request.status === 'pending' && employeeIds.includes(request.user_id)
  );
};

// Generate stats for dashboard
export const getSickLeaveStats = () => {
  const total = mockSickLeaveRequests.length;
  const pending = mockSickLeaveRequests.filter(r => r.status === 'pending').length;
  const approved = mockSickLeaveRequests.filter(r => r.status === 'approved').length;
  const rejected = mockSickLeaveRequests.filter(r => r.status === 'rejected').length;
  
  // Calculate days taken this year (2024)
  const thisYearApproved = mockSickLeaveRequests.filter(r => 
    r.status === 'approved' && r.start_date.startsWith('2024')
  );
  
  const daysTaken = thisYearApproved.reduce((total, request) => {
    const start = new Date(request.start_date);
    const end = new Date(request.end_date);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return total + days;
  }, 0);

  return {
    total_requests: total,
    pending_requests: pending,
    approved_requests: approved,
    rejected_requests: rejected,
    days_taken_this_year: daysTaken
  };
}; 