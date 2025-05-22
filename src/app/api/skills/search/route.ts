import { mockSkills } from '@/mocks/skill';
import { mockCurrentUser } from '@/mocks/auth';
import { mockOtherUsers } from '@/mocks/user';
import { successResponse, errorResponse } from '@/lib/api/response';
import { delay } from '@/lib/delay';

export async function GET(request: Request) {
  try {
    await delay(700); // Add realistic network delay
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const category = searchParams.get('category');
    const format = searchParams.get('format') as 'IN_PERSON' | 'VIRTUAL' | 'BOTH' | null;
    const minRating = searchParams.get('minRating') ? Number(searchParams.get('minRating')) : undefined;
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 10;
    
    // In a real app, you would use a proper search engine like Elasticsearch or MeiliSearch
    // and query your database with the provided filters
    
    // Mock search implementation
    let results = [];
    
    // Search in skills
    const skillResults = mockSkills
      .filter(skill => {
        const matchesQuery = !query || 
          skill.name.toLowerCase().includes(query.toLowerCase()) || 
          skill.description.toLowerCase().includes(query.toLowerCase());
        
        const matchesCategory = !category || skill.category.id === category;
        const matchesFormat = !format || skill.sessionFormat === format;
        
        return matchesQuery && matchesCategory && matchesFormat;
      })
      .map(skill => ({
        type: 'skill',
        data: {
          ...skill,
          teacher: {
            id: mockCurrentUser.id,
            name: mockCurrentUser.name,
            image: mockCurrentUser.image,
            ageGroup: mockCurrentUser.ageGroup,
            averageRating: 4.8, // Mock data
            totalSessions: 15, // Mock data
          },
          averageRating: 4.8, // Mock data
          totalSessions: 15, // Mock data
        },
        score: 0.9, // Mock relevance score
      }));
    
    // Search in users (simplified for demo)
    const userResults = mockOtherUsers
      .filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.bio?.toLowerCase().includes(query.toLowerCase())
      )
      .map(user => ({
        type: 'user' as const,
        data: user,
        score: 0.8, // Mock relevance score
      }));
    
    // Combine and sort results by score (descending)
    results = [...skillResults, ...userResults].sort((a, b) => b.score - a.score);
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const paginatedResults = results.slice(startIndex, startIndex + limit);
    
    // Get filter options for the UI
    const categories = Array.from(new Set(mockSkills.map(skill => skill.category.id)))
      .map(id => ({
        id,
        name: mockSkills.find(s => s.category.id === id)?.category.name || '',
        count: mockSkills.filter(s => s.category.id === id).length,
      }));
    
    const response = {
      results: paginatedResults,
      meta: {
        total: results.length,
        page,
        limit,
        totalPages: Math.ceil(results.length / limit),
        filters: {
          categories,
          formats: [
            { value: 'IN_PERSON', label: 'In Person', count: mockSkills.filter(s => s.sessionFormat === 'IN_PERSON').length },
            { value: 'VIRTUAL', label: 'Virtual', count: mockSkills.filter(s => s.sessionFormat === 'VIRTUAL').length },
            { value: 'BOTH', label: 'Both', count: mockSkills.filter(s => s.sessionFormat === 'BOTH').length },
          ],
          ageGroups: [
            { value: 'YOUNG_LEARNERS', label: 'Young Learners (16-29)', count: 12 },
            { value: 'ESTABLISHED_ADULTS', label: 'Established Adults (30-49)', count: 18 },
            { value: 'EXPERIENCED_GUIDES', label: 'Experienced Guides (50-64)', count: 9 },
            { value: 'WISDOM_KEEPERS', label: 'Wisdom Keepers (65+)', count: 5 },
          ],
        },
      },
    };
    
    return successResponse(response);
  } catch (error) {
    console.error('Search failed:', error);
    return errorResponse(
      'Search failed',
      500,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

// Export other HTTP methods as needed
export async function POST() {
  return new Response('Method not allowed', { status: 405 });
}

export async function PUT() {
  return new Response('Method not allowed', { status: 405 });
}

export async function DELETE() {
  return new Response('Method not allowed', { status: 405 });
}

export async function PATCH() {
  return new Response('Method not allowed', { status: 405 });
}
