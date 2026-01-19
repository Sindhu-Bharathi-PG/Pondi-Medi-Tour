"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

type FontSize = 'normal' | 'large' | 'xlarge';

interface AccessibilityState {
    fontSize: FontSize;
    setFontSize: (size: FontSize) => void;
    highContrast: boolean;
    setHighContrast: (value: boolean) => void;
    reducedMotion: boolean;
    setReducedMotion: (value: boolean) => void;
    showMenu: boolean;
    setShowMenu: (value: boolean) => void;
    toggleMenu: () => void;
    resetAll: () => void;
}

const AccessibilityContext = createContext<AccessibilityState | undefined>(undefined);

const STORAGE_KEY = 'pondi_accessibility_settings';

export function AccessibilityProvider({ children }: { children: ReactNode }) {
    const [fontSize, setFontSizeState] = useState<FontSize>('normal');
    const [highContrast, setHighContrastState] = useState(false);
    const [reducedMotion, setReducedMotionState] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Load settings from localStorage on mount
    useEffect(() => {
        setMounted(true);
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const settings = JSON.parse(saved);
                if (settings.fontSize) setFontSizeState(settings.fontSize);
                if (settings.highContrast) setHighContrastState(settings.highContrast);
                if (settings.reducedMotion) setReducedMotionState(settings.reducedMotion);
            }
        } catch (error) {
            console.error('Failed to load accessibility settings:', error);
        }
    }, []);

    // Save settings to localStorage
    const saveSettings = useCallback((newSettings: Partial<{ fontSize: FontSize; highContrast: boolean; reducedMotion: boolean }>) => {
        try {
            const current = {
                fontSize,
                highContrast,
                reducedMotion,
                ...newSettings
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
        } catch (error) {
            console.error('Failed to save accessibility settings:', error);
        }
    }, [fontSize, highContrast, reducedMotion]);

    // Apply settings to document
    useEffect(() => {
        if (!mounted) return;

        const html = document.documentElement;

        // Font size
        html.classList.remove('accessibility-font-normal', 'accessibility-font-large', 'accessibility-font-xlarge');
        html.classList.add(`accessibility-font-${fontSize}`);

        // High contrast
        if (highContrast) {
            html.classList.add('accessibility-high-contrast');
        } else {
            html.classList.remove('accessibility-high-contrast');
        }

        // Reduced motion
        if (reducedMotion) {
            html.classList.add('accessibility-reduced-motion');
        } else {
            html.classList.remove('accessibility-reduced-motion');
        }
    }, [fontSize, highContrast, reducedMotion, mounted]);

    const setFontSize = useCallback((size: FontSize) => {
        setFontSizeState(size);
        saveSettings({ fontSize: size });
    }, [saveSettings]);

    const setHighContrast = useCallback((value: boolean) => {
        setHighContrastState(value);
        saveSettings({ highContrast: value });
    }, [saveSettings]);

    const setReducedMotion = useCallback((value: boolean) => {
        setReducedMotionState(value);
        saveSettings({ reducedMotion: value });
    }, [saveSettings]);

    const toggleMenu = useCallback(() => {
        setShowMenu(prev => !prev);
    }, []);

    const resetAll = useCallback(() => {
        setFontSizeState('normal');
        setHighContrastState(false);
        setReducedMotionState(false);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return (
        <AccessibilityContext.Provider value={{
            fontSize,
            setFontSize,
            highContrast,
            setHighContrast,
            reducedMotion,
            setReducedMotion,
            showMenu,
            setShowMenu,
            toggleMenu,
            resetAll
        }}>
            {children}
        </AccessibilityContext.Provider>
    );
}

export function useAccessibility() {
    const context = useContext(AccessibilityContext);
    if (context === undefined) {
        throw new Error('useAccessibility must be used within an AccessibilityProvider');
    }
    return context;
}

export default AccessibilityContext;
