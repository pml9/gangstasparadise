import { RegisterRequest, AuthResponse } from '@/types/api';
import { mockCurrentUser } from '@/mocks/auth';
import { successResponse, errorResponse } from '@/lib/api/response';
import { AgeGroup } from '@/types/common';
import { NextResponse } from 'next/server';
import { delay } from '@/lib/delay';

export async function POST(request: Request) {
  try {
    await delay(1000); // Add realistic network delay
    const body: RegisterRequest = await request.json();
    
    // In a real app, you would validate the request body here
    // and create a user in your database
    if (!body.email || !body.password || !body.name || !body.ageGroup) {
      return errorResponse('Missing required fields', 400);
    }
    
    // Mock response
    const response: AuthResponse = {
      user: {
        ...mockCurrentUser,
        name: body.name,
        email: body.email,
        ageGroup: body.ageGroup as AgeGroup,
      },
      token: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
    
    return successResponse<AuthResponse>(response, 201);
  } catch (error) {
    console.error('Registration error:', error);
    return errorResponse(
      'Registration failed', 
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
