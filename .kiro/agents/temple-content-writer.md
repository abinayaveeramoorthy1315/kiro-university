# temple-content-writer

## Purpose

Generate historically accurate `detailedHistory` and `notableFeatures` content for a given Tamil Nadu temple, formatted as TypeScript string literals ready to paste directly into `src/data/templeData.ts`.

- **`detailedHistory`** — a prose paragraph of **70–100 words** describing the temple's founding, architectural significance, and cultural legacy, written in formal but accessible language suitable for a cultural website audience.
- **`notableFeatures`** — an array of **3–5 concise bullet-point strings** describing the most important architectural, artistic, or cultural features of the temple.

---

## Input

Provide the name of the temple as your prompt, e.g.:

> `Brihadeeswarar Temple`

Or use the full prompt template below for more precise results.

---

## Prompt Template

```
Write a detailed history of [TEMPLE_NAME] in Tamil Nadu in 70–100 words, suitable for a cultural website.
Then list 4 notable architectural or cultural features as short bullet points.
Use only established historical facts from sources such as UNESCO, the Archaeological Survey of India (ASI),
or peer-reviewed academic references.
Format the output as TypeScript string literals ready to paste into a data file.
Do not invent dynasties, dates, or architectural claims not supported by established records.
```

Replace `[TEMPLE_NAME]` with the temple you want content for.

---

## Output Format

The agent returns two TypeScript fields, formatted for direct insertion into a `Temple` object in `templeData.ts`:

```typescript
detailedHistory: `The Brihadeeswarar Temple, built by the Chola emperor Raja Raja I between 1003 and 1010 CE,
stands as the crowning achievement of Dravidian temple architecture. Dedicated to Lord Shiva, the temple's
66-metre vimana — the tallest of its era — was constructed entirely without mortar using interlocking granite
blocks. Inscriptions on its walls document land grants, dancers, and temple servants, offering an unparalleled
record of Chola administration. Designated a UNESCO World Heritage Site in 1987, it remains an active place
of worship after more than a thousand years.`,

notableFeatures: [
  'The 66-metre vimana (tower) is among the tallest of the early medieval period in South India',
  'The capstone (stupi) at the apex weighs approximately 80 tonnes and was placed without cranes',
  'Wall inscriptions in Tamil and Grantha script document Chola-era administrative and religious life',
  'The Nandi monolith in the forecourt, carved from a single granite block, stands 3.7 metres high',
],
```

---

## Constraints

The agent must follow these rules in every response:

1. **Accuracy** — use only facts supported by UNESCO, ASI, or academic sources. If a detail is uncertain, omit it rather than approximate.
2. **Word count** — `detailedHistory` must be **70–100 words** (counted after stripping leading/trailing whitespace from the template literal).
3. **Feature count** — `notableFeatures` must contain **3–5 items**.
4. **No fabrication** — do not invent dynasty names, founding dates, patron kings, or architectural measurements that are not documented.
5. **Tone** — formal but accessible; avoid jargon that a general audience would not understand without explanation. Avoid superlatives unless supported by a cited source.
6. **Format** — output must be valid TypeScript: use backtick template literals for `detailedHistory`, use a string array literal for `notableFeatures`. No trailing commas on the last array element in older TS targets; include them for consistency with the project's ESLint config.

---

## Usage Instructions

### 1. Invoke the agent inside Kiro

Open the Kiro chat panel and type `@temple-content-writer` to target this agent, then enter your prompt:

```
@temple-content-writer

Write a detailed history of Meenakshi Amman Temple in Tamil Nadu in 70–100 words,
suitable for a cultural website. Then list 4 notable architectural or cultural features
as short bullet points. Use only established historical facts. Format the output as
TypeScript string literals ready to paste into a data file.
```

Alternatively, simply type the temple name — the agent will apply the full prompt template automatically:

```
@temple-content-writer Meenakshi Amman Temple
```

### 2. Review the output

Read the generated content carefully before pasting. Verify that:
- The word count of `detailedHistory` falls between 70 and 100 words.
- All facts are consistent with what you know or can quickly verify.
- The number of items in `notableFeatures` is between 3 and 5.

### 3. Paste into `templeData.ts`

Open `src/data/templeData.ts` and locate the temple object you want to update. Replace the placeholder or existing `detailedHistory` and `notableFeatures` fields with the generated output:

```typescript
// Before
{
  id: 'meenakshi-amman',
  name: 'Meenakshi Amman Temple',
  // ...
  detailedHistory: `TODO`,
  notableFeatures: [],
  // ...
},

// After (paste the agent output here)
{
  id: 'meenakshi-amman',
  name: 'Meenakshi Amman Temple',
  // ...
  detailedHistory: `The Meenakshi Amman Temple in Madurai...`,
  notableFeatures: [
    'Fourteen towering gopurams (gateway towers) covered in thousands of painted stucco sculptures',
    // ...
  ],
  // ...
},
```

### 4. Validate the data

Save the file. The `validate-temple-data` hook will automatically run the schema property test:

```bash
npx vitest run src/data/templeData.test.ts
```

This confirms that `detailedHistory` meets the ≥ 60-word minimum and all other schema constraints are satisfied. If the test fails on the word-count assertion, re-invoke the agent and ask it to expand the history to 80–100 words.

---

## Example: Full Session

**Prompt:**

```
@temple-content-writer

Write a detailed history of Shore Temple, Mahabalipuram in Tamil Nadu in 70–100 words,
suitable for a cultural website. Then list 4 notable architectural or cultural features
as short bullet points. Use only established historical facts. Format the output as
TypeScript string literals ready to paste into a data file.
```

**Agent output:**

```typescript
detailedHistory: `The Shore Temple at Mahabalipuram, built during the reign of the Pallava king Narasimhavarman II
(c. 700–728 CE), is one of the earliest stone temples in South India and the oldest surviving structural temple
on the subcontinent's eastern coast. Dedicated jointly to Shiva and Vishnu, it was carved from granite blocks
hauled to the seafront, where it has withstood more than thirteen centuries of coastal erosion. The complex,
along with the other Mahabalipuram monuments, was inscribed as a UNESCO World Heritage Site in 1984.`,

notableFeatures: [
  'One of the earliest structural (non-rock-cut) temples in South India, dated to the early 8th century CE',
  'Twin Shiva shrines flanking a smaller Vishnu shrine reflect the Pallava practice of multi-deity complexes',
  'The site is part of the Group of Monuments at Mahabalipuram, a UNESCO World Heritage Site since 1984',
  'Coastal erosion has shaped the temple\'s weathered appearance, making it a study in material endurance',
],
```

---

## Notes for Contributors

- This agent is part of the **Kiro University Lesson 7 — Custom Agents** demonstration within the *Pride Temples of Tamil Nadu* spec.
- The content it generates feeds directly into the schema validated by Property 5 in `templeData.test.ts` (`detailedHistory ≥ 60 words`, `notableFeatures` non-empty array).
- If you add a new temple to `templeData.ts`, use this agent to generate its content before running the full test suite.
