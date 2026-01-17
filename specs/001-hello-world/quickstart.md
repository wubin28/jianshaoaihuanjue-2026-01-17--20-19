# Quickstart: Hello World Website

**Feature**: 001-hello-world
**Date**: 2026-01-17

## Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun package manager

## Setup

### 1. Create the Next.js Project

From the repository root, run:

```bash
npx create-next-app@latest jianshaoaihuanjue-2026-01-17--21-22 --typescript --eslint --src-dir --app --no-tailwind --import-alias "@/*"
```

When prompted, accept the defaults or select:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: No
- `src/` directory: Yes
- App Router: Yes
- Import alias: @/*

### 2. Navigate to Project

```bash
cd jianshaoaihuanjue-2026-01-17--21-22
```

### 3. Install Testing Dependencies

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom @types/jest
```

### 4. Configure Jest

Create `jest.config.js` in the project root:

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
```

Create `jest.setup.js`:

```javascript
import '@testing-library/jest-dom';
```

### 5. Add Test Script

In `package.json`, ensure you have:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

## Development Workflow

### Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the website.

### Run Tests

```bash
npm test
```

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Key Files to Modify

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Main page displaying "Hello World" |
| `src/app/layout.tsx` | Root layout (metadata, fonts) |
| `src/app/globals.css` | Global styles (minimal) |
| `__tests__/page.test.tsx` | Test for page content |

## Verification Checklist

- [ ] `npm run dev` starts server without errors
- [ ] http://localhost:3000 displays "Hello World"
- [ ] `npm test` passes all tests
- [ ] `npm run build` completes successfully
- [ ] Page renders correctly in multiple browsers
- [ ] Page is readable on mobile devices
