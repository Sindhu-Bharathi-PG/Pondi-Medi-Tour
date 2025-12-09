"use client";

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to manage auto-advancing carousel slides
 * @param totalSlides - Total number of slides
 * @param interval - Auto-advance interval in milliseconds (default: 5000ms)
 * @param autoPlay - Whether to auto-advance (default: true)
 * @returns Object with current slide index and control functions
 */
export function useCarousel(
      totalSlides: number,
      interval: number = 5000,
      autoPlay: boolean = true
) {
      const [currentSlide, setCurrentSlide] = useState(0);
      const [isPaused, setIsPaused] = useState(false);

      const nextSlide = useCallback(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, [totalSlides]);

      const prevSlide = useCallback(() => {
            setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      }, [totalSlides]);

      const goToSlide = useCallback((index: number) => {
            if (index >= 0 && index < totalSlides) {
                  setCurrentSlide(index);
            }
      }, [totalSlides]);

      const pause = useCallback(() => setIsPaused(true), []);
      const resume = useCallback(() => setIsPaused(false), []);

      useEffect(() => {
            if (!autoPlay || isPaused || totalSlides <= 1) return;

            const timer = setInterval(nextSlide, interval);
            return () => clearInterval(timer);
      }, [autoPlay, isPaused, interval, nextSlide, totalSlides]);

      return {
            currentSlide,
            setCurrentSlide: goToSlide,
            nextSlide,
            prevSlide,
            pause,
            resume,
            isPaused
      };
}

export default useCarousel;
