import { LoginRequest, AuthResponse } from '@/types/api';
import { mockCurrentUser } from '@/mocks/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api/response';
import { NextResponse } from 'next/server';
import { delay } from '@/lib/delay';

export async function POST(request: Request) {
  try {
    await delay(800); // Add realistic network delay
    const { email, password }: LoginRequest = await request.json();
    
    // In a real app, you would validate credentials against your database
    if (!email || !password) {
      return unauthorizedResponse('Invalid credentials');
    }
    
    // Mock response - in a real app, you would validate the credentials
    // and fetch the user from the database
    if (email !== mockCurrentUser.email) {
      return unauthorizedResponse('Invalid email or password');
    }
    
    const response: AuthResponse = {
      user: mockCurrentUser,
      token: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
    
    return successResponse<AuthResponse>(response);
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse(
      'Login failed',
      400,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

// Export other HTTP methods as needed
export async function GET() {
  return new NextResponse('Method not allowed', { status: 405 });
}

export async function PUT() {
  return new NextResponse('Method not allowed', { status: 405 });
}

export async function DELETE() {
  return new NextResponse('Method not allowed', { status: 405 });
}

export async function PATCH() {
  return new NextResponse('Method not allowed', { status: 405 });
}
