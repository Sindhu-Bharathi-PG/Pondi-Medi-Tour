"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SiteMode = 'medical' | 'wellness';

interface SiteModeContextType {
      mode: SiteMode;
      setMode: (mode: SiteMode) => void;
      toggleMode: () => void;
      isMedical: boolean;
      isWellness: boolean;
}

const SiteModeContext = createContext<SiteModeContextType | undefined>(undefined);

export const SiteModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
      const [mode, setModeState] = useState<SiteMode>('medical');

      useEffect(() => {
            // Load saved preference
            const saved = localStorage.getItem('siteMode') as SiteMode;
            if (saved && (saved === 'medical' || saved === 'wellness')) {
                  setModeState(saved);
            }
      }, []);

      const setMode = (newMode: SiteMode) => {
            setModeState(newMode);
            localStorage.setItem('siteMode', newMode);
            // Trigger smooth page transition
            document.documentElement.classList.add('mode-transitioning');
            setTimeout(() => {
                  document.documentElement.classList.remove('mode-transitioning');
            }, 500);
      };

      const toggleMode = () => {
            setMode(mode === 'medical' ? 'wellness' : 'medical');
      };

      return (
            <SiteModeContext.Provider
                  value={{
                        mode,
                        setMode,
                        toggleMode,
                        isMedical: mode === 'medical',
                        isWellness: mode === 'wellness',
                  }}
            >
                  {children}
            </SiteModeContext.Provider>
      );
};

export const useSiteMode = () => {
      const context = useContext(SiteModeContext);
      if (!context) {
            throw new Error('useSiteMode must be used within SiteModeProvider');
      }
      return context;
};

// Navigation links for each mode
export const MEDICAL_NAV_LINKS = [
      { href: '/', label: 'Home' },
      { href: '/services', label: 'Treatments' },
      { href: '/hospital', label: 'Hospitals' },
      { href: '/doctor', label: 'Doctors' },
      { href: '/packages', label: 'Packages' },
      { href: '/cost-calculator', label: 'Cost Calculator' },
      { href: '/about', label: 'About' },
];

export const WELLNESS_NAV_LINKS = [
      { href: '/', label: 'Home' },
      { href: '/wellness', label: 'Wellness Retreats' },
      { href: '/ayush', label: 'AYUSH Therapies' },
      { href: '/destination', label: 'Explore Pondicherry' },
      { href: '/yoga-meditation', label: 'Yoga & Meditation' },
      { href: '/spa-rejuvenation', label: 'Spa & Rejuvenation' },
      { href: '/about', label: 'About' },
];

// Theme colors for each mode
export const THEME_COLORS = {
      medical: {
            primary: 'from-emerald-600 to-teal-600',
            secondary: 'from-blue-600 to-indigo-600',
            accent: 'emerald',
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
            border: 'border-emerald-500',
      },
      wellness: {
            primary: 'from-amber-500 to-orange-500',
            secondary: 'from-purple-600 to-pink-600',
            accent: 'amber',
            bg: 'bg-amber-50',
            text: 'text-amber-600',
            border: 'border-amber-500',
      },
};
