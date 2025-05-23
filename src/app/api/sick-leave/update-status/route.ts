import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/utils/supabase/server-helpers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.requestId || !body.status) {
      return NextResponse.json(
        { error: 'Request ID and status are required' },
        { status: 400 }
      );
    }

    // Validate status
    if (!['approved', 'rejected', 'pending'].includes(body.status)) {
      return NextResponse.json(
        { error: 'Status must be approved, rejected, or pending' },
        { status: 400 }
      );
    }

    // Get Supabase client with manager user for proper permissions
    const { supabase } = getSupabaseServerClient('manager');

    // Update request data
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
        { error: 'Failed to update sick leave request' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Sick leave request not found' },
        { status: 404 }
      );
    }

    // Return the updated request
    return NextResponse.json({
      message: `Sick leave request ${body.status} successfully`,
      data,
    });
  } catch (error) {
    console.error('Exception in update sick leave status:', error);
    return NextResponse.json(
      { error: 'Failed to update sick leave request' },
      { status: 500 }
    );
  }
}
