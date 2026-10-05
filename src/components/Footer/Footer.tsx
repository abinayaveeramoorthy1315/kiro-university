import type { FC } from 'react';

const Footer: FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-stone text-ivory border-t-4 border-gold-primary mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-stone-light/20 text-center md:text-left">
          {/* Column 1: Project Info */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <span className="text-gold-primary text-xl">🏛️</span>
              <span className="font-display text-lg font-bold text-gold-primary">
                Pride Temples of Tamil Nadu
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm text-ivory/80 leading-relaxed">
              An interactive cultural showcase celebrating the sacred architecture, rich history, and spiritual legacy of ancient Dravidian temples.
            </p>
          </div>

          {/* Column 2: Architectural Dynasties */}
          <div>
            <h3 className="font-display text-sm font-bold text-gold-light uppercase tracking-wider mb-3">
              Featured Dynasties
            </h3>
            <ul className="space-y-1.5 font-body text-xs sm:text-sm text-ivory/80">
              <li>• Chola Empire (Thanjavur, Gangaikonda, Darasuram)</li>
              <li>• Pandyan & Nayak Kingdoms (Madurai, Tiruchendur)</li>
              <li>• Pallava Dynasty (Mahabalipuram, Kanchipuram)</li>
              <li>• Vijayanagara Imperial Architecture</li>
            </ul>
          </div>

          {/* Column 3: Kiro Showcase & Back to Top */}
          <div className="flex flex-col items-center md:items-start justify-between">
            <div>
              <h3 className="font-display text-sm font-bold text-gold-light uppercase tracking-wider mb-2">
                Portfolio Showcase
              </h3>
              <p className="font-body text-xs text-ivory/70">
                Created for Kiro University 2026. Built with React, TypeScript, Tailwind CSS & Framer Motion.
              </p>
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-4 px-4 py-2 bg-gold-primary/20 hover:bg-gold-primary text-gold-light hover:text-stone font-body text-xs font-semibold rounded-lg border border-gold-primary/40 transition-colors min-h-[44px]"
              aria-label="Scroll back to top of page"
            >
              Back to Top ↑
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-stone-light">
          <p>© 2026 Pride Temples of Tamil Nadu • Cultural Heritage Showcase</p>
          <p className="italic text-gold-light/70">
            "கோயில் இல்லா ஊரில் குடியிருக்க வேண்டாம்" — Ancient Tamil Proverb
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
