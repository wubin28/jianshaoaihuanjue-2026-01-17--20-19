# Quickstart: 减少AI幻觉 - 提示词优化工具

**Feature Branch**: `002-prompt-optimizer`
**Date**: 2026-01-18

## Prerequisites

- Node.js 18+
- npm or equivalent package manager
- Modern browser with clipboard API support

## Getting Started

### 1. Switch to Feature Branch

```bash
git checkout 002-prompt-optimizer
```

### 2. Install Dependencies

```bash
cd jianshaoaihuanjue-2026-01-17--21-22
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Tests

```bash
npm test
```

Watch mode for development:
```bash
npm run test:watch
```

### 5. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
jianshaoaihuanjue-2026-01-17--21-22/
├── src/app/
│   ├── page.tsx          # Main page component
│   ├── page.module.css   # Page-specific styles
│   ├── globals.css       # Global styles + orange theme tokens
│   └── layout.tsx        # Root layout
├── __tests__/
│   └── page.test.tsx     # Component tests
└── package.json
```

## Key Files to Modify

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Replace with prompt optimizer component |
| `src/app/page.module.css` | Add styles for input/output areas, buttons |
| `src/app/globals.css` | Add orange theme CSS variables |
| `__tests__/page.test.tsx` | Add tests for acceptance scenarios |

## Development Workflow

1. **Write tests first** (per constitution): Define test cases for acceptance scenarios
2. **Implement component**: Build the UI and state logic
3. **Style the component**: Apply orange theme and responsive layout
4. **Verify tests pass**: Run `npm test`
5. **Lint check**: Run `npm run lint`
6. **Manual testing**: Test on different screen sizes and browsers

## Feature Acceptance Criteria

### P1: Prompt Generation
- [ ] Input textarea accepts multiline text
- [ ] "查询常识" button generates optimized prompt
- [ ] Output shows prefix + user input + suffix
- [ ] Input clears after generation
- [ ] Output replaces previous content (not append)

### P2: Copy Functionality
- [ ] Copy button copies output to clipboard
- [ ] Button shows "已复制" feedback for 2 seconds
- [ ] Copy button disabled/hidden when no output

### P3: Responsive Design
- [ ] Desktop: horizontal layout (input + button side by side)
- [ ] Mobile (≤640px): vertical stacked layout
- [ ] Works from 320px to 1920px width

### Visual Design
- [ ] Title "减少AI幻觉" in orange
- [ ] Orange accent on buttons
- [ ] White/light gray background
- [ ] Output area is scrollable

## Testing Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- page.test.tsx

# Run with coverage
npm test -- --coverage
```

## Common Issues

### Clipboard API Not Working
- Ensure you're on localhost or HTTPS
- Check browser permissions for clipboard access
- Fallback: Show error message "复制失败"

### Tests Failing with Act Warning
- Wrap state updates in `act()` from @testing-library/react
- Use `await` for async operations like clipboard

### Styles Not Applying
- Verify CSS Module import: `import styles from './page.module.css'`
- Check class name usage: `className={styles.className}`
