// User types based on the database schema and API requirements

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'employee' | 'manager' | 'admin';
  manager_id?: number | null;
  manager?: User;
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  role?: 'employee' | 'manager' | 'admin';
  manager_id?: number;
}

export interface UpdateUserRequest {
  name?: string;
  role?: 'employee' | 'manager' | 'admin';
  manager_id?: number;
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export interface UserResponse {
  user: User;
}

export type UserRole = 'employee' | 'manager' | 'admin'; 