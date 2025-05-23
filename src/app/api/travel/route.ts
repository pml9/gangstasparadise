import { type NextRequest, NextResponse } from "next/server"
import { mockTravelRequests } from "@/lib/mock-travel"
import type { CreateTravelRequest } from "@/types/travel"

export async function GET(request: NextRequest) {
  try {
    // Add delay to see loading state
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const userId = searchParams.get("user_id")

    let filteredRequests = mockTravelRequests

    if (status && status !== "all") {
      filteredRequests = filteredRequests.filter((req) => req.status === status)
    }

    if (userId) {
      filteredRequests = filteredRequests.filter((req) => req.user_id === Number.parseInt(userId))
    }

    // Sort by departure_date descending (soonest first)
    filteredRequests.sort((a, b) => new Date(a.departure_date).getTime() - new Date(b.departure_date).getTime())

    return NextResponse.json(filteredRequests)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch travel requests" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Add delay to see loading state
    await new Promise((resolve) => setTimeout(resolve, 1800))

    const body: CreateTravelRequest = await request.json()

    // Validate required fields
    if (
      !body.title ||
      !body.destination ||
      !body.customer_project ||
      !body.departure_date ||
      !body.return_date ||
      !body.manager_id
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new travel request (mock implementation)
    const newRequest = {
      id: Math.max(...mockTravelRequests.map((r) => r.id)) + 1,
      user_id: 1, // Mock current user
      user: {
        id: 1,
        name: "John Doe",
        email: "john.doe@workhub.com",
      },
      title: body.title,
      destination: body.destination,
      customer_project: body.customer_project,
      luggage_needed: body.luggage_needed,
      preferred_travel_time: body.preferred_travel_time,
      departure_date: body.departure_date,
      return_date: body.return_date,
      purpose: body.purpose || null,
      status: "pending" as const,
      estimated_cost: body.estimated_cost || null,
      actual_cost: null,
      manager_id: body.manager_id,
      manager: null, // Would be populated from database in real implementation
      manager_comments: null,
      additional_notes: body.additional_notes || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Add to mock data (in real app, this would save to database)
    mockTravelRequests.unshift(newRequest)

    return NextResponse.json(newRequest, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create travel request" }, { status: 500 })
  }
}
