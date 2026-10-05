import type { Temple, RegionKey } from '@/types/temple';

/**
 * Pure function to filter temples by search query and region.
 * Search query is matched case-insensitively against name, location, and district.
 * Region filter supports 'All' or specific region keys ('Chola', 'Pandya/Nayak', 'Other').
 */
export function filterTemples(
  temples: Temple[],
  query: string,
  region: RegionKey | 'All'
): Temple[] {
  if (!Array.isArray(temples)) {
    return [];
  }

  const q = query.trim().toLowerCase();

  return temples.filter((t) => {
    if (!t || typeof t !== 'object') {
      return false;
    }

    const matchesSearch =
      q === '' ||
      (typeof t.name === 'string' && t.name.toLowerCase().includes(q)) ||
      (typeof t.location === 'string' && t.location.toLowerCase().includes(q)) ||
      (typeof t.district === 'string' && t.district.toLowerCase().includes(q));

    const matchesRegion = region === 'All' || t.region === region;

    return matchesSearch && matchesRegion;
  });
}
