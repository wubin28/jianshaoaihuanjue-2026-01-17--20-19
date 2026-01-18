# Tasks: 减少AI幻觉 - 提示词优化工具

**Input**: Design documents from `/specs/002-prompt-optimizer/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md, quickstart.md

**Tests**: Included per constitution (Test-First Development requirement)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Project root: `jianshaoaihuanjue-2026-01-17--21-22/`
- Source: `src/app/`
- Tests: `__tests__/`
- Styles: `src/app/*.css`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add orange theme tokens and base structure

- [ ] T001 Add orange theme CSS variables to `jianshaoaihuanjue-2026-01-17--21-22/src/app/globals.css`
- [ ] T002 [P] Update page base styles in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.module.css` with container layout

**Checkpoint**: Orange theme tokens available, base container styles ready

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core component structure and shared utilities that all user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T003 Add 'use client' directive and base component structure in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.tsx`
- [ ] T004 Define PROMPT_TEMPLATE constant and generateOptimizedPrompt function in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.tsx`
- [ ] T005 [P] Add title "减少AI幻觉" with orange styling in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.tsx`

**Checkpoint**: Foundation ready - component renders with title, template constant defined

---

## Phase 3: User Story 1 - 生成优化提示词 (Priority: P1) 🎯 MVP

**Goal**: User enters prompt text, clicks "查询常识" button, sees optimized prompt in output area, input clears

**Independent Test**: Enter any text, click button, verify output shows prefix + input + suffix, input is cleared

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T006 [P] [US1] Write test: clicking button with input generates optimized prompt in `jianshaoaihuanjue-2026-01-17--21-22/__tests__/page.test.tsx`
- [ ] T007 [P] [US1] Write test: input clears after generation in `jianshaoaihuanjue-2026-01-17--21-22/__tests__/page.test.tsx`
- [ ] T008 [P] [US1] Write test: empty input ignored when button clicked in `jianshaoaihuanjue-2026-01-17--21-22/__tests__/page.test.tsx`
- [ ] T009 [P] [US1] Write test: new generation replaces previous output in `jianshaoaihuanjue-2026-01-17--21-22/__tests__/page.test.tsx`

### Implementation for User Story 1

- [ ] T010 [US1] Add inputText and outputText state with useState in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.tsx`
- [ ] T011 [US1] Add textarea for input with onChange handler in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.tsx`
- [ ] T012 [US1] Add "查询常识" button with onClick handler in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.tsx`
- [ ] T013 [US1] Implement handleGenerate: validate input, generate output, clear input in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.tsx`
- [ ] T014 [US1] Add output display area above input in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.tsx`
- [ ] T015 [P] [US1] Add styles for textarea, button, output area in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.module.css`
- [ ] T016 [US1] Add scrollable overflow for output area in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.module.css`
- [ ] T017 [US1] Run tests and verify all US1 tests pass

**Checkpoint**: User Story 1 fully functional - can enter text, generate optimized prompt, input clears

---

## Phase 4: User Story 2 - 一键复制优化提示词 (Priority: P2)

**Goal**: User clicks copy button, output text copied to clipboard, visual feedback shown

**Independent Test**: With output present, click copy button, verify clipboard content and "已复制" feedback

### Tests for User Story 2

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T018 [P] [US2] Write test: copy button copies output to clipboard in `jianshaoaihuanjue-2026-01-17--21-22/__tests__/page.test.tsx`
- [ ] T019 [P] [US2] Write test: copy button shows "已复制" feedback temporarily in `jianshaoaihuanjue-2026-01-17--21-22/__tests__/page.test.tsx`
- [ ] T020 [P] [US2] Write test: copy button disabled/hidden when no output in `jianshaoaihuanjue-2026-01-17--21-22/__tests__/page.test.tsx`

### Implementation for User Story 2

- [ ] T021 [US2] Add copyFeedback state for button label in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.tsx`
- [ ] T022 [US2] Implement handleCopy with navigator.clipboard.writeText in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.tsx`
- [ ] T023 [US2] Add copy button in output area with conditional display in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.tsx`
- [ ] T024 [US2] Add 2-second timeout to reset copyFeedback in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.tsx`
- [ ] T025 [US2] Handle clipboard API failure with error feedback in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.tsx`
- [ ] T026 [P] [US2] Add styles for copy button and feedback states in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.module.css`
- [ ] T027 [US2] Run tests and verify all US2 tests pass

**Checkpoint**: User Story 2 fully functional - copy button works, shows feedback

---

## Phase 5: User Story 3 - 响应式界面体验 (Priority: P3)

**Goal**: Layout adapts to screen size - horizontal on desktop, vertical stacked on mobile

**Independent Test**: Resize browser from 320px to 1920px, verify layout changes at 640px breakpoint

### Tests for User Story 3

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T028 [P] [US3] Write test: component renders correctly at different viewport widths in `jianshaoaihuanjue-2026-01-17--21-22/__tests__/page.test.tsx`

### Implementation for User Story 3

- [ ] T029 [US3] Add desktop-first layout styles (input + button horizontal) in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.module.css`
- [ ] T030 [US3] Add @media query for max-width 640px breakpoint in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.module.css`
- [ ] T031 [US3] Implement mobile layout (vertical stack, full-width button) in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.module.css`
- [ ] T032 [US3] Adjust padding and spacing for mobile in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.module.css`
- [ ] T033 [US3] Verify touch-friendly button sizes (min 44px tap target) in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.module.css`
- [ ] T034 [US3] Run tests and manual responsive testing

**Checkpoint**: User Story 3 complete - responsive layout works 320px to 1920px

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements affecting all user stories

- [ ] T035 [P] Add accessibility attributes (aria-label, role) in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.tsx`
- [ ] T036 [P] Add keyboard navigation support (Enter to submit) in `jianshaoaihuanjue-2026-01-17--21-22/src/app/page.tsx`
- [ ] T037 Run full test suite with `npm test`
- [ ] T038 Run linter with `npm run lint` and fix any issues
- [ ] T039 Verify build passes with `npm run build`
- [ ] T040 Manual end-to-end validation per quickstart.md acceptance criteria

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup (T001 for theme tokens)
- **User Story 1 (Phase 3)**: Depends on Foundational (T003, T004, T005)
- **User Story 2 (Phase 4)**: Depends on Foundational; integrates with US1 output state
- **User Story 3 (Phase 5)**: Depends on Setup styles; can run parallel to US1/US2 in separate CSS file
- **Polish (Phase 6)**: Depends on all user stories complete

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies on other stories - MVP deliverable
- **User Story 2 (P2)**: Uses `outputText` state from US1 - can be implemented after US1 or in parallel with careful coordination
- **User Story 3 (P3)**: Pure CSS - can be implemented in parallel with US1/US2

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- State and logic before UI elements
- UI elements before styling
- Story complete before checkpoint

### Parallel Opportunities

**Setup Phase**:
```
T001 (globals.css) || T002 (page.module.css base)
```

**User Story 1 Tests**:
```
T006 || T007 || T008 || T009 (all in same test file, different test blocks)
```

**User Story 2 Tests**:
```
T018 || T019 || T020
```

**User Story 3** can run parallel to US1/US2 implementation (CSS only)

**Polish Phase**:
```
T035 || T036 (both in page.tsx but different concerns)
```

---

## Parallel Example: User Story 1

```bash
# Launch all US1 tests together (write tests first):
Task: T006 - test button generates optimized prompt
Task: T007 - test input clears after generation
Task: T008 - test empty input ignored
Task: T009 - test new generation replaces output

# After tests written and failing, implement in order:
# T010 → T011 → T012 → T013 → T014 (sequential, same file)
# T015 can run parallel (different file - CSS)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T002)
2. Complete Phase 2: Foundational (T003-T005)
3. Complete Phase 3: User Story 1 (T006-T017)
4. **STOP and VALIDATE**: Test prompt generation independently
5. Deploy/demo - core feature is functional!

### Incremental Delivery

1. Setup + Foundational → Basic page with title
2. Add User Story 1 → Can generate optimized prompts (MVP!)
3. Add User Story 2 → Can copy prompts to clipboard
4. Add User Story 3 → Works on all devices
5. Polish → Production-ready

### Suggested MVP Scope

**User Story 1 only** delivers core value:
- Users can enter prompts
- Users can generate anti-hallucination wrapped prompts
- Can manually copy from output area

This is deployable and useful before US2 (copy button) and US3 (responsive) are complete.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- All paths relative to `jianshaoaihuanjue-2026-01-17--21-22/`
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
