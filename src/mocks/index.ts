// Auth mocks
export * from './auth';

// User mocks
export * from './user';

// Skill mocks
export * from './skill';

// Session mocks
export * from './session';

// Common mock data
export const MOCK_USER_ID = 'current-user-id';
export const MOCK_SKILL_ID = 'skill-123';
export const MOCK_SESSION_ID = 'session-123';

// Helper function to find mock data by ID
export const findMockById = <T extends { id: string }>(items: T[], id: string): T | undefined => {
  return items.find(item => item.id === id);
};

// Helper function to filter mock data by user ID
export const filterMocksByUserId = <T extends { userId: string }>(
  items: T[], 
  userId: string
): T[] => {
  return items.filter(item => item.userId === userId);
};

// Helper function to generate paginated response
export const paginate = <T>(
  items: T[], 
  page: number = 1, 
  limit: number = 10
): { data: T[]; total: number; page: number; limit: number; totalPages: number } => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);
  
  return {
    data: paginatedItems,
    total: items.length,
    page,
    limit,
    totalPages: Math.ceil(items.length / limit)
  };
};
