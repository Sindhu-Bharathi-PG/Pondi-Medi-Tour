"use client";

import { useLanguageOptional } from '@/app/context/LanguageContext';
import React, { ElementType, memo, useEffect, useRef, useState } from 'react';

interface TranslatableTextProps {
    children: string;
    className?: string;
    as?: ElementType;
    fallback?: React.ReactNode;
    onTranslate?: (translated: string) => void;
}

/**
 * TranslatableText Component
 * 
 * Wraps text content and automatically translates it when the language changes.
 * Uses caching for fast repeat translations.
 * 
 * @example
 * <TranslatableText className="text-xl font-bold">
 *   Welcome to Pondy HealthPort
 * </TranslatableText>
 * 
 * @example
 * <TranslatableText as="h1" className="text-3xl">
 *   Your Medical Tourism Partner
 * </TranslatableText>
 */
const TranslatableText = memo(function TranslatableText({
    children,
    className,
    as: Component = 'span',
    fallback,
    onTranslate,
}: TranslatableTextProps) {
    const languageContext = useLanguageOptional();
    const [translatedText, setTranslatedText] = useState<string>(children);
    const [isLoading, setIsLoading] = useState(false);
    const mountedRef = useRef(true);
    const lastTranslationRef = useRef<string>('');

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        // If no context or English, show original
        if (!languageContext || languageContext.currentLanguage === 'en') {
            setTranslatedText(children);
            return;
        }

        // Skip if text hasn't changed and we already translated for this language
        const translationKey = `${languageContext.currentLanguage}:${children}`;
        if (lastTranslationRef.current === translationKey) {
            return;
        }

        // Check sync cache first (instant)
        const cachedTranslation = languageContext.translateSync(children);
        if (cachedTranslation !== children) {
            setTranslatedText(cachedTranslation);
            lastTranslationRef.current = translationKey;
            onTranslate?.(cachedTranslation);
            return;
        }

        // Async translation needed
        const translateText = async () => {
            setIsLoading(true);
            try {
                const result = await languageContext.translate(children);
                if (mountedRef.current) {
                    setTranslatedText(result);
                    lastTranslationRef.current = translationKey;
                    onTranslate?.(result);
                }
            } catch (error) {
                console.error('Translation error:', error);
                if (mountedRef.current) {
                    setTranslatedText(children);
                }
            } finally {
                if (mountedRef.current) {
                    setIsLoading(false);
                }
            }
        };

        translateText();
    }, [children, languageContext?.currentLanguage, languageContext, onTranslate]);

    // Show loading state if configured
    if (isLoading && fallback) {
        return <>{fallback}</>;
    }

    return (
        <Component
            className={className}
            style={isLoading ? { opacity: 0.7 } : undefined}
        >
            {translatedText}
        </Component>
    );
});

export default TranslatableText;

/**
 * Hook for translating text programmatically
 * Returns translated text and loading state
 */
export function useTranslatedText(text: string): { text: string; isLoading: boolean } {
    const languageContext = useLanguageOptional();
    const [translatedText, setTranslatedText] = useState(text);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!languageContext || languageContext.currentLanguage === 'en') {
            setTranslatedText(text);
            return;
        }

        // Check cache first
        const cached = languageContext.translateSync(text);
        if (cached !== text) {
            setTranslatedText(cached);
            return;
        }

        // Async translation
        let cancelled = false;
        setIsLoading(true);

        languageContext.translate(text).then(result => {
            if (!cancelled) {
                setTranslatedText(result);
                setIsLoading(false);
            }
        }).catch(() => {
            if (!cancelled) {
                setTranslatedText(text);
                setIsLoading(false);
            }
        });

        return () => {
            cancelled = true;
        };
    }, [text, languageContext?.currentLanguage, languageContext]);

    return { text: translatedText, isLoading };
}
