# Implementation Plan: Pride Temples of Tamil Nadu

## Overview

Build a polished, single-page React + TypeScript + Vite cultural showcase of 10 Tamil Nadu temples. All state lives in `App.tsx`; a pure `filterTemples` utility drives search and region filtering; Framer Motion handles animations; Tailwind CSS provides the heritage-themed design system. The project simultaneously demonstrates all seven Kiro University lessons through concrete artefacts created in Phase 2.

---

## Tasks

### Phase 1 — Project Scaffolding and Configuration

- [ ] 1. Scaffold Vite + React + TypeScript project and install dependencies
  - Run `npm create vite@latest . -- --template react-ts` in the workspace root
  - Install runtime packages: `npm install framer-motion` (Tailwind CSS and its PostCSS plugin are devDependencies — `npm install -D tailwindcss postcss autoprefixer`)
  - Install test packages: `npm install -D vitest @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom @testing-library/user-event fast-check jsdom`
  - Verify `package.json` lists ≤ 10 direct runtime dependencies (react, react-dom, framer-motion = 3 runtime + tailwindcss as PostCSS dev)
  - _Requirements: 10.1, 10.2, 10.3_

- [ ] 2. Configure Tailwind CSS with the heritage design system
  - Run `npx tailwindcss init -p` to generate `tailwind.config.js` and `postcss.config.js`
  - Add content paths: `['./index.html', './src/**/*.{ts,tsx}']`
  - Extend theme with heritage colour tokens and custom fonts:
    - `gold: { primary: '#C8960C', light: '#F2C94C' }`, `crimson: { DEFAULT: '#8B1A1A' }`, `ivory: { DEFAULT: '#FAF3E0' }`, `stone: { DEFAULT: '#5C4A32', light: '#8C7355' }`, `teal: { accent: '#1A6B6B' }`
    - `fontFamily: { display: ['Cinzel', 'serif'], body: ['Lato', 'sans-serif'] }`
  - Replace `src/index.css` with `@tailwind base/components/utilities` directives and Google Fonts import for Cinzel + Lato
  - _Requirements: 8.4, 10.3_

- [ ] 3. Configure Vitest and TypeScript
  - Create `vitest.config.ts` with `environment: 'jsdom'`, `globals: true`, `setupFiles: ['./src/test-setup.ts']`
  - Create `src/test-setup.ts` that imports `@testing-library/jest-dom`
  - Update `tsconfig.json` to include `"types": ["vitest/globals"]`
  - Add scripts to `package.json`: `"test": "vitest run"`, `"test:watch": "vitest"`, `"test:coverage": "vitest run --coverage"`
  - Verify `npm test` exits cleanly (no test files yet — just confirms config is valid)
  - _Requirements: 10.1, 10.2_

---

### Phase 2 — Kiro Artefacts (Lessons 2–7)

- [ ] 4. Create steering document — project conventions (Lesson 2)
  - Create `.kiro/steering/project-conventions.md`
  - Document: file naming (kebab-case files, PascalCase component exports), import ordering (React → third-party → local), Tailwind class ordering (layout → spacing → colour → typography), heritage colour token usage guide, temple data rules (cite source, shortDescription ≤ 40 words, detailedHistory ≥ 60 words)
  - _Requirements: 11.2_

- [ ] 5. Create validate-temple-data hook (Lesson 3)
  - Create `.kiro/hooks/validate-temple-data.json` with the following structure:
    ```json
    {
      "name": "Validate Temple Data",
      "event": "fileEdited",
      "filePattern": "src/data/templeData.ts",
      "action": "runCommand",
      "command": "npx vitest run src/data/templeData.test.ts"
    }
    ```
  - Verify the JSON is valid and matches the hook schema described in the design
  - _Requirements: 11.3_

- [ ] 6. Create MCP configuration (Lesson 6)
  - Create `.mcp.json` at the repository root configured with the `brave-search` MCP server for researching temple history during development
  - Include a comment-style `_readme` field explaining its purpose
  - _Requirements: 11.6_

- [ ] 7. Create temple-content-writer custom agent (Lesson 7)
  - Create `.kiro/agents/temple-content-writer.md` defining the agent's purpose, input prompt template, and expected output format
  - Agent accepts a temple name and generates: `detailedHistory` (70–100 words, historically accurate) and `notableFeatures` (3–5 bullet items) formatted as TypeScript string literals ready to paste into `templeData.ts`
  - _Requirements: 11.7_

---

### Phase 3 — TypeScript Types and Temple Data

- [ ] 8. Define TypeScript types
  - Create `src/types/temple.ts` with:
    - `RegionKey` type: `'Chola' | 'Pandya/Nayak' | 'Other'`
    - `Temple` interface with all 14 fields: `id`, `name`, `location`, `district`, `region: RegionKey`, `dynasty`, `foundingPeriod`, `architecturalStyle`, `shortDescription`, `detailedHistory`, `notableFeatures: string[]`, `significance`, `imageUrl`, `imageAlt`
    - `FilterState` interface: `{ searchQuery: string; activeRegion: RegionKey | 'All' }`
  - Export all from `src/types/index.ts` barrel file
  - _Requirements: 6.2_

- [ ] 9. Create temple data file with all 10 temples
  - Create `src/data/templeData.ts` exporting `const templeData: Temple[]`
  - Include all 10 records in order: `brihadeeswarar`, `meenakshi-amman`, `shore-temple`, `ramanathaswamy`, `airavatesvara`, `gangaikonda-cholapuram`, `ekambareswarar`, `jambukeswarar`, `ranganathaswamy`, `murugan-tiruchendur`
  - Each record must satisfy: `shortDescription` ≤ 40 words, `detailedHistory` ≥ 60 words, `notableFeatures` array with ≥ 3 items, non-empty `imageAlt` with descriptive caption, Unsplash `imageUrl` with `?w=640&q=80` query params
  - Assign correct `region` values per design: Brihadeeswarar/Airavatesvara/Gangaikonda = `'Chola'`; Meenakshi/Murugan = `'Pandya/Nayak'`; all others = `'Other'`
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ]* 9.1 Write property tests for temple data schema (Lesson 4 — PBT)
    - Create `src/data/templeData.test.ts`
    - **Property 5: Every temple record satisfies the full data schema**
    - Use `fc.assert(fc.property(fc.constantFrom(...templeData), (temple) => { ... }))` to verify all 14 required fields are present, non-empty, word counts are within bounds, `region` is a valid `RegionKey`, and `notableFeatures` is a non-empty array
    - **Validates: Requirements 6.1, 6.2**
    - Run `npm test` to confirm the property passes for all 10 records

---

### Phase 4 — Utility Function

- [ ] 10. Implement `filterTemples` utility
  - Create `src/utils/filterTemples.ts` with the pure `filterTemples(temples, query, region)` function as specified in the design
  - Function must: trim and lowercase query, match against `name` and `location` fields, handle `'All'` region as pass-through, return `[]` gracefully for empty input
  - _Requirements: 3.1, 3.2, 3.4, 4.2, 4.3, 4.4_

  - [ ]* 10.1 Write property tests for filterTemples (Lesson 4 — PBT)
    - Create `src/utils/filterTemples.test.ts`
    - **Property 2: Search filter returns only matching temples**
    - Use `fc.assert(fc.property(fc.string({ minLength: 1, maxLength: 20 }), (query) => { ... }))` — every result must contain `query` in name or location
    - **Validates: Requirements 3.2**
    - **Property 3: Clearing search restores the region-filtered set**
    - Use `fc.assert(fc.property(fc.string({ maxLength: 20 }), fc.constantFrom('All', 'Chola', 'Pandya/Nayak', 'Other'), (query, region) => { ... }))` — result of clearing query equals baseline
    - **Validates: Requirements 3.4**
    - **Property 4: Combined filter satisfies both predicates simultaneously**
    - Use `fc.assert(fc.property(fc.string({ maxLength: 20 }), fc.constantFrom('All', 'Chola', 'Pandya/Nayak', 'Other'), (query, region) => { ... }))` — every result individually passes both search and region predicates
    - **Validates: Requirements 4.4, 3.2, 4.2**
    - Run `npm test` to confirm all three properties pass

- [ ] 11. Checkpoint — data and utility layer
  - Ensure `npm test` passes for `templeData.test.ts` and `filterTemples.test.ts`
  - Ensure `npm run build` exits without TypeScript errors at this stage
  - Ask the user if any temple data needs correction before building UI components

---

### Phase 5 — Core UI Components

- [ ] 12. Create `HeroSection` component
  - Create `src/components/HeroSection/HeroSection.tsx` — purely presentational, no props
  - Render: full-width section with Tailwind gradient background (gold/crimson/ivory heritage palette), `<h1>` heading introducing Tamil Nadu temple heritage, short tagline `<p>`, and a CTA `<a>` or `<button>` that smooth-scrolls to `#temple-collection`
  - Apply mobile-first responsive layout: single-column stack on `< 768px`, side-by-side or centred on larger screens
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ]* 12.1 Write unit tests for HeroSection
    - Create `src/components/HeroSection/HeroSection.test.tsx`
    - Test: renders heading, tagline, and CTA element; CTA `href` includes `#temple-collection`
    - _Requirements: 1.1, 1.2_

- [ ] 13. Create `SearchBar` component
  - Create `src/components/SearchAndFilter/SearchBar.tsx`
  - Controlled `<input>` that calls `onSearchChange(value)` on every keystroke
  - Add `aria-label="Search temples by name or location"` and a visible `<label>` element
  - Style with Tailwind; heritage-themed border and focus ring (gold accent)
  - _Requirements: 3.1, 9.4_

- [ ] 14. Create `RegionFilter` component
  - Create `src/components/SearchAndFilter/RegionFilter.tsx`
  - Render four tab-style buttons: `All | Chola | Pandya/Nayak | Other`
  - Wrap in a `<div role="group" aria-label="Filter by region or dynasty">`
  - Apply active/inactive styling; active button uses heritage gold colour
  - Calls `onRegionChange(region)` on click
  - _Requirements: 4.1, 9.4_

- [ ] 15. Create `SearchAndFilter` wrapper component
  - Create `src/components/SearchAndFilter/SearchAndFilter.tsx`
  - Stateless container that receives `searchQuery`, `activeRegion`, `onSearchChange`, `onRegionChange` and renders `SearchBar` + `RegionFilter`
  - _Requirements: 3.1, 4.1_

- [ ] 16. Create `TempleCard` component with animations
  - Create `src/components/TempleCard/TempleCard.tsx`
  - Receives `temple: Temple` and `onClick: () => void`
  - Render: `<img>` with `alt={temple.imageAlt}`, `loading="lazy"`, and `onError` fallback to `/images/placeholder.svg`; temple name `<h3>`; district/location `<p>`; dynasty badge `<span>`; short description `<p>` (truncated at 40 words)
  - Wrap in `<motion.div>` with viewport entrance animation: `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true }}`, `transition={{ duration: 0.4 }}`
  - Add `whileHover={{ scale: 1.03 }}` hover animation
  - Add `role="button"`, `tabIndex={0}`, `onKeyDown` handler for Enter/Space to trigger `onClick`
  - _Requirements: 2.2, 5.1, 8.1, 8.2, 9.1, 9.2_

  - [ ]* 16.1 Write property test for TempleCard rendering (Lesson 4 — PBT)
    - In `src/components/TempleCard/TempleCard.test.tsx`
    - **Property 1: TempleCard renders all required display fields for any temple record**
    - Use `fc.assert(fc.property(fc.constantFrom(...templeData), (temple) => { ... }))` — rendered output contains `temple.name`, `temple.location`, `temple.dynasty`, and non-empty `img[alt]`
    - **Validates: Requirements 2.2**
    - **Property 6 (TempleCard part): Every rendered temple image has non-empty alt attribute**
    - **Validates: Requirements 9.1**

  - [ ]* 16.2 Write unit tests for TempleCard
    - Test: clicking the card calls `onClick`; pressing Enter calls `onClick`; pressing Space calls `onClick`; image `onError` replaces `src` with placeholder
    - _Requirements: 5.1, 9.2_

- [ ] 17. Create `TempleCollection` component
  - Create `src/components/TempleCollection/TempleCollection.tsx`
  - Receives `filteredTemples: Temple[]` and `onSelectTemple: (temple: Temple) => void`
  - Render responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
  - Add `id="temple-collection"` for hero CTA scroll target
  - When `filteredTemples.length === 0`, render "No temples found" empty-state message with an appropriate icon or emoji
  - Map `filteredTemples` to `<TempleCard key={temple.id} temple={temple} onClick={() => onSelectTemple(temple)} />`
  - _Requirements: 2.1, 2.3, 2.4, 3.3_

  - [ ]* 17.1 Write unit tests for TempleCollection
    - Test: renders 10 cards when given all 10 temples; renders "No temples found" when given empty array; renders correct count when given a subset
    - _Requirements: 2.1, 2.4, 3.3_

- [ ] 18. Create `TempleDetailModal` component
  - Create `src/components/TempleDetailModal/TempleDetailModal.tsx`
  - Returns `null` when `temple` prop is `null`
  - Render full-screen overlay backdrop + modal panel with: large `<img>` (`alt={temple.imageAlt}`, `loading="eager"`), temple name `<h2>`, location, dynasty, founding period, architectural style, detailed history `<p>`, notable features `<ul>` list, significance `<p>`, and close `<button>` (×)
  - Implement `useEffect` for Escape key listener → calls `onClose`
  - Implement focus trap: on mount, focus the close button; on unmount, return focus to the triggering element
  - Set `document.body.style.overflow = 'hidden'` on mount, restore on unmount
  - Wrap in Framer Motion `<AnimatePresence>` with `initial={{ opacity: 0, scale: 0.95 }}` / `animate` / `exit` transitions (200–400 ms)
  - Handle malformed temple record: if required fields are missing, render error message and call `console.error`
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 8.3, 9.1, 9.2_

  - [ ]* 18.1 Write property test for TempleDetailModal rendering (Lesson 4 — PBT)
    - In `src/components/TempleDetailModal/TempleDetailModal.test.tsx`
    - **Property 7: TempleDetailModal renders all required detail fields for any temple record**
    - Use `fc.assert(fc.property(fc.constantFrom(...templeData), (temple) => { ... }))` — rendered output contains name, location, dynasty, foundingPeriod, architecturalStyle, detailedHistory, at least one notable feature, and significance
    - **Validates: Requirements 5.2**
    - **Property 6 (Modal part): rendered img has non-empty alt attribute**
    - **Validates: Requirements 9.1**

  - [ ]* 18.2 Write unit tests for TempleDetailModal
    - Test: renders `null` when temple prop is `null`; closes on Escape key press; calls `onClose` when close button clicked; renders error message for malformed record; `document.body.style.overflow` is `hidden` while open and restored on close
    - _Requirements: 5.3, 5.4, 5.5_

---

### Phase 6 — App Integration

- [ ] 19. Wire everything together in `App.tsx`
  - Update `src/App.tsx` to:
    - Import `templeData` from `src/data/templeData`
    - Declare state: `searchQuery`, `activeRegion`, `selectedTemple`
    - Derive `filteredTemples = filterTemples(templeData, searchQuery, activeRegion)`
    - Call `useReducedMotion()` from Framer Motion; pass the flag down or set CSS variable
    - Render component tree: `<HeroSection>` → `<SearchAndFilter>` → `<TempleCollection>` → `<AnimatePresence><TempleDetailModal></AnimatePresence>`
    - Pass all callbacks: `onSearchChange`, `onRegionChange`, `onSelectTemple`, `onClose`
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1, 8.5_

- [ ] 20. Create `public/images/placeholder.svg` fallback image
  - Create a simple SVG showing a stylised temple silhouette outline in stone-grey colour
  - Used as `onError` fallback for all `<img>` elements
  - _Requirements: 6.4_

- [ ] 21. Checkpoint — full integration
  - Run `npm run dev` and verify: hero renders, all 10 temple cards display, search filters in real time, region filter works, clicking a card opens the modal, Escape closes the modal, CTA scroll works
  - Run `npm test` and confirm all tests pass
  - Ask the user if any component behaviour needs adjustment before styling polish

---

### Phase 7 — Styling and Animation Polish

- [ ] 22. Apply heritage theme to `HeroSection`
  - Add full-width gradient: `from-stone-800 via-crimson to-stone-900` or equivalent Tailwind classes using custom tokens
  - Style heading in Cinzel font (`font-display`), gold colour, large responsive size (`text-4xl md:text-6xl`)
  - Style tagline in Lato (`font-body`), ivory, smaller size
  - Style CTA button with gold border, hover fill transition
  - _Requirements: 8.4_

- [ ] 23. Apply heritage theme to `SearchBar` and `RegionFilter`
  - `SearchBar`: ivory background, stone border, gold focus ring, Lato body font
  - `RegionFilter`: active tab uses gold background + crimson text; inactive tabs use ivory + stone; tab transition 150 ms
  - Ensure both have `min-h-[44px]` and `min-w-[44px]` tap targets
  - _Requirements: 7.2, 8.4, 9.4_

- [ ] 24. Apply heritage theme and animations to `TempleCard`
  - Card background: ivory; border: `1px solid gold-light/30`; border-radius: `8px`; shadow: subtle
  - Dynasty badge: gold background, crimson text, small caps
  - Verify entrance animation (`whileInView`) fires correctly in the grid
  - Verify `whileHover` scale effect is smooth (≤ 300 ms)
  - Reduce or disable animations when `useReducedMotion()` returns `true`
  - _Requirements: 8.1, 8.2, 8.4, 8.5_

- [ ] 25. Apply heritage theme and animations to `TempleDetailModal`
  - Backdrop: `bg-black/70` semi-transparent overlay
  - Modal panel: ivory background, stone text, gold accent borders
  - Notable features list: gold bullet markers
  - Verify open/close Framer Motion transition is 200–400 ms
  - Reduce or disable modal animation when `useReducedMotion()` returns `true`
  - _Requirements: 8.3, 8.4, 8.5_

---

### Phase 8 — Accessibility Polish

- [ ] 26. Audit and fix accessibility attributes
  - Verify every `<img>` has descriptive, non-empty `alt` text (use `imageAlt` from data)
  - Verify `SearchBar` has `<label>` + `aria-label`
  - Verify `RegionFilter` has `role="group"` + `aria-label`
  - Verify `TempleCard` has `role="button"` + `tabIndex={0}` + keyboard handler
  - Verify `TempleDetailModal` close button has `aria-label="Close modal"`
  - Verify colour contrast: stone (#5C4A32) on ivory (#FAF3E0) passes 4.5:1 minimum — calculate and confirm
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ] 27. Test and fix focus trap in `TempleDetailModal`
  - Open the modal and press Tab repeatedly — focus must cycle only within the modal
  - Confirm focus returns to the triggering `TempleCard` after modal closes
  - Test with keyboard-only navigation from `HeroSection` through `SearchBar` → `RegionFilter` → `TempleCard` → modal → close
  - _Requirements: 9.2_

- [ ] 28. Verify reduced-motion behaviour
  - Simulate `prefers-reduced-motion: reduce` in browser DevTools
  - Confirm `TempleCard` entrance and hover animations are disabled (static state)
  - Confirm `TempleDetailModal` transition is disabled
  - _Requirements: 8.5_

---

### Phase 9 — Final Verification

- [ ] 29. Full test suite run
  - Run `npm test` — all tests must pass (zero failures)
  - Run `npm run test:coverage` — note coverage levels; all property tests must execute ≥ 100 fast-check iterations
  - _Requirements: 11.4_

- [ ] 30. Production build verification
  - Run `npm run build` — must complete without errors or TypeScript warnings
  - Run `npm run preview` and confirm the production build renders correctly at `localhost:4173`
  - Verify bundle includes ≤ 10 runtime dependencies
  - _Requirements: 10.2, 10.3_

- [ ] 31. Lighthouse audit
  - Open Chrome DevTools → Lighthouse → run mobile and desktop audits on the production preview
  - Mobile responsiveness score must be ≥ 90 (Requirement 7.3)
  - Desktop performance score must be ≥ 80 (Requirement 10.4)
  - Fix any flagged issues (missing meta description, unoptimised images, missing lang attribute, etc.)
  - _Requirements: 7.3, 10.4_

- [ ] 32. Write `README.md`
  - Document: project description, Kiro University lesson map (table linking each lesson to its artefact/file), prerequisites, setup commands (`npm install`, `npm run dev`), test command (`npm test`), build command (`npm run build`), and temple data sources
  - _Requirements: 10.1, 11.1_

- [ ] 33. Final checkpoint — Kiro lesson artefact review
  - Confirm all 7 Kiro lesson artefacts exist:
    - Lesson 1: `.kiro/specs/pride-temples-of-tamil-nadu/requirements.md`, `design.md`, `tasks.md` ✓
    - Lesson 2: `.kiro/steering/project-conventions.md` ✓
    - Lesson 3: `.kiro/hooks/validate-temple-data.json` ✓
    - Lesson 4: `src/data/templeData.test.ts` + `src/utils/filterTemples.test.ts` (7 property tests) ✓
    - Lesson 5: AWS Blocks power referenced in spec (noted in design.md) ✓
    - Lesson 6: `.mcp.json` with brave-search configuration ✓
    - Lesson 7: `.kiro/agents/temple-content-writer.md` ✓
  - _Requirements: 11.1–11.7_

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP pass; however, property tests (Lesson 4) are required for the Kiro University demonstration.
- Each task is scoped to 15–60 minutes; the entire plan is designed to be completable in one day.
- All Kiro artefact tasks (4–7) reference their lesson number explicitly — complete them early so the repo structure matches the design from the start.
- Checkpoints at tasks 11, 21, and 33 provide natural validation gates; stop and confirm before proceeding if anything is unclear.
- Temple data in task 9 must use only historically accurate facts; use the `temple-content-writer` custom agent (task 7) to generate `detailedHistory` and `notableFeatures` fields.
- The `filterTemples` function must remain a pure function — no side effects — so all three property tests (Properties 2, 3, 4) can run without mocking.
- Unsplash image URLs should follow the pattern `https://images.unsplash.com/photo-XXXX?w=640&q=80` for cards and `?w=1200&q=80` for the modal.

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1", "4", "5", "6", "7"] },
    { "id": 1, "tasks": ["2", "3", "8"] },
    { "id": 2, "tasks": ["9"] },
    { "id": 3, "tasks": ["9.1", "10"] },
    { "id": 4, "tasks": ["10.1"] },
    { "id": 5, "tasks": ["12", "13", "14", "20"] },
    { "id": 6, "tasks": ["12.1", "15", "16"] },
    { "id": 7, "tasks": ["16.1", "16.2", "17"] },
    { "id": 8, "tasks": ["17.1", "18"] },
    { "id": 9, "tasks": ["18.1", "18.2", "19"] },
    { "id": 10, "tasks": ["22", "23", "24", "25"] },
    { "id": 11, "tasks": ["26", "27", "28"] },
    { "id": 12, "tasks": ["29", "30"] },
    { "id": 13, "tasks": ["31", "32"] },
    { "id": 14, "tasks": ["33"] }
  ]
}
```
