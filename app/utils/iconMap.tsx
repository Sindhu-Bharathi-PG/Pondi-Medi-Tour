// Icon mapping utility for dynamic component rendering
// Maps string icon names from config to actual Lucide React components

import {
    ArrowRight,
    Award,
    Building2,
    CheckCircle,
    ChevronRight,
    Clock,
    DollarSign,
    Droplets,
    Headphones,
    Heart,
    Leaf,
    LucideIcon,
    MapPin,
    Moon,
    Phone,
    Play,
    Shield,
    Sparkles,
    Star,
    Stethoscope,
    Sun,
    TreePine,
    Users,
    Waves,
    Wind
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
    Heart,
    Stethoscope,
    Shield,
    Award,
    MapPin,
    Star,
    ChevronRight,
    Users,
    Clock,
    DollarSign,
    ArrowRight,
    Play,
    CheckCircle,
    Phone,
    Building2,
    Leaf,
    Sun,
    Sparkles,
    Waves,
    TreePine,
    Moon,
    Wind,
    Droplets,
    Headphones
};

export function getIcon(iconName: string): LucideIcon | null {
    return iconMap[iconName] || null;
}

export function renderIcon(iconName: string, props?: { className?: string }) {
    const IconComponent = iconMap[iconName];
    if (!IconComponent) return null;
    return <IconComponent {...props} />;
}

export default iconMap;
