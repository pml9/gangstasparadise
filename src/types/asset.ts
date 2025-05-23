// Asset Booking types based on the database schema and API requirements

export interface Asset {
  id: number;
  name: string;
  type: string;
  description?: string | null;
  location?: string | null;
  available: boolean;
  image_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AssetBooking {
  id: number;
  user_id: number;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  asset_id: number;
  asset?: Asset;
  start_date: string; // ISO date string
  end_date: string; // ISO date string
  status: 'active' | 'completed' | 'cancelled';
  purpose?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateAssetBookingRequest {
  asset_id: number;
  start_date: string; // ISO date string
  end_date: string; // ISO date string
  purpose?: string;
  user_id?: number; // Optional if derived from auth
}

export interface UpdateAssetBookingRequest {
  status: 'completed' | 'cancelled';
  end_date?: string; // Allow early return
}

export interface AssetListResponse {
  assets: Asset[];
  total: number;
  page: number;
  limit: number;
}

export interface AssetBookingListResponse {
  bookings: AssetBooking[];
  total: number;
  page: number;
  limit: number;
}

export interface AssetResponse {
  asset: Asset;
}

export interface AssetBookingResponse {
  booking: AssetBooking;
}

export interface CreateAssetRequest {
  name: string;
  type: string;
  description?: string;
  location?: string;
  image_url?: string;
}

export interface AssetAvailabilityResponse {
  asset_id: number;
  available: boolean;
  next_available_date?: string;
  conflicting_bookings: AssetBooking[];
}

export interface AssetStatsResponse {
  total_assets: number;
  available_assets: number;
  active_bookings: number;
  most_popular_assets: Array<{
    asset: Asset;
    booking_count: number;
  }>;
}

export type AssetBookingStatus = 'active' | 'completed' | 'cancelled';

export type AssetType = 
  | 'Vehicle'
  | 'Equipment'
  | 'Room'
  | 'Technology'
  | 'Furniture'
  | 'Other'; 