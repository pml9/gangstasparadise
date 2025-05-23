import { test, expect } from '@playwright/test';

test.describe('Simple E2E Test Example', () => {
  test('should mock and assert simple truth', async ({ page }) => {
    // Mock a simple API response
    await page.route('**/api/test', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'mocked response' })
      });
    });

    // Navigate to the home page
    await page.goto('/');
    
    // Simple assertion
    expect(true).toBe(true);
  });
}); 