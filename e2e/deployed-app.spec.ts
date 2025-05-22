import { expect } from '@playwright/test';
import { test } from './base-test';

test.describe('Deployed App E2E Test', () => {
  const APP_URL = 'https://fastidious-praline-ebd092.netlify.app';

  test('should load the deployed application successfully', async ({ page }) => {
    // Set a longer timeout for the initial page load
    test.slow();
    
    await page.goto(APP_URL);
    
    // Instead of checking the exact URL, just make sure we're on the same domain
    // This handles possible redirects from the homepage
    const currentUrl = page.url();
    expect(currentUrl).toContain('fastidious-praline-ebd092.netlify.app');
    
    // Test that the body element is visible
    await expect(page.locator('body')).toBeVisible();
    
    // Test that there's a header (check for first() to avoid strict mode violation)
    await expect(page.locator('header').first()).toBeVisible();
  });

  // Just a simple test that we're on a page with content
  test('should have visible content', async ({ page }) => {
    test.slow();
    await page.goto(APP_URL);
    
    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');
    
    // Test that the page has some content
    await expect(page.locator('body')).toBeVisible();
    
    // Use page.evaluate to check for elements without risking navigation issues
    const pageHasContent = await page.evaluate(() => {
      const headings = document.querySelectorAll('h1, h2, h3');
      const paragraphs = document.querySelectorAll('p');
      const links = document.querySelectorAll('a');
      const buttons = document.querySelectorAll('button');
      
      return {
        hasHeadings: headings.length > 0,
        hasParagraphs: paragraphs.length > 0,
        hasLinks: links.length > 0,
        hasButtons: buttons.length > 0
      };
    });
    
    expect(pageHasContent.hasHeadings).toBe(true);
    expect(pageHasContent.hasParagraphs).toBe(true);
    expect(pageHasContent.hasLinks).toBe(true);
  });
}); 