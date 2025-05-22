import { mockSessions } from '@/mocks/session';
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api/response';
import { NextResponse } from 'next/server';
import { delay } from '@/lib/delay';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await delay(500); // Add realistic network delay
    const session = mockSessions.find(s => s.id === context.params.id);
    
    if (!session) {
      return notFoundResponse('Session not found');
    }
    
    return successResponse(session);
  } catch (error) {
    console.error('Failed to fetch session:', error, request);
    return errorResponse(
      'Failed to fetch session',
      500,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await delay(800); // Add realistic network delay
    const body = await request.json();
    const sessionIndex = mockSessions.findIndex(s => s.id === context.params.id);
    
    if (sessionIndex === -1) {
      return notFoundResponse('Session not found');
    }
    
    // Validate required fields
    if (!body.title || !body.startTime || !body.endTime || !body.format) {
      return errorResponse('Missing required fields', 400);
    }
    
    // In a real app, you would update the session in your database
    const updatedSession = {
      ...mockSessions[sessionIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    return successResponse(updatedSession);
  } catch (error) {
    console.error('Failed to update session:', error);
    return errorResponse(
      'Failed to update session',
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
    const sessionIndex = mockSessions.findIndex(s => s.id === params.id);
    
    if (sessionIndex === -1) {
      return notFoundResponse('Session not found');
    }
    
    // In a real app, you would delete the session from your database
    return successResponse({ success: true });
  } catch (error) {
    console.error('Failed to delete session:', error);
    return errorResponse(
      'Failed to delete session',
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
