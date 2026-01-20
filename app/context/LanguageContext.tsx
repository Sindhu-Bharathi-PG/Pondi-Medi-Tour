"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

// Language type definition
export type Language = 'en' | 'hi' | 'ta' | 'ml' | 'te' | 'fr' | 'de' | 'es' | 'it' | 'pt' | 'ja' | 'zh';

// Language options with flags
export const LANGUAGES: Array<{ code: Language; name: string; flag: string; nativeName: string }> = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
];

interface TranslationCache {
    [key: string]: string;
}

interface LanguageContextType {
    currentLanguage: Language;
    setLanguage: (lang: Language) => void;
    translate: (text: string) => Promise<string>;
    batchTranslate: (texts: string[]) => Promise<string[]>;
    translateSync: (text: string) => string;
    isTranslating: boolean;
    clearCache: () => void;
    getCacheSize: () => number;
    getLanguageInfo: () => { code: Language; name: string; flag: string; nativeName: string } | undefined;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Storage key for localStorage
const LANGUAGE_STORAGE_KEY = 'pondy-health-language';
const CACHE_STORAGE_KEY = 'pondy-health-translations';

// In-memory cache for fastest access
const globalCache: TranslationCache = {};

// Pending translation requests to avoid duplicate API calls
const pendingTranslations: Map<string, Promise<string>> = new Map();

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
    const [isTranslating, setIsTranslating] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load saved language and cache on mount
    useEffect(() => {
        try {
            const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
            if (savedLang && LANGUAGES.some(l => l.code === savedLang)) {
                setCurrentLanguage(savedLang);
            }

            // Load cached translations
            const savedCache = localStorage.getItem(CACHE_STORAGE_KEY);
            if (savedCache) {
                const parsed = JSON.parse(savedCache);
                Object.assign(globalCache, parsed);
            }
        } catch (e) {
            console.warn('Failed to load language settings:', e);
        }
        setIsHydrated(true);
    }, []);

    // Save language preference when changed
    const setLanguage = useCallback((lang: Language) => {
        setCurrentLanguage(lang);
        try {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
            // Update document language for accessibility
            document.documentElement.lang = lang;
        } catch (e) {
            console.warn('Failed to save language preference:', e);
        }
    }, []);

    // Generate cache key
    const getCacheKey = useCallback((text: string, lang: Language): string => {
        return `${lang}:${text}`;
    }, []);

    // Synchronous translation (returns cached or original)
    const translateSync = useCallback((text: string): string => {
        if (currentLanguage === 'en' || !text?.trim()) {
            return text;
        }
        const cacheKey = getCacheKey(text, currentLanguage);
        return globalCache[cacheKey] || text;
    }, [currentLanguage, getCacheKey]);

    // Async translation with API fallback
    const translate = useCallback(async (text: string): Promise<string> => {
        // Return original if English or empty
        if (currentLanguage === 'en' || !text?.trim()) {
            return text;
        }

        const cacheKey = getCacheKey(text, currentLanguage);

        // Check in-memory cache first (fastest)
        if (globalCache[cacheKey]) {
            return globalCache[cacheKey];
        }

        // Check if there's already a pending request for this text
        if (pendingTranslations.has(cacheKey)) {
            return pendingTranslations.get(cacheKey)!;
        }

        // Create new translation request
        const translationPromise = (async () => {
            setIsTranslating(true);
            try {
                const response = await fetch('/api/translate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        text,
                        targetLanguage: currentLanguage,
                        sourceLanguage: 'en',
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Translation failed: ${response.status}`);
                }

                const data = await response.json();
                const translatedText = data.translatedText || text;

                // Cache the result
                globalCache[cacheKey] = translatedText;

                // Persist to localStorage (debounced)
                saveCacheToStorage();

                return translatedText;
            } catch (error) {
                console.error('Translation error:', error);
                return text; // Fallback to original
            } finally {
                setIsTranslating(false);
                pendingTranslations.delete(cacheKey);
            }
        })();

        pendingTranslations.set(cacheKey, translationPromise);
        return translationPromise;
    }, [currentLanguage, getCacheKey]);

    // Batch translation for efficiency
    const batchTranslate = useCallback(async (texts: string[]): Promise<string[]> => {
        if (currentLanguage === 'en') {
            return texts;
        }

        // Check which texts need translation
        const needsTranslation: { index: number; text: string }[] = [];
        const results: string[] = [...texts];

        texts.forEach((text, index) => {
            if (!text?.trim()) {
                results[index] = text;
                return;
            }
            const cacheKey = getCacheKey(text, currentLanguage);
            if (globalCache[cacheKey]) {
                results[index] = globalCache[cacheKey];
            } else {
                needsTranslation.push({ index, text });
            }
        });

        // Translate uncached texts in parallel (with concurrency limit)
        if (needsTranslation.length > 0) {
            const BATCH_SIZE = 5;
            for (let i = 0; i < needsTranslation.length; i += BATCH_SIZE) {
                const batch = needsTranslation.slice(i, i + BATCH_SIZE);
                const translations = await Promise.all(
                    batch.map(({ text }) => translate(text))
                );
                batch.forEach(({ index }, batchIndex) => {
                    results[index] = translations[batchIndex];
                });
            }
        }

        return results;
    }, [currentLanguage, getCacheKey, translate]);

    // Debounced cache persistence
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const saveCacheToStorage = useCallback(() => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        saveTimeoutRef.current = setTimeout(() => {
            try {
                // Only save recent translations (limit size)
                const entries = Object.entries(globalCache);
                const recentEntries = entries.slice(-500); // Keep last 500 translations
                const cacheToSave = Object.fromEntries(recentEntries);
                localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(cacheToSave));
            } catch (e) {
                console.warn('Failed to persist translation cache:', e);
            }
        }, 2000);
    }, []);

    const clearCache = useCallback(() => {
        Object.keys(globalCache).forEach(key => delete globalCache[key]);
        pendingTranslations.clear();
        try {
            localStorage.removeItem(CACHE_STORAGE_KEY);
        } catch (e) {
            console.warn('Failed to clear cache from storage:', e);
        }
    }, []);

    const getCacheSize = useCallback(() => {
        return Object.keys(globalCache).length;
    }, []);

    const getLanguageInfo = useCallback(() => {
        return LANGUAGES.find(l => l.code === currentLanguage);
    }, [currentLanguage]);

    // Don't render children until hydrated to prevent mismatch
    if (!isHydrated) {
        return null;
    }

    return (
        <LanguageContext.Provider
            value={{
                currentLanguage,
                setLanguage,
                translate,
                batchTranslate,
                translateSync,
                isTranslating,
                clearCache,
                getCacheSize,
                getLanguageInfo,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

// Optional hook that doesn't throw if outside provider (useful for optional translation)
export function useLanguageOptional() {
    return useContext(LanguageContext);
}
