import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { filterTemples } from '@/utils/filterTemples';
import { templeData } from '@/data/templeData';
import type { Temple, RegionKey } from '@/types/temple';

/**
 * ============================================================================
 * KIRO UNIVERSITY — LESSON 4: PROPERTY-BASED TESTING WITH FAST-CHECK
 * ============================================================================
 *
 * Rather than only testing hand-picked examples ("Brihadeeswarar", "Madurai"),
 * property-based testing verifies universal invariants that must hold true for
 * ANY valid inputs across hundreds of generated scenarios.
 *
 * We verify 6 fundamental properties of the pure `filterTemples` function:
 * 1. Result Subset: Results are always a strict subset of the input.
 * 2. Search Correctness: Every returned temple satisfies the search condition.
 * 3. Empty Search: Empty query with 'All' region returns all temples unmodified.
 * 4. Region Filter: Specific region filter returns only temples of that region.
 * 5. Filter Composition: Combined filters satisfy both criteria simultaneously.
 * 6. Immutability: Filtering never mutates the original dataset.
 */

// ----------------------------------------------------------------------------
// Fast-Check Generators (Arbitraries)
// ----------------------------------------------------------------------------

/** Generator for valid region keys */
const specificRegionArbitrary = fc.constantFrom<RegionKey>(
  'Chola',
  'Pandya/Nayak',
  'Other'
);

/** Generator for any region parameter ('All', 'all', or specific region) */
const allRegionsArbitrary = fc.constantFrom<RegionKey | 'All' | 'all'>(
  'All',
  'all',
  'Chola',
  'Pandya/Nayak',
  'Other'
);

/** Generator for whitespace-only strings (representing empty search queries) */
const whitespaceStringArbitrary = fc.stringOf(
  fc.constantFrom(' ', '\t', '\n', '\r')
);

/** Generator for search strings: mix of arbitrary strings, realistic keywords, and edge cases */
const searchQueryArbitrary = fc.oneof(
  fc.string(),
  fc.constantFrom(
    'Thanjavur',
    'Madurai',
    'Brihadeeswarar',
    'Chola',
    'shore',
    'Amman',
    'TEMPLE',
    'temple',
    'Ariyalur',
    'chennai',
    'Kanchipuram',
    'nonexistent-temple-xyz'
  ),
  whitespaceStringArbitrary
);

/** Generator for a synthetic Temple record */
const templeArbitrary: fc.Arbitrary<Temple> = fc.record({
  id: fc.string({ minLength: 1 }),
  name: fc.string({ minLength: 1 }),
  location: fc.string({ minLength: 1 }),
  district: fc.string({ minLength: 1 }),
  region: specificRegionArbitrary,
  dynasty: fc.string(),
  foundingPeriod: fc.string(),
  architecturalStyle: fc.string(),
  shortDescription: fc.string(),
  detailedHistory: fc.string(),
  notableFeatures: fc.array(fc.string(), { minLength: 1, maxLength: 5 }),
  significance: fc.string(),
  imageUrl: fc.webUrl(),
  imageAlt: fc.string(),
});

/** Generator for a list of temples: either the real dataset or synthetic arrays */
const templeListArbitrary = fc.oneof(
  fc.constant(templeData),
  fc.array(templeArbitrary, { minLength: 0, maxLength: 15 })
);

// ----------------------------------------------------------------------------
// Property-Based Tests
// ----------------------------------------------------------------------------

describe('filterTemples — Property-Based Tests (Lesson 4)', () => {
  /**
   * PROPERTY 1 — RESULT SUBSET
   * For any valid search/filter state, every temple returned by filterTemples
   * must belong to the original temple dataset, and the output length can never
   * exceed the input length.
   */
  it('PROPERTY 1 — RESULT SUBSET: every returned temple belongs to the original dataset', () => {
    fc.assert(
      fc.property(
        templeListArbitrary,
        searchQueryArbitrary,
        allRegionsArbitrary,
        (temples, query, region) => {
          const results = filterTemples(temples, query, region);

          // 1. Result count cannot exceed source count
          expect(results.length).toBeLessThanOrEqual(temples.length);

          // 2. Every returned item must be an element of the original array
          for (const item of results) {
            expect(temples).toContain(item);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * PROPERTY 2 — SEARCH CORRECTNESS
   * For any generated search string, every returned temple must match the search
   * condition according to the actual filtering rules (case-insensitive substring
   * match against name, location, or district).
   */
  it('PROPERTY 2 — SEARCH CORRECTNESS: all returned temples match the search criteria', () => {
    fc.assert(
      fc.property(
        templeListArbitrary,
        searchQueryArbitrary,
        allRegionsArbitrary,
        (temples, query, region) => {
          const results = filterTemples(temples, query, region);
          const q = query.trim().toLowerCase();

          // Soundness: every returned temple matches the search query (if non-empty)
          for (const temple of results) {
            if (q !== '') {
              const matchesName = temple.name.toLowerCase().includes(q);
              const matchesLocation = temple.location.toLowerCase().includes(q);
              const matchesDistrict = temple.district.toLowerCase().includes(q);
              expect(matchesName || matchesLocation || matchesDistrict).toBe(true);
            }
          }

          // Completeness: any input temple satisfying both query and region MUST appear in results
          for (const temple of temples) {
            const matchesSearch =
              q === '' ||
              temple.name.toLowerCase().includes(q) ||
              temple.location.toLowerCase().includes(q) ||
              temple.district.toLowerCase().includes(q);

            const isAllRegion =
              typeof region === 'string' && region.toLowerCase() === 'all';
            const matchesRegion = isAllRegion || temple.region === region;

            if (matchesSearch && matchesRegion) {
              expect(results).toContain(temple);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * PROPERTY 3 — EMPTY SEARCH
   * When the search query is empty (or purely whitespace) and region is "all" (or "All"),
   * filterTemples must return all temples intact in the exact same order.
   */
  it('PROPERTY 3 — EMPTY SEARCH: empty query and "all" region returns all temples', () => {
    fc.assert(
      fc.property(
        templeListArbitrary,
        whitespaceStringArbitrary,
        fc.constantFrom<'All' | 'all'>('All', 'all'),
        (temples, emptyQuery, allRegion) => {
          const results = filterTemples(temples, emptyQuery, allRegion);

          // Must return all elements
          expect(results.length).toBe(temples.length);

          // Must preserve identical elements and order
          expect(results).toEqual(temples);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * PROPERTY 4 — REGION FILTER
   * For every valid region other than "all", every returned temple must have that exact region.
   */
  it('PROPERTY 4 — REGION FILTER: specific region filter returns only temples of that region', () => {
    fc.assert(
      fc.property(
        templeListArbitrary,
        searchQueryArbitrary,
        specificRegionArbitrary,
        (temples, query, specificRegion) => {
          const results = filterTemples(temples, query, specificRegion);

          // Every returned temple must belong to the specified region
          for (const temple of results) {
            expect(temple.region).toBe(specificRegion);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * PROPERTY 5 — FILTER COMPOSITION
   * Applying search + region together must never return a temple that fails either condition.
   * Furthermore, combined filtering is equivalent to sequential filtering:
   * filter(temples, query, region) === filter(filter(temples, query, 'All'), '', region)
   */
  it('PROPERTY 5 — FILTER COMPOSITION: combined filter matches intersection of independent filters', () => {
    fc.assert(
      fc.property(
        templeListArbitrary,
        searchQueryArbitrary,
        allRegionsArbitrary,
        (temples, query, region) => {
          const combinedResults = filterTemples(temples, query, region);

          // Condition 1: Never returns an item violating search
          const q = query.trim().toLowerCase();
          if (q !== '') {
            for (const t of combinedResults) {
              const matchesSearch =
                t.name.toLowerCase().includes(q) ||
                t.location.toLowerCase().includes(q) ||
                t.district.toLowerCase().includes(q);
              expect(matchesSearch).toBe(true);
            }
          }

          // Condition 2: Never returns an item violating region
          const isAllRegion =
            typeof region === 'string' && region.toLowerCase() === 'all';
          if (!isAllRegion) {
            for (const t of combinedResults) {
              expect(t.region).toBe(region);
            }
          }

          // Condition 3: Sequential filtering equivalence (composition)
          // Filtering by query first, then filtering the result by region produces the exact same result
          const searchOnly = filterTemples(temples, query, 'All');
          const sequentialResults = filterTemples(searchOnly, '', region);
          expect(combinedResults).toEqual(sequentialResults);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * PROPERTY 6 — IMMUTABILITY
   * Calling filterTemples must never mutate the original temple array or its elements.
   */
  it('PROPERTY 6 — IMMUTABILITY: calling filterTemples does not mutate the source array', () => {
    fc.assert(
      fc.property(
        templeListArbitrary,
        searchQueryArbitrary,
        allRegionsArbitrary,
        (temples, query, region) => {
          // Deep clone snapshot before filtering
          const snapshot = JSON.parse(JSON.stringify(temples));
          const lengthBefore = temples.length;

          // Freeze array references to ensure no in-place mutation occurs
          const shallowFrozen = Object.freeze([...temples]);

          // Execute filtering
          const results = filterTemples(shallowFrozen as Temple[], query, region);

          // Verify results is a new array reference when filtering occurred or an array
          expect(Array.isArray(results)).toBe(true);

          // Source array length and structure must remain strictly unchanged
          expect(temples.length).toBe(lengthBefore);
          expect(temples).toEqual(snapshot);
        }
      ),
      { numRuns: 100 }
    );
  });
});
