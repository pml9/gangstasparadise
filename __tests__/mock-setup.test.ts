// Mock Data Integrity Tests for WorkHub Pro
// Ensures all mock data is properly structured and follows TypeScript types

import { describe, it, expect, beforeAll } from 'vitest';
import {
  mockUsers,
  mockSickLeaveRequests,
  mockExpenseReports,
  mockMaintenanceIssues,
  mockTravelRequests,
  mockAssets,
  mockAssetBookings,
  mockEducationActivities,
  mockEducationEnrollments,
  getDashboardStats,
  createSuccessResponse,
  createErrorResponse,
  processReceiptOCR,
  validateDateRange,
  validateAmount,
  demoScenarios
} from '../mocks';

describe('Mock Data Integrity Tests', () => {
  describe('Users Mock Data', () => {
    it('should have valid user structure', () => {
      expect(mockUsers).toBeDefined();
      expect(mockUsers.length).toBeGreaterThan(0);
      
      mockUsers.forEach(user => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('role');
        expect(['employee', 'manager', 'admin']).toContain(user.role);
      });
    });

    it('should have proper hierarchical structure', () => {
      const managers = mockUsers.filter(u => u.role === 'manager');
      const employees = mockUsers.filter(u => u.role === 'employee');
      
      expect(managers.length).toBeGreaterThan(0);
      expect(employees.length).toBeGreaterThan(0);
      
      // Check that employees have managers
      const employeesWithManagers = employees.filter(e => e.manager_id);
      expect(employeesWithManagers.length).toBeGreaterThan(0);
    });
  });

  describe('Sick Leave Mock Data', () => {
    it('should have valid sick leave requests', () => {
      expect(mockSickLeaveRequests).toBeDefined();
      expect(mockSickLeaveRequests.length).toBeGreaterThan(0);
      
      mockSickLeaveRequests.forEach(request => {
        expect(request).toHaveProperty('id');
        expect(request).toHaveProperty('user_id');
        expect(request).toHaveProperty('start_date');
        expect(request).toHaveProperty('end_date');
        expect(request).toHaveProperty('status');
        expect(['pending', 'approved', 'rejected']).toContain(request.status);
      });
    });

    it('should have proper date formats', () => {
      mockSickLeaveRequests.forEach(request => {
        expect(request.start_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(request.end_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        
        const startDate = new Date(request.start_date);
        const endDate = new Date(request.end_date);
        expect(startDate).toBeInstanceOf(Date);
        expect(endDate).toBeInstanceOf(Date);
        expect(startDate <= endDate).toBeTruthy();
      });
    });
  });

  describe('Expense Reports Mock Data', () => {
    it('should have valid expense reports', () => {
      expect(mockExpenseReports).toBeDefined();
      expect(mockExpenseReports.length).toBeGreaterThan(0);
      
      mockExpenseReports.forEach(expense => {
        expect(expense).toHaveProperty('id');
        expect(expense).toHaveProperty('user_id');
        expect(expense).toHaveProperty('amount');
        expect(expense).toHaveProperty('category');
        expect(expense).toHaveProperty('status');
        expect(typeof expense.amount).toBe('number');
        expect(expense.amount).toBeGreaterThan(0);
      });
    });

    it('should have proper OCR data structure', () => {
      const expensesWithOCR = mockExpenseReports.filter(e => e.ocr_data);
      expect(expensesWithOCR.length).toBeGreaterThan(0);
      
      expensesWithOCR.forEach(expense => {
        const ocr = expense.ocr_data!;
        expect(ocr).toHaveProperty('extracted_text');
        expect(ocr).toHaveProperty('detected_amount');
        expect(ocr).toHaveProperty('confidence_score');
        expect(ocr).toHaveProperty('merchant_name');
        expect(typeof ocr.confidence_score).toBe('number');
        expect(ocr.confidence_score).toBeGreaterThanOrEqual(0);
        expect(ocr.confidence_score).toBeLessThanOrEqual(1);
      });
    });

    it('should have valid Unsplash image URLs', () => {
      const expensesWithReceipts = mockExpenseReports.filter(e => e.receipt_url);
      expect(expensesWithReceipts.length).toBeGreaterThan(0);
      
      expensesWithReceipts.forEach(expense => {
        expect(expense.receipt_url).toMatch(/^https:\/\/images\.unsplash\.com/);
      });
    });
  });

  describe('Maintenance Issues Mock Data', () => {
    it('should have valid maintenance issues', () => {
      expect(mockMaintenanceIssues).toBeDefined();
      expect(mockMaintenanceIssues.length).toBeGreaterThan(0);
      
      mockMaintenanceIssues.forEach(issue => {
        expect(issue).toHaveProperty('id');
        expect(issue).toHaveProperty('user_id');
        expect(issue).toHaveProperty('issue_type');
        expect(issue).toHaveProperty('description');
        expect(issue).toHaveProperty('status');
        expect(issue).toHaveProperty('priority');
        expect(['new', 'assigned', 'in_progress', 'resolved', 'closed']).toContain(issue.status);
        expect(['low', 'medium', 'high', 'urgent']).toContain(issue.priority);
      });
    });
  });

  describe('Assets and Bookings Mock Data', () => {
    it('should have valid assets', () => {
      expect(mockAssets).toBeDefined();
      expect(mockAssets.length).toBeGreaterThan(0);
      
      mockAssets.forEach(asset => {
        expect(asset).toHaveProperty('id');
        expect(asset).toHaveProperty('name');
        expect(asset).toHaveProperty('type');
        expect(asset).toHaveProperty('available');
        expect(typeof asset.available).toBe('boolean');
        if (asset.image_url) {
          expect(asset.image_url).toMatch(/^https:\/\/images\.unsplash\.com/);
        }
      });
    });

    it('should have valid asset bookings', () => {
      expect(mockAssetBookings).toBeDefined();
      expect(mockAssetBookings.length).toBeGreaterThan(0);
      
      mockAssetBookings.forEach(booking => {
        expect(booking).toHaveProperty('id');
        expect(booking).toHaveProperty('user_id');
        expect(booking).toHaveProperty('asset_id');
        expect(booking).toHaveProperty('start_date');
        expect(booking).toHaveProperty('end_date');
        expect(booking).toHaveProperty('status');
        expect(['active', 'completed', 'cancelled']).toContain(booking.status);
      });
    });
  });

  describe('Education Activities Mock Data', () => {
    it('should have valid education activities', () => {
      expect(mockEducationActivities).toBeDefined();
      expect(mockEducationActivities.length).toBeGreaterThan(0);
      
      mockEducationActivities.forEach(activity => {
        expect(activity).toHaveProperty('id');
        expect(activity).toHaveProperty('title');
        expect(activity).toHaveProperty('type');
        expect(activity).toHaveProperty('status');
        expect(activity).toHaveProperty('capacity');
        expect(activity).toHaveProperty('enrolled_count');
        expect(['training', 'workshop', 'seminar', 'social', 'team_building']).toContain(activity.type);
        expect(['open', 'closed', 'completed', 'cancelled']).toContain(activity.status);
        expect(activity.enrolled_count).toBeLessThanOrEqual(activity.capacity);
      });
    });
  });

  describe('Dashboard Statistics', () => {
    it('should generate valid dashboard stats', () => {
      const stats = getDashboardStats();
      
      expect(stats).toHaveProperty('sick_leave');
      expect(stats).toHaveProperty('expenses');
      expect(stats).toHaveProperty('maintenance');
      expect(stats).toHaveProperty('travel');
      expect(stats).toHaveProperty('assets');
      expect(stats).toHaveProperty('education');
      
      // Verify numeric properties
      expect(typeof stats.sick_leave.pending).toBe('number');
      expect(typeof stats.expenses.total_amount).toBe('number');
      expect(typeof stats.maintenance.new).toBe('number');
    });
  });
});

describe('API Helpers Tests', () => {
  describe('Response Creators', () => {
    it('should create valid success responses', () => {
      const data = { test: 'data' };
      const response = createSuccessResponse(data, 'Test message');
      
      expect(response.success).toBe(true);
      expect(response.data).toEqual(data);
      expect(response.message).toBe('Test message');
      expect(response.timestamp).toBeDefined();
    });

    it('should create valid error responses', () => {
      const response = createErrorResponse('Test error', 'TEST_CODE', 400);
      
      expect(response.success).toBe(false);
      expect(response.error).toBe('Test error');
      expect(response.code).toBe('TEST_CODE');
      expect(response.statusCode).toBe(400);
      expect(response.timestamp).toBeDefined();
    });
  });

  describe('OCR Processing', () => {
    it('should process receipt OCR successfully', () => {
      const response = processReceiptOCR('test-image-url');
      
      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty('extracted_text');
      expect(response.data).toHaveProperty('detected_amount');
      expect(response.data).toHaveProperty('confidence_score');
      expect(response.data).toHaveProperty('merchant_name');
      expect(typeof response.data.detected_amount).toBe('number');
    });
  });

  describe('Validation Helpers', () => {
    it('should validate date ranges correctly', () => {
      // Generate actual future dates
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const futureStart = tomorrow.toISOString().split('T')[0];
      
      const dayAfterTomorrow = new Date();
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 3);
      const futureEnd = dayAfterTomorrow.toISOString().split('T')[0];
      
      const pastStart = '2024-01-01';
      const invalidEnd = tomorrow.toISOString().split('T')[0]; // Same as start, making end before start when start is +3

      // Valid date range
      expect(validateDateRange(futureStart, futureEnd)).toBeNull();

      // Invalid: past start date
      expect(validateDateRange(pastStart, futureEnd)).not.toBeNull();

      // Invalid: end before start
      expect(validateDateRange(futureEnd, futureStart)).not.toBeNull();
    });

    it('should validate amounts correctly', () => {
      // Valid amounts
      expect(validateAmount(100)).toBeNull();
      expect(validateAmount(49999)).toBeNull();

      // Invalid amounts
      expect(validateAmount(0)).not.toBeNull();
      expect(validateAmount(-10)).not.toBeNull();
      expect(validateAmount(60000)).not.toBeNull();
    });
  });

  describe('Demo Scenarios', () => {
    it('should have valid demo scenarios', () => {
      expect(demoScenarios).toHaveProperty('sickLeave');
      expect(demoScenarios).toHaveProperty('expense');
      expect(demoScenarios).toHaveProperty('maintenance');
      
      expect(demoScenarios.sickLeave.validRequest).toHaveProperty('start_date');
      expect(demoScenarios.expense.validExpense).toHaveProperty('amount');
      expect(demoScenarios.maintenance.validIssue).toHaveProperty('issue_type');
    });
  });
});

describe('Data Relationships and Integrity', () => {
  it('should have proper foreign key relationships', () => {
    // Check that all user_ids in requests reference valid users
    const userIds = mockUsers.map(u => u.id);
    
    mockSickLeaveRequests.forEach(request => {
      expect(userIds).toContain(request.user_id);
    });
    
    mockExpenseReports.forEach(expense => {
      expect(userIds).toContain(expense.user_id);
    });
    
    mockMaintenanceIssues.forEach(issue => {
      expect(userIds).toContain(issue.user_id);
    });
  });

  it('should have consistent status distributions', () => {
    // Ensure we have examples of all status types for demo purposes
    const sickLeaveStatuses = [...new Set(mockSickLeaveRequests.map(r => r.status))];
    expect(sickLeaveStatuses).toContain('pending');
    expect(sickLeaveStatuses).toContain('approved');
    
    const expenseStatuses = [...new Set(mockExpenseReports.map(e => e.status))];
    expect(expenseStatuses).toContain('pending');
    expect(expenseStatuses).toContain('approved');
    
    const maintenanceStatuses = [...new Set(mockMaintenanceIssues.map(i => i.status))];
    expect(maintenanceStatuses).toContain('new');
    expect(maintenanceStatuses).toContain('in_progress');
  });

  it('should have realistic data distributions', () => {
    // Check that we have a good mix of data for demo
    const recentRequests = mockSickLeaveRequests.filter(r => 
      new Date(r.created_at) > new Date('2024-03-01')
    );
    expect(recentRequests.length).toBeGreaterThan(0);
    
    const expensesWithReceipts = mockExpenseReports.filter(e => e.receipt_url);
    expect(expensesWithReceipts.length).toBeGreaterThan(5);
    
    const highPriorityIssues = mockMaintenanceIssues.filter(i => 
      i.priority === 'high' || i.priority === 'urgent'
    );
    expect(highPriorityIssues.length).toBeGreaterThan(0);
  });
});

// Test utility for API route testing
export const testApiRoute = async (handler: Function, request: any) => {
  try {
    const response = await handler(request);
    return response;
  } catch (error) {
    return { error: error.message };
  }
};

// Export test helpers for use in other test files
export const testHelpers = {
  sampleUser: mockUsers[0],
  sampleExpense: mockExpenseReports[0],
  sampleSickLeave: mockSickLeaveRequests[0],
  sampleMaintenanceIssue: mockMaintenanceIssues[0],
  validDateRange: {
    start: '2024-12-01',
    end: '2024-12-03'
  },
  invalidDateRange: {
    start: '2024-12-03',
    end: '2024-12-01'
  }
}; 