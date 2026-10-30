---
name: technology-stack-adaptation
description: Detect and adapt to the programming languages, frontend frameworks, backend technologies, styling systems, libraries, package managers, and tools used by any project.
---

# Technology Stack Adaptation

## Purpose

Ensure frontend development works across different programming languages, frameworks, libraries, and development environments.

Never assume a project uses a particular technology.

## 1. Supported Technologies

### Programming Languages
- JavaScript
- TypeScript
- HTML
- CSS
- Python
- PHP
- Java
- C#
- Go
- Ruby
- Other project-supported languages

### Frontend Frameworks
- React
- Next.js
- Vue
- Nuxt
- Angular
- Svelte
- SvelteKit
- Astro
- Other frameworks

### Styling Systems
- Vanilla CSS
- SCSS
- Sass
- Tailwind CSS
- Bootstrap
- CSS Modules
- Styled Components
- CSS-in-JS
- Other styling technologies

### Backend Technologies
- Node.js
- Express
- Laravel
- Django
- Flask
- Spring Boot
- Other backend frameworks

### Package Managers
- npm
- pnpm
- yarn
- bun
- pip
- Composer
- Maven
- Gradle
- Other package managers

## 2. Project Inspection

Before implementation:

1. Inspect the project directory.
2. Identify programming languages.
3. Identify frontend and backend frameworks.
4. Inspect dependency and configuration files.
5. Identify the package manager.
6. Identify the styling system.
7. Inspect existing architecture.
8. Identify testing tools.
9. Review established naming conventions.
10. Understand how the application is built and executed.

Use actual project files as the source of truth.

## 3. Implementation Rules

- Use the project's established language.
- Follow framework conventions.
- Use compatible libraries.
- Follow existing formatting and naming conventions.
- Use appropriate language-specific patterns.
- Preserve the current architecture.
- Avoid unnecessary migrations.
- Avoid introducing competing technologies.

## 4. New Project Rules

When starting from scratch:

1. Understand project requirements.
2. Identify the application type.
3. Determine technical requirements.
4. Recommend a suitable stack when necessary.
5. Explain significant trade-offs.
6. Obtain approval for major unresolved technology choices.
7. Keep the selected stack consistent.

## 5. Existing Project Rules

When modifying an existing project:

- Inspect before changing.
- Reuse existing dependencies.
- Follow established conventions.
- Do not rewrite working architecture without justification.
- Do not introduce another framework unnecessarily.
- Do not change package managers without approval.
- Do not convert programming languages without approval.

## 6. Compatibility With Other Skills

All frontend skills must adapt to the active project.

- UI/UX: Maintain consistent design principles regardless of framework.
- Design systems: Use the existing styling and token system.
- Components: Follow framework-native component patterns.
- Architecture: Follow language and framework conventions.
- State management: Use compatible state-management approaches.
- Forms: Use compatible validation and form libraries.
- APIs: Follow existing HTTP and data-fetching patterns.
- Performance: Apply framework-specific optimizations.
- Security: Apply language and framework security practices.
- Testing: Use the project's existing testing tools.
- SEO: Follow the framework's rendering and metadata conventions.

## 7. Dependency Management

Before installing a dependency:

1. Check whether the project already has a suitable library.
2. Check compatibility.
3. Consider maintenance and security.
4. Explain why the dependency is needed.
5. Avoid unnecessary installations.

Never assume a particular package manager.

## 8. Avoid

- Assuming every project uses React.
- Assuming every project uses TypeScript.
- Assuming every project uses Tailwind CSS.
- Assuming every project uses npm.
- Mixing incompatible frameworks.
- Introducing unnecessary dependencies.
- Rewriting the architecture without justification.
- Ignoring existing project conventions.

## 9. Quality Checklist

- [ ] Languages identified.
- [ ] Frameworks identified.
- [ ] Styling system identified.
- [ ] Package manager identified.
- [ ] Dependencies inspected.
- [ ] Existing conventions followed.
- [ ] Implementation compatible with the stack.
- [ ] No unnecessary technologies introduced.
- [ ] Relevant testing tools identified.

## Expected Output

A functional, maintainable implementation that follows the project's existing languages, frameworks, libraries, architecture, and development conventions.