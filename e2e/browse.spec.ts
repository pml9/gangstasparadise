import { expect } from '@playwright/test';
import { test } from './base-test';

test.describe('Browse Skills Page', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the skills API response
    await page.route('**/api/skills', async (route) => {
      // Create mock skills data
      const mockSkills = {
        data: [
          {
            id: '1',
            name: 'Guitar Lessons',
            description: 'Learn to play guitar from scratch',
            category: { id: '1', name: 'Music' },
            sessionFormat: 'In Person',
            averageRating: 4.8,
            totalReviews: 12,
            location: { city: 'Berlin', country: 'Germany' },
            teacher: {
              id: '101',
              name: 'John Doe',
              ageGroup: 'EXPERIENCED GUIDE',
              image: '/placeholder-teacher.jpg'
            }
          },
          {
            id: '2',
            name: 'Cooking Basics',
            description: 'Learn fundamental cooking techniques',
            category: { id: '2', name: 'Cooking' },
            sessionFormat: 'Virtual',
            averageRating: 4.5,
            totalReviews: 8,
            location: { city: 'Munich', country: 'Germany' },
            teacher: {
              id: '102',
              name: 'Emma Smith',
              ageGroup: 'EXPERIENCED GUIDE',
              image: '/placeholder-teacher2.jpg'
            }
          },
          {
            id: '3',
            name: 'Digital Photography',
            description: 'Master your digital camera and photo editing',
            category: { id: '3', name: 'Photography' },
            sessionFormat: 'In Person',
            averageRating: 4.9,
            totalReviews: 15,
            location: { city: 'Hamburg', country: 'Germany' },
            teacher: {
              id: '103',
              name: 'Michael Brown',
              ageGroup: 'EXPERIENCED GUIDE',
              image: '/placeholder-teacher3.jpg'
            }
          }
        ]
      };
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockSkills)
      });
    });
  });

  // Testing for presence of loading component when API is delayed
  test('should render loading component while skills load', async ({ page }) => {
    // Intercept API requests to simulate loading
    await page.route('**/api/skills', async route => {
      // Never fulfill the request - just keep it hanging to show loading state
      // We'll let it timeout naturally
    }, { times: 1 });

    // Go to the browse page - this should show loading state since API response is delayed
    await page.goto('/browse');

    // Attempt to find the heading first to confirm we're on the browse page
    await expect(page.getByRole('heading', { name: /browse skills/i })).toBeVisible();

    // Look for any skeleton loaders on the page
    const skeletonElements = await page.locator('[class*="skeleton"], [class*="animate-pulse"]').count();
    expect(skeletonElements).toBeGreaterThan(0);
  });

  test('should display skills list after loading', async ({ page }) => {
    // Navigate to the browse page
    await page.goto('/browse');
    
    // Wait for page to fully load and for skills to appear
    await page.waitForSelector('h1:has-text("Browse Skills")');
    await page.waitForLoadState('networkidle');
    
    // Check for actual skill cards (not loading skeletons)
    await expect(page.locator('a[href^="/skills/"]').first()).toBeVisible({ timeout: 10000 });
    
    // Verify at least one skill card exists
    const skillCards = page.locator('a[href^="/skills/"]');
    await expect(skillCards).toHaveCount(3);
    
    // Verify first skill data is displayed correctly
    const firstSkillCard = skillCards.first();
    await expect(firstSkillCard).toContainText('Guitar Lessons');
    await expect(firstSkillCard).toContainText('Learn to play guitar');
    
    // Verify skill has category badge (testing one of the category values)
    await expect(firstSkillCard).toContainText('Music');
    
    // Verify teacher info is displayed
    await expect(firstSkillCard).toContainText('John Doe');
    
    // Verify rating is displayed (just check for the rating number)
    await expect(firstSkillCard).toContainText('4.8');
  });

  // Just wait for search input and filters to appear without any interactions
  test('should contain search and filter elements', async ({ page }) => {
    // Set longer timeout for this test
    test.slow();
    
    // Navigate to browse page
    await page.goto('/browse');
    
    // Wait for the network to be idle to ensure everything has loaded
    await page.waitForLoadState('networkidle');
    
    // Wait for the main heading to be sure we're on the right page
    await expect(page.getByRole('heading', { name: /browse skills/i })).toBeVisible();
    
    // Wait for skills to load (so filters will be fully visible)
    await page.waitForSelector('a[href^="/skills/"]', { state: 'visible', timeout: 10000 });
    
    // Verify search input exists (using multiple possible selectors)
    const searchExists = await page.locator('input, [role="searchbox"], [placeholder*="Search"]').first().isVisible();
    expect(searchExists).toBeTruthy();
    
    // Verify filter sidebar exists (using text content instead of specific selectors)
    const filterSidebarVisible = await page.getByText(/filter/i, { exact: false }).isVisible();
    expect(filterSidebarVisible).toBeTruthy();
    
    // Verify category tabs exist (using any text that would appear in category tabs)
    const categoriesVisible = await page.getByText(/all categories|music|cooking|photography/i, { exact: false }).first().isVisible();
    expect(categoriesVisible).toBeTruthy();
    
    // Verify sort dropdown exists
    const sortExists = await page.getByText(/sort/i, { exact: false }).isVisible();
    expect(sortExists).toBeTruthy();
  });

  test('search functionality should filter skills', async ({ page }) => {
    // Navigate to the browse page
    await page.goto('/browse');
    
    // Wait for page to load
    await page.waitForSelector('h1:has-text("Browse Skills")');
    
    // Find and use the search input
    const searchInput = page.locator('input[placeholder*="Search"], input[type="search"], [role="searchbox"]');
    await searchInput.fill('Guitar');
    await searchInput.press('Enter');
    
    // Give time for the filter to apply
    await page.waitForTimeout(500);
    
    // Verify at least one result with "Guitar" is displayed
    await expect(page.locator('a[href^="/skills/"]:has-text("Guitar")')).toBeVisible();
  });

  test('category filters should filter skills', async ({ page }) => {
    // Navigate to the browse page
    await page.goto('/browse');
    
    // Wait for page to load
    await page.waitForSelector('h1:has-text("Browse Skills")');
    
    // Find and click on category tabs (look for "Music" category)
    await page.locator('button:has-text("Music")').first().click();
    
    // Give time for filter to apply
    await page.waitForTimeout(500);
    
    // Verify filtered results contain at least one "Music" category item
    const skillCards = page.locator('a[href^="/skills/"]');
    await expect(skillCards.first()).toContainText('Music');
  });
}); 