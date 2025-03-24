# SauceDemo E-Commerce Test Automation

This repository contains automated tests for the SauceDemo e-commerce website using Playwright with TypeScript and Page Object Model design pattern.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone this repository:
   ```
   git clone https://github.com/qualicion/noah-tests
   cd noah-test
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Install Playwright browsers:
   ```
   npx playwright install
   ```

## Project Structure

```
tests/
├── pages/             # Page Object classes
│   ├── BasePage.ts    # Base page with common functionality
│   ├── LoginPage.ts   # Login page interactions
│   ├── InventoryPage.ts  # Product listing page
│   ├── CartPage.ts    # Shopping cart page
│   └── CheckoutPage.ts # Checkout process page
└── specs/             # Test specifications
    └── checkout.spec.ts # Checkout flow test
```

## Running Tests

### Run all tests

```
npx playwright test
```

### Run specific test file

```
npx playwright test tests/specs/checkout.spec.ts
```

### Run tests in UI mode

```
npx playwright test --ui
```

### Run tests with specific browser

```
npx playwright test --project=chromium
```

## Viewing Test Reports

After running tests, you can view the HTML report:

```
npx playwright show-report
```

## Debugging Tests

1. Run test in debug mode:
   ```
   npx playwright test tests/specs/checkout.spec.ts --debug
   ```

2. Use UI mode for visual debugging:
   ```
   npx playwright test --ui
   ```

## Creating New Tests

1. Create appropriate page objects in the `pages` directory if needed
2. Create a new test file in the `specs` directory
3. Follow the Page Object pattern by importing and using the page classes
4. Use descriptive test and function names


## Troubleshooting
- Run tests in headed mode to visually see what's happening: `npx playwright test --headed`