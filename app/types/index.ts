// TypeScript types for the Medical Tourism Portal

export interface HeroSlide {
      image: string;
      title: string;
      subtitle: string;
}

export interface Testimonial {
      name: string;
      location: string;
      procedure: string;
      image: string;
      quote: string;
      isVideo?: boolean;
}

export interface Doctor {
      name: string;
      credentials: string;
      specialty: string;
      experience: string;
      image: string;
}

export interface HybridPackage {
      title: string;
      image1: string;
      image2: string;
      description: string;
      price: string;
}

export interface JourneyStep {
      step: string;
      title: string;
      description: string;
      icon: string;
}

export interface AudienceCard {
      icon: React.ComponentType<{ className?: string }>;
      color: string;
      title: string;
      subtitle: string;
      description: string;
      cta: string;
}

export interface Language {
      code: string;
      label: string;
}

export interface NavLink {
      href: string;
      label: string;
}

export interface ContactInfo {
      phone: string;
      email: string;
      location: string;
}

// Accessibility types
export type FontSize = 'normal' | 'large' | 'xlarge';

export interface AccessibilityState {
      fontSize: FontSize;
      highContrast: boolean;
      showAccessibilityMenu: boolean;
}

// Search types
export interface SearchState {
      query: string;
      focused: boolean;
      results: string[];
}
