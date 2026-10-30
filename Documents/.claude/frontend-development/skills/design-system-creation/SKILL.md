
---
name: design-system-creation
description: Create and maintain frontend design systems including color palettes, typography, spacing, design tokens, themes, and reusable styling conventions.
---

# Design System Creation

## Purpose
Establish a consistent visual language across the entire application.

## 1. Color System
Define:
- Primary.
- Secondary.
- Accent.
- Background.
- Surface.
- Text.
- Muted.
- Border.
- Success.
- Warning.
- Error.
- Information.

Guidelines:
- Use 60-30-10 as a starting point.
- Check WCAG contrast.
- Use semantic color tokens.
- Avoid random color values.
- Support dark mode when required.

## 2. Typography
- Use up to two font families by default.
- Define H1-H6.
- Define body text.
- Define captions and labels.
- Define font weights.
- Define line heights.
- Define responsive font sizes.

## 3. Spacing
Establish a consistent spacing scale.

Example:
- 4px
- 8px
- 12px
- 16px
- 24px
- 32px
- 48px
- 64px
- 80px

Avoid arbitrary spacing values without justification.

## 4. Border Radius
Define:
- Small.
- Medium.
- Large.
- Extra large.
- Full/pill.

## 5. Shadows
Define:
- Subtle.
- Card.
- Elevated.
- Modal.

Avoid excessive shadows.

## 6. Layout
Establish:
- Container widths.
- Grid system.
- Breakpoints.
- Section spacing.
- Content widths.
- Responsive behavior.

## 7. Design Tokens
- Centralize design tokens.
- Use CSS variables or existing framework tokens.
- Use meaningful names.
- Avoid duplicate definitions.
- Reuse tokens across components.

## 8. Implementation Workflow
1. Inspect existing styles.
2. Identify the visual direction.
3. Define colors.
4. Define typography.
5. Define spacing.
6. Define radii and shadows.
7. Create tokens.
8. Apply tokens to components.
9. Verify consistency.

## Checklist
- [ ] Color palette established.
- [ ] Typography established.
- [ ] Spacing scale established.
- [ ] Radius system established.
- [ ] Shadow system established.
- [ ] Design tokens centralized.
- [ ] Contrast verified.
- [ ] Components follow the system.

## Expected Output
A reusable design system that provides consistent styling across all application pages.
