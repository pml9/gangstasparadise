# Code Coverage in IG-Skill-Exchange

This document explains the code coverage implementation used in this project. We have two different approaches to measuring code coverage:

## 1. Test Execution Coverage (Basic)

This is a simpler approach that measures which tests have been executed, not which code has been executed.

```bash
npm run test:e2e:coverage
# or
npm run test:e2e:coverage:open  # to automatically open the report
```

This generates a report showing what percentage of our tests passed successfully. This is useful for ensuring that all test cases are being run, but it doesn't tell us anything about the actual code that is being executed during tests.

## 2. True Code Coverage (V8 Coverage)

This approach uses the V8 JavaScript engine's built-in coverage collection API to measure actual code execution during end-to-end tests.

```bash
# Use default deployed app URL
npm run test:e2e:v8-coverage

# Automatically open the report
npm run test:e2e:v8-coverage:open

# Specify a custom deployed app URL
node process-v8-coverage.js --app-url=your-app-url.netlify.app

# Full example with running tests and specifying app URL
COVERAGE=true npx playwright test --project=chromium && node process-v8-coverage.js --app-url=my-app.netlify.app --open
```

### Using Different Deployed Environments

You can track coverage for different environments by specifying the app URL:

```bash
# For the production environment
npm run test:e2e:v8-coverage

# For a staging environment
npm run test:e2e:v8-coverage:staging

# For a custom environment
npm run test:e2e:v8-coverage:custom  # Edit package.json to customize the URL
```

### How it works

1. Our Playwright tests are run with the V8 coverage collection enabled
2. As tests execute, the V8 engine tracks which portions of the JavaScript code are executed
3. At the end of the tests, the coverage data is collected and processed
4. A report is generated showing the percentage of code that was executed

### Understanding the report

The coverage report shows:

- **Overall coverage percentage** for the entire application
- **Per-file coverage percentages** showing which files have the best and worst coverage
- **Byte-level granularity** which measures exactly which parts of the JavaScript code were executed

### Interpreting the results

- **High coverage (>75%)**: Files with high coverage are well-tested by our E2E tests
- **Medium coverage (50-75%)**: These files are partially covered but may need additional tests
- **Low coverage (<50%)**: These files have limited test coverage and should be prioritized for new tests

### Technical details

- Coverage is measured at the byte level, not line or statement level
- We use the V8 engine's built-in coverage API through Playwright's instrumentation
- Only files loaded during test execution are included in the report
- Our custom processor transforms the raw V8 coverage data into a user-friendly report
- The deployed app URL is configurable via the `--app-url` parameter

### Limitations

- Coverage is only measured for client-side JavaScript code
- We currently only run tests in Chromium (which uses V8)
- Code that is generated at runtime (e.g., through eval) may not be properly measured

## Implementation Files

- `e2e/base-test.ts`: Contains the custom test fixture that collects coverage data
- `e2e/global-setup.ts`: Sets up the environment for coverage collection
- `e2e/global-teardown.ts`: Processes and saves the coverage data
- `process-v8-coverage.js`: Processes the raw coverage data and generates reports
- `instrumentation.ts`: Next.js instrumentation hook for code coverage

## Future Improvements

- Add source mapping to map coverage back to original source files
- Add line-level coverage visualization
- Extend coverage to server-side code
- Support multiple browsers for coverage collection 