import type { FC } from 'react';
import type { RegionKey } from '@/types/temple';

interface RegionFilterProps {
  activeRegion: RegionKey | 'All';
  onRegionChange: (region: RegionKey | 'All') => void;
}

interface FilterOption {
  key: RegionKey | 'All';
  label: string;
  countHint?: string;
}

const filterOptions: FilterOption[] = [
  { key: 'All', label: 'All Temples' },
  { key: 'Chola', label: 'Chola Dynasty' },
  { key: 'Pandya/Nayak', label: 'Pandya / Nayak' },
  { key: 'Other', label: 'Pallava & Others' },
];

const RegionFilter: FC<RegionFilterProps> = ({ activeRegion, onRegionChange }) => {
  return (
    <div
      role="group"
      aria-label="Filter by region or dynasty"
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
    >
      {filterOptions.map((option) => {
        const isActive = activeRegion === option.key;
        return (
          <button
            key={option.key}
            type="button"
            onClick={() => onRegionChange(option.key)}
            aria-pressed={isActive}
            className={`px-4 py-2 font-body text-xs sm:text-sm font-semibold rounded-lg border transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isActive
                ? 'bg-gold-primary text-ivory border-gold-primary shadow-md font-bold'
                : 'bg-ivory text-stone border-stone-light/30 hover:bg-gold-light/20 hover:border-gold-primary/50'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default RegionFilter;
