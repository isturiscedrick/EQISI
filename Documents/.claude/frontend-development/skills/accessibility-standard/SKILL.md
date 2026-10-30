
---
name: accessibility-standard
description: Apply WCAG 2.2 AA accessibility practices including semantic HTML, keyboard navigation, color contrast, screen reader support, and accessible forms.
---

# Accessibility Standard

## Purpose
Make interfaces usable by people with different abilities, devices, and interaction methods.

## 1. Accessibility Target
Target WCAG 2.2 Level AA where applicable.

## 2. Semantic HTML
- Use appropriate HTML elements.
- Use buttons for actions.
- Use links for navigation.
- Maintain heading hierarchy.
- Use landmarks.
- Avoid unnecessary generic containers.

## 3. Color and Contrast
- Maintain sufficient text contrast.
- Maintain sufficient contrast for important UI controls.
- Never rely on color alone.
- Provide visible focus indicators.

## 4. Keyboard Navigation
- Support keyboard-only usage.
- Maintain logical tab order.
- Ensure interactive elements are focusable.
- Provide visible focus states.
- Support Escape for dismissible dialogs where appropriate.
- Avoid keyboard traps.

## 5. Forms
- Provide visible labels.
- Associate errors with fields.
- Identify required fields.
- Explain how to fix errors.
- Announce important validation feedback appropriately.

## 6. Images
- Add meaningful alt text.
- Use empty alt attributes for decorative images.
- Avoid redundant descriptions.

## 7. Dialogs and Menus
- Manage focus appropriately.
- Provide accessible names.
- Support keyboard interaction.
- Return focus appropriately after closing.
- Prevent inaccessible background interaction for modal dialogs.

## 8. Motion
- Respect prefers-reduced-motion.
- Avoid flashing content.
- Avoid unnecessary continuous movement.

## 9. Verification
- Test keyboard navigation.
- Check contrast.
- Check heading structure.
- Test forms.
- Test dialogs.
- Use automated accessibility tools.
- Manually verify important user journeys.

## Checklist
- [ ] Semantic HTML.
- [ ] Keyboard accessible.
- [ ] Visible focus.
- [ ] Sufficient contrast.
- [ ] Form labels.
- [ ] Accessible errors.
- [ ] Image alternatives.
- [ ] Accessible dialogs.
- [ ] Reduced motion support.

## Expected Output
An accessible interface that follows WCAG 2.2 AA requirements as applicable.
