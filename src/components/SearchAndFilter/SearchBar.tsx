import type { FC, ChangeEvent } from 'react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="relative w-full max-w-lg">
      <label htmlFor="temple-search" className="sr-only">
        Search temples by name, location, or district
      </label>
      <div className="relative flex items-center">
        <span
          className="absolute left-3.5 text-stone-light pointer-events-none text-base"
          aria-hidden="true"
        >
          🔍
        </span>
        <input
          id="temple-search"
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search by temple name, city, or district..."
          aria-label="Search temples by name or location"
          className="w-full pl-10 pr-10 py-3 bg-ivory text-stone font-body text-sm sm:text-base rounded-xl border border-stone-light/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-gold-primary placeholder:text-stone-light/70 transition duration-150 min-h-[44px]"
        />
        {searchQuery.trim().length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2.5 p-1.5 text-stone-light hover:text-crimson font-body text-sm rounded-full transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center"
            aria-label="Clear search input"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
