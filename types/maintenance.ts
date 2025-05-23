export interface MaintenanceIssue {
  id: number
  user_id: number
  user?: {
    id: number
    name: string
    email: string
  }
  issue_type: string
  description: string
  device_serial_number?: string | null
  device?: Device | null
  status: "new" | "in_progress" | "resolved" | "closed"
  assigned_to?: number | null
  assignee?: {
    id: number
    name: string
    email: string
  }
  priority: "low" | "medium" | "high" | "urgent"
  comments?: string | null
  created_at: string
  updated_at: string
}

export interface Device {
  id: number
  serial_number: string
  type: string
  model?: string | null
  location?: string | null
  purchase_date?: string | null
  warranty_expiry?: string | null
  status: "active" | "inactive" | "maintenance" | "disposed"
  created_at: string
  updated_at: string
}

export interface CreateMaintenanceRequest {
  issue_type: string
  description: string
  device_serial_number?: string
  priority?: "low" | "medium" | "high" | "urgent"
  user_id?: number // Optional if derived from auth
}

export interface UpdateMaintenanceStatusRequest {
  status: "in_progress" | "resolved" | "closed"
  assigned_to?: number
  comments?: string
}

export interface MaintenanceListResponse {
  issues: MaintenanceIssue[]
  total: number
  page: number
  limit: number
}

export interface MaintenanceResponse {
  issue: MaintenanceIssue
}

export interface DeviceListResponse {
  devices: Device[]
  total: number
  page: number
  limit: number
}

export interface CreateDeviceRequest {
  serial_number: string
  type: string
  model?: string
  location?: string
  purchase_date?: string
  warranty_expiry?: string
}

export interface MaintenanceStatsResponse {
  total_issues: number
  new_issues: number
  in_progress_issues: number
  resolved_issues: number
  avg_resolution_time: number
  issues_by_priority: {
    low: number
    medium: number
    high: number
    urgent: number
  }
}

export type MaintenanceStatus = "new" | "in_progress" | "resolved" | "closed"
export type MaintenancePriority = "low" | "medium" | "high" | "urgent"
export type DeviceStatus = "active" | "inactive" | "maintenance" | "disposed"

export type IssueType =
  | "IT Equipment"
  | "Office Equipment"
  | "HVAC"
  | "Plumbing"
  | "Electrical"
  | "Facilities"
  | "Security"
  | "Other"
