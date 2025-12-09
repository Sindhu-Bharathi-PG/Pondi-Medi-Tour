"use client";

import { useState, useCallback } from 'react';

type FontSize = 'normal' | 'large' | 'xlarge';

/**
 * Custom hook for accessibility settings
 * @returns Accessibility state and control functions
 */
export function useAccessibility() {
      const [fontSize, setFontSize] = useState<FontSize>('normal');
      const [highContrast, setHighContrast] = useState(false);
      const [showMenu, setShowMenu] = useState(false);

      const toggleMenu = useCallback(() => {
            setShowMenu(prev => !prev);
      }, []);

      const closeMenu = useCallback(() => {
            setShowMenu(false);
      }, []);

      const resetAll = useCallback(() => {
            setFontSize('normal');
            setHighContrast(false);
      }, []);

      const getFontSizeClass = useCallback(() => {
            switch (fontSize) {
                  case 'large':
                        return 'text-lg';
                  case 'xlarge':
                        return 'text-xl';
                  default:
                        return '';
            }
      }, [fontSize]);

      const getContrastClass = useCallback(() => {
            return highContrast ? 'bg-black text-white' : '';
      }, [highContrast]);

      return {
            fontSize,
            setFontSize,
            highContrast,
            setHighContrast,
            showMenu,
            setShowMenu,
            toggleMenu,
            closeMenu,
            resetAll,
            getFontSizeClass,
            getContrastClass
      };
}

export default useAccessibility;
