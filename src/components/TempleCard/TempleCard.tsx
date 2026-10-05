import type { FC, KeyboardEvent, SyntheticEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import type { Temple } from '@/types/temple';

interface TempleCardProps {
  temple: Temple;
  onClick: () => void;
}

const TempleCard: FC<TempleCardProps> = ({ temple, onClick }) => {
  const shouldReduceMotion = useReducedMotion();

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/placeholder.svg';
  };

  const getRegionBadgeStyle = (region: string) => {
    switch (region) {
      case 'Chola':
        return 'bg-gold-primary text-ivory border-gold-light/40';
      case 'Pandya/Nayak':
        return 'bg-crimson text-ivory border-gold-primary/30';
      default:
        return 'bg-teal-accent text-ivory border-teal-accent/30';
    }
  };

  return (
    <motion.div
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={`View full details for ${temple.name}`}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : { scale: 1.025, boxShadow: '0 12px 36px rgba(92, 74, 50, 0.2)' }
      }
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group flex flex-col relative w-full bg-ivory text-stone rounded-2xl overflow-hidden border border-stone-light/30 shadow-md hover:border-gold-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-primary focus:ring-offset-2 transition-colors duration-200"
    >
      {/* Image Banner */}
      <div className="relative w-full h-56 bg-stone/20 overflow-hidden">
        <img
          src={temple.imageUrl}
          alt={temple.imageAlt}
          loading="lazy"
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone/80 via-transparent to-transparent opacity-60" />

        {/* Region / Dynasty Badge */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 font-body text-xs font-bold rounded-full border shadow-sm ${getRegionBadgeStyle(
            temple.region
          )}`}
        >
          {temple.region}
        </span>

        {/* Location chip on image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-stone/85 backdrop-blur-xs text-gold-light text-xs font-semibold rounded-md">
          <span>📍</span>
          <span>
            {temple.location}, {temple.district}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
        <div>
          {/* Dynasty & Architectural Style */}
          <div className="flex items-center gap-2 text-xs text-stone-light font-semibold mb-2">
            <span>{temple.dynasty}</span>
            <span>•</span>
            <span>{temple.architecturalStyle}</span>
          </div>

          {/* Temple Name */}
          <h2 className="font-display text-lg sm:text-xl font-bold text-stone group-hover:text-crimson transition-colors duration-200 leading-snug">
            {temple.name}
          </h2>

          {/* Short Description */}
          <p className="mt-3 font-body text-sm text-stone/90 leading-relaxed">
            {temple.shortDescription}
          </p>
        </div>

        {/* Card Footer with CTA */}
        <div className="mt-6 pt-4 border-t border-stone-light/20 flex items-center justify-between text-xs sm:text-sm font-semibold text-gold-primary group-hover:text-crimson transition-colors">
          <span className="font-body text-stone-light">
            Founded: <strong className="text-stone font-medium">{temple.foundingPeriod}</strong>
          </span>
          <span className="flex items-center gap-1 font-body">
            <span>Read Details</span>
            <span aria-hidden="true" className="transform group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TempleCard;
