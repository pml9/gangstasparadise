import { test as base } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/**
 * A custom test fixture that adds code coverage collection for tests.
 * This uses Playwright's built-in coverage API instead of Istanbul.
 */
export const test = base.extend({
  // Override the page fixture to add coverage collection
  page: async ({ page, context, browserName }, use) => {
    // Skip if not Chromium (coverage API only supported in Chromium)
    const isCoverage = browserName === 'chromium' && process.env.COVERAGE === 'true';
    
    // Create coverage directory if it doesn't exist
    const coverageDir = path.join(process.cwd(), 'coverage/e2e');
    const rawCoverageDir = path.join(coverageDir, 'raw');
    
    if (isCoverage && !fs.existsSync(rawCoverageDir)) {
      fs.mkdirSync(rawCoverageDir, { recursive: true });
    }

    // Start JS coverage collection (only works in Chromium)
    if (isCoverage) {
      try {
        console.log('Starting JS coverage collection...');
        await page.coverage.startJSCoverage();
      } catch (error) {
        console.error('Failed to start coverage:', error);
      }
    }

    // Run the test with the instrumented page
    await use(page);

    // After the test, collect coverage data (only works in Chromium)
    if (isCoverage) {
      try {
        // This collects the V8 coverage data
        const coverage = await page.coverage.stopJSCoverage();
        
        if (coverage && coverage.length > 0) {
          // Generate a unique ID for this test run
          const testId = Math.random().toString(36).substring(2, 10);
          const coveragePath = path.join(rawCoverageDir, `coverage-${testId}.json`);
          
          // Save the raw coverage data
          fs.writeFileSync(coveragePath, JSON.stringify(coverage));
          console.log(`✅ V8 Coverage data saved (${coverage.length} files) to ${path.basename(coveragePath)}`);

          // Log covered files for debug purposes
          const fileNames = coverage.map(entry => path.basename(entry.url)).join(', ');
          console.log(`📊 Files covered: ${fileNames.length > 100 ? fileNames.substring(0, 100) + '...' : fileNames}`);
        } else {
          console.log('⚠️ No coverage data collected for test');
        }
      } catch (error) {
        console.error('⚠️ Error collecting coverage data:', error);
      }
    }
  }
});

export { expect } from '@playwright/test'; 