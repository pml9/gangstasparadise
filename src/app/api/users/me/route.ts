import { NextResponse } from 'next/server';
import { mockCurrentUser } from '@/mocks/auth';

export async function GET() {
  try {
    // In a real implementation, you would get the current user from the session
    const currentUser = mockCurrentUser;
    
    // Remove sensitive data before sending the response
    const { password, ...userWithoutPassword } = currentUser;
    
    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    console.error('Error fetching current user:', error);
    return NextResponse.json(
      { message: 'Failed to fetch current user' },
      { status: 500 }
    );
  }
}
