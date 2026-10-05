# Requirements Document

## Introduction

"Pride Temples of Tamil Nadu" is a small, polished interactive cultural website that showcases the heritage, architecture, history, and uniqueness of famous temples across Tamil Nadu, India. The project is built as a single-page frontend application for the Kiro University 2026 challenge. It demonstrates all seven Kiro lessons (spec-driven development, steering documents, hooks, property-based testing, powers, MCP, and custom agents) within a scope that can be completed in one day. All temple data is stored locally — no backend or database is required.

## Glossary

- **App**: The "Pride Temples of Tamil Nadu" single-page web application.
- **Temple_Card**: A UI component that displays a temple's name, location, architectural style, and short description as a card in the collection grid.
- **Temple_Detail_Modal**: A UI overlay component that displays the full details of a selected temple — history, architecture, special features, and location.
- **Temple_Collection**: The set of 10 curated Tamil Nadu temples stored as a local data structure within the App.
- **Search_Bar**: The text input component used to filter temples by name or location.
- **Region_Filter**: The UI control (tabs or buttons) used to filter temples by geographic region or dynasty.
- **Hero_Section**: The full-width landing banner at the top of the App that introduces Tamil Nadu temple heritage.
- **Temple_Data**: The local JavaScript/TypeScript data array that holds all temple records.
- **Responsive_Layout**: A layout that adapts correctly to screen widths from 320 px (mobile) to 1440 px (desktop).
- **Animation**: CSS or JS-driven transitions applied to page elements for visual polish.

---

## Requirements

### Requirement 1: Hero Landing Section

**User Story:** As a visitor, I want to see a visually impressive hero section when I open the site, so that I immediately understand the cultural theme and feel engaged.

#### Acceptance Criteria

1. THE App SHALL render a Hero_Section as the first visible element on page load.
2. THE Hero_Section SHALL display a prominent heading introducing Tamil Nadu temple heritage, a short tagline, and a call-to-action element that scrolls the user to the Temple_Collection.
3. THE Hero_Section SHALL display a full-width background image or gradient that evokes a heritage/cultural aesthetic.
4. WHEN the App is viewed on a screen narrower than 768 px, THE Hero_Section SHALL reflow its content into a single-column layout without horizontal overflow.

---

### Requirement 2: Temple Collection Display

**User Story:** As a visitor, I want to browse a collection of famous Tamil Nadu temples, so that I can discover their names, locations, and architectural styles at a glance.

#### Acceptance Criteria

1. THE App SHALL display exactly 10 Temple_Cards in the Temple_Collection by default.
2. THE Temple_Card SHALL display the temple name, district/location, architectural style or dynasty, a short description (no more than 40 words), and a representative image.
3. THE Temple_Collection SHALL arrange Temple_Cards in a responsive grid that shows 3 columns on screens ≥ 1024 px, 2 columns on screens between 640 px and 1023 px, and 1 column on screens < 640 px.
4. WHEN no filters are active and the Search_Bar is empty, THE Temple_Collection SHALL display all 10 temples.

---

### Requirement 3: Temple Search

**User Story:** As a visitor, I want to search temples by name or location, so that I can quickly find a specific temple I am interested in.

#### Acceptance Criteria

1. THE Search_Bar SHALL accept free-text input and filter the Temple_Collection in real time without a page reload.
2. WHEN the user types a query in the Search_Bar, THE App SHALL display only the Temple_Cards whose temple name or location contains the query string (case-insensitive match).
3. WHEN the search query matches zero temples, THE App SHALL display a "No temples found" message in the Temple_Collection area.
4. WHEN the Search_Bar is cleared, THE App SHALL restore the full Temple_Collection (subject to any active Region_Filter).

---

### Requirement 4: Region / Category Filtering

**User Story:** As a visitor, I want to filter temples by region or dynasty, so that I can explore temples from a specific area or historical era.

#### Acceptance Criteria

1. THE Region_Filter SHALL provide at least four filter options: "All", "Chola", "Pandya/Nayak", and "Other".
2. WHEN the user selects a Region_Filter option other than "All", THE App SHALL display only the Temple_Cards whose dynasty or region matches the selected option.
3. WHEN the user selects "All" in the Region_Filter, THE App SHALL display all temples that also match the current Search_Bar query.
4. WHILE both a Region_Filter and a Search_Bar query are active, THE App SHALL display only Temple_Cards that satisfy both filters simultaneously.

---

### Requirement 5: Temple Detail Modal

**User Story:** As a visitor, I want to click on a temple card and see detailed information, so that I can learn about its history, architecture, and special features.

#### Acceptance Criteria

1. WHEN the user clicks a Temple_Card, THE App SHALL open a Temple_Detail_Modal overlaying the current page.
2. THE Temple_Detail_Modal SHALL display the temple's full name, location, founding period or dynasty, architectural style, detailed history (at least 60 words), notable architectural features, special cultural or religious significance, and a larger image.
3. WHEN the Temple_Detail_Modal is open, THE App SHALL prevent scrolling on the background page.
4. WHEN the user clicks the close button or presses the Escape key, THE App SHALL close the Temple_Detail_Modal and restore background scrolling.
5. IF the Temple_Detail_Modal fails to find the temple record in Temple_Data, THEN THE App SHALL display an error message inside the modal and log the error to the browser console.

---

### Requirement 6: Local Temple Data Structure

**User Story:** As a developer, I want all temple information stored in a local data structure, so that the App runs without any backend or network dependency.

#### Acceptance Criteria

1. THE Temple_Data SHALL contain exactly 10 temple records covering: Brihadeeswarar Temple (Thanjavur), Meenakshi Amman Temple (Madurai), Shore Temple (Mahabalipuram), Ramanathaswamy Temple (Rameswaram), Airavatesvara Temple (Darasuram), Gangaikonda Cholapuram Temple, Ekambareswarar Temple (Kanchipuram), Jambukeswarar Temple (Tiruchirappalli), Ranganathaswamy Temple (Srirangam), and Murugan Temple (Tiruchendur).
2. EACH temple record in Temple_Data SHALL include: id (unique string), name, location, district, region (Chola / Pandya/Nayak / Other), dynasty, foundingPeriod, architecturalStyle, shortDescription (≤ 40 words), detailedHistory (≥ 60 words), notableFeatures (array of strings), significance, and imageUrl.
3. THE Temple_Data SHALL contain only historically accurate information sourced from established references; no invented historical facts SHALL be included.
4. THE App SHALL load Temple_Data synchronously at startup without any HTTP requests.

---

### Requirement 7: Responsive Design

**User Story:** As a visitor using a mobile device, I want the site to display correctly on my screen, so that I can browse temples comfortably without zooming or horizontal scrolling.

#### Acceptance Criteria

1. THE Responsive_Layout SHALL support screen widths from 320 px to 1440 px without horizontal overflow.
2. WHEN the App is rendered at any supported screen width, THE Responsive_Layout SHALL maintain legible font sizes (minimum 14 px body text) and accessible tap targets (minimum 44 × 44 px for interactive elements).
3. THE App SHALL pass a Lighthouse mobile responsiveness audit with a score ≥ 90.

---

### Requirement 8: Animations and Visual Polish

**User Story:** As a visitor, I want smooth animations and a premium heritage visual style, so that the site feels culturally authentic and professionally crafted.

#### Acceptance Criteria

1. THE App SHALL apply an entrance Animation to Temple_Cards when they first appear in the viewport (fade-in or slide-up).
2. WHEN the user hovers over a Temple_Card on a pointer device, THE App SHALL apply a hover Animation (e.g., subtle scale or shadow lift) within 300 ms.
3. WHEN the Temple_Detail_Modal opens or closes, THE App SHALL apply a smooth transition Animation of 200–400 ms duration.
4. THE App SHALL use a colour palette, typography, and iconography consistent with a South Indian heritage/cultural aesthetic (warm golds, deep reds, ivory tones, or similar).
5. WHERE the user has enabled the "prefers-reduced-motion" OS setting, THE App SHALL disable or minimise all Animations.

---

### Requirement 9: Accessibility

**User Story:** As a visitor using assistive technology, I want the site to be accessible, so that I can navigate and read temple information without barriers.

#### Acceptance Criteria

1. THE App SHALL provide descriptive `alt` text for every temple image in Temple_Card and Temple_Detail_Modal.
2. THE Temple_Detail_Modal SHALL trap keyboard focus within the modal while it is open and return focus to the triggering Temple_Card when closed.
3. THE App SHALL maintain a colour contrast ratio of at least 4.5:1 for all body text against its background, in compliance with WCAG 2.1 AA.
4. THE Search_Bar AND Region_Filter controls SHALL have visible labels or accessible `aria-label` attributes.

---

### Requirement 10: Performance and Build

**User Story:** As a developer, I want the project to start and build with simple commands, so that I can demonstrate it easily during the Kiro University challenge.

#### Acceptance Criteria

1. THE App SHALL start a local development server with a single command (`npm run dev` or equivalent) and be accessible at `http://localhost:5173` (or documented port) within 10 seconds.
2. THE App SHALL produce a production build with a single command (`npm run build` or equivalent) that completes without errors.
3. THE App SHALL use a minimal dependency set; direct runtime dependencies SHALL NOT exceed 10 packages.
4. THE App SHALL achieve a Lighthouse performance score ≥ 80 on desktop for the production build.

---

### Requirement 11: Kiro University Lesson Integration

**User Story:** As a student, I want the project structured to demonstrate all seven Kiro lessons, so that I can present each lesson feature clearly during the challenge.

#### Acceptance Criteria

1. THE App's spec directory SHALL contain a requirements.md, design.md, and tasks.md that demonstrate Lesson 1 (spec-driven development).
2. THE App's repository SHALL contain at least one steering document in `.kiro/steering/` that demonstrates Lesson 2 (steering documents).
3. THE App's repository SHALL contain at least one Kiro hook in `.kiro/hooks/` that demonstrates Lesson 3 (hooks).
4. THE App's test suite SHALL contain at least one property-based test for Temple_Data validation that demonstrates Lesson 4 (property-based testing).
5. THE App's spec or code SHALL reference at least one Kiro Power usage that demonstrates Lesson 5 (powers).
6. THE App's repository SHALL contain an MCP configuration or usage example that demonstrates Lesson 6 (Model Context Protocol).
7. THE App's repository SHALL contain a custom agent definition or configuration that demonstrates Lesson 7 (custom agents).
