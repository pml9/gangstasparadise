export interface SickLeaveRequest {
  id: number
  user_id: number
  user?: {
    id: number
    name: string
    email: string
  }
  start_date: string // ISO date string
  end_date: string // ISO date string
  status: "pending" | "approved" | "rejected"
  manager_comments?: string | null
  created_at: string
  updated_at: string
}

export interface CreateSickLeaveRequest {
  start_date: string // ISO date string
  end_date: string // ISO date string
  user_id?: number // Optional if derived from auth
}

export interface UpdateSickLeaveStatusRequest {
  status: "approved" | "rejected"
  manager_comments?: string
}

export interface SickLeaveListResponse {
  requests: SickLeaveRequest[]
  total: number
  page: number
  limit: number
}

export interface SickLeaveResponse {
  request: SickLeaveRequest
}

export interface SickLeaveStatsResponse {
  total_requests: number
  pending_requests: number
  approved_requests: number
  rejected_requests: number
  days_taken_this_year: number
}

export type SickLeaveStatus = "pending" | "approved" | "rejected"
