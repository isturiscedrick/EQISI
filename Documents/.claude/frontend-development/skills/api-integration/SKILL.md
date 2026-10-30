
---
name: api-integration
description: Integrate frontend applications with APIs using typed requests, authentication, data fetching, error handling, caching, and loading states.
---

# API Integration

## Purpose
Provide reliable communication between frontend applications and backend services.

## 1. Project Inspection
- Inspect existing API clients.
- Identify API configuration.
- Review existing service patterns.
- Identify authentication mechanisms.
- Review available response types.

## 2. API Organization
- Centralize API configuration.
- Separate API services from UI components.
- Reuse request utilities.
- Define request and response types.
- Avoid duplicated API logic.

## 3. Requests
- Use appropriate HTTP methods.
- Handle request parameters.
- Handle request bodies.
- Set appropriate headers.
- Handle response status codes.
- Handle network failures.
- Handle timeouts when appropriate.

## 4. Authentication
- Follow the existing authentication architecture.
- Handle expired sessions.
- Handle unauthorized responses.
- Avoid exposing secrets.
- Never hardcode private credentials.

## 5. UI Feedback
Every API-driven interface should consider:
- Loading state.
- Success state.
- Empty state.
- Error state.
- Retry behavior.
- Partial data when applicable.

## 6. Data Handling
- Validate untrusted responses when appropriate.
- Avoid assuming API data is always complete.
- Handle null and missing values.
- Prevent stale responses from overwriting newer data.
- Cancel obsolete requests when appropriate.

## 7. Security
- Use HTTPS.
- Never expose private API keys in frontend code.
- Never trust client-side authorization.
- Avoid logging sensitive data.
- Follow backend permission rules.

## 8. Checklist
- [ ] API configuration centralized.
- [ ] Types defined.
- [ ] Requests handled correctly.
- [ ] Authentication handled.
- [ ] Loading states implemented.
- [ ] Error states implemented.
- [ ] Empty responses handled.
- [ ] Sensitive information protected.

## Expected Output
A reliable, typed, maintainable API integration with appropriate user feedback.


## Language and Framework Compatibility

Adapt API communication to the project's existing stack.

Examples:

- JavaScript: Fetch API or existing HTTP clients.
- TypeScript: Typed requests and responses.
- Python: Existing HTTP clients and project conventions.
- PHP: Existing HTTP clients and service patterns.
- Java: Existing HTTP clients and framework services.
- Other languages: Use appropriate native or established libraries.

## API Client Selection

- Inspect existing API clients first.
- Reuse established request utilities.
- Follow existing authentication patterns.
- Use compatible serialization and validation.
- Respect the project's error-handling conventions.

## Rules

- Do not assume Axios or Fetch is already installed.
- Do not install another HTTP library unnecessarily.
- Do not expose backend credentials.
- Do not mix incompatible request patterns.
- Keep API logic separate from presentation where appropriate.

## Compatibility Checklist

- [ ] Existing API tools inspected.
- [ ] Compatible HTTP client selected.
- [ ] Request and response handling appropriate.
- [ ] Authentication conventions preserved.
- [ ] Error handling implemented.
