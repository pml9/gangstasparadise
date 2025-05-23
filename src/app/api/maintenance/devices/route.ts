import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("user_id")
    const status = searchParams.get("status")

    const where = status ? { status } : {}

    const devices = await prisma.device.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      devices,
      total: devices.length,
    })
  } catch (error) {
    console.error('Error fetching devices:', error)
    return NextResponse.json({ error: "Failed to fetch devices" }, { status: 500 })
  }
}
