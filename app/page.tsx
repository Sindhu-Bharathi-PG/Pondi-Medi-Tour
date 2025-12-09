"use client";

import React, { useMemo } from 'react';
import { useScrolled, useCarousel, useAccessibility } from './hooks';
import { HOSPITALS, TREATMENTS, HERO_SLIDES, TESTIMONIALS, FEATURED_DOCTORS } from './utils/constants';
import {
  AccessibilityMenu,
  HeroSection,
  AudienceFunnels,
  Testimonials,
  FeaturedDoctors,
  HybridPackages,
  HowItWorks,
  Partners,
  FinalCTA,
} from './components/home';
import { Header, Footer } from './components/common';

const MedicalTourismHomepage = () => {
  // Custom hooks for cleaner state management
  const scrolled = useScrolled(50);
  const { currentSlide, setCurrentSlide } = useCarousel(HERO_SLIDES.length, 5000);
  const {
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    showMenu: showAccessibilityMenu,
    setShowMenu: setShowAccessibilityMenu,
    getFontSizeClass,
    getContrastClass
  } = useAccessibility();

  // Search state
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchFocused, setSearchFocused] = React.useState(false);

  // Combined search items
  const searchItems = useMemo(() => [...HOSPITALS, ...TREATMENTS], []);

  const filteredResults = useMemo(() => {
    if (searchQuery.length === 0) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return searchItems.filter(item =>
      item.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery, searchItems]);

  // Convert readonly arrays to mutable for component props
  const heroSlides = [...HERO_SLIDES];
  const testimonials = [...TESTIMONIALS];
  const doctors = [...FEATURED_DOCTORS];
  const hospitals = [...HOSPITALS];

  return (
    <div className={`min-h-screen bg-white ${getFontSizeClass()} ${getContrastClass()}`}>
      <AccessibilityMenu
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        showAccessibilityMenu={showAccessibilityMenu}
        setShowAccessibilityMenu={setShowAccessibilityMenu}
      />

      {/* Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>

      <Header
        scrolled={scrolled}
        highContrast={highContrast}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchFocused={searchFocused}
        setSearchFocused={setSearchFocused}
        filteredResults={filteredResults}
        hospitals={hospitals}
      />

      <HeroSection
        heroSlides={heroSlides}
        currentHeroSlide={currentSlide}
        setCurrentHeroSlide={setCurrentSlide}
        highContrast={highContrast}
      />

      <AudienceFunnels />

      <Testimonials testimonials={testimonials} />

      <FeaturedDoctors doctors={doctors} />

      <HybridPackages />

      <HowItWorks />

      <Partners />

      <FinalCTA />

      <Footer />
    </div>
  );
};

export default MedicalTourismHomepage;