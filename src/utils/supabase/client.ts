import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Client-side Supabase client (for client components)
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

// Server-side Supabase client (for server components, API routes)
export const createServerSupabaseClient = () => {
  // This is specifically for Next.js App Router
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          const cookieStore = cookies();
          const cookie = cookieStore.get(name);
          return cookie?.value;
        },
        set(name, value, options) {
          // This can only be used in Route Handlers, not in Server Components
          // Thus, we wrap in a try/catch to avoid errors
          try {
            const cookieStore = cookies();
            cookieStore.set(name, value, options);
          } catch {
            // Unable to set cookie, we're likely in a Server Component
            // This can be safely ignored as we have middleware
            // to handle refreshing tokens via cookies
          }
        },
        remove(name, options) {
          try {
            const cookieStore = cookies();
            cookieStore.set(name, '', { ...options, maxAge: 0 });
          } catch {
            // Unable to remove cookie, we're likely in a Server Component
            // This can be safely ignored
          }
        },
      },
    }
  );
};
