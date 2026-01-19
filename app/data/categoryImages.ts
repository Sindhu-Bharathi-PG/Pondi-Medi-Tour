// Category Images Configuration
// Default images for each treatment category - used when displaying treatment cards
// Admin can update these via the Categories management page

export interface CategoryImageConfig {
    name: string;
    slug: string;
    image: string;
    icon: string; // lucide icon name
    color: string; // tailwind gradient
}

export const categoryImages: Record<string, CategoryImageConfig> = {
    'Orthopedics': {
        name: 'Orthopedics',
        slug: 'orthopedics',
        image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80',
        icon: 'Bone',
        color: 'from-teal-500 to-emerald-500'
    },
    'IVF & Fertility': {
        name: 'IVF & Fertility',
        slug: 'ivf-fertility',
        image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80',
        icon: 'Baby',
        color: 'from-rose-500 to-pink-500'
    },
    'Ophthalmology': {
        name: 'Ophthalmology',
        slug: 'ophthalmology',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
        icon: 'Eye',
        color: 'from-emerald-500 to-cyan-500'
    },
    'Cardiology': {
        name: 'Cardiology',
        slug: 'cardiology',
        image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&q=80',
        icon: 'Heart',
        color: 'from-red-500 to-rose-500'
    },
    'Gastroenterology': {
        name: 'Gastroenterology',
        slug: 'gastroenterology',
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
        icon: 'Activity',
        color: 'from-amber-500 to-orange-500'
    },
    'Neurology': {
        name: 'Neurology',
        slug: 'neurology',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
        icon: 'Brain',
        color: 'from-purple-500 to-indigo-500'
    },
    'Dental': {
        name: 'Dental',
        slug: 'dental',
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80',
        icon: 'Scissors',
        color: 'from-cyan-500 to-blue-500'
    },
    'Oncology': {
        name: 'Oncology',
        slug: 'oncology',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80',
        icon: 'Stethoscope',
        color: 'from-green-500 to-teal-500'
    },
    'Cosmetic': {
        name: 'Cosmetic Surgery',
        slug: 'cosmetic',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80',
        icon: 'Sparkles',
        color: 'from-pink-500 to-fuchsia-500'
    },
    'General Surgery': {
        name: 'General Surgery',
        slug: 'general-surgery',
        image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
        icon: 'Stethoscope',
        color: 'from-slate-500 to-gray-600'
    }
};

// Fallback image for unknown categories
export const fallbackCategoryImage = 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80';

const STORAGE_KEY = 'pondi_category_images';

// Get image for a category (checks localStorage for admin overrides, then defaults)
export const getCategoryImage = (category: string): string => {
    // Check for admin-saved custom image in localStorage
    if (typeof window !== 'undefined') {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const customImages = JSON.parse(saved) as Record<string, string>;
                if (customImages[category]) {
                    return customImages[category];
                }
            }
        } catch (error) {
            console.error('Error reading category images from localStorage:', error);
        }
    }

    // Fall back to default images
    return categoryImages[category]?.image || fallbackCategoryImage;
};

// Get all categories as array
export const getAllCategories = (): CategoryImageConfig[] => {
    return Object.values(categoryImages);
};
