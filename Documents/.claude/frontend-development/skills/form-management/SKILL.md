
---
name: form-management
description: Build accessible frontend forms with validation, field-level errors, submission feedback, data preservation, and reliable user interactions.
---

# Form Management

## Purpose
Create forms that are understandable, accessible, and easy to complete.

## 1. Form Structure
- Use visible labels.
- Group related fields.
- Indicate required fields.
- Use appropriate input types.
- Provide helpful descriptions.
- Avoid placeholder-only labels.

## 2. Validation
- Validate required fields.
- Validate formats.
- Validate length constraints.
- Validate field relationships when needed.
- Use field-level validation.
- Validate on blur or input when appropriate.
- Revalidate on submission.

## 3. Error Messages
- Display errors near the relevant field.
- Explain what went wrong.
- Explain how to fix it.
- Avoid vague messages.
- Associate errors with their inputs.
- Preserve entered information.

## 4. Submission
- Prevent duplicate submissions.
- Display loading feedback.
- Disable submission when appropriate.
- Handle server validation errors.
- Show success feedback.
- Provide retry options for recoverable failures.

## 5. Accessibility
- Support keyboard navigation.
- Use appropriate labels.
- Maintain visible focus.
- Announce important validation feedback.
- Use accessible required indicators.

## 6. Security
- Never rely only on frontend validation.
- Avoid exposing sensitive data.
- Do not log passwords or private information.

## Checklist
- [ ] Labels are clear.
- [ ] Required fields identified.
- [ ] Validation works.
- [ ] Errors are contextual.
- [ ] User input is preserved.
- [ ] Loading feedback exists.
- [ ] Success feedback exists.
- [ ] Keyboard accessible.

## Expected Output
A reliable and accessible form experience.


## Framework-Aware Form Implementation

Adapt form implementation to the project's framework and language.

Examples:

- React: Controlled or uncontrolled forms and existing form libraries.
- Vue: Reactive form state and existing validation libraries.
- Angular: Template-driven or reactive forms.
- Svelte: Native reactive form patterns and compatible libraries.
- Vanilla JavaScript: Native HTML forms and browser validation APIs.
- Other frameworks: Use their established form patterns.

## Validation Compatibility

- Reuse existing validation tools.
- Use compatible schema validation when appropriate.
- Support client-side and server-side validation.
- Keep validation logic maintainable.
- Avoid introducing duplicate validation systems.

## Rules

- Never assume a particular form library.
- Preserve existing form conventions.
- Use native browser capabilities when sufficient.
- Never rely exclusively on client-side validation.

## Compatibility Checklist

- [ ] Form follows framework conventions.
- [ ] Validation library is compatible.
- [ ] Field errors are accessible.
- [ ] Submission states work.
- [ ] Server-side validation is handled.
