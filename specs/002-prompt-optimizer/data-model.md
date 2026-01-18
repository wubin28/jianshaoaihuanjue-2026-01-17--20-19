# Data Model: 减少AI幻觉 - 提示词优化工具

**Feature Branch**: `002-prompt-optimizer`
**Date**: 2026-01-18

## Overview

This feature has no persistent data storage. All state is ephemeral client-side React state. This document describes the component state model and the prompt template structure.

## Component State Model

### PromptOptimizerState

The main page component manages the following state:

| Field | Type | Description | Initial Value |
|-------|------|-------------|---------------|
| `inputText` | `string` | User's raw prompt text from textarea | `''` |
| `outputText` | `string` | Generated optimized prompt | `''` |
| `copyFeedback` | `string` | Copy button label text | `'复制'` |

### State Transitions

```
┌─────────────────┐
│   Initial       │
│ input: ''       │
│ output: ''      │
│ copy: '复制'    │
└────────┬────────┘
         │ User types
         ▼
┌─────────────────┐
│   Has Input     │
│ input: 'text'   │
│ output: ''      │
│ copy: '复制'    │
└────────┬────────┘
         │ Click "查询常识"
         ▼
┌─────────────────┐
│   Has Output    │
│ input: ''       │◄──────┐
│ output: 'opt'   │       │
│ copy: '复制'    │       │ User types new input
└────────┬────────┘       │
         │ Click "复制"   │
         ▼                │
┌─────────────────┐       │
│   Copied        │       │
│ input: ''       │───────┘
│ output: 'opt'   │
│ copy: '已复制'  │
└────────┬────────┘
         │ 2s timeout
         ▼
┌─────────────────┐
│   Reset Copy    │
│ copy: '复制'    │
└─────────────────┘
```

## Prompt Template Structure

### Template Entity

The anti-hallucination prompt template is a fixed structure:

```typescript
const PROMPT_TEMPLATE = {
  prefix: '你是专家。\n\n',
  suffix: '\n\n请提供主要观点的3个不同出处的网页链接以便我查验。如果你不知道或查不到，就实说，不要编造。'
};
```

### Optimized Prompt Generation

```typescript
function generateOptimizedPrompt(userInput: string): string {
  return `${PROMPT_TEMPLATE.prefix}${userInput}${PROMPT_TEMPLATE.suffix}`;
}
```

### Example Transformation

**Input**: `什么是量子计算`

**Output**:
```
你是专家。

什么是量子计算

请提供主要观点的3个不同出处的网页链接以便我查验。如果你不知道或查不到，就实说，不要编造。
```

## Validation Rules

### Input Validation

| Rule | Behavior |
|------|----------|
| Empty input | Ignore button click, do not generate output |
| Whitespace-only input | Treat as empty (trim before check) |
| Special characters | Preserve as-is |
| Newlines | Preserve as-is |
| Very long input (>10000 chars) | Allow, output area scrolls |

### Output Constraints

| Constraint | Enforcement |
|------------|-------------|
| Always includes prefix | Template-based generation |
| Always includes suffix | Template-based generation |
| User input unmodified | Direct string concatenation |

## No Persistence

This feature intentionally has no data persistence:

- ❌ No localStorage
- ❌ No sessionStorage
- ❌ No cookies
- ❌ No server-side storage
- ❌ No URL state

Rationale: Feature is a simple utility tool. Users generate and copy prompts immediately. No history or saved prompts needed per specification.

## Type Definitions

```typescript
// Component state type
interface PromptOptimizerState {
  inputText: string;
  outputText: string;
  copyFeedback: '复制' | '已复制' | '复制失败';
}

// Template structure (compile-time constant)
interface PromptTemplate {
  readonly prefix: string;
  readonly suffix: string;
}
```
