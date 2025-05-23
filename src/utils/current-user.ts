import { User } from '@/types';
import { mockUsers } from '../../mocks/users';

// Default user for development (Emily Davis by default)
export const DEFAULT_USER = mockUsers[3]; // Emily Davis, employee

// Get a user by ID
export const getUserById = (id: number): User => {
  return mockUsers.find((user) => user.id === id) || DEFAULT_USER;
};

// Get a user by role
export const getUserByRole = (role: 'employee' | 'manager' | 'admin'): User => {
  return mockUsers.find((user) => user.role === role) || DEFAULT_USER;
};
