import { mockSkills } from '@/mocks/skill';
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api/response';
import { NextResponse } from 'next/server';
import { delay } from '@/lib/delay';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await delay(500); // Add realistic network delay
    const skill = mockSkills.find(s => s.id === params.id);
    
    if (!skill) {
      return notFoundResponse('Skill not found');
    }
    
    return successResponse(skill);
  } catch (error) {
    console.error('Failed to fetch skill:', error);
    return errorResponse(
      'Failed to fetch skill',
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
    const skillIndex = mockSkills.findIndex(s => s.id === params.id);
    
    if (skillIndex === -1) {
      return notFoundResponse('Skill not found');
    }
    
    // Validate required fields
    if (!body.name || !body.description || !body.categoryId || !body.sessionFormat) {
      return errorResponse('Missing required fields', 400);
    }
    
    // In a real app, you would update the skill in your database
    const updatedSkill = {
      ...mockSkills[skillIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    return successResponse(updatedSkill);
  } catch (error) {
    console.error('Failed to update skill:', error);
    return errorResponse(
      'Failed to update skill',
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
    const skillIndex = mockSkills.findIndex(s => s.id === params.id);
    
    if (skillIndex === -1) {
      return notFoundResponse('Skill not found');
    }
    
    // In a real app, you would delete the skill from your database
    return successResponse({ success: true });
  } catch (error) {
    console.error('Failed to delete skill:', error);
    return errorResponse(
      'Failed to delete skill',
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
