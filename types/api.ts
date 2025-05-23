export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  timestamp: string
}

export interface ApiError {
  success: false
  error: string
  message?: string
  code?: string
  details?: Record<string, any>
  timestamp: string
}

export interface ApiSuccess<T = any> {
  success: true
  data: T
  message?: string
  timestamp: string
}

export interface PaginationParams {
  page?: number
  limit?: number
  sort_by?: string
  sort_order?: "asc" | "desc"
}

export interface PaginatedResponse<T = any> {
  items: T[]
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
    has_next: boolean
    has_prev: boolean
  }
}

export interface FilterParams {
  status?: string
  date_from?: string
  date_to?: string
  user_id?: number
  category?: string
  type?: string
  search?: string
}

export interface ValidationError {
  field: string
  message: string
  code: string
}

export interface ApiValidationError extends ApiError {
  details: {
    validation_errors: ValidationError[]
  }
}

// HTTP Status Codes as constants
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const

// Common API endpoints structure
export interface ApiEndpoints {
  users: string
  "sick-leave": string
  expenses: string
  maintenance: string
  travel: string
  assets: string
  education: string
}

export const API_ENDPOINTS: ApiEndpoints = {
  users: "/api/users",
  "sick-leave": "/api/sick-leave",
  expenses: "/api/expenses",
  maintenance: "/api/maintenance",
  travel: "/api/travel",
  assets: "/api/assets",
  education: "/api/education",
} as const

// File upload types
export interface FileUploadRequest {
  file: File
  type: "receipt" | "avatar" | "document" | "image"
  max_size?: number
  allowed_types?: string[]
}

export interface FileUploadResponse {
  url: string
  filename: string
  size: number
  type: string
  uploaded_at: string
}

// Dashboard statistics aggregation
export interface DashboardStats {
  sick_leave: {
    pending: number
    approved: number
    rejected: number
  }
  expenses: {
    pending: number
    approved: number
    total_amount: number
  }
  maintenance: {
    new: number
    in_progress: number
    resolved: number
  }
  travel: {
    upcoming: number
    pending_approval: number
  }
  assets: {
    my_bookings: number
    available_assets: number
  }
  education: {
    my_enrollments: number
    upcoming_activities: number
  }
}

// WebSocket event types for real-time updates
export interface WebSocketEvent<T = any> {
  type: string
  payload: T
  user_id?: number
  timestamp: string
}

export type NotificationType =
  | "sick_leave_approved"
  | "sick_leave_rejected"
  | "expense_approved"
  | "expense_rejected"
  | "maintenance_assigned"
  | "maintenance_resolved"
  | "travel_approved"
  | "asset_booking_confirmed"
  | "education_enrollment_confirmed"

export interface NotificationEvent extends WebSocketEvent {
  type: NotificationType
  payload: {
    title: string
    message: string
    action_url?: string
    data?: Record<string, any>
  }
}
