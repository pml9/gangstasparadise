import { ExpenseReport, OCRData, ExpenseCategory } from '../src/types';

export const mockExpenseReports: ExpenseReport[] = [
  // Pending expenses with receipts and OCR data
  {
    id: 1,
    user_id: 4,
    user: {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@workhub.com'
    },
    amount: 125.50,
    currency: 'USD',
    category: 'Meals',
    description: 'Team lunch during client meeting',
    receipt_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=600&fit=crop',

    status: 'pending',
    manager_comments: null,
    created_at: '2024-03-12T18:30:00Z',
    updated_at: '2024-03-12T18:30:00Z'
  },
  {
    id: 2,
    user_id: 7,
    user: {
      id: 7,
      name: 'David Martinez',
      email: 'david.martinez@workhub.com'
    },
    amount: 89.99,
    currency: 'USD',
    category: 'Software',
    description: 'Adobe Creative Cloud subscription',
    receipt_url: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400&h=600&fit=crop',
    ocr_data: {
      extracted_text: 'Adobe Systems Inc.\nCreative Cloud Subscription\nDate: 03/11/2024\nAmount: $89.99\nCard ending in 1234',
      detected_amount: 89.99,
      suggested_category: 'Software',
      confidence_score: 0.92,
      merchant_name: 'Adobe Systems Inc.',
      transaction_date: '2024-03-11'
    },
    status: 'pending',
    manager_comments: null,
    created_at: '2024-03-11T10:15:00Z',
    updated_at: '2024-03-11T10:15:00Z'
  },
  {
    id: 3,
    user_id: 8,
    user: {
      id: 8,
      name: 'Rachel Kim',
      email: 'rachel.kim@workhub.com'
    },
    amount: 45.00,
    currency: 'USD',
    category: 'Transportation',
    description: 'Uber to client office',
    receipt_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop',
    ocr_data: {
      extracted_text: 'Uber Technologies\nTrip Date: 03/13/2024\nFrom: Office\nTo: Client Building\nFare: $38.50\nTip: $6.50\nTotal: $45.00',
      detected_amount: 45.00,
      suggested_category: 'Transportation',
      confidence_score: 0.88,
      merchant_name: 'Uber Technologies',
      transaction_date: '2024-03-13'
    },
    status: 'pending',
    manager_comments: null,
    created_at: '2024-03-13T16:45:00Z',
    updated_at: '2024-03-13T16:45:00Z'
  },

  // Approved expenses
  {
    id: 4,
    user_id: 5,
    user: {
      id: 5,
      name: 'James Wilson',
      email: 'james.wilson@workhub.com'
    },
    amount: 1250.00,
    currency: 'USD',
    category: 'Training',
    description: 'AWS Certification training course',
    receipt_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop',
    ocr_data: {
      extracted_text: 'AWS Training Center\nAWS Solutions Architect Course\nDate: 03/05/2024\nCourse Fee: $1,250.00\nTotal: $1,250.00',
      detected_amount: 1250.00,
      suggested_category: 'Training',
      confidence_score: 0.97,
      merchant_name: 'AWS Training Center',
      transaction_date: '2024-03-05'
    },
    status: 'approved',
    manager_comments: 'Excellent investment in professional development. Approved.',
    created_at: '2024-03-05T09:20:00Z',
    updated_at: '2024-03-06T08:30:00Z'
  },
  {
    id: 5,
    user_id: 6,
    user: {
      id: 6,
      name: 'Lisa Brown',
      email: 'lisa.brown@workhub.com'
    },
    amount: 67.89,
    currency: 'USD',
    category: 'Office Supplies',
    description: 'Notebook and pens for project planning',
    receipt_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=600&fit=crop',
    ocr_data: {
      extracted_text: 'Office Depot\nMoleskine Notebook $45.99\nPilot Pens (4-pack) $15.99\nTax $5.91\nTotal: $67.89',
      detected_amount: 67.89,
      suggested_category: 'Office Supplies',
      confidence_score: 0.91,
      merchant_name: 'Office Depot',
      transaction_date: '2024-03-08'
    },
    status: 'approved',
    manager_comments: 'Standard office supplies. Approved.',
    created_at: '2024-03-08T14:15:00Z',
    updated_at: '2024-03-09T10:45:00Z'
  },
  {
    id: 6,
    user_id: 9,
    user: {
      id: 9,
      name: 'Tom Anderson',
      email: 'tom.anderson@workhub.com'
    },
    amount: 320.00,
    currency: 'USD',
    category: 'Accommodation',
    description: 'Hotel stay for conference in Seattle',
    receipt_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=600&fit=crop',

    status: 'approved',
    manager_comments: 'Conference attendance approved. Hotel cost is reasonable.',
    created_at: '2024-03-03T11:30:00Z',
    updated_at: '2024-03-04T09:15:00Z'
  },

  // Rejected expense
  {
    id: 7,
    user_id: 4,
    user: {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@workhub.com'
    },
    amount: 89.99,
    currency: 'USD',
    category: 'Entertainment',
    description: 'Netflix subscription',
    receipt_url: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=600&fit=crop',

    status: 'rejected',
    manager_comments: 'Personal entertainment subscriptions are not reimbursable.',
    created_at: '2024-02-28T20:15:00Z',
    updated_at: '2024-03-01T08:30:00Z'
  },

  // Historical approved expenses
  {
    id: 8,
    user_id: 7,
    user: {
      id: 7,
      name: 'David Martinez',
      email: 'david.martinez@workhub.com'
    },
    amount: 234.56,
    currency: 'USD',
    category: 'Equipment',
    description: 'Wireless keyboard and mouse for remote work',
    receipt_url: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=600&fit=crop',

    status: 'approved',
    manager_comments: 'Essential equipment for remote work productivity. Approved.',
    created_at: '2024-02-25T15:20:00Z',
    updated_at: '2024-02-26T09:10:00Z'
  },
  {
    id: 9,
    user_id: 8,
    user: {
      id: 8,
      name: 'Rachel Kim',
      email: 'rachel.kim@workhub.com'
    },
    amount: 75.00,
    currency: 'USD',
    category: 'Travel',
    description: 'Parking at client meeting location',
    receipt_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',

    status: 'approved',
    manager_comments: 'Client meeting expenses approved.',
    created_at: '2024-02-20T17:45:00Z',
    updated_at: '2024-02-21T08:15:00Z'
  },
  {
    id: 10,
    user_id: 5,
    user: {
      id: 5,
      name: 'James Wilson',
      email: 'james.wilson@workhub.com'
    },
    amount: 156.78,
    currency: 'USD',
    category: 'Meals',
    description: 'Business dinner with potential client',
    receipt_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=600&fit=crop',

    status: 'approved',
    manager_comments: 'Business development dinner approved.',
    created_at: '2024-02-15T21:30:00Z',
    updated_at: '2024-02-16T09:20:00Z'
  }
];

// Helper functions for filtering and querying
export const getExpensesByUserId = (userId: number): ExpenseReport[] => {
  return mockExpenseReports.filter(expense => expense.user_id === userId);
};

export const getExpensesByStatus = (status: 'pending' | 'approved' | 'rejected'): ExpenseReport[] => {
  return mockExpenseReports.filter(expense => expense.status === status);
};

export const getExpensesByCategory = (category: ExpenseCategory): ExpenseReport[] => {
  return mockExpenseReports.filter(expense => expense.category === category);
};

export const getExpenseById = (id: number): ExpenseReport | undefined => {
  return mockExpenseReports.find(expense => expense.id === id);
};

export const getPendingExpensesForManager = (managerId: number): ExpenseReport[] => {
  // This would need to be implemented with user data to find employees under this manager
  return mockExpenseReports.filter(expense => expense.status === 'pending');
};

// Generate stats for dashboard
export const getExpenseStats = () => {
  const total = mockExpenseReports.length;
  const pending = mockExpenseReports.filter(e => e.status === 'pending').length;
  const approved = mockExpenseReports.filter(e => e.status === 'approved').length;
  const rejected = mockExpenseReports.filter(e => e.status === 'rejected').length;

  const pendingAmount = mockExpenseReports
    .filter(e => e.status === 'pending')
    .reduce((sum, e) => sum + e.amount, 0);

  const approvedAmount = mockExpenseReports
    .filter(e => e.status === 'approved')
    .reduce((sum, e) => sum + e.amount, 0);

  // Monthly total for current month (March 2024)
  const monthlyTotal = mockExpenseReports
    .filter(e => e.created_at.startsWith('2024-03'))
    .reduce((sum, e) => sum + e.amount, 0);

  return {
    total_expenses: total,
    pending_expenses: pending,
    approved_expenses: approved,
    rejected_expenses: rejected,
    total_amount_pending: pendingAmount,
    total_amount_approved: approvedAmount,
    monthly_total: monthlyTotal
  };
};

// Mock OCR processing function
export const mockOCRProcessing = (receiptImageUrl: string): OCRData => {
  // Simulate different OCR results based on image type
  const mockResults = [
    {
      extracted_text: 'STARBUCKS\n123 Coffee St\nLatte $5.95\nTax $0.48\nTotal: $6.43',
      detected_amount: 6.43,
      suggested_category: 'Meals',
      confidence_score: 0.89,
      merchant_name: 'STARBUCKS',
      transaction_date: new Date().toISOString().split('T')[0]
    },
    {
      extracted_text: 'OFFICE DEPOT\nPaper Supplies $29.99\nPens $12.50\nTotal: $42.49',
      detected_amount: 42.49,
      suggested_category: 'Office Supplies',
      confidence_score: 0.93,
      merchant_name: 'OFFICE DEPOT',
      transaction_date: new Date().toISOString().split('T')[0]
    },
    {
      extracted_text: 'UBER\nTrip from Downtown\nFare: $15.50\nTip: $3.00\nTotal: $18.50',
      detected_amount: 18.50,
      suggested_category: 'Transportation',
      confidence_score: 0.87,
      merchant_name: 'UBER',
      transaction_date: new Date().toISOString().split('T')[0]
    }
  ];

  // Return a random result for demo purposes
  return mockResults[Math.floor(Math.random() * mockResults.length)];
}; 