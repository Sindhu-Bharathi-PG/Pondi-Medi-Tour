"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import medicalConfigDefault from '../config/home/medicalConfig.json';
import wellnessConfigDefault from '../config/home/wellnessConfig.json';
import { HomePageConfig, SectionConfig } from '../types/homeConfig.types';

// Storage keys
const STORAGE_KEY_MEDICAL = 'homeConfig_medical';
const STORAGE_KEY_WELLNESS = 'homeConfig_wellness';

interface HomeConfigContextType {
    // Current configuration
    config: HomePageConfig;

    // Edit mode state
    isEditing: boolean;
    setIsEditing: (editing: boolean) => void;

    // Configuration operations
    updateSection: (sectionId: string, updates: Partial<SectionConfig>) => void;
    updateSectionContent: (sectionId: string, path: string, value: unknown) => void;
    reorderSections: (fromIndex: number, toIndex: number) => void;
    toggleSection: (sectionId: string) => void;

    // Persistence
    saveConfig: () => void;
    resetConfig: () => void;

    // Mode switching
    currentMode: 'medical' | 'wellness';
    switchMode: (mode: 'medical' | 'wellness') => void;

    // Dirty state
    hasUnsavedChanges: boolean;
}

const HomeConfigContext = createContext<HomeConfigContextType | null>(null);

// Helper to deep clone and set nested value
function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
    const clone = JSON.parse(JSON.stringify(obj));
    const keys = path.split('.');
    let current = clone;

    for (let i = 0; i < keys.length - 1; i++) {
        if (current[keys[i]] === undefined) {
            current[keys[i]] = {};
        }
        current = current[keys[i]] as Record<string, unknown>;
    }

    current[keys[keys.length - 1]] = value;
    return clone;
}

interface HomeConfigProviderProps {
    children: ReactNode;
    initialMode?: 'medical' | 'wellness';
}

export function HomeConfigProvider({ children, initialMode = 'medical' }: HomeConfigProviderProps) {
    const [currentMode, setCurrentMode] = useState<'medical' | 'wellness'>(initialMode);
    const [medicalConfig, setMedicalConfig] = useState<HomePageConfig>(medicalConfigDefault as HomePageConfig);
    const [wellnessConfig, setWellnessConfig] = useState<HomePageConfig>(wellnessConfigDefault as HomePageConfig);
    const [isEditing, setIsEditing] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load from API and localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const initConfig = async () => {
                try {
                    // 1. Fetch published configs from backend
                    try {
                        const [medRes, wellRes] = await Promise.all([
                            fetch('/api/public/pages/medical'),
                            fetch('/api/public/pages/wellness')
                        ]);

                        if (medRes.ok) {
                            const data = await medRes.json();
                            if (data.config) setMedicalConfig(data.config);
                        }

                        if (wellRes.ok) {
                            const data = await wellRes.json();
                            if (data.config) setWellnessConfig(data.config);
                        }
                    } catch (apiError) {
                        console.error('Failed to fetch from API, falling back to defaults/local:', apiError);
                    }

                    // 2. Override with localStorage if exists (preserves unsaved drafts)
                    const storedMedical = localStorage.getItem(STORAGE_KEY_MEDICAL);
                    const storedWellness = localStorage.getItem(STORAGE_KEY_WELLNESS);

                    if (storedMedical) {
                        setMedicalConfig(JSON.parse(storedMedical));
                    }
                    if (storedWellness) {
                        setWellnessConfig(JSON.parse(storedWellness));
                    }
                } catch (error) {
                    console.error('Error loading config:', error);
                } finally {
                    setIsHydrated(true);
                }
            };

            initConfig();
        }
    }, []);

    // Get current config based on mode
    const config = currentMode === 'medical' ? medicalConfig : wellnessConfig;
    const setConfig = currentMode === 'medical' ? setMedicalConfig : setWellnessConfig;

    // Update a section by ID
    const updateSection = useCallback((sectionId: string, updates: Partial<SectionConfig>) => {
        setConfig(prev => ({
            ...prev,
            lastModified: new Date().toISOString(),
            sections: prev.sections.map(section =>
                section.id === sectionId ? { ...section, ...updates } as SectionConfig : section
            )
        }));
        setHasUnsavedChanges(true);
    }, [setConfig]);

    // Update nested content within a section
    const updateSectionContent = useCallback((sectionId: string, path: string, value: unknown) => {
        setConfig(prev => ({
            ...prev,
            lastModified: new Date().toISOString(),
            sections: prev.sections.map(section => {
                if (section.id !== sectionId) return section;
                return setNestedValue(section as unknown as Record<string, unknown>, path, value) as unknown as SectionConfig;
            })
        }));
        setHasUnsavedChanges(true);
    }, [setConfig]);

    // Reorder sections
    const reorderSections = useCallback((fromIndex: number, toIndex: number) => {
        setConfig(prev => {
            const newSections = [...prev.sections];
            const [movedSection] = newSections.splice(fromIndex, 1);
            newSections.splice(toIndex, 0, movedSection);

            // Update order numbers
            const updatedSections = newSections.map((section, index) => ({
                ...section,
                order: index + 1
            }));

            return {
                ...prev,
                lastModified: new Date().toISOString(),
                sections: updatedSections
            };
        });
        setHasUnsavedChanges(true);
    }, [setConfig]);

    // Toggle section enabled state
    const toggleSection = useCallback((sectionId: string) => {
        setConfig(prev => ({
            ...prev,
            lastModified: new Date().toISOString(),
            sections: prev.sections.map(section =>
                section.id === sectionId ? { ...section, enabled: !section.enabled } : section
            )
        }));
        setHasUnsavedChanges(true);
    }, [setConfig]);

    // Save to localStorage
    const saveConfig = useCallback(() => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(STORAGE_KEY_MEDICAL, JSON.stringify(medicalConfig));
                localStorage.setItem(STORAGE_KEY_WELLNESS, JSON.stringify(wellnessConfig));
                setHasUnsavedChanges(false);
            } catch (error) {
                console.error('Error saving config to localStorage:', error);
            }
        }
    }, [medicalConfig, wellnessConfig]);

    // Reset to defaults
    const resetConfig = useCallback(() => {
        setMedicalConfig(medicalConfigDefault as HomePageConfig);
        setWellnessConfig(wellnessConfigDefault as HomePageConfig);

        if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEY_MEDICAL);
            localStorage.removeItem(STORAGE_KEY_WELLNESS);
        }

        setHasUnsavedChanges(false);
    }, []);

    // Switch mode
    const switchMode = useCallback((mode: 'medical' | 'wellness') => {
        setCurrentMode(mode);
    }, []);

    // Don't render until hydrated to prevent hydration mismatch
    if (!isHydrated) {
        return null;
    }

    return (
        <HomeConfigContext.Provider
            value={{
                config,
                isEditing,
                setIsEditing,
                updateSection,
                updateSectionContent,
                reorderSections,
                toggleSection,
                saveConfig,
                resetConfig,
                currentMode,
                switchMode,
                hasUnsavedChanges
            }}
        >
            {children}
        </HomeConfigContext.Provider>
    );
}

export function useHomeConfig() {
    const context = useContext(HomeConfigContext);
    if (!context) {
        throw new Error('useHomeConfig must be used within a HomeConfigProvider');
    }
    return context;
}

// Optional hook that returns null if not in provider (for optional usage)
export function useHomeConfigOptional() {
    return useContext(HomeConfigContext);
}
