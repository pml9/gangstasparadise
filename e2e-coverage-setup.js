// This script sets up code coverage instrumentation for Next.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure coverage directories exist
const coverageDirs = [
  path.join(__dirname, '.nyc_output'),
  path.join(__dirname, 'coverage'),
  path.join(__dirname, 'coverage/e2e'),
  path.join(__dirname, 'coverage/tmp')
];

coverageDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Create a dummy coverage file to ensure the directory structure is valid
const dummyFile = path.join(__dirname, '.nyc_output', '_dummy.json');
if (!fs.existsSync(dummyFile)) {
  fs.writeFileSync(dummyFile, JSON.stringify({ coverage: 'placeholder' }));
}

console.log('✅ Code coverage setup complete');
console.log('🔍 Run tests with: npm run test:e2e:coverage'); 