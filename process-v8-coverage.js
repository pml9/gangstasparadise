/**
 * Process V8 coverage data into an HTML report
 * This script reads V8 coverage data from Playwright and generates a user-friendly report
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse command line arguments
const args = process.argv.slice(2);
const openReport = args.includes('--open');

// Get deployed app URL from command line or use default
const deployedAppUrlArg = args.find(arg => arg.startsWith('--app-url='));
const deployedAppUrl = deployedAppUrlArg 
  ? deployedAppUrlArg.replace('--app-url=', '')
  : 'fastidious-praline-ebd092.netlify.app'; // Default URL as fallback

console.log(`Using deployed app URL: ${deployedAppUrl}`);

// Configuration
const rawCoverageDir = path.join(__dirname, 'coverage/e2e/raw');
const reportDir = path.join(__dirname, 'coverage/e2e');
const summaryFilePath = path.join(reportDir, 'coverage-summary.json');
const htmlReportPath = path.join(reportDir, 'index.html');

// Ensure directories exist
if (!fs.existsSync(rawCoverageDir)) {
  fs.mkdirSync(rawCoverageDir, { recursive: true });
}

if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

// Helper function to calculate coverage percentage
function calculateCoverage(covered, total) {
  if (total === 0) return 0;
  return Math.round((covered / total) * 100);
}

// Process coverage data
function processCoverage() {
  console.log(`Processing V8 coverage data from ${rawCoverageDir}`);
  
  // Get all coverage files
  const coverageFiles = fs.readdirSync(rawCoverageDir)
    .filter(file => file.endsWith('.json'))
    .map(file => path.join(rawCoverageDir, file));
  
  console.log(`Found ${coverageFiles.length} coverage files`);
  
  if (coverageFiles.length === 0) {
    console.log('No coverage files found. Run tests with coverage enabled first.');
    return false;
  }
  
  // Read and merge all coverage data
  const allCoverageData = [];
  coverageFiles.forEach(file => {
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      allCoverageData.push(...data);
    } catch (error) {
      console.error(`Error reading coverage file ${file}:`, error);
    }
  });
  
  console.log(`Processed ${allCoverageData.length} coverage entries`);
  
  // Filter to only include source files from the project (not node_modules, etc)
  const sourceCoverage = allCoverageData.filter(entry => {
    const url = entry.url;
    
    // Include all deployed app files (these are our app files)
    if (url.includes(deployedAppUrl) && 
        url.includes('.js') && 
        !url.includes('/node_modules/')) {
      console.log(`Found deployed app file: ${url}`);
      return true;
    }
    
    // Only include file:// URLs that are part of our project
    if (!url.startsWith('file://')) {
      return false;
    }
    
    // Convert URL to path 
    let filePath = url.replace('file://', '');
    
    // On Windows, remove the leading slash from file:///C:/
    if (process.platform === 'win32' && filePath.startsWith('/')) {
      filePath = filePath.substring(1);
    }
    
    // Skip node_modules, test files and other non-source files
    const excludePatterns = [
      'node_modules',
      '/test/',
      '/tests/',
      '.test.',
      '.spec.',
      '/_next/cache'
    ];
    
    if (excludePatterns.some(pattern => filePath.includes(pattern))) {
      return false;
    }
    
    // Include source files
    const includeExtensions = ['.js', '.ts', '.tsx', '.jsx'];
    const hasValidExtension = includeExtensions.some(ext => filePath.endsWith(ext));
    
    return hasValidExtension;
  });
  
  console.log(`Found ${sourceCoverage.length} source files with coverage data`);
  
  // Aggregate coverage by file
  const fileCoverage = {};
  let totalBytes = 0;
  let coveredBytes = 0;
  
  sourceCoverage.forEach(entry => {
    const fileName = entry.url.replace('file://', '');
    let relativePath = fileName;
    
    // For deployed app files, use a more descriptive name
    if (entry.url.includes(deployedAppUrl)) {
      // Get the filename from the URL
      const urlPath = new URL(entry.url).pathname;
      relativePath = urlPath;
      
      // For Next.js chunks, extract meaningful names if possible
      if (urlPath.includes('chunks')) {
        // Look for module name in the URL
        const chunkMatch = urlPath.match(/\/([^\/]+)\/([^\/]+)-[a-f0-9]+\.js$/);
        if (chunkMatch) {
          const chunkType = chunkMatch[1]; // app, pages, etc.
          const chunkName = chunkMatch[2]; // layout, page, etc.
          relativePath = `${chunkType}/${chunkName}.js`;
        }
      }
    } else {
      // For local files, use path relative to project root
      relativePath = path.relative(__dirname, fileName);
      
      // Skip if we can't determine the file path
      if (!relativePath) {
        console.log(`Skipping file with undetermined path: ${fileName}`);
        return;
      }
    }
    
    // Calculate coverage for this file
    let fileBytes = 0;
    let fileCoveredBytes = 0;
    
    entry.functions.forEach(fn => {
      // Calculate function coverage
      fileBytes += fn.ranges.reduce((sum, range) => sum + range.endOffset - range.startOffset, 0);
      fileCoveredBytes += fn.ranges
        .filter(range => range.count > 0)
        .reduce((sum, range) => sum + range.endOffset - range.startOffset, 0);
    });
    
    // Skip files with no coverage data
    if (fileBytes === 0) {
      console.log(`Skipping file with no coverage data: ${relativePath}`);
      return;
    }
    
    // Add to totals
    totalBytes += fileBytes;
    coveredBytes += fileCoveredBytes;
    
    // Store file coverage
    fileCoverage[relativePath] = {
      totalBytes: fileBytes,
      coveredBytes: fileCoveredBytes,
      percentage: calculateCoverage(fileCoveredBytes, fileBytes),
      url: entry.url // Store the original URL for reference
    };
    
    console.log(`Processed ${relativePath}: ${fileCoverage[relativePath].percentage}% coverage`);
  });
  
  // Calculate overall coverage
  const totalCoverage = {
    totalBytes,
    coveredBytes,
    percentage: calculateCoverage(coveredBytes, totalBytes),
    files: Object.keys(fileCoverage).length,
    fileDetails: fileCoverage
  };
  
  // Write coverage summary
  fs.writeFileSync(summaryFilePath, JSON.stringify(totalCoverage, null, 2));
  console.log(`Coverage summary written to ${summaryFilePath}`);
  
  // Generate HTML report
  generateHtmlReport(totalCoverage);
  
  return true;
}

// Generate HTML report
function generateHtmlReport(coverage) {
  console.log('Generating HTML report...');
  
  // Sort files by coverage percentage (ascending)
  const sortedFiles = Object.entries(coverage.fileDetails)
    .sort((a, b) => a[1].percentage - b[1].percentage);
  
  // Generate HTML
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>V8 Code Coverage Report</title>
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
      height: 20px;
      border-radius: 9999px;
      transition: width 0.3s ease;
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
    .file-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .file-table th, .file-table td {
      border: 1px solid #e2e8f0;
      padding: 10px;
      text-align: left;
    }
    .file-table th {
      background-color: #f7fafc;
      position: sticky;
      top: 0;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }
    .file-path {
      word-break: break-all;
      font-family: monospace;
    }
    .footer {
      margin-top: 40px;
      font-size: 0.9em;
      color: #718096;
      text-align: center;
    }
    .section {
      margin-bottom: 30px;
      padding: 20px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .file-link {
      color: #3182ce;
      text-decoration: none;
    }
    .file-link:hover {
      text-decoration: underline;
    }
    .info-box {
      background-color: #ebf8ff;
      border-left: 4px solid #4299e1;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 0 4px 4px 0;
    }
    .search {
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      font-size: 16px;
    }
    .no-files {
      background-color: #fff5f5;
      color: #c53030;
      padding: 20px;
      text-align: center;
      border-radius: 8px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <h1>Next.js Code Coverage Report</h1>
  <p>Report generated on ${new Date().toLocaleString()}</p>
  <p>Deployed app URL: ${deployedAppUrl}</p>
  
  <div class="summary">
    <h2>Coverage Summary</h2>
    <p><strong>Total Files:</strong> ${coverage.files}</p>
    <p><strong>Overall Coverage:</strong> ${coverage.percentage}%</p>
    <div class="progress-container">
      <div class="progress-bar ${
        coverage.percentage > 75 ? 'high' : 
        coverage.percentage > 50 ? 'medium' : 'low'
      }" style="width: ${coverage.percentage}%"></div>
    </div>
    <p><strong>Covered Bytes:</strong> ${coverage.coveredBytes.toLocaleString()} / ${coverage.totalBytes.toLocaleString()}</p>
  </div>
  
  ${coverage.files === 0 ? `
  <div class="no-files">
    <h3>No Source Files Found</h3>
    <p>The coverage collector couldn't find any source files that match the criteria. This might happen because:</p>
    <ul style="text-align: left; display: inline-block;">
      <li>Your app is using bundled files that don't match the source mapping</li>
      <li>The browser is loading files from a CDN or other external source</li>
      <li>The source code structure doesn't match the expected patterns</li>
    </ul>
    <p>Try running your tests with <code>NODE_ENV=development</code> or modify the source filter in the coverage script.</p>
  </div>
  ` : `
  <div class="section">
    <h2>Coverage by File</h2>
    <input type="text" class="search" id="fileSearch" placeholder="Search files..." />
    
    <table class="file-table">
      <thead>
        <tr>
          <th>File</th>
          <th style="width: 20%;">Coverage</th>
          <th style="width: 15%;">Covered Bytes</th>
          <th style="width: 15%;">Total Bytes</th>
        </tr>
      </thead>
      <tbody id="fileTableBody">
        ${sortedFiles.map(([file, data]) => `
          <tr data-file="${file}">
            <td class="file-path">${file}</td>
            <td>
              <div class="progress-container">
                <div class="progress-bar ${
                  data.percentage > 75 ? 'high' : 
                  data.percentage > 50 ? 'medium' : 'low'
                }" style="width: ${data.percentage}%"></div>
              </div>
              ${data.percentage}%
            </td>
            <td>${data.coveredBytes.toLocaleString()}</td>
            <td>${data.totalBytes.toLocaleString()}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
  `}
  
  <div class="info-box">
    <h3>Understanding This Report</h3>
    <p>This report shows <strong>byte-level code coverage</strong> collected from V8's coverage API in Chromium browser during Playwright tests.</p>
    <p>Coverage percentage represents the ratio of executed code bytes to total code bytes in each file.</p>
    <p>Note: This is more accurate than statement/line coverage as it measures actual executed code at the instruction level.</p>
  </div>
  
  <div class="footer">
    <p>Coverage data collected on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
    <p>To improve coverage, add more end-to-end tests that exercise the components listed above.</p>
  </div>

  <script>
    // Simple file search functionality
    document.getElementById('fileSearch').addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const rows = document.querySelectorAll('#fileTableBody tr');
      
      rows.forEach(row => {
        const fileName = row.getAttribute('data-file').toLowerCase();
        if (fileName.includes(searchTerm)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  </script>
</body>
</html>
  `;
  
  // Write HTML file
  fs.writeFileSync(htmlReportPath, html);
  console.log(`HTML report generated at ${htmlReportPath}`);
}

// Main execution
const success = processCoverage();

if (success) {
  console.log('✅ Coverage processing complete');
  
  // Open the report if requested
  if (openReport) {
    try {
      const openCommand = process.platform === 'darwin' ? 'open' : 
                        process.platform === 'win32' ? 'start' : 'xdg-open';
      execSync(`${openCommand} ${htmlReportPath}`);
    } catch (error) {
      console.error('Error opening report:', error);
    }
  }
} else {
  console.log('❌ Coverage processing failed');
} 