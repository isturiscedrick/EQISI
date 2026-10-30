
---
name: state-management
description: Manage frontend local state, shared state, server state, URL state, caching, and predictable application updates.
---

# State Management

## Purpose
Manage application data and UI state predictably without unnecessary complexity.

## 1. State Classification
Identify:
- Local component state.
- Shared UI state.
- Server state.
- URL state.
- Form state.
- Persistent state.

## 2. State Placement
- Keep state close to its consumers.
- Use shared state only when necessary.
- Avoid duplicated sources of truth.
- Keep derived values derived instead of storing duplicates.
- Use URL parameters for shareable filters and navigation state when appropriate.

## 3. Server State
- Handle loading.
- Handle errors.
- Handle empty responses.
- Handle stale data.
- Consider caching.
- Avoid unnecessary requests.
- Handle request cancellation when appropriate.

## 4. UI State
Consider:
- Modal visibility.
- Active tabs.
- Dropdown state.
- Selected items.
- Filters.
- Pagination.
- Notifications.

## 5. Best Practices
- Follow existing state-management libraries.
- Avoid unnecessary global state.
- Avoid excessive prop drilling.
- Keep updates predictable.
- Prevent race conditions.
- Keep state transitions understandable.

## 6. Checklist
- [ ] State ownership is clear.
- [ ] No unnecessary duplicated state.
- [ ] Loading states handled.
- [ ] Error states handled.
- [ ] Server data handled correctly.
- [ ] State updates predictable.
- [ ] Unnecessary rerenders avoided.

## Expected Output
A predictable and maintainable state-management implementation.


## Framework-Aware State Management

Choose state-management patterns according to the active technology.

Examples:

- React: useState, useReducer, Context, or established state libraries.
- Vue: ref, reactive, computed, Pinia, or existing stores.
- Angular: Signals, services, RxJS, or established state solutions.
- Svelte: Native reactive state and appropriate stores.
- Vanilla JavaScript: Modules, objects, and event-based patterns.
- Other frameworks: Follow their recommended state-management approach.

## Rules

- Do not introduce a new state library unnecessarily.
- Follow existing state-management conventions.
- Avoid duplicated sources of truth.
- Keep state close to its consumers.
- Separate server state from UI state when appropriate.
- Handle asynchronous updates safely.

## Compatibility Checklist

- [ ] Framework state conventions followed.
- [ ] Existing libraries reused.
- [ ] State ownership clear.
- [ ] No unnecessary global state.
- [ ] Asynchronous updates handled correctly.
