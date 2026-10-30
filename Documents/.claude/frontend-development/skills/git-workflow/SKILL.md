
---
name: git-workflow
description: Follow safe Git practices including branch management, conventional commits, change reviews, pull requests, and version control workflows.
---

# Git Workflow

## Purpose
Maintain a clean, understandable, and safe version control history.

## 1. Before Making Changes
- Inspect git status.
- Check the current branch.
- Review uncommitted changes.
- Understand recent commits.
- Never overwrite unrelated user changes.

## 2. Branch Naming
Use descriptive branch names.

Examples:
- feature/user-authentication
- feature/responsive-navbar
- fix/form-validation
- fix/mobile-layout
- refactor/shared-components
- docs/project-setup

## 3. Commit Convention
Use Conventional Commits.

Examples:
- feat: add responsive navigation
- fix: correct form validation
- docs: update project documentation
- style: improve button spacing
- refactor: simplify shared components
- test: add component tests
- chore: update dependencies

## 4. Commit Practices
- Keep commits focused.
- Use meaningful descriptions.
- Avoid unrelated changes.
- Review diffs before committing.
- Never commit secrets.
- Exclude generated files when appropriate.

## 5. Pull Requests
Include:
- Summary.
- Changes made.
- Reason for changes.
- Screenshots for UI changes.
- Testing performed.
- Known limitations.

## 6. Safety Rules
- Never force-push without explicit permission.
- Never discard user changes without permission.
- Never reset a working tree without authorization.
- Never amend existing commits unless requested.
- Never commit or push without authorization.
- Avoid destructive Git commands.

## 7. Checklist
- [ ] Correct branch.
- [ ] Git status reviewed.
- [ ] Changes reviewed.
- [ ] No secrets included.
- [ ] Commit message follows convention.
- [ ] Relevant tests completed.
- [ ] Changes documented.

## Expected Output
A clean and safe Git workflow with understandable commit history.
