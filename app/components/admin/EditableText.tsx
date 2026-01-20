"use client";

import { useLanguageOptional } from '@/app/context/LanguageContext';
import React, { useEffect, useRef, useState } from 'react';

interface EditableTextProps {
    value: string;
    onSave: (value: string) => void;
    isEditing: boolean;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
    multiline?: boolean;
    placeholder?: string;
}

export default function EditableText({
    value,
    onSave,
    isEditing,
    className = '',
    as = 'span',
    multiline = false,
    placeholder = 'Click to edit...',
}: EditableTextProps) {
    const [isInEdit, setIsInEdit] = useState(false);
    const [editValue, setEditValue] = useState(value);

    // Translation support
    const languageContext = useLanguageOptional();
    const [translatedValue, setTranslatedValue] = useState(value);
    const [isTranslating, setIsTranslating] = useState(false);
    const lastTranslationKey = useRef('');

    // Translate content when language changes
    useEffect(() => {
        if (!languageContext || languageContext.currentLanguage === 'en' || isEditing) {
            setTranslatedValue(value);
            return;
        }

        const translationKey = `${languageContext.currentLanguage}:${value}`;
        if (lastTranslationKey.current === translationKey) {
            return;
        }

        // Check cache first (instant)
        const cached = languageContext.translateSync(value);
        if (cached !== value) {
            setTranslatedValue(cached);
            lastTranslationKey.current = translationKey;
            return;
        }

        // Async translation
        setIsTranslating(true);
        languageContext.translate(value).then(result => {
            setTranslatedValue(result);
            lastTranslationKey.current = translationKey;
        }).catch(() => {
            setTranslatedValue(value);
        }).finally(() => {
            setIsTranslating(false);
        });
    }, [value, languageContext?.currentLanguage, languageContext, isEditing]);

    const handleSave = () => {
        onSave(editValue);
        setIsInEdit(false);
    };

    const handleCancel = () => {
        setEditValue(value);
        setIsInEdit(false);
    };

    const Component = as as React.ElementType;

    // Display value (translated or original)
    const displayValue = (!languageContext || languageContext.currentLanguage === 'en' || isEditing)
        ? value
        : translatedValue;

    if (!isEditing) {
        return (
            <Component
                className={className}
                style={isTranslating ? { opacity: 0.7 } : undefined}
            >
                {displayValue}
            </Component>
        );
    }

    if (isInEdit) {
        return (
            <div className="inline-flex gap-2 items-center relative">
                {multiline ? (
                    <textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleSave}
                        autoFocus
                        placeholder={placeholder}
                        className={`${className} bg-yellow-50 border-2 border-yellow-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                        rows={4}
                    />
                ) : (
                    <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSave();
                            if (e.key === 'Escape') handleCancel();
                        }}
                        autoFocus
                        placeholder={placeholder}
                        className={`${className} bg-yellow-50 border-2 border-yellow-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                    />
                )}
                <div className="flex gap-1 whitespace-nowrap">
                    <button
                        onClick={handleSave}
                        className="px-2 py-1 bg-green-500 text-white rounded text-sm font-medium hover:bg-green-600"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        className="px-2 py-1 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Component
            onClick={() => setIsInEdit(true)}
            className={`${className} cursor-text relative inline-block hover:bg-yellow-100 hover:rounded px-2 py-1 transition-colors`}
            title="Click to edit"
        >
            {value}
        </Component>
    );
}
