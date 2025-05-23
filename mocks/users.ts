import { User } from '../src/types';

export const mockUsers: User[] = [
  // Managers
  {
    id: 1,
    email: 'sarah.johnson@workhub.com',
    name: 'Sarah Johnson',
    role: 'manager',
    manager_id: null,
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z'
  },
  {
    id: 2,
    email: 'mike.chen@workhub.com',
    name: 'Mike Chen',
    role: 'manager',
    manager_id: null,
    created_at: '2024-01-20T09:00:00Z',
    updated_at: '2024-01-20T09:00:00Z'
  },
  
  // Admin
  {
    id: 3,
    email: 'admin@workhub.com',
    name: 'Alex Rodriguez',
    role: 'admin',
    manager_id: null,
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z'
  },

  // Employees under Sarah Johnson
  {
    id: 4,
    email: 'emily.davis@workhub.com',
    name: 'Emily Davis',
    role: 'employee',
    manager_id: 1,
    manager: {
      id: 1,
      email: 'sarah.johnson@workhub.com',
      name: 'Sarah Johnson',
      role: 'manager',
      manager_id: null,
      created_at: '2024-01-15T08:00:00Z',
      updated_at: '2024-01-15T08:00:00Z'
    },
    created_at: '2024-02-01T08:30:00Z',
    updated_at: '2024-02-01T08:30:00Z'
  },
  {
    id: 5,
    email: 'james.wilson@workhub.com',
    name: 'James Wilson',
    role: 'employee',
    manager_id: 1,
    manager: {
      id: 1,
      email: 'sarah.johnson@workhub.com',
      name: 'Sarah Johnson',
      role: 'manager',
      manager_id: null,
      created_at: '2024-01-15T08:00:00Z',
      updated_at: '2024-01-15T08:00:00Z'
    },
    created_at: '2024-02-05T09:15:00Z',
    updated_at: '2024-02-05T09:15:00Z'
  },
  {
    id: 6,
    email: 'lisa.brown@workhub.com',
    name: 'Lisa Brown',
    role: 'employee',
    manager_id: 1,
    manager: {
      id: 1,
      email: 'sarah.johnson@workhub.com',
      name: 'Sarah Johnson',
      role: 'manager',
      manager_id: null,
      created_at: '2024-01-15T08:00:00Z',
      updated_at: '2024-01-15T08:00:00Z'
    },
    created_at: '2024-02-10T10:00:00Z',
    updated_at: '2024-02-10T10:00:00Z'
  },

  // Employees under Mike Chen
  {
    id: 7,
    email: 'david.martinez@workhub.com',
    name: 'David Martinez',
    role: 'employee',
    manager_id: 2,
    manager: {
      id: 2,
      email: 'mike.chen@workhub.com',
      name: 'Mike Chen',
      role: 'manager',
      manager_id: null,
      created_at: '2024-01-20T09:00:00Z',
      updated_at: '2024-01-20T09:00:00Z'
    },
    created_at: '2024-02-15T11:30:00Z',
    updated_at: '2024-02-15T11:30:00Z'
  },
  {
    id: 8,
    email: 'rachel.kim@workhub.com',
    name: 'Rachel Kim',
    role: 'employee',
    manager_id: 2,
    manager: {
      id: 2,
      email: 'mike.chen@workhub.com',
      name: 'Mike Chen',
      role: 'manager',
      manager_id: null,
      created_at: '2024-01-20T09:00:00Z',
      updated_at: '2024-01-20T09:00:00Z'
    },
    created_at: '2024-02-20T14:45:00Z',
    updated_at: '2024-02-20T14:45:00Z'
  },
  {
    id: 9,
    email: 'tom.anderson@workhub.com',
    name: 'Tom Anderson',
    role: 'employee',
    manager_id: 2,
    manager: {
      id: 2,
      email: 'mike.chen@workhub.com',
      name: 'Mike Chen',
      role: 'manager',
      manager_id: null,
      created_at: '2024-01-20T09:00:00Z',
      updated_at: '2024-01-20T09:00:00Z'
    },
    created_at: '2024-02-25T16:20:00Z',
    updated_at: '2024-02-25T16:20:00Z'
  },

  // IT Support Team
  {
    id: 10,
    email: 'support@workhub.com',
    name: 'IT Support Team',
    role: 'employee',
    manager_id: 3,
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z'
  }
];

export const getUserById = (id: number): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getUsersByRole = (role: 'employee' | 'manager' | 'admin'): User[] => {
  return mockUsers.filter(user => user.role === role);
};

export const getEmployeesByManager = (managerId: number): User[] => {
  return mockUsers.filter(user => user.manager_id === managerId);
};

// Additional helper functions for demo enhancement
export const getManagersWithEmployees = (): Array<{ manager: User; employees: User[] }> => {
  const managers = getUsersByRole('manager');
  return managers.map(manager => ({
    manager,
    employees: getEmployeesByManager(manager.id)
  }));
};

export const getDemoUserByRole = (role: 'employee' | 'manager' | 'admin'): User => {
  const users = getUsersByRole(role);
  return users[0]; // Return first user of each role for demo consistency
};

export const getRandomEmployee = (): User => {
  const employees = getUsersByRole('employee');
  return employees[Math.floor(Math.random() * employees.length)];
}; 