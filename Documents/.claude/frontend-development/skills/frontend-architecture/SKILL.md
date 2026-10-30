
---
name: frontend-architecture
description: Design maintainable frontend architectures, folder structures, module boundaries, separation of concerns, and scalable project organization.
---

# Frontend Architecture

## Purpose
Organize frontend projects to support maintainability, readability, and future development.

## 1. Project Inspection
Before changing architecture:
- Inspect the repository.
- Identify framework conventions.
- Review package.json.
- Identify entry points.
- Inspect existing folder structure.
- Understand routing and data flow.

## 2. Organization
Organize code by responsibility or feature.

Common areas:
- Components.
- Pages or routes.
- Layouts.
- Hooks.
- Services.
- Utilities.
- Constants.
- Types.
- Assets.
- Styles.

## 3. Separation of Concerns
- Keep UI separate from data access when appropriate.
- Keep business logic organized.
- Avoid oversized components.
- Avoid circular dependencies.
- Keep shared code reusable.

## 4. Naming
- Use descriptive names.
- Follow existing conventions.
- Maintain consistent file naming.
- Avoid unclear abbreviations.

## 5. Scalability
- Keep modules cohesive.
- Avoid premature abstractions.
- Introduce architectural complexity only when justified.
- Prefer simple solutions for simple projects.

## 6. Dependencies
- Inspect installed packages first.
- Avoid unnecessary libraries.
- Prefer existing project tools.
- Check compatibility before adding packages.

## 7. Checklist
- [ ] Existing structure inspected.
- [ ] Clear module boundaries.
- [ ] Consistent naming.
- [ ] No unnecessary duplication.
- [ ] No circular dependencies.
- [ ] Dependencies justified.
- [ ] Architecture matches project complexity.

## Expected Output
A clear, maintainable frontend architecture that follows framework conventions.


## Language and Framework Compatibility

- Adapt folder structures to the active framework.
- Follow language-specific conventions.
- Respect existing module systems.
- Use appropriate import and export patterns.
- Follow framework-specific routing conventions.
- Use compatible configuration and build tools.
- Respect existing architectural patterns.

## Technology Rules

- Do not assume React, Next.js, or TypeScript.
- Do not force a specific folder structure.
- Do not introduce competing architecture patterns.
- Do not migrate frameworks without approval.
- Prefer the framework's established conventions.

## Compatibility Checklist

- [ ] Language conventions followed.
- [ ] Framework architecture followed.
- [ ] Module boundaries appropriate.
- [ ] Configuration preserved.
- [ ] Existing architecture respected.
