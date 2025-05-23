export interface TravelRequest {
  id: number
  user_id: number
  user?: {
    id: number
    name: string
    email: string
  }
  title: string
  destination: string
  customer_project: string
  luggage_needed: boolean
  preferred_travel_time: string
  departure_date: string // ISO date string
  return_date: string // ISO date string;
  purpose?: string | null
  status: "draft" | "pending" | "approved" | "rejected" | "completed"
  estimated_cost?: number | null
  actual_cost?: number | null
  manager_id?: number | null
  manager?: {
    id: number
    name: string
    email: string
  } | null
  manager_comments?: string | null
  additional_notes?: string | null
  created_at: string
  updated_at: string
}

export interface Manager {
  id: number
  name: string
  email: string
  department?: string
}

export interface CreateTravelRequest {
  title: string
  destination: string
  customer_project: string
  luggage_needed: boolean
  preferred_travel_time: string
  departure_date: string // ISO date string
  return_date: string // ISO date string
  purpose?: string
  estimated_cost?: number
  manager_id: number
  additional_notes?: string
  user_id?: number // Optional if derived from auth
}

export interface UpdateTravelStatusRequest {
  status: "approved" | "rejected" | "completed"
  manager_comments?: string
  actual_cost?: number
}

export interface TravelListResponse {
  requests: TravelRequest[]
  total: number
  page: number
  limit: number
}

export interface TravelResponse {
  request: TravelRequest
}

export interface TravelStatsResponse {
  total_requests: number
  pending_requests: number
  approved_requests: number
  completed_requests: number
  total_estimated_cost: number
  total_actual_cost: number
  upcoming_trips: number
}

export type TravelStatus = "draft" | "pending" | "approved" | "rejected" | "completed"
export type PreferredTravelTime = "morning" | "afternoon" | "evening" | "night" | "flexible"
