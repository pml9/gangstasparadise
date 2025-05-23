'use client';

import { createClient } from '@/utils/supabase/client';
import { useUser } from '@/context/user-context';

export function useSupabase() {
  const { currentUser } = useUser();
  // Use the real Supabase client
  const supabase = createClient();

  return { supabase, currentUser };
}
