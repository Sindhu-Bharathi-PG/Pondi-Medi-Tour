"use client";

import DraggableSection from '@/app/components/admin/DraggableSection';
import { useHomeConfigOptional } from '@/app/context/HomeConfigContext';
import { HomePageConfig, SectionConfig } from '@/app/types/homeConfig.types';
import React, { useCallback, useState } from 'react';
import DynamicCTA from './DynamicCTA';
import DynamicHero from './DynamicHero';
import DynamicHospitals from './DynamicHospitals';
import DynamicHowItWorks from './DynamicHowItWorks';
import DynamicTestimonials from './DynamicTestimonials';
import DynamicTreatments from './DynamicTreatments';
import DynamicWhyPondicherry from './DynamicWhyPondicherry';

interface SectionRendererProps {
    config: HomePageConfig;
}

// Map section type to friendly name
const sectionNames: Record<string, string> = {
    hero: 'Hero Section',
    treatments: 'Treatments / Experiences',
    hospitals: 'Partner Hospitals',
    howItWorks: 'How It Works',
    testimonials: 'Testimonials',
    cta: 'Call to Action',
    whyPondicherry: 'Why Pondicherry',
};

export default function SectionRenderer({ config }: SectionRendererProps) {
    const homeConfig = useHomeConfigOptional();
    const isEditing = homeConfig?.isEditing ?? false;
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    // Sort sections by order
    const sortedSections = [...config.sections].sort((a, b) => a.order - b.order);

    // Drag handlers
    const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', index.toString());
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }, []);

    const handleDrop = useCallback((e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();

        if (draggedIndex !== null && draggedIndex !== dropIndex && homeConfig) {
            homeConfig.reorderSections(draggedIndex, dropIndex);
        }

        setDraggedIndex(null);
    }, [draggedIndex, homeConfig]);

    const handleToggle = useCallback((sectionId: string) => {
        if (homeConfig) {
            homeConfig.toggleSection(sectionId);
        }
    }, [homeConfig]);

    // Render a single section based on its type
    const renderSection = (section: SectionConfig, index: number) => {
        if (!section.enabled && !isEditing) return null;

        let sectionComponent: React.ReactNode = null;

        switch (section.type) {
            case 'hero':
                sectionComponent = <DynamicHero config={section} mode={config.mode} />;
                break;
            case 'treatments':
                sectionComponent = <DynamicTreatments config={section} mode={config.mode} />;
                break;
            case 'hospitals':
                sectionComponent = <DynamicHospitals config={section} mode={config.mode} />;
                break;
            case 'howItWorks':
                sectionComponent = <DynamicHowItWorks config={section} mode={config.mode} />;
                break;
            case 'testimonials':
                sectionComponent = <DynamicTestimonials config={section} mode={config.mode} />;
                break;
            case 'cta':
                sectionComponent = <DynamicCTA config={section} mode={config.mode} />;
                break;
            case 'whyPondicherry':
                sectionComponent = <DynamicWhyPondicherry config={section} />;
                break;
            default:
                return null;
        }

        if (isEditing) {
            return (
                <DraggableSection
                    key={section.id}
                    sectionId={section.id}
                    sectionTitle={sectionNames[section.type] || section.type}
                    index={index}
                    isEnabled={section.enabled}
                    isEditing={isEditing}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onToggle={() => handleToggle(section.id)}
                >
                    {sectionComponent}
                </DraggableSection>
            );
        }

        return <React.Fragment key={section.id}>{sectionComponent}</React.Fragment>;
    };

    return (
        <div className="relative">
            {sortedSections.map((section, index) => renderSection(section, index))}
        </div>
    );
}
