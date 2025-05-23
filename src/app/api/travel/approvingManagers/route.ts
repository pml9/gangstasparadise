import { type NextRequest, NextResponse } from "next/server"
import { mockManagers } from "@/lib/mock-travel"

export async function GET(request: NextRequest) {
  try {
    // Add delay to see loading state
    await new Promise((resolve) => setTimeout(resolve, 800))

    // In a real app, we would filter managers based on permissions
    // For demo purposes, we'll just return all managers

    return NextResponse.json(mockManagers)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch approving managers" }, { status: 500 })
  }
}
