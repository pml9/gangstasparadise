import { type NextRequest, NextResponse } from "next/server"

// In a real app, this would use a proper OCR service
// For this demo, we'll simulate OCR with a mock implementation
async function processReceiptImage(formData: FormData): Promise<{
  extracted_text: string
  detected_amount: number
  suggested_category: string
  confidence_score: number
  merchant_name: string
  transaction_date: string
}> {
  // Get the file from the form data
  const file = formData.get("file") as File | null

  if (!file) {
    throw new Error("No file provided")
  }

  // Check file type (in a real app, we would be more strict)
  if (!file.type.startsWith("image/")) {
    throw new Error("File must be an image")
  }

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Generate random but realistic data for demo
  const merchants = ["Office Depot", "Amazon", "Adobe", "Uber", "Starbucks", "Delta Airlines", "Hilton Hotels"]
  const categories = ["Office Supplies", "Software", "Transportation", "Meals", "Travel", "Accommodation", "Equipment"]

  const merchant = merchants[Math.floor(Math.random() * merchants.length)]
  const category = categories[Math.floor(Math.random() * categories.length)]
  const amount = Number.parseFloat((Math.random() * 200 + 20).toFixed(2))

  // Generate a date within the last week
  const date = new Date()
  date.setDate(date.getDate() - Math.floor(Math.random() * 7))
  const dateStr = date.toISOString().split("T")[0]

  return {
    extracted_text: `${merchant}\nInvoice/Receipt\nDate: ${dateStr}\nAmount: $${amount.toFixed(2)}\nPayment Method: Credit Card`,
    detected_amount: amount,
    suggested_category: category,
    confidence_score: 0.85 + Math.random() * 0.15, // Between 0.85 and 1.0
    merchant_name: merchant,
    transaction_date: dateStr,
  }
}

export async function POST(request: NextRequest) {
  try {
    // Add delay to see loading state (in addition to the existing processing delay)
    await new Promise((resolve) => setTimeout(resolve, 800))

    // In a real app, we would:
    // 1. Validate the request (auth, file type, size limits)
    // 2. Process the file (send to OCR service)
    // 3. Return the OCR results

    const formData = await request.formData()

    // Process the receipt (in a real app, this would call an OCR service)
    const ocrResult = await processReceiptImage(formData)

    // Return the OCR results
    return NextResponse.json({
      success: true,
      ocr_data: ocrResult,
      message: "Receipt processed successfully",
    })
  } catch (error) {
    console.error("Receipt processing error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process receipt",
      },
      { status: 500 },
    )
  }
}
