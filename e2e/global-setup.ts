import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function globalSetup(config: FullConfig) {
  console.log('Setting up for code coverage collection...');
  
  // Create coverage directory if it doesn't exist
  const coverageDir = path.join(process.cwd(), '.nyc_output');
  const baseCoverageData = path.join(coverageDir, 'coverage.json');
  
  if (!fs.existsSync(coverageDir)) {
    fs.mkdirSync(coverageDir, { recursive: true });
    console.log(`Created coverage directory: ${coverageDir}`);
  }

  // Create an empty coverage file if it doesn't exist yet
  if (!fs.existsSync(baseCoverageData)) {
    fs.writeFileSync(baseCoverageData, JSON.stringify({}));
    console.log(`Created base coverage file: ${baseCoverageData}`);
  }

  // Set NODE_ENV for coverage if not already set
  if (!process.env.COVERAGE) {
    process.env.COVERAGE = 'true';
  }

  console.log('✅ Global setup complete');
}

export default globalSetup; 