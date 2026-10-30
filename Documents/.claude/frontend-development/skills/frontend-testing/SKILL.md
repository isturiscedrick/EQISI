
---
name: frontend-testing
description: Test frontend applications through unit tests, component tests, integration tests, end-to-end testing, accessibility checks, and responsive verification.
---

# Frontend Testing

## Purpose
Verify that frontend features behave correctly and remain reliable.

## 1. Testing Strategy
Choose appropriate testing levels:
- Unit testing.
- Component testing.
- Integration testing.
- End-to-end testing.
- Accessibility testing.
- Visual regression testing when useful.

## 2. Component Testing
Test:
- Default rendering.
- User interactions.
- Input handling.
- Loading states.
- Error states.
- Disabled states.
- Conditional rendering.

## 3. Form Testing
Test:
- Required fields.
- Invalid formats.
- Valid submissions.
- Server-side errors.
- Duplicate submissions.
- Success feedback.

## 4. API Testing
Test:
- Successful requests.
- Failed requests.
- Unauthorized responses.
- Empty responses.
- Loading behavior.
- Network failures.

## 5. Responsive Testing
Test:
- Mobile.
- Tablet.
- Desktop.
- Navigation.
- Forms.
- Dialogs.
- Overflow.

## 6. Accessibility Testing
Test:
- Keyboard navigation.
- Focus indicators.
- Form labels.
- Heading hierarchy.
- Accessible names.
- Color contrast.

## 7. Testing Rules
- Inspect existing test tools.
- Follow existing conventions.
- Prefer meaningful assertions.
- Avoid brittle tests.
- Do not modify unrelated tests.
- Report untested behavior.
- Never claim tests passed unless executed successfully.

## Checklist
- [ ] Relevant unit tests.
- [ ] Component behavior tested.
- [ ] Important user journeys tested.
- [ ] Forms tested.
- [ ] Error states tested.
- [ ] Responsive behavior tested.
- [ ] Accessibility reviewed.
- [ ] Build verified.

## Expected Output
A tested frontend implementation with clearly documented remaining issues.


## Framework-Aware Testing

Use testing tools compatible with the existing project.

Examples:

- JavaScript: Jest, Vitest, or existing test tools.
- React: React Testing Library and compatible tools.
- Vue: Vue Test Utils and compatible tools.
- Angular: Angular testing utilities.
- Svelte: Svelte Testing Library.
- Browser testing: Playwright or Cypress.
- Python: pytest or unittest.
- PHP: PHPUnit.
- Java: JUnit.
- Other languages: Appropriate established testing tools.

These are examples only.

## Testing Rules

- Inspect existing test configuration.
- Reuse existing testing libraries.
- Follow established testing conventions.
- Avoid installing duplicate testing frameworks.
- Test user-visible behavior.
- Adapt test structure to the framework.
- Report tests that could not be executed.

## Compatibility Checklist

- [ ] Existing testing tools identified.
- [ ] Framework-compatible tests used.
- [ ] Test configuration preserved.
- [ ] Relevant user flows tested.
- [ ] Tests executed when possible.
- [ ] Results reported accurately.
