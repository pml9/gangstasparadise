// Central export file for all application types

// User types
export * from './user';

// Feature-specific types
export * from './sick-leave';
export * from './expense';
export * from './maintenance';
export * from './travel';
export * from './asset';
export * from './education';

// API and common types
export * from './api';

// Re-export commonly used types for convenience
export type {
  User,
  UserRole,
} from './user';

export type {
  SickLeaveRequest,
  SickLeaveStatus,
} from './sick-leave';

export type {
  ExpenseReport,
  ExpenseStatus,
  ExpenseCategory,
  OCRData,
} from './expense';

export type {
  MaintenanceIssue,
  MaintenanceStatus,
  MaintenancePriority,
  Device,
  IssueType,
} from './maintenance';

export type {
  TravelRequest,
  TravelStatus,
} from './travel';

export type {
  Asset,
  AssetBooking,
  AssetBookingStatus,
  AssetType,
} from './asset';

export type {
  EducationActivity,
  EducationActivityType,
  EducationEnrollment,
  EnrollmentStatus,
} from './education';

export type {
  ApiResponse,
  ApiError,
  ApiSuccess,
  PaginatedResponse,
  DashboardStats,
  NotificationType,
} from './api';

// Convenience aliases for common types
export type { SickLeaveRequest as SickLeave } from './sick-leave';
export type { ExpenseReport as Expense } from './expense';
export type { MaintenanceIssue as Maintenance } from './maintenance';
export type { TravelRequest as Travel } from './travel';
export type { AssetBooking as Booking } from './asset';
export type { EducationActivity as Activity } from './education'; 