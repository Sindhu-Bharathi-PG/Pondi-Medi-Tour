// Home Page Configuration Types
// These types define the structure for dynamic home page sections


// Base section configuration
export interface BaseSectionConfig {
    id: string;
    type: SectionType;
    enabled: boolean;
    order: number;
}

// Available section types
export type SectionType =
    | 'hero'
    | 'treatments'
    | 'hospitals'
    | 'howItWorks'
    | 'testimonials'
    | 'cta'
    | 'whyPondicherry';

// Hero Section Configuration
export interface HeroSectionConfig extends BaseSectionConfig {
    type: 'hero';
    content: {
        badge: {
            icon: string;
            text: string;
            rating?: string;
        };
        title: {
            line1: string;
            line2: string;
        };
        subtitle: string;
        primaryCTA: {
            text: string;
            link: string;
            icon?: string;
        };
        secondaryCTA: {
            text: string;
            link: string;
            icon?: string;
        };
        helpline?: {
            label: string;
            number: string;
        };
        backgroundImage: string;
        gradientColors: string;
    };
    stats?: Array<{
        value: string;
        label: string;
        icon: string;
        animateValue?: number;
    }>;
}

// Treatment/Experience Card
export interface TreatmentCard {
    id: string;
    icon: string;
    title: string;
    description: string;
    savings?: string;
    procedures?: string[];
    image?: string;
    link?: string;
    color: string;
}

// Treatments Section Configuration
export interface TreatmentsSectionConfig extends BaseSectionConfig {
    type: 'treatments';
    content: {
        badge: {
            icon: string;
            text: string;
        };
        title: string;
        subtitle: string;
        viewAllLink: string;
        viewAllText: string;
    };
    items: TreatmentCard[];
}

// Hospital Card
export interface HospitalCard {
    id: string;
    name: string;
    type: string;
    accreditation: string;
    image: string;
}

// Hospitals Section Configuration
export interface HospitalsSectionConfig extends BaseSectionConfig {
    type: 'hospitals';
    content: {
        title: string;
        subtitle: string;
        viewAllLink: string;
        viewAllText: string;
    };
    items: HospitalCard[];
}

// How It Works Step
export interface HowItWorksStep {
    id: string;
    step: number;
    title: string;
    description: string;
}

// How It Works Section Configuration
export interface HowItWorksSectionConfig extends BaseSectionConfig {
    type: 'howItWorks';
    content: {
        title: string;
        subtitle: string;
    };
    steps: HowItWorksStep[];
}

// Testimonial
export interface TestimonialItem {
    id: string;
    name: string;
    location: string;
    text: string;
    image: string;
    rating?: number;
}

// Testimonials Section Configuration
export interface TestimonialsSectionConfig extends BaseSectionConfig {
    type: 'testimonials';
    content: {
        title: string;
        subtitle: string;
    };
    items: TestimonialItem[];
}

// CTA Section Configuration
export interface CTASectionConfig extends BaseSectionConfig {
    type: 'cta';
    content: {
        title: string;
        subtitle: string;
        buttonText: string;
        buttonLink: string;
        buttonIcon?: string;
        gradientColors: string;
    };
}

// Why Pondicherry Section (for Wellness)
export interface WhyPondicherrySectionConfig extends BaseSectionConfig {
    type: 'whyPondicherry';
    content: {
        title: string;
        subtitle: string;
    };
    features: Array<{
        id: string;
        icon: string;
        text: string;
    }>;
    images: string[];
    rating: {
        value: string;
        label: string;
    };
}

// Highlight Item (for Wellness hero)
export interface HighlightItem {
    id: string;
    icon: string;
    label: string;
    value: string;
}

// Union type for all section configs
export type SectionConfig =
    | HeroSectionConfig
    | TreatmentsSectionConfig
    | HospitalsSectionConfig
    | HowItWorksSectionConfig
    | TestimonialsSectionConfig
    | CTASectionConfig
    | WhyPondicherrySectionConfig;

// Full Home Page Configuration
export interface HomePageConfig {
    mode: 'medical' | 'wellness';
    version: string;
    lastModified: string;
    sections: SectionConfig[];
}

// Icon mapping type for runtime resolution
export type IconName =
    | 'Heart' | 'Stethoscope' | 'Shield' | 'Award' | 'MapPin' | 'Star'
    | 'ChevronRight' | 'Users' | 'Clock' | 'DollarSign' | 'ArrowRight'
    | 'Play' | 'CheckCircle' | 'Phone' | 'Building2' | 'Leaf' | 'Sun'
    | 'Sparkles' | 'Waves' | 'TreePine' | 'Moon' | 'Wind' | 'Droplets';
