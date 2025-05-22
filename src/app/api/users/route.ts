import { mockCurrentUser } from '@/mocks/auth';
import { mockOtherUsers } from '@/mocks/user';
import { successResponse, errorResponse } from '@/lib/api/response';
import { RegisterRequest } from '@/types/api';
import { NextResponse } from 'next/server';
import { delay } from '@/lib/delay';

export async function GET() {
  try {
    await delay(600); // Add realistic network delay
    // In a real app, you would fetch users from your database
    // with proper filtering and pagination
    const users = [mockCurrentUser, ...Object.values(mockOtherUsers)];
    return successResponse({ data: users });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return errorResponse(
      'Failed to fetch users',
      500,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

export async function POST(request: Request) {
  try {
    await delay(1000); // Add realistic network delay for user creation
    const body: RegisterRequest = await request.json();
    
    // Validate required fields
    if (!body.email || !body.password || !body.name || !body.ageGroup) {
      return errorResponse('Missing required fields', 400);
    }
    
    // In a real app, you would validate the request body and create a user in your database
    const newUser = {
      id: `user-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return successResponse(newUser, 201);
  } catch (error) {
    console.error('Failed to create user:', error);
    return errorResponse(
      'Failed to create user',
      400,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

// Export other HTTP methods as needed
export async function PUT() {
  return new NextResponse('Method not allowed', { status: 405 });
}

export async function DELETE() {
  return new NextResponse('Method not allowed', { status: 405 });
}

export async function PATCH() {
  return new NextResponse('Method not allowed', { status: 405 });
}
