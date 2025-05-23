// Central export file for all mock data
// This makes it easy to import mock data in API routes and components

// User data
export * from './users';

// Feature-specific mock data
export * from './sick-leave';
export * from './expenses';
export * from './maintenance';
export * from './travel';
export * from './assets';
export * from './education';

// Dashboard and aggregated data
export * from './dashboard';

// API helpers and testing utilities
export * from './api-helpers';

// Re-export commonly used mock data for convenience
export { mockUsers, getUserById, getUsersByRole } from './users';
export { mockSickLeaveRequests, getSickLeaveStats } from './sick-leave';
export { mockExpenseReports, getExpenseStats, mockOCRProcessing } from './expenses';
export { mockMaintenanceIssues, mockDevices, getMaintenanceStats } from './maintenance';
export { mockTravelRequests, getTravelStats } from './travel';
export { mockAssets, mockAssetBookings, getAssetStats } from './assets';
export { mockEducationActivities, mockEducationEnrollments, getEducationStats } from './education';
export { getDashboardStats, getRecentActivities, getQuickActions, getNotifications } from './dashboard';

// Import mockUsers for use in DEMO_USERS
import { mockUsers } from './users';

// Common utilities for all mock data
export const generateMockId = (): number => {
  return Math.floor(Math.random() * 1000000) + 100;
};

export const getCurrentTimestamp = (): string => {
  return new Date().toISOString();
};

export const formatMockDate = (daysFromNow: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};

export const formatMockDateTime = (hoursFromNow: number): string => {
  const date = new Date();
  date.setHours(date.getHours() + hoursFromNow);
  return date.toISOString();
};

// Mock API response helpers
export const createMockApiResponse = <T>(data: T) => ({
  success: true,
  data,
  timestamp: getCurrentTimestamp()
});

export const createMockApiError = (message: string, code?: string) => ({
  success: false,
  error: message,
  code,
  timestamp: getCurrentTimestamp()
});

export const createMockPaginatedResponse = <T>(
  items: T[],
  page: number = 1,
  limit: number = 10
) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / limit);

  return {
    items: paginatedItems,
    pagination: {
      page,
      limit,
      total: items.length,
      total_pages: totalPages,
      has_next: page < totalPages,
      has_prev: page > 1
    }
  };
};

// Mock validation helpers
export const validateMockEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateMockDateRange = (startDate: string, endDate: string): boolean => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start <= end && start >= new Date();
};

export const validateMockAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 50000; // Reasonable expense limit
};

// Demo user context (for testing API routes) - defined after import
export const DEMO_USERS = {
  EMPLOYEE: mockUsers.find(u => u.role === 'employee' && u.id === 4)!, // Emily Davis
  MANAGER: mockUsers.find(u => u.role === 'manager' && u.id === 1)!, // Sarah Johnson
  ADMIN: mockUsers.find(u => u.role === 'admin' && u.id === 3)! // Alex Rodriguez
};

// Current demo context (can be used to simulate logged-in user)
export const getCurrentDemoUser = () => DEMO_USERS.EMPLOYEE;

// Constants for demo
export const DEMO_CONSTANTS = {
  CURRENT_DATE: '2024-03-14',
  CURRENT_MONTH: '2024-03',
  CURRENT_YEAR: '2024',
  COMPANY_NAME: 'WorkHub Pro',
  COMPANY_EMAIL_DOMAIN: 'workhub.com'
};

// Quick data access helpers - defined after imports
export const getRecentMockData = () => {
  // Import dependencies locally to avoid circular imports
  const { mockSickLeaveRequests } = require('./sick-leave');
  const { mockExpenseReports } = require('./expenses');
  const { mockMaintenanceIssues } = require('./maintenance');
  const { mockTravelRequests } = require('./travel');
  const { mockAssetBookings } = require('./assets');
  const { mockEducationActivities } = require('./education');

  return {
    recentSickLeave: mockSickLeaveRequests.slice(0, 3),
    recentExpenses: mockExpenseReports.slice(0, 3),
    recentMaintenance: mockMaintenanceIssues.slice(0, 3),
    recentTravel: mockTravelRequests.slice(0, 3),
    recentAssetBookings: mockAssetBookings.slice(0, 3),
    recentEducationActivities: mockEducationActivities.slice(0, 3)
  };
};

export const getMockDataByUser = (userId: number) => {
  // Import dependencies locally to avoid circular imports
  const { mockSickLeaveRequests } = require('./sick-leave');
  const { mockExpenseReports } = require('./expenses');
  const { mockMaintenanceIssues } = require('./maintenance');
  const { mockTravelRequests } = require('./travel');
  const { mockAssetBookings } = require('./assets');
  const { mockEducationEnrollments } = require('./education');

  return {
    sickLeave: mockSickLeaveRequests.filter((sl: any) => sl.user_id === userId),
    expenses: mockExpenseReports.filter((exp: any) => exp.user_id === userId),
    maintenance: mockMaintenanceIssues.filter((maint: any) => maint.user_id === userId),
    travel: mockTravelRequests.filter((travel: any) => travel.user_id === userId),
    assetBookings: mockAssetBookings.filter((booking: any) => booking.user_id === userId),
    educationEnrollments: mockEducationEnrollments.filter((enroll: any) => enroll.user_id === userId)
  };
}; 