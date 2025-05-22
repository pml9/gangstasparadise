import { successResponse, errorResponse } from '@/lib/api/response';
import { mockDashboardStats } from '@/mocks/dashboard';
import { NextResponse } from 'next/server';
import { delay } from '@/lib/delay';

export async function GET() {
  console.log('Dashboard GET request received');
  try {
    await delay(500); // Add realistic network delay
    // Use the mock dashboard data
    const response = mockDashboardStats;
    
    return successResponse(response);
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    return errorResponse(
      'Failed to fetch dashboard data',
      500,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

// Export other HTTP methods as needed
export async function POST() {
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
