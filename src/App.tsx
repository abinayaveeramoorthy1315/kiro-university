import { useState, useEffect } from 'react';

import { AnimatePresence } from 'framer-motion';

import type { Temple, RegionKey } from '@/types/temple';

import { filterTemples } from '@/utils/filterTemples';

import { templeData } from '@/data/templeData';

import Header from '@/components/Header/Header';
import HeroSection from '@/components/HeroSection/HeroSection';
import SearchAndFilter from '@/components/SearchAndFilter/SearchAndFilter';
import TempleCollection from '@/components/TempleCollection/TempleCollection';
import TempleDetailModal from '@/components/TempleDetailModal/TempleDetailModal';
import Footer from '@/components/Footer/Footer';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeRegion, setActiveRegion] = useState<RegionKey | 'All'>('All');
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);

  // Derive filtered temples synchronously via pure utility function
  const filteredTemples = filterTemples(templeData, searchQuery, activeRegion);

  // Manage body scroll locking when modal is open
  useEffect(() => {
    if (selectedTemple) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [selectedTemple]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveRegion('All');
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-stone font-body selection:bg-gold-primary selection:text-ivory">
      {/* Top Header Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center w-full">
        {/* Hero Section */}
        <HeroSection />

        {/* Search & Filter Controls */}
        <SearchAndFilter
          searchQuery={searchQuery}
          activeRegion={activeRegion}
          onSearchChange={setSearchQuery}
          onRegionChange={setActiveRegion}
          resultCount={filteredTemples.length}
          totalCount={templeData.length}
        />

        {/* Temple Cards Grid */}
        <TempleCollection
          filteredTemples={filteredTemples}
          onSelectTemple={setSelectedTemple}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* Detail Modal with smooth entrance/exit animations */}
      <AnimatePresence>
        {selectedTemple && (
          <TempleDetailModal
            temple={selectedTemple}
            onClose={() => setSelectedTemple(null)}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
