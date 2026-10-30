
---
name: code-review
description: Review frontend implementations for bugs, maintainability, accessibility, security, performance, architecture, and adherence to project standards.
---

# Frontend Code Review

## Purpose
Identify problems before code is considered complete or merged.

## 1. Review Priority
Review in this order:
1. Functional correctness.
2. Security vulnerabilities.
3. Data handling problems.
4. Accessibility issues.
5. Responsive problems.
6. Performance issues.
7. Maintainability.
8. Consistency.

## 2. Code Quality
Check:
- Duplicate code.
- Unnecessary complexity.
- Poor naming.
- Oversized components.
- Incorrect types.
- Unused code.
- Unnecessary dependencies.
- Inconsistent conventions.

## 3. UI/UX Review
Check:
- Visual hierarchy.
- Color contrast.
- Typography.
- Spacing.
- Responsive behavior.
- Loading states.
- Empty states.
- Error states.
- Interaction feedback.

## 4. Accessibility Review
Check:
- Semantic HTML.
- Keyboard navigation.
- Focus visibility.
- Accessible labels.
- Dialog behavior.
- Screen reader support.

## 5. Security Review
Check:
- Unsafe HTML rendering.
- Exposed secrets.
- Untrusted data handling.
- Sensitive information in logs.
- Insecure authentication assumptions.

## 6. Reporting
For every finding:
- Identify the file and location.
- Explain the problem.
- Explain its impact.
- Suggest a practical fix.
- Assign severity.

Severity:
- Critical.
- High.
- Medium.
- Low.
- Informational.

## 7. Review Rules
- Report actionable findings.
- Avoid personal stylistic preferences.
- Do not invent bugs.
- Do not modify files during a review-only task.
- Distinguish verified issues from potential risks.

## Checklist
- [ ] Functionality reviewed.
- [ ] Security reviewed.
- [ ] Accessibility reviewed.
- [ ] Performance reviewed.
- [ ] Code quality reviewed.
- [ ] Findings prioritized.
- [ ] Fixes recommended.

## Expected Output
A prioritized code review with actionable findings and recommended solutions.
