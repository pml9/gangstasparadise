import { mockCurrentUser } from '@/mocks/auth';
import { mockOtherUsers } from '@/mocks/user';
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api/response';
import { NextResponse } from 'next/server';
import { delay } from '@/lib/delay';

const allUsers = [mockCurrentUser, ...Object.values(mockOtherUsers)];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await delay(500); // Add realistic network delay
    const user = allUsers.find(u => u.id === params.id);
    
    if (!user) {
      return notFoundResponse('User not found');
    }
    
    // In a real app, you would fetch the user from your database
    // and exclude sensitive information like password hashes
    const { password, ...userWithoutPassword } = user;
    
    return successResponse(userWithoutPassword);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return errorResponse(
      'Failed to fetch user',
      500,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await delay(800); // Add realistic network delay
    const body = await request.json();
    const userIndex = allUsers.findIndex(u => u.id === params.id);
    
    if (userIndex === -1) {
      return notFoundResponse('User not found');
    }
    
    // Validate required fields
    if (!body.name || !body.email || !body.ageGroup) {
      return errorResponse('Missing required fields', 400);
    }
    
    // In a real app, you would validate and update the user in your database
    const updatedUser = {
      ...allUsers[userIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    // Remove password from the response
    const { password, ...userWithoutPassword } = updatedUser;
    
    return successResponse(userWithoutPassword);
  } catch (error) {
    console.error('Failed to update user:', error);
    return errorResponse(
      'Failed to update user',
      400,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await delay(700); // Add realistic network delay
    const userIndex = allUsers.findIndex(u => u.id === params.id);
    
    if (userIndex === -1) {
      return notFoundResponse('User not found');
    }
    
    // In a real app, you would soft delete the user or mark them as inactive
    return successResponse({ success: true });
  } catch (error) {
    console.error('Failed to delete user:', error);
    return errorResponse(
      'Failed to delete user',
      400,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

// Export other HTTP methods as needed
export async function POST() {
  return new NextResponse('Method not allowed', { status: 405 });
}

export async function PATCH() {
  return new NextResponse('Method not allowed', { status: 405 });
}
