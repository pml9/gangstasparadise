# WorkHub Pro - Mock Data Implementation

## 📋 Overview

This directory contains comprehensive mock data for the WorkHub Pro hackathon application, providing realistic enterprise-grade data for all major features. The implementation follows strict TypeScript typing and includes sophisticated business logic for demonstration purposes.

## 🏗️ Architecture

### Core Features Covered
- **Users & Hierarchy** - 10 users with manager-employee relationships
- **Sick Leave Management** - Approval workflows with manager comments
- **Expense Reporting** - OCR integration with real receipt images
- **Maintenance Issues** - Auto-assignment and priority tracking
- **Travel Requests** - Cost estimation and approval flows
- **Asset Booking** - Availability checking and conflict detection
- **Education & Training** - Enrollment tracking with completion certificates

### File Structure
```
mocks/
├── README.md              # This documentation
├── index.ts               # Central exports and utilities
├── api-helpers.ts         # API testing and response helpers
├── users.ts               # User hierarchy and management
├── sick-leave.ts          # Sick leave requests and approvals
├── expenses.ts            # Expense reports with OCR data
├── maintenance.ts         # Maintenance issues and devices
├── travel.ts              # Travel requests and destinations
├── assets.ts              # Company assets and bookings
├── education.ts           # Training activities and enrollments
└── dashboard.ts           # Aggregated statistics and metrics
```

## 🚀 Quick Start

### Basic Usage
```typescript
import { 
  mockUsers, 
  mockExpenseReports, 
  getDashboardStats,
  createSuccessResponse 
} from './mocks';

// Get all users
const users = mockUsers;

// Get pending expenses
const pendingExpenses = mockExpenseReports.filter(e => e.status === 'pending');

// Generate dashboard statistics
const dashboardData = getDashboardStats();

// Create API response
const response = createSuccessResponse(users, 'Users retrieved successfully');
```

### Advanced Filtering
```typescript
import { 
  getSickLeaveByUserId,
  getExpensesByStatus,
  getPendingApprovals,
  checkAssetAvailability 
} from './mocks';

// Get sick leave for specific user
const userSickLeave = getSickLeaveByUserId(4);

// Get all approved expenses
const approvedExpenses = getExpensesByStatus('approved');

// Get pending approvals for managers
const pendingApprovals = getPendingApprovals();

// Check asset availability
const isAvailable = checkAssetAvailability(1, '2024-04-01', '2024-04-03');
```

## 📊 Data Statistics

### Data Volume
- **Users**: 10 (2 managers, 1 admin, 7 employees)
- **Sick Leave Requests**: 10 (3 pending, 6 approved, 1 rejected)
- **Expense Reports**: 10 (3 pending, 6 approved, 1 rejected)
- **Maintenance Issues**: 10 (across 5 device types, various statuses)
- **Travel Requests**: 10 (covering all status types)
- **Assets**: 10 (vehicles, rooms, technology, equipment)
- **Asset Bookings**: 10 (active, completed, cancelled)
- **Education Activities**: 10 (training, workshops, social events)
- **Education Enrollments**: 10 (with attendance and feedback data)

### Business Logic Features
- **Hierarchical Management**: Proper manager-employee relationships
- **Approval Workflows**: Realistic approval processes with comments
- **OCR Integration**: Sophisticated receipt processing with confidence scores
- **Auto-Assignment**: Smart assignment of maintenance issues
- **Availability Checking**: Asset booking conflict detection
- **Statistics Generation**: Real-time dashboard metrics

## 🎯 Demo Users

```typescript
import { DEMO_USERS } from './mocks';

// Pre-configured demo users for consistent testing
const employee = DEMO_USERS.EMPLOYEE; // Emily Davis (id: 4)
const manager = DEMO_USERS.MANAGER;   // Sarah Johnson (id: 1)
const admin = DEMO_USERS.ADMIN;       // Alex Rodriguez (id: 3)
```

## 🧪 Testing Integration

### Comprehensive Test Suite
```bash
npm test __tests__/mock-setup.test.ts
```

### Test Coverage
- **Data Integrity**: Validates all mock data structure
- **TypeScript Compliance**: Ensures proper typing
- **Business Logic**: Tests approval workflows and relationships
- **API Helpers**: Validates response generators and OCR processing
- **Foreign Key Relationships**: Verifies data consistency

### Example API Route Testing
```typescript
import { 
  createSuccessResponse, 
  validateDateRange, 
  demoScenarios 
} from './mocks/api-helpers';

// Test sick leave creation
const result = validateDateRange(
  demoScenarios.sickLeave.validRequest.start_date,
  demoScenarios.sickLeave.validRequest.end_date
);

// Create mock API response
const response = createSuccessResponse(mockSickLeaveRequests, 'Success');
```

## 💰 OCR Integration

### Real Receipt Processing
```typescript
import { processReceiptOCR } from './mocks';

const ocrResult = processReceiptOCR('receipt-image-url');
// Returns: {
//   extracted_text: "COFFEE SHOP\n123 Main St\nLatte $4.50...",
//   detected_amount: 4.86,
//   suggested_category: "Meals",
//   confidence_score: 0.92,
//   merchant_name: "COFFEE SHOP",
//   transaction_date: "2024-03-14"
// }
```

### Features
- **Realistic OCR Data**: Extracted text with proper formatting
- **Confidence Scores**: 0.85-0.97 range for realistic AI processing
- **Smart Categorization**: Automatic expense category suggestions
- **Merchant Detection**: Business name extraction
- **Amount Parsing**: Accurate currency detection

## 🖼️ Visual Assets

### Unsplash Integration
All receipt and asset images use real Unsplash URLs:
```typescript
// Example receipt URLs
"https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=600&fit=crop"

// Example asset URLs  
"https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop"
```

### Image Categories
- **Receipts**: Restaurant, office supplies, travel, accommodation
- **Assets**: Vehicles, conference rooms, technology, equipment
- **Education**: Training environments, workshops, social events

## 📈 Dashboard Integration

### Real-Time Statistics
```typescript
import { getDashboardStats, getRecentActivities } from './mocks';

const stats = getDashboardStats();
// Returns comprehensive statistics for all modules

const activities = getRecentActivities();
// Returns recent activity feed for dashboard
```

### Available Metrics
- **Sick Leave**: Pending/approved/rejected counts
- **Expenses**: Amounts pending approval and monthly totals
- **Maintenance**: Issue counts by status and priority
- **Travel**: Upcoming trips and cost tracking
- **Assets**: Booking statistics and availability
- **Education**: Enrollment counts and completion rates

## 🔧 API Helpers

### Response Generators
```typescript
import { 
  createSuccessResponse, 
  createErrorResponse, 
  createPaginatedResponse 
} from './mocks/api-helpers';

// Success response
const success = createSuccessResponse(data, 'Operation successful');

// Error response
const error = createErrorResponse('Validation failed', 'VALIDATION_ERROR', 400);

// Paginated response
const paginated = createPaginatedResponse(items, 1, 10);
```

### Validation Helpers
```typescript
import { 
  validateDateRange, 
  validateAmount, 
  validateCreateRequest 
} from './mocks/api-helpers';

// Date validation
const dateError = validateDateRange('2024-04-01', '2024-04-03');

// Amount validation
const amountError = validateAmount(150.50);

// Required fields validation
const fieldError = validateCreateRequest(data, ['title', 'description']);
```

## 🚀 Demo Scenarios

### Pre-built Test Cases
```typescript
import { demoScenarios } from './mocks/api-helpers';

// Valid sick leave request
const validRequest = demoScenarios.sickLeave.validRequest;

// Invalid expense (negative amount)
const invalidExpense = demoScenarios.expense.invalidExpense;

// Maintenance issue
const maintenanceIssue = demoScenarios.maintenance.validIssue;
```

## 🔄 Workflow Examples

### Sick Leave Approval Flow
1. Employee submits request → Status: `pending`
2. Manager reviews → Adds comments
3. Manager approves/rejects → Status: `approved/rejected`
4. Email notification sent

### Expense Processing Flow
1. Employee uploads receipt → OCR processing
2. AI extracts amount and category → Confidence score
3. Employee reviews and submits → Status: `pending`
4. Manager approves → Status: `approved`

### Maintenance Issue Flow
1. Employee reports issue → Status: `new`
2. Auto-assignment based on type → Status: `assigned`
3. IT team works on issue → Status: `in_progress`
4. Issue resolved → Status: `resolved`

## 📋 Manager Dashboard Features

### Pending Approvals
```typescript
import { getPendingApprovals } from './mocks';

const approvals = getPendingApprovals();
// Returns sick leave, expense, and travel requests awaiting approval
```

### Team Management
```typescript
import { getEmployeesByManager, getManagersWithEmployees } from './mocks';

const teamMembers = getEmployeesByManager(1); // Sarah Johnson's team
const allTeams = getManagersWithEmployees(); // All manager-employee relationships
```

## 🎨 Frontend Integration

### shadcn/ui Components
The mock data is designed to work seamlessly with shadcn/ui components:
- **Tables**: Built-in pagination support
- **Cards**: Structured data for dashboard tiles
- **Badges**: Status indicators with proper categories
- **Forms**: Validation helpers for user input

### Loading States
```typescript
import { createMockApiResponse } from './mocks';

// Simulate API delays for realistic loading states
setTimeout(() => {
  const response = createMockApiResponse(mockUsers);
  setUsers(response.data);
  setLoading(false);
}, 1000);
```

## 🔒 Security & Validation

### Input Validation
- **Date Ranges**: Future dates only for requests
- **Amounts**: Positive values with maximum limits
- **Required Fields**: Comprehensive field validation
- **Email Format**: Proper email regex validation

### Authorization Simulation
```typescript
import { DEMO_USERS } from './mocks';

// Simulate different user contexts
const currentUser = DEMO_USERS.MANAGER; // For manager features
const currentUser = DEMO_USERS.EMPLOYEE; // For employee features
```

## 📚 Type Safety

All mock data strictly follows TypeScript types defined in `src/types/`:
- **Users**: Role-based hierarchy with manager relationships
- **Requests**: Status enums and proper date formats
- **Responses**: Standardized API response structure
- **Validation**: Type-safe error handling

## 🚀 Performance Considerations

### Optimized for Demo
- **Fast Queries**: Indexed filtering functions
- **Efficient Pagination**: Built-in pagination helpers
- **Memory Usage**: Optimized data structures
- **Response Times**: Simulated realistic API delays

### Caching Strategy
```typescript
// Mock data is static, perfect for caching
const cachedStats = getDashboardStats(); // Can be cached for 5 minutes
const cachedUsers = mockUsers; // Static data, cache indefinitely
```

## 🔧 Customization

### Adding New Data
```typescript
// Add new user
const newUser = {
  id: 11,
  email: 'new.user@workhub.com',
  name: 'New User',
  role: 'employee',
  manager_id: 1,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

mockUsers.push(newUser);
```

### Extending Functionality
```typescript
// Add custom filter function
export const getExpensesByAmount = (minAmount: number) => {
  return mockExpenseReports.filter(e => e.amount >= minAmount);
};
```

## 🎯 Demo Success Tips

1. **Use Real Data**: All mock data represents realistic business scenarios
2. **Show Workflows**: Demonstrate approval processes and status changes
3. **Highlight AI**: Showcase OCR processing with confidence scores
4. **Visual Impact**: Use real Unsplash images for professional appearance
5. **Error Handling**: Show validation errors and recovery flows
6. **Performance**: Fast responses demonstrate enterprise scalability

## 📞 Integration Support

For questions or customization needs, the mock data includes:
- **Helper Functions**: For common operations
- **Test Utilities**: For API route testing
- **Demo Scenarios**: For consistent demonstrations
- **Type Safety**: Full TypeScript support
- **Documentation**: Comprehensive inline comments

---

**Ready for Hackathon Success!** 🚀

This mock data implementation provides everything needed for a compelling demo of an enterprise-grade workplace management system. 