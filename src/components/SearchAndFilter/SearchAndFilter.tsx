import type { FC } from 'react';
import type { RegionKey } from '@/types/temple';

import SearchBar from './SearchBar';
import RegionFilter from './RegionFilter';

interface SearchAndFilterProps {
  searchQuery: string;
  activeRegion: RegionKey | 'All';
  onSearchChange: (query: string) => void;
  onRegionChange: (region: RegionKey | 'All') => void;
  resultCount: number;
  totalCount: number;
}

const SearchAndFilter: FC<SearchAndFilterProps> = ({
  searchQuery,
  activeRegion,
  onSearchChange,
  onRegionChange,
  resultCount,
  totalCount,
}) => {
  return (
    <section
      aria-label="Search and Filter Temples"
      className="w-full bg-ivory/80 border-b border-stone-light/20 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />

        {/* Region Filter */}
        <RegionFilter
          activeRegion={activeRegion}
          onRegionChange={onRegionChange}
        />

        {/* Results Counter & Active Filters Indicator */}
        <div className="flex flex-wrap items-center justify-center gap-2 font-body text-xs sm:text-sm text-stone-light">
          <span>
            Showing <strong className="text-stone font-semibold">{resultCount}</strong> of{' '}
            <strong className="text-stone font-semibold">{totalCount}</strong> temples
          </span>
          {(searchQuery.trim() !== '' || activeRegion !== 'All') && (
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                onRegionChange('All');
              }}
              className="ml-2 text-crimson hover:underline font-semibold text-xs"
              aria-label="Reset all search and region filters"
            >
              (Reset Filters)
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchAndFilter;
