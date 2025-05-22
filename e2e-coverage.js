/**
 * E2E Coverage Generator
 * 
 * This script generates a simple HTML report showing:
 * 1. What percentage of e2e tests are passing
 * 2. What pages/components are covered by e2e tests
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const coverageDir = path.join(__dirname, 'coverage/e2e');
const htmlReportDir = path.join(__dirname, 'playwright-report');
const outputHtmlPath = path.join(coverageDir, 'index.html');

console.log('Coverage directory path:', coverageDir);
console.log('Output HTML path:', outputHtmlPath);

// Create coverage directory if it doesn't exist
try {
  if (!fs.existsSync(coverageDir)) {
    console.log(`Creating directory: ${coverageDir}`);
    fs.mkdirSync(coverageDir, { recursive: true });
  } else {
    console.log(`Directory already exists: ${coverageDir}`);
  }
} catch (error) {
  console.error('Error creating coverage directory:', error);
  // Create parent directories one by one if needed
  const parentDir = path.join(__dirname, 'coverage');
  if (!fs.existsSync(parentDir)) {
    console.log(`Creating parent directory: ${parentDir}`);
    fs.mkdirSync(parentDir, { recursive: true });
  }
  
  // Try creating the e2e directory again
  console.log(`Retrying directory creation: ${coverageDir}`);
  fs.mkdirSync(coverageDir, { recursive: true });
}

// Get or create test data
let testData = {
  suites: [],
  totalTests: 0,
  passedTests: 0,
  coverage: 0,
  filesCovered: {}
};

// First, try to get data from the Playwright test report
try {
  // Run the tests if they haven't been run
  const hasRunTests = fs.existsSync(path.join(__dirname, 'playwright-report'));
  if (!hasRunTests) {
    console.log('Running Playwright tests...');
    try {
      execSync('npx playwright test', { stdio: 'inherit' });
    } catch (e) {
      console.log('Tests completed with some failures');
    }
  }

  // Check if we have test results
  const testResultsPath = path.join(__dirname, 'test-results/test-results.json');
  console.log('Looking for test results at:', testResultsPath);
  
  if (fs.existsSync(testResultsPath)) {
    console.log('Test results file found, reading...');
    const fileContent = fs.readFileSync(testResultsPath, 'utf8');
    const testResults = JSON.parse(fileContent);
    console.log(`Successfully parsed test results with ${testResults.suites?.length || 0} suites`);
    
    // Get e2e files info by looking at the e2e directory directly
    const e2eDir = path.join(__dirname, 'e2e');
    const e2eFiles = fs.existsSync(e2eDir) ? 
      fs.readdirSync(e2eDir)
        .filter(file => file.endsWith('.spec.ts'))
        .map(file => ({ 
          file: `e2e/${file}`,
          name: path.basename(file, '.spec.ts')
        })) : [];
    
    console.log('E2E test files found:', e2eFiles.map(f => f.file).join(', '));
        
    // Map test results to our format
    if (testResults.suites && testResults.suites.length > 0) {
      // Extract test data from Playwright results
      testData.suites = testResults.suites;
      
      // Calculate total and passed tests - fixed logic to traverse nested suites
      let totalTests = 0;
      let passedTests = 0;
      
      // Function to recursively process suites and their children
      const processSuite = (suite) => {
        // Process specs in this suite
        if (suite.specs && suite.specs.length > 0) {
          totalTests += suite.specs.length;
          passedTests += suite.specs.filter(spec => {
            return spec.tests?.[0]?.results?.[0]?.status === 'passed';
          }).length;
        }
        
        // Process nested suites
        if (suite.suites && suite.suites.length > 0) {
          suite.suites.forEach(processSuite);
        }
      };
      
      // Process all top-level suites
      testResults.suites.forEach(processSuite);
      
      testData.totalTests = totalTests;
      testData.passedTests = passedTests;
      
      // Calculate overall coverage
      testData.coverage = testData.totalTests > 0 ? 
        Math.round((testData.passedTests / testData.totalTests) * 100) : 0;
      
      // Process file coverage - also fixed to handle nested suites
      const processFileCoverage = (suite, filePath) => {
        const fileName = path.basename(filePath || suite.file || '', '.spec.ts');
        if (fileName) {
          const totalSpecs = suite.specs?.length || 0;
          const passedSpecs = suite.specs ? suite.specs.filter(spec => {
            return spec.tests?.[0]?.results?.[0]?.status === 'passed';
          }).length : 0;
          
          // Accumulate counts if this file already has an entry
          if (testData.filesCovered[fileName]) {
            testData.filesCovered[fileName].totalSpecs += totalSpecs;
            testData.filesCovered[fileName].passedSpecs += passedSpecs;
          } else {
            testData.filesCovered[fileName] = {
              file: filePath || suite.file || fileName,
              totalSpecs,
              passedSpecs,
              coverage: 0  // Will calculate later
            };
          }
        }
        
        // Process nested suites
        if (suite.suites && suite.suites.length > 0) {
          suite.suites.forEach(childSuite => {
            // Use parent file path if child doesn't have one
            processFileCoverage(childSuite, suite.file);
          });
        }
      };
      
      // Process all top-level suites for file coverage
      testResults.suites.forEach(suite => processFileCoverage(suite));
      
      // Calculate coverage percentages for each file
      Object.keys(testData.filesCovered).forEach(fileName => {
        const fileData = testData.filesCovered[fileName];
        fileData.coverage = fileData.totalSpecs > 0 ? 
          Math.round((fileData.passedSpecs / fileData.totalSpecs) * 100) : 0;
      });
      
      // Add missing e2e files (if any)
      e2eFiles.forEach(file => {
        if (!testData.filesCovered[file.name]) {
          testData.filesCovered[file.name] = {
            file: file.file,
            totalSpecs: 0,
            passedSpecs: 0,
            coverage: 0
          };
        }
      });
    } else {
      // No suites in the test results, use e2e files for minimal reporting
      console.log('No test suites found in results, using e2e files for minimal report');
      e2eFiles.forEach(file => {
        testData.filesCovered[file.name] = {
          file: file.file,
          totalSpecs: 'n/a',
          passedSpecs: 'n/a', 
          coverage: 0
        };
      });
    }
  } else {
    throw new Error('Test results not found even after running tests');
  }
} catch (error) {
  console.error('Error processing test results:', error);
  
  // Create minimal test data using e2e directory
  try {
    const e2eDir = path.join(__dirname, 'e2e');
    if (fs.existsSync(e2eDir)) {
      const testFiles = fs.readdirSync(e2eDir)
        .filter(file => file.endsWith('.spec.ts'));
      
      console.log(`Found ${testFiles.length} test files in e2e directory`);
      
      testFiles.forEach(file => {
        const fileName = path.basename(file, '.spec.ts');
        testData.filesCovered[fileName] = {
          file: `e2e/${file}`,
          totalSpecs: 'n/a',
          passedSpecs: 'n/a',
          coverage: 0
        };
      });
    }
  } catch (e) {
    console.error('Error creating fallback test data:', e);
  }
}

console.log('Test data summary:');
console.log(`- Total tests: ${testData.totalTests}`);
console.log(`- Passed tests: ${testData.passedTests}`);
console.log(`- Coverage: ${testData.coverage}%`);
console.log(`- Files covered: ${Object.keys(testData.filesCovered).length}`);

// Generate HTML report
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>E2E Test Coverage</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    h1, h2, h3 {
      color: #1a202c;
    }
    .summary {
      background-color: #f7fafc;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .progress-container {
      width: 100%;
      background-color: #edf2f7;
      border-radius: 9999px;
      margin: 10px 0;
    }
    .progress-bar {
      background-color: #4299e1;
      height: 20px;
      border-radius: 9999px;
      transition: width 0.3s ease;
      position: relative;
    }
    .files-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .file-card {
      background-color: #fff;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .high {
      background-color: #48bb78;
    }
    .medium {
      background-color: #ecc94b;
    }
    .low {
      background-color: #f56565;
    }
    .na {
      background-color: #cbd5e0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      border: 1px solid #e2e8f0;
      padding: 10px;
      text-align: left;
    }
    th {
      background-color: #f7fafc;
    }
    .links {
      margin-top: 30px;
      display: flex;
      gap: 15px;
    }
    .link-button {
      display: inline-block;
      padding: 10px 15px;
      background-color: #4299e1;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: 500;
    }
    .footer {
      margin-top: 40px;
      font-size: 0.9em;
      color: #718096;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>E2E Test Coverage Report</h1>
  <p>Report generated on ${new Date().toLocaleString()}</p>
  
  <div class="summary">
    <h2>Test Coverage Summary</h2>
    <p><strong>Total Tests:</strong> ${testData.totalTests || 'n/a'}</p>
    <p><strong>Passed Tests:</strong> ${testData.passedTests || 'n/a'}</p>
    <p><strong>Overall Coverage:</strong> ${isNaN(testData.coverage) ? 'n/a' : `${testData.coverage}%`}</p>
    ${!isNaN(testData.coverage) ? `
    <div class="progress-container">
      <div class="progress-bar ${testData.coverage > 75 ? 'high' : testData.coverage > 50 ? 'medium' : 'low'}" style="width: ${testData.coverage}%"></div>
    </div>
    ` : ''}
  </div>
  
  <h2>Coverage by Test File</h2>
  <table>
    <thead>
      <tr>
        <th>File</th>
        <th>Specs</th>
        <th>Passed</th>
        <th>Coverage</th>
      </tr>
    </thead>
    <tbody>
      ${Object.entries(testData.filesCovered).map(([fileName, data]) => `
        <tr>
          <td>${fileName}</td>
          <td>${data.totalSpecs}</td>
          <td>${data.passedSpecs}</td>
          <td>
            ${typeof data.coverage === 'number' ? `
              <div class="progress-container">
                <div class="progress-bar ${data.coverage > 75 ? 'high' : data.coverage > 50 ? 'medium' : data.coverage > 0 ? 'low' : 'na'}" style="width: ${data.coverage}%"></div>
              </div>
              ${data.coverage}%
            ` : 'n/a'}
          </td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  
  <div class="links">
    <a href="../playwright-report/index.html" class="link-button">View Full Test Report</a>
  </div>
  
  <div class="footer">
    <p>This report shows the e2e test coverage for your Playwright tests.</p>
    <p>To improve coverage, add more tests in the <code>e2e</code> directory.</p>
  </div>
</body>
</html>
`;

// Write HTML to file
try {
  console.log(`Writing HTML report to: ${outputHtmlPath}`);
  fs.writeFileSync(outputHtmlPath, html);
  
  // Verify the file was created
  if (fs.existsSync(outputHtmlPath)) {
    console.log(`✅ File successfully created at: ${outputHtmlPath}`);
    const stats = fs.statSync(outputHtmlPath);
    console.log(`File size: ${stats.size} bytes`);
  } else {
    console.error(`❌ File was not created at: ${outputHtmlPath}`);
  }
} catch (error) {
  console.error('Error writing HTML report:', error);
  
  // Try an alternative approach
  try {
    console.log('Trying alternative write approach...');
    const tempFile = path.join(__dirname, 'coverage-report.html');
    fs.writeFileSync(tempFile, html);
    console.log(`Temporary file created at: ${tempFile}`);
    
    // Create directory structure if needed
    if (!fs.existsSync(path.dirname(outputHtmlPath))) {
      fs.mkdirSync(path.dirname(outputHtmlPath), { recursive: true });
    }
    
    // Copy the file to the target location
    fs.copyFileSync(tempFile, outputHtmlPath);
    console.log(`File copied to: ${outputHtmlPath}`);
    
    // Clean up
    fs.unlinkSync(tempFile);
  } catch (copyError) {
    console.error('Error with alternative write approach:', copyError);
  }
}

console.log(`✅ Coverage report generated at: ${outputHtmlPath}`);
console.log(`🔍 Open with: open ${outputHtmlPath}`);
console.log(`📂 Directory contains: ${fs.existsSync(coverageDir) ? fs.readdirSync(coverageDir).join(', ') : 'directory does not exist'}`);

// Optionally open the report
if (process.argv.includes('--open')) {
  try {
    const openCommand = process.platform === 'darwin' ? 'open' : 
                      process.platform === 'win32' ? 'start' : 'xdg-open';
    console.log(`Running command: ${openCommand} ${outputHtmlPath}`);
    execSync(`${openCommand} ${outputHtmlPath}`);
  } catch (error) {
    console.error('Error opening report:', error);
    console.log('Please open the report manually.');
  }
} 