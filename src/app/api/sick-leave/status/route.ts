import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/utils/supabase/server-helpers';

/**
 * API route to update sick leave request status
 *
 * Expected POST body:
 * {
 *   "requestId": 123,             // required - the ID of the sick leave request
 *   "status": "approved",         // required - must be "approved", "rejected", or "pending"
 *   "comments": "Optional comments from manager"  // optional
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.requestId) {
      return NextResponse.json(
        { success: false, error: 'Request ID is required' },
        { status: 400 }
      );
    }

    if (!body.status) {
      return NextResponse.json(
        { success: false, error: 'Status is required' },
        { status: 400 }
      );
    }

    // Validate status
    if (!['approved', 'rejected', 'pending'].includes(body.status)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Status must be approved, rejected, or pending',
        },
        { status: 400 }
      );
    }

    // Get Supabase client with manager role for proper permissions
    const { supabase } = getSupabaseServerClient('manager');

    // Create update data object
    const updateData: {
      status: string;
      updated_at: string;
      manager_comments?: string;
    } = {
      status: body.status,
      updated_at: new Date().toISOString(),
    };

    // Add manager comments if provided
    if (body.comments) {
      updateData.manager_comments = body.comments;
    }

    // Update the sick leave request
    const { data, error } = await supabase
      .from('sick_leave_requests')
      .update(updateData)
      .eq('id', body.requestId)
      .select(
        `
        *,
        user:users(id, name, email)
      `
      )
      .single();

    if (error) {
      console.error('Error updating sick leave request:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update sick leave request' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Sick leave request not found' },
        { status: 404 }
      );
    }

    // Return success response with updated request data
    return NextResponse.json({
      success: true,
      message: `Sick leave request ${body.status} successfully`,
      data,
    });
  } catch (error) {
    console.error('Exception in update sick leave status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update sick leave request' },
      { status: 500 }
    );
  }
}
