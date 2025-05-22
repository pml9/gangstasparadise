import { FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { createCoverageMap } from 'istanbul-lib-coverage';

async function globalTeardown(config: FullConfig) {
  console.log('Processing code coverage data...');
  
  // Merge coverage data from all test runs
  const coverageDir = path.join(process.cwd(), '.nyc_output');
  const finalCoverageDir = path.join(process.cwd(), 'coverage/e2e');

  if (!fs.existsSync(finalCoverageDir)) {
    fs.mkdirSync(finalCoverageDir, { recursive: true });
    console.log(`Created output directory: ${finalCoverageDir}`);
  }
  
  try {
    // Create a coverage map
    const coverageMap = createCoverageMap({});
    
    // Try to find and merge all coverage files
    const coverageFiles = fs.readdirSync(coverageDir)
      .filter(file => file.endsWith('.json'));
    
    console.log(`Found ${coverageFiles.length} coverage files to process`);
    
    if (coverageFiles.length > 0) {
      coverageFiles.forEach(file => {
        const filePath = path.join(coverageDir, file);
        try {
          const coverage = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          if (coverage && Object.keys(coverage).length > 0) {
            coverageMap.merge(coverage);
            console.log(`Merged coverage from: ${file}`);
          } else {
            console.log(`Empty coverage in: ${file}`);
          }
        } catch (error) {
          console.error(`Error processing ${file}:`, error);
        }
      });
      
      // Write final coverage data
      const finalCoverageFile = path.join(coverageDir, 'coverage-final.json');
      fs.writeFileSync(finalCoverageFile, JSON.stringify(coverageMap.toJSON()));
      console.log(`✅ Wrote final coverage to: ${finalCoverageFile}`);
      
      // Generate the report using NYC
      console.log('Generating coverage report...');
      try {
        const reportScript = `npx nyc report --reporter=html --reporter=text --report-dir=${finalCoverageDir}`;
        console.log(`Running: ${reportScript}`);
        require('child_process').execSync(reportScript, { stdio: 'inherit' });
        console.log(`✅ Coverage report generated at: ${finalCoverageDir}`);
      } catch (e) {
        console.error('Error generating report:', e);
      }
    } else {
      console.log('No coverage files found to process');
    }
  } catch (error) {
    console.error('Error during coverage processing:', error);
  }
}

export default globalTeardown; 