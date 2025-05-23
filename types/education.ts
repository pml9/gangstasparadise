export interface EducationActivity {
  id: number
  title: string
  description: string
  type: "training" | "workshop" | "seminar" | "social" | "team_building"
  instructor?: string | null
  location: string
  start_date: string // ISO datetime string
  end_date: string // ISO datetime string
  capacity: number
  enrolled_count: number
  cost_per_person?: number | null
  status: "draft" | "open" | "closed" | "cancelled" | "completed"
  organizer_id: number
  organizer?: {
    id: number
    name: string
    email: string
  }
  image_url?: string | null
  created_at: string
  updated_at: string
}

export interface EducationEnrollment {
  id: number
  user_id: number
  user?: {
    id: number
    name: string
    email: string
  }
  activity_id: number
  activity?: EducationActivity
  status: "enrolled" | "waitlisted" | "attended" | "cancelled"
  enrollment_date: string
  attendance_status?: "attended" | "missed" | "partial" | null
  completion_certificate?: string | null
  feedback_rating?: number | null
  feedback_comments?: string | null
  created_at: string
  updated_at: string
}

export interface CreateEducationActivityRequest {
  title: string
  description: string
  type: "training" | "workshop" | "seminar" | "social" | "team_building"
  instructor?: string
  location: string
  start_date: string // ISO datetime string
  end_date: string // ISO datetime string
  capacity: number
  cost_per_person?: number
  organizer_id?: number // Optional if derived from auth
  image_url?: string
}

export interface EnrollInActivityRequest {
  activity_id: number
  user_id?: number // Optional if derived from auth
}

export interface UpdateEnrollmentStatusRequest {
  status: "attended" | "cancelled"
  attendance_status?: "attended" | "missed" | "partial"
  feedback_rating?: number
  feedback_comments?: string
}

export interface EducationActivityListResponse {
  activities: EducationActivity[]
  total: number
  page: number
  limit: number
}

export interface EducationEnrollmentListResponse {
  enrollments: EducationEnrollment[]
  total: number
  page: number
  limit: number
}

export interface EducationActivityResponse {
  activity: EducationActivity
}

export interface EducationEnrollmentResponse {
  enrollment: EducationEnrollment
}

export interface EducationStatsResponse {
  total_activities: number
  upcoming_activities: number
  my_enrollments: number
  completion_rate: number
  popular_activities: Array<{
    activity: EducationActivity
    enrollment_count: number
  }>
  learning_hours_completed: number
}

export type EducationActivityType = "training" | "workshop" | "seminar" | "social" | "team_building"
export type EducationActivityStatus = "draft" | "open" | "closed" | "cancelled" | "completed"
export type EnrollmentStatus = "enrolled" | "waitlisted" | "attended" | "cancelled"
export type AttendanceStatus = "attended" | "missed" | "partial"
