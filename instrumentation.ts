// This file is used by Next.js to add instrumentation to the app during development
// We'll use this to inject code coverage tracking

export async function register() {
  if (process.env.NODE_ENV === 'development' || process.env.COVERAGE === 'true') {
    console.log('🧪 Setting up code coverage instrumentation...');
    
    // Only instrument code on the client side in browser
    if (typeof window !== 'undefined') {
      try {
        // This will be replaced by the actual code coverage API in the browser
        // The coverage data will be collected and saved during e2e tests
        (window as any).__coverage__ = (window as any).__coverage__ || {};
        console.log('✅ Code coverage instrumentation ready');
      } catch (error) {
        console.error('❌ Failed to initialize code coverage:', error);
      }
    }
  }
} 