
---
name: frontend-performance
description: Improve frontend loading speed, rendering efficiency, image optimization, asset delivery, and Core Web Vitals.
---

# Frontend Performance

## Purpose
Deliver fast and responsive frontend experiences without sacrificing functionality or visual quality.

## 1. Performance Assessment
- Inspect existing application performance.
- Identify large assets.
- Inspect network requests.
- Identify expensive rendering operations.
- Measure before optimizing.

## 2. Image Optimization
- Prefer AVIF or WebP when appropriate.
- Compress images.
- Use responsive image sizes.
- Lazy-load below-the-fold images.
- Avoid lazy-loading critical above-the-fold images.
- Specify image dimensions.
- Avoid unnecessarily large background images.

## 3. JavaScript
- Remove unnecessary dependencies.
- Minimize unused code.
- Use code splitting when beneficial.
- Avoid unnecessary computations.
- Avoid unnecessary component rerenders.
- Load noncritical scripts appropriately.

## 4. CSS
- Avoid unnecessary styles.
- Reduce unused CSS.
- Avoid expensive layout changes.
- Use efficient animations.
- Avoid excessive DOM complexity.

## 5. Fonts
- Load only required font weights.
- Use appropriate font formats.
- Avoid unnecessary external font requests.
- Consider font-display behavior.
- Preload only critical fonts.

## 6. Core Web Vitals
Monitor:
- LCP: Largest Contentful Paint.
- INP: Interaction to Next Paint.
- CLS: Cumulative Layout Shift.

Target good user experience thresholds:
- LCP: 2.5 seconds or less.
- INP: 200 milliseconds or less.
- CLS: 0.1 or less.

## 7. Verification
- Measure before and after.
- Use Lighthouse or browser performance tools.
- Inspect network activity.
- Test on mobile conditions.
- Verify visual and functional behavior after optimization.

## Checklist
- [ ] Images optimized.
- [ ] Assets appropriately loaded.
- [ ] Unnecessary JavaScript minimized.
- [ ] Layout shifts controlled.
- [ ] Fonts optimized.
- [ ] Rendering reviewed.
- [ ] Core Web Vitals assessed.

## Expected Output
A performant frontend with measurable improvements and no unnecessary loss of functionality.


## Framework-Specific Optimization

Optimize according to the project's actual rendering architecture.

Examples:

- React: Avoid unnecessary rerenders and use appropriate memoization.
- Next.js: Use appropriate rendering strategies, image optimization, and code splitting.
- Vue: Optimize reactivity and component updates.
- Angular: Review change detection and lazy loading.
- Svelte: Optimize reactive updates and component rendering.
- Astro: Use appropriate static rendering and hydration strategies.
- Vanilla JavaScript: Optimize DOM operations and event handling.

These are examples, not universal requirements.

## Language and Build Optimization

- Use existing build tools.
- Optimize assets using compatible tools.
- Avoid unnecessary dependencies.
- Follow framework recommendations.
- Measure before applying optimizations.
- Avoid premature optimization.

## Compatibility Checklist

- [ ] Rendering strategy inspected.
- [ ] Framework-specific opportunities considered.
- [ ] Build configuration respected.
- [ ] Assets optimized.
- [ ] Performance measured.
- [ ] No unnecessary optimization added.
