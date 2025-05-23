import { type NextRequest, NextResponse } from "next/server"
import { mockSickLeaveRequests } from "@/lib/mock-data"
import type { CreateSickLeaveRequest } from "@/types/sick-leave"

export async function GET(request: NextRequest) {
  try {
    // Add delay to see loading state
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const userId = searchParams.get("user_id")

    let filteredRequests = mockSickLeaveRequests

    if (status && status !== "all") {
      filteredRequests = filteredRequests.filter((req) => req.status === status)
    }

    if (userId) {
      filteredRequests = filteredRequests.filter((req) => req.user_id === Number.parseInt(userId))
    }

    // Sort by created_at descending (newest first)
    filteredRequests.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    return NextResponse.json(filteredRequests)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sick leave requests" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Add delay to see loading state
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const body: CreateSickLeaveRequest = await request.json()

    // Validate required fields
    if (!body.start_date || !body.end_date) {
      return NextResponse.json({ error: "Start date and end date are required" }, { status: 400 })
    }

    // Validate future dates
    const startDate = new Date(body.start_date)
    const endDate = new Date(body.end_date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (startDate < today) {
      return NextResponse.json({ error: "Start date must be in the future" }, { status: 400 })
    }

    if (endDate < startDate) {
      return NextResponse.json({ error: "End date must be after start date" }, { status: 400 })
    }

    // Create new request (mock implementation)
    const newRequest = {
      id: Math.max(...mockSickLeaveRequests.map((r) => r.id)) + 1,
      user_id: 1, // Mock current user
      user: {
        id: 1,
        name: "John Doe",
        email: "john.doe@workhub.com",
      },
      start_date: body.start_date,
      end_date: body.end_date,
      status: "pending" as const,
      manager_comments: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Add to mock data (in real app, this would save to database)
    mockSickLeaveRequests.unshift(newRequest)

    return NextResponse.json(newRequest, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create sick leave request" }, { status: 500 })
  }
}
