import type { FC } from 'react';

const HeroSection: FC = () => {
  const handleScrollToCollection = () => {
    const el = document.getElementById('temple-collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      aria-label="Hero Section"
      className="relative flex flex-col items-center justify-center w-full px-4 py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-stone via-stone/95 to-stone text-ivory overflow-hidden border-b-4 border-gold-primary"
    >
      {/* Subtle heritage background watermark patterns */}
      <div
        className="absolute inset-0 opacity-10 bg-[radial-gradient(#F2C94C_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative top badge */}
      <div className="flex items-center gap-2 mb-4 px-4 py-1 bg-gold-primary/20 text-gold-light border border-gold-primary/40 rounded-full font-body text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-sm">
        <span className="text-gold-primary">✦</span>
        <span>Living Monuments of Millennia</span>
        <span className="text-gold-primary">✦</span>
      </div>

      {/* Main Title */}
      <h1 className="max-w-4xl font-display text-3xl sm:text-5xl lg:text-6xl text-gold-primary text-center font-bold tracking-wide leading-tight drop-shadow-md">
        Pride Temples of Tamil Nadu
      </h1>

      {/* Tagline */}
      <p className="mt-4 max-w-2xl font-display text-base sm:text-xl text-gold-light text-center font-medium tracking-wider">
        Granite Towers • Sacred Sculptures • Timeless Dynasties
      </p>

      {/* Cultural Heritage Introduction */}
      <p className="mt-6 max-w-3xl font-body text-sm sm:text-base lg:text-lg text-ivory/90 text-center leading-relaxed">
        From the soaring granite vimana of the Great Chola emperors to the kaleidoscopic gopurams of the Pandyan kingdom and the ocean-facing sanctums of Pallava artisans, immerse yourself in ten architectural masterpieces that have shaped the spiritual and cultural soul of South India.
      </p>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-8 max-w-xl w-full text-center">
        <div className="p-3 bg-stone/80 rounded-lg border border-gold-primary/30">
          <span className="block font-display text-2xl sm:text-3xl font-bold text-gold-light">10</span>
          <span className="block font-body text-xs sm:text-sm text-ivory/80">Iconic Temples</span>
        </div>
        <div className="p-3 bg-stone/80 rounded-lg border border-gold-primary/30">
          <span className="block font-display text-2xl sm:text-3xl font-bold text-gold-light">1,000+</span>
          <span className="block font-body text-xs sm:text-sm text-ivory/80">Years of History</span>
        </div>
        <div className="p-3 bg-stone/80 rounded-lg border border-gold-primary/30">
          <span className="block font-display text-2xl sm:text-3xl font-bold text-gold-light">4</span>
          <span className="block font-body text-xs sm:text-sm text-ivory/80">Great Dynasties</span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-10">
        <button
          type="button"
          onClick={handleScrollToCollection}
          aria-label="Explore The Sacred Collection"
          className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-gold-primary to-gold-light hover:from-gold-light hover:to-gold-primary text-stone font-display text-sm sm:text-base font-bold rounded-lg shadow-lg hover:shadow-gold-primary/40 transition-all duration-300 transform hover:-translate-y-0.5 min-h-[44px] min-w-[44px]"
        >
          <span>Explore The Sacred Collection</span>
          <span className="text-lg leading-none" aria-hidden="true">↓</span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
