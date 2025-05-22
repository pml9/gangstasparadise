# End-to-End (E2E) Tests

This directory contains end-to-end tests for the SkillConnect application using Playwright.

## Test Structure

- **dashboard.spec.ts**: Tests for the dashboard page functionality
- **deployed-app.spec.ts**: Tests for the deployed application to verify it's working correctly

## Running Tests

To run all tests:

```bash
npx playwright test
```

To run a specific test file:

```bash
npx playwright test e2e/dashboard.spec.ts
```

To run in debug mode:

```bash
npx playwright test --debug
```

To view the test report:

```bash
npx playwright show-report
```

## Code Coverage

Code coverage support has been added to show what parts of the application are covered by E2E tests. To run tests with coverage:

```bash
npm run test:e2e:coverage
```

To run tests with coverage and automatically open the coverage report:

```bash
npm run test:e2e:coverage:open
```

The coverage report will be saved to `coverage/e2e/index.html`.

### How Code Coverage Works

1. Before tests run, the coverage setup script creates necessary directories
2. During tests, coverage data is collected using the base-test.ts wrapper
3. After tests complete, the coverage report is generated with c8

## Test Implementation Strategy

### Dashboard Tests

The dashboard tests use a mock HTML approach rather than relying on real API calls:

- Tests create a mock HTML response that simulates the dashboard UI
- This approach isolates tests from API changes and ensures consistent test results
- Elements use data-testid attributes for reliable selection

### Deployed App Tests

These tests verify that the deployed application is functioning correctly:

- Basic validation of page load and structure
- Resilient to redirects and navigation
- Uses page.evaluate() for safe DOM inspection when needed

## Best Practices

When writing new E2E tests, follow these guidelines:

1. **Use data-testid attributes**: Add data-testid attributes to components for reliable selection
2. **Isolate from APIs**: When possible, mock API responses or use static content
3. **Handle async properly**: Use proper async/await patterns and wait for elements to be available
4. **Make tests resilient**: Account for redirects, navigation, and timing issues
5. **Use appropriate timeouts**: Extend timeouts for slow operations with test.slow()
6. **Minimize dependencies**: Avoid depending on specific text content that might change

## Configuration

The Playwright configuration is in `playwright.config.ts` at the project root. It includes:

- Browser configurations (currently Chrome/Chromium)
- Timeouts for actions and navigation
- Screenshot capturing on test failures
- Support for local development server testing 