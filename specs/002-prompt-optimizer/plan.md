# Implementation Plan: 减少AI幻觉 - 提示词优化工具

**Branch**: `002-prompt-optimizer` | **Date**: 2026-01-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-prompt-optimizer/spec.md`

## Summary

Build a prompt optimization tool that wraps user input with anti-hallucination prompts. Users enter their original prompt, click "查询常识" button, and receive an optimized prompt with prefix/suffix that asks AI for verifiable sources. The tool uses Next.js 16 App Router with React 19 client components, CSS Modules for styling with orange theme, and navigator.clipboard API for copy functionality.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+
**Primary Dependencies**: Next.js 16.1.3, React 19.2.3, React DOM 19.2.3
**Storage**: N/A (pure client-side state, no persistence)
**Testing**: Jest 30.x with @testing-library/react 16.x, @testing-library/jest-dom 6.x
**Target Platform**: Modern web browsers (desktop and mobile), supporting clipboard API
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: Instant response (<100ms for prompt generation, pure string concatenation)
**Constraints**: Client-side only, no backend required, responsive from 320px to 1920px
**Scale/Scope**: Single page application, single feature, minimal component count

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Status | Notes |
|-----------|-------------|--------|-------|
| I. Code Quality - Consistency | Follow ESLint config, TypeScript strict mode | PASS | Project has eslint.config.mjs configured |
| I. Code Quality - Clarity | Self-documenting code, meaningful names | PASS | Component and function names will be descriptive |
| I. Code Quality - Modularity | Single responsibility components | PASS | Simple feature with clear separation |
| I. Code Quality - No Dead Code | Remove unused code | PASS | Fresh implementation |
| I. Code Quality - Error Handling | Handle clipboard API failures gracefully | PASS | Will show user feedback on copy failure |
| II. Testing - Test-First | Write tests before implementation | PASS | Tests will cover acceptance scenarios |
| II. Testing - Coverage | Test critical paths and edge cases | PASS | Will test prompt generation, copy, empty input |
| II. Testing - Independence | Isolated, deterministic tests | PASS | Pure functions, no shared state |
| III. UX - Design System | Use existing CSS variables/patterns | PASS | Extend globals.css with orange theme tokens |
| III. UX - Accessibility | WCAG 2.1 AA, keyboard navigation | PASS | Semantic HTML, proper labels, focus states |
| III. UX - State Feedback | Loading/success indicators | PASS | Copy button feedback ("已复制") |
| IV. Performance - Response Time | <3s for user actions | PASS | Pure string operation, instant |
| IV. Performance - Resource Efficiency | No memory leaks | PASS | Simple state management |

**Gate Status**: PASS - All constitution principles satisfied

## Project Structure

### Documentation (this feature)

```text
specs/002-prompt-optimizer/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A - no API)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
jianshaoaihuanjue-2026-01-17--21-22/
├── src/
│   └── app/
│       ├── page.tsx           # Main page component (to be modified)
│       ├── page.module.css    # Page styles (to be modified)
│       ├── globals.css        # Global styles (add orange theme tokens)
│       └── layout.tsx         # Root layout (unchanged)
├── __tests__/
│   └── page.test.tsx          # Component tests (to be created/modified)
├── package.json
├── tsconfig.json
└── jest.config.mjs
```

**Structure Decision**: Single-page application within existing Next.js App Router structure. All changes contained to `src/app/` directory with tests in `__tests__/`.

## Complexity Tracking

> No violations requiring justification. Implementation is straightforward single-component feature.

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| State Management | useState only | Simple two-state form (input + output), no need for context or external state |
| Component Count | 1 page component | All functionality fits in single file, no premature abstraction |
| Styling | CSS Modules | Follows existing project pattern, scoped styles |
