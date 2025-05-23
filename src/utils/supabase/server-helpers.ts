import { createServerSupabaseClient } from './client';
import { getUserByRole } from '../current-user';
import { User } from '@/types';

// Get the current user for server components
export const getCurrentUser = (
  role: 'employee' | 'manager' | 'admin' = 'employee'
): User => {
  return getUserByRole(role);
};

// Get Supabase client for server components with the development user
export const getSupabaseServerClient = (
  role: 'employee' | 'manager' | 'admin' = 'employee'
) => {
  // In a real app with auth, you'd get the user from the session
  // For this hackathon, we'll just use a development user
  const currentUser = getCurrentUser(role);

  // Create the real Supabase client
  const supabase = createServerSupabaseClient();

  return { supabase, currentUser };
};
