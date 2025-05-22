import { mockSkills } from '@/mocks/skill';
import { successResponse, errorResponse } from '@/lib/api/response';
import { CreateSkillRequest } from '@/types/api';
import { NextResponse } from 'next/server';
import { delay } from '@/lib/delay';

export async function GET() {
  try {
    await delay(500); // Add realistic network delay
    // In a real app, you would fetch skills from your database
    // with proper filtering and pagination
    return successResponse(mockSkills);
  } catch (error) {
    console.error('Failed to fetch skills:', error);
    return errorResponse(
      'Failed to fetch skills',
      500,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

export async function POST(request: Request) {
  try {
    await delay(800); // Add realistic network delay
    const body: CreateSkillRequest = await request.json();
    
    // Validate required fields
    if (!body.name || !body.description || !body.categoryId || !body.sessionFormat) {
      return errorResponse('Missing required fields', 400);
    }
    
    // In a real app, you would validate the request body and create a skill in your database
    const newSkill = {
      id: `skill-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return successResponse(newSkill, 201);
  } catch (error) {
    console.error('Failed to create skill:', error);
    return errorResponse(
      'Failed to create skill',
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
