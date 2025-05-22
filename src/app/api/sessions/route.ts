import { mockSessions } from '@/mocks/session';
import { successResponse, errorResponse } from '@/lib/api/response';
import { CreateSessionRequest } from '@/types/api';
import { NextResponse } from 'next/server';
import { delay } from '@/lib/delay';

export async function GET() {
  try {
    await delay(600); // Add realistic network delay
    // In a real app, you would fetch sessions from your database
    // with proper filtering and pagination
    return successResponse(mockSessions);
  } catch (error) {
    console.error('Failed to fetch sessions:', error);
    return errorResponse(
      'Failed to fetch sessions',
      500,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

export async function POST(request: Request) {
  try {
    await delay(800); // Add realistic network delay
    const body: CreateSessionRequest = await request.json();
    
    // Validate required fields
    if (!body.skillId || !body.title || !body.startTime || !body.endTime || !body.format) {
      return errorResponse('Missing required fields', 400);
    }
    
    // In a real app, you would validate the request body and create a session in your database
    const newSession = {
      id: `session-${Date.now()}`,
      ...body,
      status: 'SCHEDULED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return successResponse(newSession, 201);
  } catch (error) {
    console.error('Failed to create session:', error);
    return errorResponse(
      'Failed to create session',
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
