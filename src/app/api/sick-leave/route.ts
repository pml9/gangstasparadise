import { type NextRequest, NextResponse } from 'next/server';
import type {
  SickLeaveRequest,
  CreateSickLeaveRequest,
} from '@/types/sick-leave';
import { getSupabaseServerClient } from '@/utils/supabase/server-helpers';

// N8N webhook URL for sick leave approval process
const N8N_WEBHOOK_URL =
  'https://hack9.app.n8n.cloud/webhook-test/b67f847e-562d-4b28-9c1b-b9d5a38a1012';

export async function GET(request: NextRequest) {
  try {
    // Add delay to see loading state
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const userId = searchParams.get('user_id');

    // Get Supabase client with current user (employee by default)
    const { supabase } = getSupabaseServerClient();

    // Start query builder
    let query = supabase.from('sick_leave_requests').select(`
        *,
        user:users(id, name, email)
      `);

    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (userId) {
      query = query.eq('user_id', userId);
    }

    // Execute query and sort by created_at descending
    const { data: sickLeaveRequests, error: queryError } = await query.order(
      'created_at',
      { ascending: false }
    );

    if (queryError) {
      console.error('Error fetching sick leave requests:', queryError);
      return NextResponse.json(
        { error: 'Failed to fetch sick leave requests' },
        { status: 500 }
      );
    }

    return NextResponse.json(sickLeaveRequests as SickLeaveRequest[]);
  } catch (error) {
    console.error('Exception in GET sick leave requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sick leave requests' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Add delay to see loading state
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const body: CreateSickLeaveRequest = await request.json();

    // Validate required fields
    if (!body.start_date || !body.end_date) {
      return NextResponse.json(
        { error: 'Start date and end date are required' },
        { status: 400 }
      );
    }

    // Validate future dates
    const startDate = new Date(body.start_date);
    const endDate = new Date(body.end_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      return NextResponse.json(
        { error: 'Start date must be in the future' },
        { status: 400 }
      );
    }

    if (endDate < startDate) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    // Get Supabase client with the current user
    const { supabase, currentUser } = getSupabaseServerClient('employee');

    // Insert new sick leave request
    const { data: newRequest, error: insertError } = await supabase
      .from('sick_leave_requests')
      .insert({
        user_id: body.user_id ?? currentUser.id, // Use provided user_id or current user
        start_date: body.start_date,
        end_date: body.end_date,
        status: 'pending',
      })
      .select(
        `
        *,
        user:users(id, name, email)
      `
      )
      .single();

    if (insertError) {
      console.error('Error creating sick leave request:', insertError);
      return NextResponse.json(
        { error: 'Failed to create sick leave request' },
        { status: 500 }
      );
    }

    // Calculate duration in days
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // Send webhook to n8n for approval workflow
    try {
      const requestData = {
        requestId: newRequest.id,
        employeeId: newRequest.user_id,
        employeeName: newRequest.user.name,
        employeeEmail: newRequest.user.email,
        startDate: newRequest.start_date,
        endDate: newRequest.end_date,
        duration: diffDays,
        status: newRequest.status,
        createdAt: newRequest.created_at,
        apiEndpoint: `${request.headers.get('host')}/api/sick-leave`,
      };

      const webhookResponse = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!webhookResponse.ok) {
        console.warn(
          'Failed to send data to n8n webhook, but request was created:',
          await webhookResponse.text()
        );
      } else {
        console.log('Successfully sent sick leave request to n8n workflow');
      }
    } catch (webhookError) {
      // Log but don't fail the request if webhook fails
      console.error('Error sending to n8n webhook:', webhookError);
    }

    return NextResponse.json(newRequest as SickLeaveRequest, { status: 201 });
  } catch (error) {
    console.error('Exception in POST sick leave request:', error);
    return NextResponse.json(
      { error: 'Failed to create sick leave request' },
      { status: 500 }
    );
  }
}
