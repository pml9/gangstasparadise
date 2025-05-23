import { DashboardStats } from '../src/types';
import { getSickLeaveStats } from './sick-leave';
import { getExpenseStats } from './expenses';
import { getMaintenanceStats } from './maintenance';
import { getTravelStats } from './travel';
import { getAssetStats } from './assets';
import { getEducationStats } from './education';

// Comprehensive dashboard statistics
export const getDashboardStats = (): DashboardStats => {
  const sickLeaveStats = getSickLeaveStats();
  const expenseStats = getExpenseStats();
  const maintenanceStats = getMaintenanceStats();
  const travelStats = getTravelStats();
  const assetStats = getAssetStats();
  const educationStats = getEducationStats();

  return {
    sick_leave: {
      pending: sickLeaveStats.pending_requests,
      approved: sickLeaveStats.approved_requests,
      rejected: sickLeaveStats.rejected_requests
    },
    expenses: {
      pending: expenseStats.pending_expenses,
      approved: expenseStats.approved_expenses,
      total_amount: expenseStats.total_amount_pending
    },
    maintenance: {
      new: maintenanceStats.new_issues,
      in_progress: maintenanceStats.in_progress_issues,
      resolved: maintenanceStats.resolved_issues
    },
    travel: {
      upcoming: travelStats.upcoming_trips,
      pending_approval: travelStats.pending_requests
    },
    assets: {
      my_bookings: assetStats.active_bookings,
      available_assets: assetStats.available_assets
    },
    education: {
      my_enrollments: educationStats.my_enrollments,
      upcoming_activities: educationStats.upcoming_activities
    }
  };
};

// Recent activity feed for dashboard
export interface DashboardActivity {
  id: string;
  type: 'sick_leave' | 'expense' | 'maintenance' | 'travel' | 'asset' | 'education';
  title: string;
  description: string;
  timestamp: string;
  status?: string;
  user?: {
    id: number;
    name: string;
  };
}

export const getRecentActivities = (): DashboardActivity[] => {
  return [
    {
      id: 'sl-1',
      type: 'sick_leave',
      title: 'Sick Leave Request Submitted',
      description: 'Emily Davis submitted a sick leave request for March 15-17',
      timestamp: '2024-03-13T09:15:00Z',
      status: 'pending',
      user: {
        id: 4,
        name: 'Emily Davis'
      }
    },
    {
      id: 'exp-2',
      type: 'expense',
      title: 'Expense Report Approved',
      description: 'AWS Training course expense ($1,250) has been approved',
      timestamp: '2024-03-12T14:30:00Z',
      status: 'approved',
      user: {
        id: 5,
        name: 'James Wilson'
      }
    },
    {
      id: 'maint-3',
      type: 'maintenance',
      title: 'Maintenance Issue Resolved',
      description: 'Water leak in restroom has been fixed',
      timestamp: '2024-03-12T12:45:00Z',
      status: 'resolved',
      user: {
        id: 9,
        name: 'Tom Anderson'
      }
    },
    {
      id: 'travel-4',
      type: 'travel',
      title: 'Travel Request Pending',
      description: 'New York business trip request awaiting approval',
      timestamp: '2024-03-10T14:30:00Z',
      status: 'pending',
      user: {
        id: 4,
        name: 'Emily Davis'
      }
    },
    {
      id: 'asset-5',
      type: 'asset',
      title: 'Asset Booking Confirmed',
      description: 'Executive Conference Room booked for board meeting',
      timestamp: '2024-03-10T09:30:00Z',
      status: 'active',
      user: {
        id: 4,
        name: 'Emily Davis'
      }
    },
    {
      id: 'edu-6',
      type: 'education',
      title: 'Training Enrollment',
      description: 'Enrolled in Advanced JavaScript Fundamentals',
      timestamp: '2024-03-10T14:20:00Z',
      status: 'enrolled',
      user: {
        id: 4,
        name: 'Emily Davis'
      }
    },
    {
      id: 'exp-7',
      type: 'expense',
      title: 'Receipt Processed',
      description: 'OCR successfully processed restaurant receipt',
      timestamp: '2024-03-09T18:30:00Z',
      status: 'processed',
      user: {
        id: 4,
        name: 'Emily Davis'
      }
    },
    {
      id: 'maint-8',
      type: 'maintenance',
      title: 'New Issue Reported',
      description: 'Laptop keyboard issue reported by Emily Davis',
      timestamp: '2024-03-09T09:15:00Z',
      status: 'new',
      user: {
        id: 4,
        name: 'Emily Davis'
      }
    }
  ];
};

// Quick actions for dashboard
export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  category: 'request' | 'report' | 'book' | 'enroll';
}

export const getQuickActions = (): QuickAction[] => {
  return [
    {
      id: 'sick-leave-request',
      title: 'Request Sick Leave',
      description: 'Submit a new sick leave request',
      icon: 'calendar-days',
      href: '/sick-leave/new',
      category: 'request'
    },
    {
      id: 'expense-report',
      title: 'Submit Expense',
      description: 'Create new expense report with receipt',
      icon: 'receipt',
      href: '/expenses/new',
      category: 'report'
    },
    {
      id: 'maintenance-issue',
      title: 'Report Issue',
      description: 'Report a maintenance or IT issue',
      icon: 'wrench-screwdriver',
      href: '/maintenance/new',
      category: 'report'
    },
    {
      id: 'travel-request',
      title: 'Plan Travel',
      description: 'Submit a business travel request',
      icon: 'airplane',
      href: '/travel/new',
      category: 'request'
    },
    {
      id: 'asset-booking',
      title: 'Book Asset',
      description: 'Reserve rooms or equipment',
      icon: 'building-office',
      href: '/assets/book',
      category: 'book'
    },
    {
      id: 'education-enroll',
      title: 'Join Training',
      description: 'Enroll in learning activities',
      icon: 'academic-cap',
      href: '/education/activities',
      category: 'enroll'
    }
  ];
};

// Notifications for dashboard
export interface DashboardNotification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export const getNotifications = (): DashboardNotification[] => {
  return [
    {
      id: 'notif-1',
      type: 'info',
      title: 'New Training Available',
      message: 'Advanced JavaScript Fundamentals training is now open for enrollment',
      timestamp: '2024-03-13T10:00:00Z',
      read: false,
      actionUrl: '/education/activities/1'
    },
    {
      id: 'notif-2',
      type: 'success',
      title: 'Expense Approved',
      message: 'Your AWS training expense report has been approved',
      timestamp: '2024-03-12T14:30:00Z',
      read: false,
      actionUrl: '/expenses/4'
    },
    {
      id: 'notif-3',
      title: 'Maintenance Update',
      type: 'success',
      message: 'Your laptop keyboard issue has been assigned to IT support',
      timestamp: '2024-03-12T09:15:00Z',
      read: true,
      actionUrl: '/maintenance/1'
    },
    {
      id: 'notif-4',
      type: 'warning',
      title: 'Travel Deadline',
      message: 'Don\'t forget to submit your travel request for Q2 conferences',
      timestamp: '2024-03-11T08:00:00Z',
      read: true
    },
    {
      id: 'notif-5',
      type: 'info',
      title: 'Asset Available',
      message: 'Tesla Model 3 is now available for booking',
      timestamp: '2024-03-10T15:30:00Z',
      read: true,
      actionUrl: '/assets/1'
    }
  ];
};

// Pending approvals (for managers)
export interface PendingApproval {
  id: string;
  type: 'sick_leave' | 'expense' | 'travel';
  employee: {
    id: number;
    name: string;
    email: string;
  };
  title: string;
  description: string;
  amount?: number;
  date_range?: {
    start: string;
    end: string;
  };
  submitted_at: string;
  urgency: 'low' | 'medium' | 'high';
}

export const getPendingApprovals = (): PendingApproval[] => {
  return [
    {
      id: 'sl-pending-1',
      type: 'sick_leave',
      employee: {
        id: 4,
        name: 'Emily Davis',
        email: 'emily.davis@workhub.com'
      },
      title: 'Sick Leave Request',
      description: '3-day sick leave for recovery',
      date_range: {
        start: '2024-03-15',
        end: '2024-03-17'
      },
      submitted_at: '2024-03-13T09:15:00Z',
      urgency: 'medium'
    },
    {
      id: 'exp-pending-2',
      type: 'expense',
      employee: {
        id: 7,
        name: 'David Martinez',
        email: 'david.martinez@workhub.com'
      },
      title: 'Adobe Creative Cloud Subscription',
      description: 'Monthly software subscription for design work',
      amount: 89.99,
      submitted_at: '2024-03-11T10:15:00Z',
      urgency: 'low'
    },
    {
      id: 'travel-pending-3',
      type: 'travel',
      employee: {
        id: 8,
        name: 'Rachel Kim',
        email: 'rachel.kim@workhub.com'
      },
      title: 'Los Angeles Business Trip',
      description: 'Product launch event and media interviews',
      amount: 1650.00,
      date_range: {
        start: '2024-04-10',
        end: '2024-04-12'
      },
      submitted_at: '2024-03-13T16:20:00Z',
      urgency: 'high'
    }
  ];
};

// Performance metrics for dashboard
export interface DashboardMetrics {
  response_time: {
    average_approval_time: number; // in hours
    fastest_resolution: number; // in hours
    compliance_rate: number; // percentage
  };
  cost_tracking: {
    monthly_expenses: number;
    monthly_budget: number;
    savings_rate: number; // percentage
  };
  productivity: {
    automation_rate: number; // percentage
    user_satisfaction: number; // rating out of 5
    process_efficiency: number; // percentage
  };
}

export const getDashboardMetrics = (): DashboardMetrics => {
  return {
    response_time: {
      average_approval_time: 18.5, // hours
      fastest_resolution: 2.3, // hours
      compliance_rate: 94.2 // percentage
    },
    cost_tracking: {
      monthly_expenses: 8450.75,
      monthly_budget: 12000.00,
      savings_rate: 29.6 // percentage
    },
    productivity: {
      automation_rate: 78.4, // percentage
      user_satisfaction: 4.6, // out of 5
      process_efficiency: 87.2 // percentage
    }
  };
}; 