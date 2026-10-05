import type { FC } from 'react';

const Header: FC = () => {
  const scrollToCollection = () => {
    const el = document.getElementById('temple-collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-stone/95 backdrop-blur-sm border-b border-gold-primary/30 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-gold-primary to-gold-light text-stone font-display text-lg font-bold rounded-lg shadow-sm">
            🏛️
          </span>
          <div>
            <span className="block font-display text-base sm:text-lg font-bold text-gold-primary tracking-wide">
              Pride Temples of Tamil Nadu
            </span>
            <span className="block font-body text-xs text-gold-light/80 tracking-wider uppercase">
              Sacred Dravidian Heritage
            </span>
          </div>
        </div>

        <nav aria-label="Main Navigation">
          <button
            type="button"
            onClick={scrollToCollection}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gold-primary/20 hover:bg-gold-primary text-gold-light hover:text-stone font-body text-xs sm:text-sm font-semibold rounded-full border border-gold-primary/40 transition-colors duration-200 min-h-[44px] min-w-[44px]"
            aria-label="Scroll to temple collection"
          >
            <span>Explore Temples</span>
            <span aria-hidden="true">↓</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
