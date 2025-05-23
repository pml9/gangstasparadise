export interface ExpenseReport {
  id: number
  user_id: number
  user?: {
    id: number
    name: string
    email: string
  }
  amount: number
  currency: string
  category: string
  description?: string | null
  receipt_url?: string | null
  ocr_data?: OCRData | null
  status: "pending" | "approved" | "rejected"
  manager_comments?: string | null
  created_at: string
  updated_at: string
}

export interface OCRData {
  extracted_text: string
  detected_amount?: number
  suggested_category?: string
  confidence_score?: number
  merchant_name?: string
  transaction_date?: string
}

export interface CreateExpenseRequest {
  amount: number
  currency?: string
  category: string
  description?: string
  user_id?: number // Optional if derived from auth
}

export interface UploadReceiptRequest {
  expense_id: number
  receipt_file: File
}

export interface UploadReceiptResponse {
  receipt_url: string
  ocr_data: OCRData
}

export interface UpdateExpenseStatusRequest {
  status: "approved" | "rejected"
  manager_comments?: string
}

export interface ExpenseListResponse {
  expenses: ExpenseReport[]
  total: number
  page: number
  limit: number
}

export interface ExpenseResponse {
  expense: ExpenseReport
}

export interface ExpenseStatsResponse {
  total_expenses: number
  pending_expenses: number
  approved_expenses: number
  rejected_expenses: number
  total_amount_pending: number
  total_amount_approved: number
  monthly_total: number
}

export type ExpenseStatus = "pending" | "approved" | "rejected"

export type ExpenseCategory =
  | "Travel"
  | "Meals"
  | "Office Supplies"
  | "Equipment"
  | "Software"
  | "Training"
  | "Entertainment"
  | "Accommodation"
  | "Transportation"
  | "Other"
