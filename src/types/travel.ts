// Corporate Travel types based on the database schema and API requirements

export interface TravelRequest {
  id: number;
  user_id: number;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  destination: string;
  departure_date: string; // ISO date string
  return_date: string; // ISO date string
  purpose?: string | null;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'completed';
  estimated_cost?: number | null;
  actual_cost?: number | null;
  manager_comments?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateTravelRequest {
  destination: string;
  departure_date: string; // ISO date string
  return_date: string; // ISO date string
  purpose?: string;
  estimated_cost?: number;
  user_id?: number; // Optional if derived from auth
}

export interface UpdateTravelStatusRequest {
  status: 'approved' | 'rejected' | 'completed';
  manager_comments?: string;
  actual_cost?: number;
}

export interface TravelListResponse {
  requests: TravelRequest[];
  total: number;
  page: number;
  limit: number;
}

export interface TravelResponse {
  request: TravelRequest;
}

export interface TravelStatsResponse {
  total_requests: number;
  pending_requests: number;
  approved_requests: number;
  completed_requests: number;
  total_estimated_cost: number;
  total_actual_cost: number;
  upcoming_trips: number;
}

export type TravelStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'completed'; 