
---
name: animation-guidelines
description: Design and implement purposeful frontend animations including hover effects, transitions, scroll-driven interactions, entrance animations, and reduced-motion support.
---

# Animation Guidelines

## Purpose
Create polished interactions that improve usability without distracting users.

## 1. Interaction Animations
Consider:
- Button hover.
- Button active.
- Card hover.
- Navigation transitions.
- Dropdown transitions.
- Modal entrance and exit.
- Tooltip appearance.
- Input focus transitions.

## 2. Page Animations
Use when appropriate:
- Fade-in.
- Slide-in.
- Scroll reveal.
- Scroll-driven animations.
- Parallax effects.
- Section transitions.
- Scroll progress indicators.
- Smooth anchor navigation.

## 3. Timing
Establish consistent animation durations.

Suggested starting points:
- Micro-interactions: 100–200ms.
- Standard transitions: 200–300ms.
- Larger transitions: 300–500ms.

Adjust according to context.

## 4. Easing
Use consistent easing curves.

Examples:
- ease-out for entrances.
- ease-in for exits.
- ease-in-out for transitions.

## 5. Performance
- Prefer transform and opacity.
- Avoid unnecessary layout recalculations.
- Avoid animating large areas unnecessarily.
- Avoid excessive simultaneous animations.
- Test on lower-powered mobile devices.

## 6. Accessibility
- Respect prefers-reduced-motion.
- Avoid flashing.
- Do not hide essential content behind animation.
- Ensure interactions remain understandable without animation.

## 7. Rules
- Every animation should have a purpose.
- Avoid animation overload.
- Avoid unnecessary parallax.
- Do not delay important user actions.
- Maintain consistent motion behavior.

## Checklist
- [ ] Animations have a purpose.
- [ ] Hover states are appropriate.
- [ ] Transitions are consistent.
- [ ] Scroll effects work correctly.
- [ ] Mobile performance is acceptable.
- [ ] Reduced-motion support exists.

## Expected Output
A polished interface with consistent, accessible, and performant motion.
