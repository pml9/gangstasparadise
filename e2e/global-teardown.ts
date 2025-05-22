import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting global teardown for e2e tests...');
  
  // You can add any global teardown logic here, such as:
  // - Cleaning up test databases
  // - Removing test data
  // - Stopping external services
  // - Cleaning up temporary files
  
  console.log('✅ Global teardown completed');
}

export default globalTeardown; 