# Research: 减少AI幻觉 - 提示词优化工具

**Feature Branch**: `002-prompt-optimizer`
**Date**: 2026-01-18

## Overview

This document captures research findings and technical decisions for the prompt optimizer feature. Given the feature's simplicity (pure client-side string manipulation), research scope is limited to clipboard API patterns and CSS theming approach.

## Research Items

### 1. Clipboard API Implementation

**Decision**: Use `navigator.clipboard.writeText()` with async/await

**Rationale**:
- Modern Clipboard API is supported in all target browsers (Chrome 66+, Firefox 63+, Safari 13.1+, Edge 79+)
- Provides clean Promise-based interface
- Requires secure context (HTTPS) or localhost, which Next.js dev server provides
- Graceful degradation: catch errors and show user feedback

**Alternatives Considered**:
- `document.execCommand('copy')` - Deprecated, synchronous, requires temporary textarea element
- Third-party libraries (clipboard.js) - Unnecessary dependency for simple use case

**Implementation Pattern**:
```typescript
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(outputText);
    setCopyFeedback('已复制');
    setTimeout(() => setCopyFeedback('复制'), 2000);
  } catch {
    setCopyFeedback('复制失败');
  }
};
```

### 2. Orange Theme Color System

**Decision**: Use `#f97316` (Tailwind orange-500) as primary accent color

**Rationale**:
- Meets WCAG 2.1 AA contrast requirements against white background (4.5:1 ratio for text)
- Consistent with modern design systems
- User specified "橙色作为点缀色（按钮、标题），白色/浅灰背景"

**Color Tokens**:
```css
--primary-orange: #f97316;      /* Buttons, title accent */
--primary-orange-hover: #ea580c; /* Button hover state */
--background-light: #fafafa;     /* Page background */
--surface-white: #ffffff;        /* Content areas */
--text-primary: #171717;         /* Main text */
--text-secondary: #525252;       /* Secondary text */
```

**Alternatives Considered**:
- `#ff6600` - Too saturated, less modern
- `#fb923c` (orange-400) - Lower contrast, accessibility concerns

### 3. Responsive Breakpoint Strategy

**Decision**: Desktop-first with 640px breakpoint

**Rationale**:
- User specified "桌面优先，640px 断点切换移动端布局"
- 640px aligns with Tailwind's `sm` breakpoint
- Covers most mobile devices in portrait mode

**Layout Changes at 640px**:
- Input area: horizontal (textarea + button side-by-side) → vertical (stacked)
- Button: right of textarea → below textarea, full width
- Output area: maintains scrollable container, adjusts padding

### 4. Client Component Architecture

**Decision**: Single 'use client' page component with useState

**Rationale**:
- Feature requires browser APIs (clipboard, event handlers)
- Simple state: `inputText`, `outputText`, `copyFeedback`
- No need for useReducer or external state management
- Next.js App Router requires explicit 'use client' directive for interactive components

**State Flow**:
```
User types → inputText state
Click button → generate outputText from template + inputText, clear inputText
Click copy → clipboard API, update copyFeedback temporarily
```

### 5. Empty Input Handling

**Decision**: Silently ignore empty input (no error message)

**Rationale**:
- User specified "系统应忽略空输入或显示提示信息"
- Simpler UX: button does nothing on empty input
- Visual cue: button appears slightly disabled/muted when input is empty
- No intrusive error modals or alerts

**Implementation**:
```typescript
const handleGenerate = () => {
  if (!inputText.trim()) return;
  // ... generate output
};
```

## Resolved Clarifications

All technical unknowns from the specification have been resolved through user-provided technical context:

| Item | Resolution |
|------|------------|
| Framework | Next.js 16 App Router (user specified) |
| State Management | React 19 useState (user specified) |
| Styling | CSS Modules (user specified) |
| Responsive breakpoint | 640px (user specified) |
| Copy feedback | Button text changes to "已复制" (user specified) |

## Dependencies

No new dependencies required. All functionality achievable with existing project setup:
- next: 16.1.3
- react: 19.2.3
- @testing-library/react: 16.3.1 (for tests)

## Next Steps

Proceed to Phase 1: Generate data-model.md and quickstart.md.
