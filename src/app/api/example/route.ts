import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/utils/supabase/server-helpers';

// Example API route that uses the real Supabase client with a development user
export async function GET() {
  // Get a Supabase client with a manager user for this operation
  const { supabase, currentUser } = getSupabaseServerClient('manager');

  try {
    // Fetch some data from Supabase
    let items = [];
    try {
      const { data, error } = await supabase
        .from('your_table')
        .select('*')
        .limit(10);

      if (error) {
        console.error('Supabase query error:', error);
      } else if (data) {
        items = data;
      }
    } catch (dbError) {
      // Handle case where table doesn't exist (common in development)
      console.warn(
        'Database query failed, possibly table does not exist:',
        dbError
      );
    }

    // Return data along with the current user info
    return NextResponse.json({
      currentUser,
      items,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
