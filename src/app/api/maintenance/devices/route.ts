import { type NextRequest, NextResponse } from "next/server"
import { mockDevices } from "@/lib/mock-maintenance"

export async function GET(request: NextRequest) {
  try {
    // Add delay to see loading state
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("user_id")
    const status = searchParams.get("status")

    let filteredDevices = mockDevices

    // In a real app, we would filter devices assigned to the user
    // For demo purposes, we'll just return all devices or filter by status
    if (status) {
      filteredDevices = filteredDevices.filter((device) => device.status === status)
    }

    // If user_id is provided, we'd filter by user assignment
    // For demo, we'll just return all devices since we don't have user assignments in the mock data

    return NextResponse.json({
      devices: filteredDevices,
      total: filteredDevices.length,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch devices" }, { status: 500 })
  }
}
