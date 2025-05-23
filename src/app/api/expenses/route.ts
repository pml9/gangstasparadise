import { type NextRequest, NextResponse } from "next/server"
import { mockExpenses } from "@/lib/mock-expenses"

export async function GET(request: NextRequest) {
  try {
    // Add delay to see loading state
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const userId = searchParams.get("user_id")

    let filteredExpenses = mockExpenses

    if (status && status !== "all") {
      filteredExpenses = filteredExpenses.filter((exp) => exp.status === status)
    }

    if (userId) {
      filteredExpenses = filteredExpenses.filter((exp) => exp.user_id === Number.parseInt(userId))
    }

    // Sort by created_at descending (newest first)
    filteredExpenses.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    return NextResponse.json(filteredExpenses)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Add delay to see loading state
    await new Promise((resolve) => setTimeout(resolve, 1800))

    const body = await request.json()

    // Validate required fields
    if (!body.amount || !body.category || !body.description) {
      return NextResponse.json({ error: "Amount, category, and description are required" }, { status: 400 })
    }

    // Create new expense (mock implementation)
    const newExpense = {
      id: Math.max(...mockExpenses.map((r) => r.id)) + 1,
      user_id: 1, // Mock current user
      user: {
        id: 1,
        name: "John Doe",
        email: "john.doe@workhub.com",
      },
      amount: body.amount,
      currency: body.currency || "USD",
      category: body.category,
      description: body.description,
      receipt_url: body.receipt_url || "",
      ocr_data: body.ocr_data || null,
      status: "pending" as const,
      manager_comments: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Add to mock data (in real app, this would save to database)
    mockExpenses.unshift(newExpense)

    return NextResponse.json(newExpense, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create expense" }, { status: 500 })
  }
}
