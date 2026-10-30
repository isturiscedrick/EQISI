
---
name: component-development
description: Create reusable, accessible, typed, maintainable frontend components with consistent props, variants, composition, and interaction states.
---

# Component Development

## Purpose
Build reusable UI components that maintain consistency and reduce duplicated code.

## 1. Component Principles
- Give each component a clear responsibility.
- Use descriptive names.
- Keep components understandable.
- Prefer composition when appropriate.
- Avoid unnecessary abstraction.
- Reuse existing components before creating new ones.

## 2. Props and Types
- Define clear prop interfaces.
- Use TypeScript when available.
- Provide sensible defaults.
- Avoid overly complicated prop APIs.
- Avoid unnecessary optional props.
- Use discriminated unions for complex variants when useful.

## 3. Component Organization
Organize by responsibility:
- UI components.
- Layout components.
- Shared components.
- Feature-specific components.

Follow the existing project architecture.

## 4. Component States
Consider:
- Default.
- Hover.
- Focus.
- Active.
- Disabled.
- Loading.
- Error.
- Selected.
- Empty.

## 5. Reusability
- Avoid duplicated logic.
- Keep visual variants consistent.
- Separate reusable logic where appropriate.
- Avoid creating components that are more complicated than their use case.

## 6. Accessibility
- Use semantic HTML.
- Support keyboard interaction.
- Provide accessible names.
- Maintain visible focus.
- Support screen readers.

## 7. Documentation
Document:
- Component purpose.
- Props.
- Variants.
- Important behavior.
- Usage examples when useful.

## Checklist
- [ ] Clear responsibility.
- [ ] Appropriate naming.
- [ ] Typed props.
- [ ] Reusable structure.
- [ ] Accessible behavior.
- [ ] All relevant states handled.
- [ ] No unnecessary duplication.

## Expected Output
A reusable and maintainable component that follows project conventions.


## Framework-Aware Components

Implement components according to the project's technology.

Examples:

- React: Functional components and appropriate hooks.
- Vue: Single-file components and Composition API when appropriate.
- Angular: Components, templates, services, and dependency injection.
- Svelte: Svelte components and reactive patterns.
- Web Components: Custom elements and native browser APIs.
- Vanilla JavaScript: Reusable functions and DOM composition.
- Other frameworks: Follow their established component conventions.

These are examples, not mandatory choices.

## Language Compatibility

- Use the existing programming language.
- Use appropriate types when supported.
- Follow the framework's component lifecycle.
- Use framework-native event handling.
- Follow established styling conventions.
- Maintain accessibility.

## Rules

- Never force React component patterns into other frameworks.
- Never introduce a new component library unnecessarily.
- Reuse existing components where appropriate.

## Compatibility Checklist

- [ ] Component follows framework conventions.
- [ ] Language syntax is appropriate.
- [ ] Props or equivalent inputs are handled correctly.
- [ ] Events are handled correctly.
- [ ] Component states are supported.
- [ ] Accessibility is maintained.

