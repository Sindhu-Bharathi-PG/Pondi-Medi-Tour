"use client";

import { useEffect, useState } from 'react';
import { Footer, Header } from './components/common';
import MedicalHome from './components/home/MedicalHome';
import WellnessHome from './components/home/WellnessHome';
import { useSiteMode } from './context/SiteModeContext';
import { useScrolled } from './hooks';

export default function Home() {
  const scrolled = useScrolled(50);
  const [displayMode, setDisplayMode] = useState<'medical' | 'wellness'>('medical');

  // Get mode from context with fallback
  let currentMode: 'medical' | 'wellness' = 'medical';

  try {
    const siteMode = useSiteMode();
    currentMode = siteMode.mode;
  } catch {
    // Context not available, use default
  }

  // Sync display mode with context mode
  useEffect(() => {
    setDisplayMode(currentMode);
  }, [currentMode]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${displayMode === 'medical' ? 'theme-medical' : 'theme-wellness'}`}>

      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-gray-900 px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      <Header />

      <main
        id="main-content"
        className="transition-all duration-300"
      >
        {displayMode === 'medical' ? (
          <MedicalHome />
        ) : (
          <WellnessHome />
        )}
      </main>

      <Footer />
    </div>
  );
}