import type { FC } from 'react';
import type { Temple } from '@/types/temple';

import TempleCard from '@/components/TempleCard/TempleCard';

interface TempleCollectionProps {
  filteredTemples: Temple[];
  onSelectTemple: (temple: Temple) => void;
  onResetFilters?: () => void;
}

const TempleCollection: FC<TempleCollectionProps> = ({
  filteredTemples,
  onSelectTemple,
  onResetFilters,
}) => {
  return (
    <section
      id="temple-collection"
      aria-label="Temple Showcase Collection"
      className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <span className="font-body text-xs sm:text-sm font-semibold text-gold-primary tracking-widest uppercase mb-1">
          Architectural Marvels of Tamilakam
        </span>
        <h2 className="font-display text-2xl sm:text-4xl font-bold text-stone">
          Curated Temple Showcase
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-gold-primary via-gold-light to-gold-primary rounded-full mt-3" />
      </div>

      {/* Grid or Empty State */}
      {filteredTemples.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTemples.map((temple) => (
            <TempleCard
              key={temple.id}
              temple={temple}
              onClick={() => onSelectTemple(temple)}
            />
          ))}
        </div>
      ) : (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center p-12 bg-ivory rounded-2xl border-2 border-dashed border-stone-light/40 text-center max-w-xl mx-auto shadow-sm"
        >
          <span className="text-4xl mb-3" aria-hidden="true">
            🔍
          </span>
          <h3 className="font-display text-xl font-bold text-stone">
            No temples found
          </h3>
          <p className="mt-2 font-body text-sm text-stone-light max-w-md">
            No temple matches your search query or selected region filter. Try clearing your search or switching to another dynasty.
          </p>
          {onResetFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-6 px-5 py-2.5 bg-gold-primary hover:bg-gold-light text-stone font-body text-sm font-bold rounded-lg shadow transition-colors duration-200 min-h-[44px]"
            >
              Reset All Filters
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default TempleCollection;
