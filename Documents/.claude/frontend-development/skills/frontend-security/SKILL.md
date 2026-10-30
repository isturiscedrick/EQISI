
---
name: frontend-security
description: Apply secure frontend development practices covering XSS, unsafe input handling, authentication, secrets, dependencies, and sensitive data.
---

# Frontend Security

## Purpose
Reduce frontend security risks and protect user information.

## 1. Input and Output
- Treat external data as untrusted.
- Validate input.
- Use appropriate output encoding.
- Avoid unsafe HTML injection.
- Avoid eval and similar dynamic execution.
- Sanitize HTML only when rich HTML is genuinely required.

## 2. XSS Prevention
- Prefer safe framework rendering.
- Avoid direct DOM manipulation with untrusted values.
- Avoid unsafe HTML rendering APIs.
- Review third-party content.
- Use a suitable Content Security Policy.

## 3. Secrets
- Never place private API keys in frontend bundles.
- Never hardcode passwords or tokens.
- Use backend services for private credentials.
- Avoid exposing sensitive values in logs.
- Understand that frontend environment variables may be publicly visible.

## 4. Authentication
- Follow secure backend authentication patterns.
- Handle session expiration.
- Handle unauthorized requests.
- Avoid insecure token persistence.
- Protect sensitive routes through server-side authorization.
- Never rely on frontend checks as the only access control.

## 5. Dependencies
- Inspect dependency sources.
- Avoid unnecessary packages.
- Review security advisories.
- Keep packages updated.
- Avoid untrusted scripts.

## 6. Data Privacy
- Avoid collecting unnecessary personal information.
- Avoid exposing sensitive data in URLs.
- Avoid logging private user information.
- Handle personal information appropriately.

## 7. Checklist
- [ ] No exposed private secrets.
- [ ] Untrusted input handled safely.
- [ ] No unsafe HTML injection.
- [ ] Authentication handled appropriately.
- [ ] Authorization enforced by backend.
- [ ] Dependencies reviewed.
- [ ] Sensitive data protected.

## Expected Output
A frontend implementation that follows secure development practices and does not introduce avoidable security risks.


## Language-Specific Security

Adapt security practices to the programming language and framework.

- Follow language-specific security conventions.
- Use safe input and output handling.
- Avoid unsafe dynamic execution.
- Use appropriate encoding and sanitization.
- Follow framework security recommendations.
- Inspect dependency vulnerabilities.
- Review server-side security boundaries.

## Framework Security

- Use framework-native protections when available.
- Avoid bypassing built-in security mechanisms.
- Review unsafe HTML rendering.
- Handle authentication appropriately.
- Follow secure session management.
- Enforce authorization on the backend.

## Rules

- Never assume one security solution works for every language.
- Never expose private credentials.
- Never trust client-side validation as a security boundary.
- Never disable security protections to bypass errors.

## Compatibility Checklist

- [ ] Language security conventions followed.
- [ ] Framework security features reviewed.
- [ ] External data handled safely.
- [ ] Secrets protected.
- [ ] Dependencies reviewed.
- [ ] Backend authorization respected.
