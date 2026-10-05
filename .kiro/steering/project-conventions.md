# Project Conventions — Pride Temples of Tamil Nadu

This document governs all code written for the "Pride Temples of Tamil Nadu" project. Every Kiro AI action on this codebase must follow these conventions. When in doubt, favour simplicity and consistency with the existing code.

---

## 1. File Naming Conventions

- **File names** use kebab-case: `temple-card.tsx`, `filter-temples.ts`, `temple-detail-modal.tsx`.
- **Component export names** use PascalCase and match the folder name: `TempleCard`, `TempleDetailModal`.
- **Test files** are co-located and use the `.test.ts` / `.test.tsx` suffix: `TempleCard.test.tsx`, `filterTemples.test.ts`.
- **Type definition files** use kebab-case: `temple.ts` (inside `src/types/`).
- **Utility files** use camelCase: `filterTemples.ts`.

---

## 2. Component Organisation

Each component lives in its own folder under `src/components/`:

```
src/components/
  TempleCard/
    TempleCard.tsx          ← component implementation
    TempleCard.test.tsx     ← co-located tests
  TempleDetailModal/
    TempleDetailModal.tsx
    TempleDetailModal.test.tsx
  HeroSection/
    HeroSection.tsx
    HeroSection.test.tsx
  SearchAndFilter/
    SearchAndFilter.tsx
    SearchBar.tsx
    RegionFilter.tsx
  TempleCollection/
    TempleCollection.tsx
    TempleCollection.test.tsx
```

- Barrel `index.ts` exports are only added when a folder has more than one public export.
- Utility functions live in `src/utils/`, not inside component folders.
- Shared TypeScript interfaces live in `src/types/temple.ts`.
- Static data lives in `src/data/templeData.ts`.

---

## 3. Import Ordering

Imports must appear in this order, with a blank line between each group:

```typescript
// 1. React core
import React, { useState, useEffect } from 'react';

// 2. Third-party libraries (framer-motion, etc.)
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// 3. Local — types
import type { Temple, RegionKey } from '@/types/temple';

// 4. Local — utilities
import { filterTemples } from '@/utils/filterTemples';

// 5. Local — data
import { templeData } from '@/data/templeData';

// 6. Local — components
import TempleCard from '@/components/TempleCard/TempleCard';
```

Never mix groups on the same line or reorder within a group arbitrarily.

---

## 4. Tailwind Class Ordering

Apply Tailwind utility classes in this sequence within a `className` string:

1. **Layout** — `flex`, `grid`, `block`, `hidden`, `relative`, `absolute`, `fixed`, `z-*`
2. **Sizing** — `w-*`, `h-*`, `min-w-*`, `max-w-*`
3. **Spacing** — `p-*`, `px-*`, `py-*`, `m-*`, `mx-*`, `gap-*`
4. **Colour** — `bg-*`, `text-*`, `border-*`, `ring-*`
5. **Typography** — `font-*`, `text-sm/base/lg/xl`, `leading-*`, `tracking-*`
6. **Borders & Radius** — `rounded-*`, `border`, `border-*`
7. **Shadows** — `shadow-*`
8. **States** — `hover:*`, `focus:*`, `active:*`, `disabled:*`
9. **Responsive prefixes** — `sm:*`, `md:*`, `lg:*`, `xl:*` (appended last, grouped by breakpoint)

Example:

```tsx
<div className="flex flex-col relative w-full max-w-sm p-4 bg-ivory text-stone font-body text-base rounded-xl shadow-md hover:shadow-lg sm:flex-row lg:max-w-md">
```

---

## 5. Heritage Colour Token Usage Guide

All colours come from the custom tokens defined in `tailwind.config.js`. Never use raw hex values in component files.

| Token | Hex | When to use |
|---|---|---|
| `gold-primary` | `#C8960C` | Primary accents, active/selected states, CTA buttons |
| `gold-light` | `#F2C94C` | Highlights, hover state backgrounds, icon tints |
| `crimson` | `#8B1A1A` | Headings on dark backgrounds, dynasty badge text/borders |
| `ivory` | `#FAF3E0` | Page background, card backgrounds |
| `stone` | `#5C4A32` | Primary body text (passes 4.5:1 contrast on `ivory`) |
| `stone-light` | `#8C7355` | Muted labels, secondary/supporting text, placeholders |
| `teal-accent` | `#1A6B6B` | Used sparingly — Chola-era references, decorative accents only |

Rules:
- `teal-accent` must not be used for body text; it is a decorative accent only.
- `stone` is the default text colour for all body copy. Do not swap it for `stone-light` where legibility matters.
- All text/background combinations must maintain at least 4.5:1 contrast (WCAG 2.1 AA).

---

## 6. Typography Rules

- **Headings** (`h1`–`h4`): use `font-display` (Cinzel). Never apply `font-display` to paragraph or label text.
- **Body text, labels, inputs, buttons**: use `font-body` (Lato).
- **Minimum body font size**: `text-sm` (14 px) — never go below this in production UI.
- **Custom font sizes**: only use sizes from the Tailwind scale (`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, …). Do not add arbitrary values like `text-[13px]`.
- **Line height**: use Tailwind's `leading-*` utilities; do not set `line-height` in CSS unless Tailwind has no suitable option.

---

## 7. Temple Data Rules

All temple records in `src/data/templeData.ts` must satisfy:

- `shortDescription` — **≤ 40 words**. Count carefully; the property test will catch violations.
- `detailedHistory` — **≥ 60 words**. Must be substantive prose, not bullet points.
- `imageAlt` — must be a **descriptive caption** of what is visually depicted (e.g., `"The towering Brihadeeswarar Temple gopuram rising against a blue sky in Thanjavur"`). The alt text must not simply repeat the temple name.
- `notableFeatures` — array must contain **≥ 3 items**. Each item should be a concise, factual phrase.
- All historical facts must be sourced from established references. No invented or speculative history.
- `region` must be one of `'Chola' | 'Pandya/Nayak' | 'Other'` exactly — no other strings.
- `id` must be a unique kebab-case slug matching the temple name (e.g., `"brihadeeswarar"`).

The data schema is enforced by the property-based test in `src/data/templeData.test.ts`. Run `npx vitest run src/data/templeData.test.ts` to verify after any edit to `templeData.ts`.

---

## 8. Accessibility Requirements

Every interactive element must be fully keyboard-operable:

- **Keyboard handlers**: every clickable non-button element (e.g., a `div` acting as a card) must have `onKeyDown` that handles `Enter` and `Space` alongside `onClick`.
- **Alt text**: every `<img>` must use the `imageAlt` field from the temple record. Empty or missing `alt` attributes are not allowed.
- **Tap targets**: all interactive elements must be at least **44 × 44 px** (use `min-h-[44px] min-w-[44px]` when needed).
- **Focus trap**: `TempleDetailModal` must trap keyboard focus while open; pressing `Tab` and `Shift+Tab` must cycle only through modal elements.
- **Focus restore**: when `TempleDetailModal` closes, focus must return to the `TempleCard` that triggered it.
- **Aria labels**: all controls without a visible text label must have `aria-label` (e.g., the close button on the modal, the search input).
- **Role attributes**: `RegionFilter` must have `role="group"` and `aria-label="Filter by region or dynasty"`.
- **Escape key**: `TempleDetailModal` must close on `Escape`.

---

## 9. Responsive Design Rules

- **Mobile-first**: write base Tailwind classes for the smallest screen first, then add `sm:` and `lg:` overrides.
- **Grid breakpoints** for `TempleCollection`:
  - Default (< 640 px): 1 column — `grid-cols-1`
  - `sm:` (≥ 640 px): 2 columns — `sm:grid-cols-2`
  - `lg:` (≥ 1024 px): 3 columns — `lg:grid-cols-3`
- **No fixed pixel widths** for layout containers. Use `max-w-*`, `w-full`, `flex-1`, or `%`-based classes instead.
- **Supported range**: 320 px to 1440 px — test at both extremes before marking a UI task complete.
- **No horizontal overflow**: never set `overflow-x: visible` on the body or root layout elements.

---

## 10. Animation Rules

- **Framer Motion only**: all animations and transitions must use Framer Motion (`motion.*` components, `AnimatePresence`). Do not write CSS `@keyframes` or use `transition:` CSS properties for anything motion-related.
- **Reduced motion**: always call `useReducedMotion()` before applying motion. When it returns `true`, set all `transition.duration` values to `0` and replace animated variants with static (no-op) equivalents.
- **Card entrance**: use `whileInView` with `viewport={{ once: true }}` so cards animate in only the first time they enter the viewport.
- **Card hover**: use `whileHover` on `motion.div` wrappers — do not apply hover animations via Tailwind `hover:` CSS transforms.
- **Modal open/close**: wrap `TempleDetailModal` in `AnimatePresence` inside `App.tsx` so exit animations play correctly.
- **Duration limits**: entrance and modal animations must be 200–400 ms. Hover transitions must be ≤ 200 ms.

---

## 11. Testing Conventions

- **Co-location**: test files live next to the file they test (same folder, `.test.ts` / `.test.tsx` suffix).
- **Unit tests**: write example-based tests for specific behaviours (e.g., "clicking a card calls `onClick`").
- **Property tests**: use `fc.assert(fc.property(...))` from `fast-check`. For temple data validation, use `fc.constantFrom(...templeData)` to test against real records, not synthetic ones.
- **Property test tagging**: every property test must include a comment identifying its design property number:
  ```typescript
  // Feature: pride-temples-of-tamil-nadu, Property 2: Search filter returns only matching temples
  ```
- **Minimum iterations**: fast-check runs 100 iterations by default — do not reduce this.
- **No mocks for data**: property tests must run against the real `templeData` array. Do not substitute mock data to make tests pass.
- **Test command**: `npx vitest run` — use `--run` flag (not `--watch`) in CI/hook contexts.

---

## 12. Minimal Dependency Principle

- **No new runtime dependencies** may be added without explicit approval in a spec task. The current runtime dependency budget is **4 packages** (React, ReactDOM, Framer Motion, Tailwind CSS).
- **Prefer Tailwind utilities** over importing a CSS utility library (e.g., do not add `clsx` if `cn` can be trivially inlined, do not add `styled-components`).
- **Prefer native browser APIs** over utility libraries for simple tasks (e.g., use `Element.scrollIntoView()` instead of a scroll library).
- **Dev dependencies** (Vitest, ESLint, TypeScript) are exempt from this rule but must still be justified.

---

## 13. Simplicity Rules

- **No router**: this is a single-page application. Do not add React Router or any routing library. Modal open/close and scroll state are managed via `useState` in `App.tsx`.
- **No global state library**: do not add Redux, Zustand, Jotai, or any external state manager. All filter and UI state lives in `App.tsx` via `useState`.
- **`filterTemples` is pure**: the filter function in `src/utils/filterTemples.ts` must remain a pure function with no side effects — no `console.log`, no mutations, no external calls. This is what makes it property-testable.
- **All filter state in `App.tsx`**: `searchQuery`, `activeRegion`, and `selectedTemple` are the only pieces of state. Child components receive state and callbacks as props.
- **One source of truth for data**: `templeData.ts` is the single source. Do not duplicate temple records in other files or hardcode temple names in components.
