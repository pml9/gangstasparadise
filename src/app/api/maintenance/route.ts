import { type NextRequest, NextResponse } from "next/server"
import { mockMaintenanceIssues, mockDevices } from "@/lib/mock-maintenance"
import type { CreateMaintenanceRequest } from "@/types/maintenance"

export async function GET(request: NextRequest) {
  try {
    // Add delay to see loading state
    await new Promise((resolve) => setTimeout(resolve, 1300))

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const userId = searchParams.get("user_id")

    let filteredIssues = mockMaintenanceIssues

    if (status && status !== "all") {
      filteredIssues = filteredIssues.filter((issue) => issue.status === status)
    }

    if (userId) {
      filteredIssues = filteredIssues.filter((issue) => issue.user_id === Number.parseInt(userId))
    }

    // Sort by created_at descending (newest first)
    filteredIssues.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    return NextResponse.json(filteredIssues)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch maintenance issues" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Add delay to see loading state
    await new Promise((resolve) => setTimeout(resolve, 1600))

    const body: CreateMaintenanceRequest = await request.json()

    // Validate required fields
    if (!body.issue_type || !body.description || !body.device_serial_number) {
      return NextResponse.json(
        {
          error: "Issue type, description, and device are required",
        },
        { status: 400 },
      )
    }

    // Find the device by serial number
    const device = mockDevices.find((d) => d.serial_number === body.device_serial_number) || null

    // Create new issue (mock implementation)
    const newIssue = {
      id: Math.max(...mockMaintenanceIssues.map((r) => r.id)) + 1,
      user_id: 1, // Mock current user
      user: {
        id: 1,
        name: "John Doe",
        email: "john.doe@workhub.com",
      },
      issue_type: body.issue_type,
      description: body.description,
      device_serial_number: body.device_serial_number,
      device: device,
      status: "new" as const,
      assigned_to: null,
      assignee: null,
      priority: "medium" as const, // Default priority
      comments: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Add to mock data (in real app, this would save to database)
    mockMaintenanceIssues.unshift(newIssue)

    return NextResponse.json(newIssue, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create maintenance issue" }, { status: 500 })
  }
}
