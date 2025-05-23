import { test, expect } from '@playwright/test';

test.describe('Home Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/');
  });

  test('should display the main heading', async ({ page }) => {
    // Check if the main heading is visible
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Hello');
  });

  test('should have correct page title', async ({ page }) => {
    // Check the page title
    await expect(page).toHaveTitle('gangstasparadise');
  });

  test('should have proper page structure', async ({ page }) => {
    // Check if main container exists
    const mainContainer = page.locator('main');
    await expect(mainContainer).toBeVisible();
    await expect(mainContainer).toHaveClass(/min-h-screen/);

    // Check if the page has the main div
    const contentDiv = page.locator('div');
    await expect(contentDiv).toBeVisible();
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if content is still visible on mobile
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Hello');
  });

  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // Ensure page loads within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    
    // Check that content is loaded
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should have no console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    // Listen for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    
    // Wait a bit for any async operations
    await page.waitForTimeout(1000);
    
    // Check that there are no console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test('should handle navigation correctly', async ({ page }) => {
    // Test browser navigation
    await page.goto('/');
    
    // Check if we can reload the page
    await page.reload();
    await expect(page.locator('h1')).toBeVisible();
    
    // Check browser back/forward functionality
    await page.goBack();
    await page.goForward();
    await expect(page.locator('h1')).toHaveText('Hello');
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check for meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', 'gangstasparadise');
    
    // Check for proper HTML lang attribute
    const htmlLang = page.locator('html');
    await expect(htmlLang).toHaveAttribute('lang', 'en');
  });
});

test.describe('Accessibility Tests', () => {
  test('should be accessible', async ({ page }) => {
    await page.goto('/');
    
    // Check for basic accessibility features
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    // Ensure the page can be navigated with keyboard
    await page.keyboard.press('Tab');
    
    // Check if the page has a proper heading structure
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);
  });
});

test.describe('Performance Tests', () => {
  test('should meet performance benchmarks', async ({ page }) => {
    // Start measuring performance
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Check if images are optimized (if any)
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // Check if images have proper loading attributes
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        await expect(img).toHaveAttribute('loading');
      }
    }
    
    // Ensure page content is visible quickly
    await expect(page.locator('h1')).toBeVisible({ timeout: 3000 });
  });
});

test.describe('Error Handling Tests', () => {
  test('should handle network errors gracefully', async ({ page, context }) => {
    // Simulate offline mode
    await context.setOffline(true);
    
    try {
      await page.goto('/', { timeout: 5000 });
    } catch (error) {
      // Expected to fail when offline
      expect(error).toBeDefined();
    }
    
    // Go back online
    await context.setOffline(false);
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });
}); 