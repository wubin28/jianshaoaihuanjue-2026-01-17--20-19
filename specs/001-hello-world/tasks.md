# Tasks: Hello World Website

**Input**: Design documents from `/specs/001-hello-world/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, quickstart.md

**Tests**: Included per Constitution II. Testing Standards (test-first development required)

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1)
- Includes exact file paths in descriptions

## Path Conventions

Project root: `jianshaoaihuanjue-2026-01-17--21-22/`

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Create Next.js project and configure development environment

- [ ] T001 Create Next.js project by running `npx create-next-app@latest jianshaoaihuanjue-2026-01-17--21-22 --typescript --eslint --src-dir --app --no-tailwind --import-alias "@/*"`
- [ ] T002 Install testing dependencies: `npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom @types/jest` in jianshaoaihuanjue-2026-01-17--21-22/
- [ ] T003 [P] Create Jest configuration file in jianshaoaihuanjue-2026-01-17--21-22/jest.config.js
- [ ] T004 [P] Create Jest setup file in jianshaoaihuanjue-2026-01-17--21-22/jest.setup.js
- [ ] T005 Add test scripts to jianshaoaihuanjue-2026-01-17--21-22/package.json

**Checkpoint**: Project created with testing infrastructure ready

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Clean boilerplate and prepare for Hello World implementation

**⚠️ CRITICAL**: Must complete before User Story 1 can be implemented

- [ ] T006 Remove default boilerplate content from jianshaoaihuanjue-2026-01-17--21-22/src/app/page.tsx (keep minimal structure)
- [ ] T007 [P] Clean jianshaoaihuanjue-2026-01-17--21-22/src/app/globals.css to minimal styles with good contrast
- [ ] T008 [P] Update metadata in jianshaoaihuanjue-2026-01-17--21-22/src/app/layout.tsx (title: "Hello World")
- [ ] T009 Create test directory jianshaoaihuanjue-2026-01-17--21-22/__tests__/

**Checkpoint**: Foundation ready - clean slate for Hello World implementation

---

## Phase 3: User Story 1 - View Hello World Message (Priority: P1) 🎯 MVP

**Goal**: Display "Hello World" prominently on the main page when visitors access the website

**Independent Test**: Open http://localhost:3000 in a browser and verify "Hello World" text is visible and readable

### Tests for User Story 1 (Test-First per Constitution)

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T010 [US1] Write failing test: page renders "Hello World" text in jianshaoaihuanjue-2026-01-17--21-22/__tests__/page.test.tsx
- [ ] T011 [US1] Run tests to confirm T010 fails (Red phase of Red-Green-Refactor)

### Implementation for User Story 1

- [ ] T012 [US1] Implement Home page component displaying "Hello World" in jianshaoaihuanjue-2026-01-17--21-22/src/app/page.tsx
- [ ] T013 [US1] Run tests to confirm T010 now passes (Green phase)
- [ ] T014 [US1] Verify page works with JavaScript disabled (SSG/SSR renders content)

**Checkpoint**: User Story 1 complete - "Hello World" displays on main page

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Verify all requirements and ensure quality

- [ ] T015 Run `npm run dev` and manually verify http://localhost:3000 displays "Hello World"
- [ ] T016 [P] Run `npm run build` to verify production build succeeds
- [ ] T017 [P] Run `npm run lint` to verify no linting errors
- [ ] T018 Verify page renders correctly on mobile viewport (responsive check)
- [ ] T019 Verify color contrast meets WCAG 2.1 AA requirements (4.5:1 ratio)
- [ ] T020 Run quickstart.md verification checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS User Story 1
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **Polish (Phase 4)**: Depends on User Story 1 completion

### Within User Story 1

1. T010: Write failing test (MUST fail initially)
2. T011: Confirm test fails
3. T012: Implement page component
4. T013: Confirm test passes
5. T014: Verify SSR/SSG behavior

### Parallel Opportunities

**Setup Phase:**
```bash
# After T002 completes, run T003 and T004 in parallel:
Task: "Create Jest configuration file in jianshaoaihuanjue-2026-01-17--21-22/jest.config.js"
Task: "Create Jest setup file in jianshaoaihuanjue-2026-01-17--21-22/jest.setup.js"
```

**Foundational Phase:**
```bash
# After T006 completes, run T007, T008 in parallel:
Task: "Clean jianshaoaihuanjue-2026-01-17--21-22/src/app/globals.css to minimal styles"
Task: "Update metadata in jianshaoaihuanjue-2026-01-17--21-22/src/app/layout.tsx"
```

**Polish Phase:**
```bash
# Run T016 and T017 in parallel:
Task: "Run npm run build to verify production build succeeds"
Task: "Run npm run lint to verify no linting errors"
```

---

## Implementation Strategy

### MVP First (This Feature)

1. Complete Phase 1: Setup ✓ Creates working Next.js project
2. Complete Phase 2: Foundational ✓ Clean slate ready
3. Complete Phase 3: User Story 1 ✓ "Hello World" displays
4. **STOP and VALIDATE**: Verify in browser
5. Deploy/demo ready

### Single Story Feature

This feature has only one user story (P1). Once Phase 3 is complete, the MVP is delivered.

---

## Notes

- [P] tasks = different files, no dependencies within the phase
- [US1] label maps task to User Story 1
- Test-first development required per Constitution II
- Commit after each task or logical group
- Total tasks: 20
- Parallel opportunities: 6 (T003/T004, T007/T008, T016/T017)
