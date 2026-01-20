/**
 * Image utility functions for handling missing images gracefully
 */

// Default fallback images for different categories
export const FALLBACK_IMAGES = {
    hero: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
    attraction: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    hospital: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    doctor: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
    spa: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
    yoga: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800',
    beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    auroville: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800',
    french: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
    default: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
};

export type ImageCategory = keyof typeof FALLBACK_IMAGES;

/**
 * Get image source with fallback
 * Checks if local image exists, otherwise returns Unsplash fallback
 */
export function getImageSrc(
    localPath: string | undefined | null,
    category: ImageCategory = 'default'
): string {
    // If no path provided, return fallback
    if (!localPath) {
        return FALLBACK_IMAGES[category];
    }

    // If it's already an external URL, return as-is
    if (localPath.startsWith('http://') || localPath.startsWith('https://')) {
        return localPath;
    }

    // For local paths, we assume they exist in public folder
    // Next.js will handle 404s, but we provide the path
    return localPath;
}

/**
 * Image sources for wellness pages
 * Uses external URLs to avoid missing file issues
 */
export const WELLNESS_IMAGES = {
    // Hero images
    heroWellness: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
    heroYoga: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=1920',
    heroSpa: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920',

    // Auroville
    aurovilleAerial: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1200',
    aurovilleDetail: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800',
    aurovilleNight: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800',

    // French Quarter
    frenchQuarter: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',

    // Beaches
    paradiseBeach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    promenadeBeach: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',

    // Matrimandir
    matrimandir: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800',

    // Spa & Wellness
    spaRelax: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
    hotStone: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800',
    massage: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800',

    // Yoga & Meditation
    meditation: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    sunriseYoga: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',

    // Nature
    garden: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    sunset: 'https://images.unsplash.com/photo-1476673160081-cf065f0d2a86?w=800',
};

/**
 * Handle image error - swap to fallback
 * Usage: <Image onError={(e) => handleImageError(e, 'beach')} />
 */
export function handleImageError(
    event: React.SyntheticEvent<HTMLImageElement>,
    category: ImageCategory = 'default'
): void {
    const img = event.currentTarget;
    if (!img.src.includes('unsplash.com')) {
        img.src = FALLBACK_IMAGES[category];
    }
}
