import { useEffect, useRef, type FC, type KeyboardEvent, type SyntheticEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import type { Temple } from '@/types/temple';

interface TempleDetailModalProps {
  temple: Temple | null;
  onClose: () => void;
}

const TempleDetailModal: FC<TempleDetailModalProps> = ({ temple, onClose }) => {
  const shouldReduceMotion = useReducedMotion();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Focus trap & Escape key listener
  useEffect(() => {
    if (!temple) return;

    // Save previously focused element to restore on close
    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    // Focus close button initially
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // Escape listener
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElement.current?.focus();
    };
  }, [temple, onClose]);

  // Trap focus inside modal
  const handleModalKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/placeholder.svg';
  };

  if (!temple) {
    return null;
  }

  // Handle malformed temple object
  if (!temple.id || !temple.name) {
    // eslint-disable-next-line no-console
    console.error('TempleDetailModal received invalid or malformed temple record:', temple);
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Error"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone/70 backdrop-blur-sm"
      >
        <div className="bg-ivory text-stone p-6 rounded-2xl max-w-md w-full shadow-2xl border border-crimson">
          <h2 className="font-display text-lg font-bold text-crimson mb-2">
            Temple details unavailable
          </h2>
          <p className="font-body text-sm text-stone mb-4">
            The requested temple information could not be loaded.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 bg-stone text-ivory rounded-lg font-semibold min-h-[44px]"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone/75 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="presentation"
    >
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-temple-name"
        onKeyDown={handleModalKeyDown}
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 16 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative flex flex-col w-full max-w-3xl max-h-[90vh] bg-ivory text-stone rounded-2xl shadow-2xl border-2 border-gold-primary overflow-hidden focus:outline-none my-auto"
      >
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-stone text-ivory border-b border-gold-primary/40 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-gold-primary text-xl">🏛️</span>
            <div>
              <h2
                id="modal-temple-name"
                className="font-display text-lg sm:text-xl font-bold text-gold-primary leading-tight line-clamp-1"
              >
                {temple.name}
              </h2>
              <span className="text-xs text-gold-light/90 font-body">
                {temple.location}, {temple.district} District
              </span>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close temple details modal"
            className="flex items-center justify-center w-10 h-10 bg-gold-primary/20 hover:bg-crimson text-ivory hover:text-ivory rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gold-light"
          >
            <span className="text-xl font-bold leading-none" aria-hidden="true">
              ✕
            </span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Main Large Image Banner */}
          <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden shadow-md bg-stone/20">
            <img
              src={temple.imageUrl}
              alt={temple.imageAlt}
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 bg-stone/90 text-gold-light text-xs font-semibold rounded-md border border-gold-primary/30">
                {temple.dynasty}
              </span>
              <span className="px-3 py-1 bg-gold-primary text-stone text-xs font-bold rounded-md shadow">
                {temple.region} Region
              </span>
            </div>
          </div>

          {/* Quick Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-stone/5 rounded-xl border border-stone-light/20">
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-stone-light font-body">
                Founding Era / Period
              </span>
              <span className="font-body text-sm font-semibold text-stone">
                {temple.foundingPeriod}
              </span>
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-stone-light font-body">
                Architectural Style
              </span>
              <span className="font-body text-sm font-semibold text-stone">
                {temple.architecturalStyle}
              </span>
            </div>
          </div>

          {/* Detailed History */}
          <section aria-labelledby="history-heading">
            <h3
              id="history-heading"
              className="font-display text-base sm:text-lg font-bold text-crimson flex items-center gap-2 mb-2"
            >
              <span>📜</span>
              <span>Historical Significance & Heritage</span>
            </h3>
            <p className="font-body text-sm sm:text-base text-stone/90 leading-relaxed text-justify">
              {temple.detailedHistory}
            </p>
          </section>

          {/* Notable Architectural & Cultural Features */}
          <section aria-labelledby="features-heading">
            <h3
              id="features-heading"
              className="font-display text-base sm:text-lg font-bold text-crimson flex items-center gap-2 mb-3"
            >
              <span>✨</span>
              <span>Notable Architectural & Cultural Features</span>
            </h3>
            <ul className="space-y-2.5">
              {temple.notableFeatures.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 font-body text-sm text-stone/90"
                >
                  <span className="text-gold-primary font-bold text-base leading-none mt-0.5">
                    ◆
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Religious & Cultural Significance */}
          <section aria-labelledby="significance-heading">
            <h3
              id="significance-heading"
              className="font-display text-base sm:text-lg font-bold text-crimson flex items-center gap-2 mb-2"
            >
              <span>🛕</span>
              <span>Spiritual & Cultural Legacy</span>
            </h3>
            <p className="font-body text-sm sm:text-base text-stone/90 leading-relaxed bg-gold-primary/10 p-4 rounded-xl border border-gold-primary/30">
              {temple.significance}
            </p>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end px-6 py-3.5 bg-stone/5 border-t border-stone-light/20">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-stone hover:bg-stone/90 text-ivory font-body text-sm font-semibold rounded-lg shadow-sm transition-colors duration-150 min-h-[44px]"
          >
            Close Details
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TempleDetailModal;
