// API Testing Helpers for WorkHub Pro
// Provides mock response generators and testing utilities for all features

import { 
  ApiResponse, 
  ApiError, 
  PaginatedResponse,
  SickLeaveRequest,
  ExpenseReport,
  MaintenanceIssue,
  TravelRequest,
  Asset,
  AssetBooking,
  EducationActivity,
  EducationEnrollment
} from '../src/types';

import {
  mockSickLeaveRequests,
  mockExpenseReports,
  mockMaintenanceIssues,
  mockTravelRequests,
  mockAssets,
  mockAssetBookings,
  mockEducationActivities,
  mockEducationEnrollments,
  mockUsers
} from './index';

// Generic API response generators
export const createSuccessResponse = <T>(data: T, message?: string): ApiResponse<T> => ({
  success: true,
  data,
  message,
  timestamp: new Date().toISOString()
});

export const createErrorResponse = (message: string, code?: string, statusCode: number = 400): ApiError => ({
  success: false,
  error: message,
  code,
  statusCode,
  timestamp: new Date().toISOString()
});

export const createPaginatedResponse = <T>(
  items: T[],
  page: number = 1,
  limit: number = 10,
  total?: number
): PaginatedResponse<T> => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);
  const totalItems = total ?? items.length;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    items: paginatedItems,
    pagination: {
      page,
      limit,
      total: totalItems,
      total_pages: totalPages,
      has_next: page < totalPages,
      has_prev: page > 1
    }
  };
};

// Feature-specific API helpers

// Sick Leave API Helpers
export const getSickLeaveApiResponse = (userId?: number, status?: string) => {
  let requests = mockSickLeaveRequests;
  
  if (userId) requests = requests.filter(r => r.user_id === userId);
  if (status) requests = requests.filter(r => r.status === status);
  
  return createSuccessResponse(requests);
};

export const createSickLeaveRequest = (requestData: Partial<SickLeaveRequest>) => {
  const newRequest: SickLeaveRequest = {
    id: Math.floor(Math.random() * 1000) + 100,
    user_id: requestData.user_id || 4,
    user: mockUsers.find(u => u.id === requestData.user_id) || mockUsers[3],
    start_date: requestData.start_date || new Date().toISOString().split('T')[0],
    end_date: requestData.end_date || new Date().toISOString().split('T')[0],
    status: 'pending',
    manager_comments: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  return createSuccessResponse(newRequest, 'Sick leave request created successfully');
};

// Expense API Helpers
export const getExpensesApiResponse = (userId?: number, status?: string) => {
  let expenses = mockExpenseReports;
  
  if (userId) expenses = expenses.filter(e => e.user_id === userId);
  if (status) expenses = expenses.filter(e => e.status === status);
  
  return createSuccessResponse(expenses);
};

export const createExpenseReport = (expenseData: Partial<ExpenseReport>) => {
  const newExpense: ExpenseReport = {
    id: Math.floor(Math.random() * 1000) + 100,
    user_id: expenseData.user_id || 4,
    user: mockUsers.find(u => u.id === expenseData.user_id) || mockUsers[3],
    amount: expenseData.amount || 0,
    currency: 'USD',
    category: expenseData.category || 'Other',
    description: expenseData.description || 'No description provided',
    receipt_url: expenseData.receipt_url || null,
    ocr_data: expenseData.ocr_data || null,
    status: 'pending',
    manager_comments: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  return createSuccessResponse(newExpense, 'Expense report created successfully');
};

// OCR Processing Mock
export const processReceiptOCR = (imageUrl: string) => {
  // Simulate OCR processing delay
  const ocrResults = [
    {
      extracted_text: 'COFFEE SHOP\n123 Main St\nLatte $4.50\nTax $0.36\nTotal: $4.86',
      detected_amount: 4.86,
      suggested_category: 'Meals',
      confidence_score: 0.92,
      merchant_name: 'COFFEE SHOP',
      transaction_date: new Date().toISOString().split('T')[0]
    },
    {
      extracted_text: 'TECH STORE\nWireless Mouse $25.99\nTax $2.08\nTotal: $28.07',
      detected_amount: 28.07,
      suggested_category: 'Office Supplies',
      confidence_score: 0.89,
      merchant_name: 'TECH STORE',
      transaction_date: new Date().toISOString().split('T')[0]
    }
  ];
  
  const result = ocrResults[Math.floor(Math.random() * ocrResults.length)];
  return createSuccessResponse(result, 'OCR processing completed');
};

// Maintenance API Helpers
export const getMaintenanceApiResponse = (userId?: number, status?: string) => {
  let issues = mockMaintenanceIssues;
  
  if (userId) issues = issues.filter(i => i.user_id === userId);
  if (status) issues = issues.filter(i => i.status === status);
  
  return createSuccessResponse(issues);
};

export const createMaintenanceIssue = (issueData: Partial<MaintenanceIssue>) => {
  const newIssue: MaintenanceIssue = {
    id: Math.floor(Math.random() * 1000) + 100,
    user_id: issueData.user_id || 4,
    user: mockUsers.find(u => u.id === issueData.user_id) || mockUsers[3],
    issue_type: issueData.issue_type || 'Other',
    description: issueData.description || 'No description provided',
    device_serial_number: issueData.device_serial_number || null,
    device: null,
    status: 'new',
    assigned_to: null,
    assignee: null,
    priority: issueData.priority || 'medium',
    comments: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  return createSuccessResponse(newIssue, 'Maintenance issue reported successfully');
};

// Travel API Helpers
export const getTravelApiResponse = (userId?: number, status?: string) => {
  let requests = mockTravelRequests;
  
  if (userId) requests = requests.filter(t => t.user_id === userId);
  if (status) requests = requests.filter(t => t.status === status);
  
  return createSuccessResponse(requests);
};

// Asset API Helpers
export const getAssetsApiResponse = (type?: string, available?: boolean) => {
  let assets = mockAssets;
  
  if (type) assets = assets.filter(a => a.type === type);
  if (available !== undefined) assets = assets.filter(a => a.available === available);
  
  return createSuccessResponse(assets);
};

export const getAssetBookingsApiResponse = (userId?: number, status?: string) => {
  let bookings = mockAssetBookings;
  
  if (userId) bookings = bookings.filter(b => b.user_id === userId);
  if (status) bookings = bookings.filter(b => b.status === status);
  
  return createSuccessResponse(bookings);
};

// Education API Helpers
export const getEducationActivitiesApiResponse = (type?: string, status?: string) => {
  let activities = mockEducationActivities;
  
  if (type) activities = activities.filter(a => a.type === type);
  if (status) activities = activities.filter(a => a.status === status);
  
  return createSuccessResponse(activities);
};

export const getEducationEnrollmentsApiResponse = (userId?: number, status?: string) => {
  let enrollments = mockEducationEnrollments;
  
  if (userId) enrollments = enrollments.filter(e => e.user_id === userId);
  if (status) enrollments = enrollments.filter(e => e.status === status);
  
  return createSuccessResponse(enrollments);
};

// Common validation helpers
export const validateCreateRequest = (data: any, requiredFields: string[]) => {
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    return createErrorResponse(
      `Missing required fields: ${missingFields.join(', ')}`,
      'VALIDATION_ERROR',
      400
    );
  }
  
  return null; // No validation errors
};

export const validateDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (start > end) {
    return createErrorResponse(
      'Start date must be before end date',
      'INVALID_DATE_RANGE',
      400
    );
  }
  
  if (start < today) {
    return createErrorResponse(
      'Start date must be in the future',
      'INVALID_START_DATE',
      400
    );
  }
  
  return null; // No validation errors
};

export const validateAmount = (amount: number) => {
  if (amount <= 0) {
    return createErrorResponse(
      'Amount must be greater than 0',
      'INVALID_AMOUNT',
      400
    );
  }
  
  if (amount > 50000) {
    return createErrorResponse(
      'Amount exceeds maximum limit of $50,000',
      'AMOUNT_TOO_HIGH',
      400
    );
  }
  
  return null; // No validation errors
};

// Demo test scenarios
export const demoScenarios = {
  sickLeave: {
    validRequest: {
      start_date: '2024-04-01',
      end_date: '2024-04-03',
      user_id: 4
    },
    invalidRequest: {
      start_date: '2024-04-03',
      end_date: '2024-04-01', // Invalid: end before start
      user_id: 4
    }
  },
  expense: {
    validExpense: {
      amount: 25.50,
      category: 'Meals',
      description: 'Business lunch',
      user_id: 4
    },
    invalidExpense: {
      amount: -10, // Invalid: negative amount
      category: 'Meals',
      description: 'Business lunch',
      user_id: 4
    }
  },
  maintenance: {
    validIssue: {
      issue_type: 'IT Equipment',
      description: 'Monitor not working',
      user_id: 4,
      priority: 'high'
    }
  }
};

export default {
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
  getSickLeaveApiResponse,
  getExpensesApiResponse,
  processReceiptOCR,
  getMaintenanceApiResponse,
  validateCreateRequest,
  validateDateRange,
  validateAmount,
  demoScenarios
}; 