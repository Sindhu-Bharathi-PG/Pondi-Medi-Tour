"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { Header, Footer } from './components/common';
import { useScrolled } from './hooks';
import { useSiteMode } from './context/SiteModeContext';
import MedicalHome from './components/home/MedicalHome';
import WellnessHome from './components/home/WellnessHome';
import SeaWaveTransition from './components/common/SeaWaveTransition';
import WaveTransition from './components/common/WaveTransition';

export default function Home() {
  const scrolled = useScrolled(50);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [displayMode, setDisplayMode] = useState<'medical' | 'wellness'>('medical');
  const [pendingMode, setPendingMode] = useState<'medical' | 'wellness' | null>(null);

  // Get mode from context with fallback
  let currentMode: 'medical' | 'wellness' = 'medical';

  try {
    const siteMode = useSiteMode();
    currentMode = siteMode.mode;
  } catch {
    // Context not available, use default
  }

  // Handle mode transitions with smooth overlay
  useEffect(() => {
    if (currentMode !== displayMode && !showOverlay) {
      setPendingMode(currentMode);
      setShowOverlay(true);
      setIsTransitioning(true);
    }
  }, [currentMode, displayMode, showOverlay]);

  const handleTransitionComplete = useCallback(() => {
    if (pendingMode) {
      setDisplayMode(pendingMode);
      setPendingMode(null);
    }
    setShowOverlay(false);
    setIsTransitioning(false);
  }, [pendingMode]);

  return (


    <div className={`min-h-screen transition-colors duration-500 ${displayMode === 'medical' ? 'theme-medical' : 'theme-wellness'}`}>
      {/* Sea Wave Transition Overlay */}
      <WaveTransition
        isActive={showOverlay}
        targetMode={pendingMode || displayMode}
        onComplete={handleTransitionComplete}
      />

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
        className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
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