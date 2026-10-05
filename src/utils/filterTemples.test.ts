import { describe, it, expect } from 'vitest';

import { filterTemples } from '@/utils/filterTemples';
import { templeData } from '@/data/templeData';

describe('filterTemples', () => {
  it('returns all temples when query is empty and region is All', () => {
    const results = filterTemples(templeData, '', 'All');
    expect(results).toHaveLength(10);
  });

  it('filters temples by name case-insensitively', () => {
    const results = filterTemples(templeData, 'brihadeeswarar', 'All');
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.some((t) => t.id === 'brihadeeswarar')).toBe(true);
  });

  it('filters temples by location', () => {
    const results = filterTemples(templeData, 'Madurai', 'All');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('meenakshi-amman');
  });

  it('filters temples by district', () => {
    const results = filterTemples(templeData, 'Ariyalur', 'All');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('gangaikonda-cholapuram');
  });

  it('filters temples by region correctly', () => {
    const cholaTemples = filterTemples(templeData, '', 'Chola');
    expect(cholaTemples.every((t) => t.region === 'Chola')).toBe(true);
    expect(cholaTemples.length).toBe(3); // Brihadeeswarar, Airavatesvara, Gangaikonda
  });

  it('filters temples by combined query and region', () => {
    const results = filterTemples(templeData, 'Darasuram', 'Chola');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('airavatesvara');
  });

  it('returns empty array when no temple matches', () => {
    const results = filterTemples(templeData, 'NonExistentTempleNameXYZ', 'All');
    expect(results).toHaveLength(0);
  });

  it('handles invalid input gracefully', () => {
    // @ts-expect-error test resilience
    expect(filterTemples(null, 'query', 'All')).toEqual([]);
  });
});
