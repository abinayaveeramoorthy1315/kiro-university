export type RegionKey = 'Chola' | 'Pandya/Nayak' | 'Other';

export interface Temple {
  id: string;                    // Unique slug, e.g. "brihadeeswarar"
  name: string;                  // Full temple name
  location: string;              // City/town name
  district: string;              // Tamil Nadu district
  region: RegionKey;             // Used by RegionFilter ('Chola' | 'Pandya/Nayak' | 'Other')
  dynasty: string;               // E.g. "Chola Dynasty", "Nayak / Pandya", "Pallava Dynasty"
  foundingPeriod: string;        // Human-readable, e.g. "1010 CE (11th century CE)"
  architecturalStyle: string;    // E.g. "Dravidian (Chola Architecture)"
  shortDescription: string;      // <= 40 words — shown on TempleCard
  detailedHistory: string;       // >= 60 words — shown in modal
  notableFeatures: string[];     // Bullet-list items in modal (>= 3 items)
  significance: string;          // Cultural/religious significance paragraph
  imageUrl: string;              // High-resolution image URL (Unsplash)
  imageAlt: string;              // Descriptive alt text for screen readers
}

export interface FilterState {
  searchQuery: string;
  activeRegion: RegionKey | 'All';
}
