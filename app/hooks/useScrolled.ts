"use client";

import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll position and return scrolled state
 * @param threshold - Scroll position threshold (default: 50px)
 * @returns boolean indicating if page is scrolled past threshold
 */
export function useScrolled(threshold: number = 50): boolean {
      const [scrolled, setScrolled] = useState(false);

      useEffect(() => {
            const handleScroll = () => {
                  setScrolled(window.scrollY > threshold);
            };

            // Check initial scroll position
            handleScroll();

            window.addEventListener('scroll', handleScroll, { passive: true });
            return () => window.removeEventListener('scroll', handleScroll);
      }, [threshold]);

      return scrolled;
}

export default useScrolled;
