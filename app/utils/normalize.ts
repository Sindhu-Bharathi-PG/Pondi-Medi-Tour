/**
 * Data Normalization Utilities
 * Standardizes hospital/treatment data for consistent display
 */

/**
 * Normalize text to Title Case
 * "HIP REPLACEMENT" → "Hip Replacement"
 * "hip replacement" → "Hip Replacement"
 */
export const toTitleCase = (str: string): string => {
    if (!str) return '';
    return str
        .toLowerCase()
        .replace(/\[test\]\s*/gi, '') // Remove [TEST] prefix
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .trim();
};

/**
 * Normalize name - remove test markers, apply title case
 */
export const normalizeName = (name: string): string => {
    if (!name) return 'Unknown';
    return toTitleCase(name.replace(/\[TEST\]\s*/gi, ''));
};

/**
 * Truncate long text to specified length with ellipsis
 * Ensures consistent description lengths
 */
export const truncateText = (text: string, maxLength: number = 120): string => {
    if (!text) return '';
    const cleaned = text.replace(/\[TEST DATA\]\s*/gi, '').trim();
    if (cleaned.length <= maxLength) return cleaned;
    return cleaned.substring(0, maxLength).trim() + '...';
};

/**
 * Normalize description - single sentence format
 * Removes test markers, limits to 1-2 sentences max
 */
export const normalizeDescription = (desc: string, maxLength: number = 150): string => {
    if (!desc) return '';

    // Clean test markers
    let cleaned = desc.replace(/\[TEST DATA\]\s*/gi, '').trim();

    // Get first 1-2 sentences
    const sentences = cleaned.match(/[^.!?]+[.!?]+/g) || [cleaned];
    const twoSentences = sentences.slice(0, 2).join(' ').trim();

    // Truncate if still too long
    if (twoSentences.length > maxLength) {
        return twoSentences.substring(0, maxLength).trim() + '...';
    }

    return twoSentences;
};

/**
 * Normalize category names
 */
export const normalizeCategory = (category: string): string => {
    if (!category) return 'General';

    const categoryMap: Record<string, string> = {
        'orthopedics': 'Orthopedics',
        'orthopaedics': 'Orthopedics',
        'cardiology': 'Cardiology',
        'cardiac': 'Cardiology',
        'heart': 'Cardiology',
        'ivf': 'IVF & Fertility',
        'fertility': 'IVF & Fertility',
        'ophthalmology': 'Ophthalmology',
        'eye': 'Ophthalmology',
        'gastroenterology': 'Gastroenterology',
        'gastro': 'Gastroenterology',
        'neurology': 'Neurology',
        'neuro': 'Neurology',
        'brain': 'Neurology',
        'oncology': 'Oncology',
        'cancer': 'Oncology',
        'dental': 'Dental',
        'dentistry': 'Dental',
        'cosmetic': 'Cosmetic Surgery',
        'plastic': 'Cosmetic Surgery',
    };

    const lower = category.toLowerCase().trim();
    return categoryMap[lower] || toTitleCase(category);
};

/**
 * Format price consistently
 */
export const formatPrice = (price: number | string | null, currency: string = 'INR'): string => {
    if (!price) return 'Contact for price';

    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) return 'Contact for price';

    const symbols: Record<string, string> = {
        'INR': '₹',
        'USD': '$',
        'GBP': '£',
        'EUR': '€',
        'AED': 'د.إ'
    };

    const symbol = symbols[currency] || currency + ' ';

    // Format with commas for Indian numbering
    if (currency === 'INR') {
        return symbol + numPrice.toLocaleString('en-IN');
    }

    return symbol + numPrice.toLocaleString();
};

/**
 * Normalize experience text
 * "31" → "31+ years"
 * "31 years" → "31+ years"
 */
export const normalizeExperience = (exp: string | number): string => {
    if (!exp) return '10+ years';
    const str = String(exp);
    const num = parseInt(str.replace(/\D/g, ''));
    if (isNaN(num)) return '10+ years';
    return `${num}+ years`;
};

/**
 * Normalize hospital/doctor rating
 */
export const normalizeRating = (rating: number | string | null): number => {
    if (!rating) return 4.5;
    const num = typeof rating === 'string' ? parseFloat(rating) : rating;
    if (isNaN(num)) return 4.5;
    // Clamp between 1-5
    return Math.min(5, Math.max(1, Math.round(num * 10) / 10));
};

/**
 * Normalize success rate
 */
export const normalizeSuccessRate = (rate: number | string | null): string => {
    if (!rate) return '95%+';
    const num = typeof rate === 'string' ? parseFloat(rate) : rate;
    if (isNaN(num)) return '95%+';
    return `${Math.round(num)}%+`;
};

/**
 * Normalize accreditations array
 * Handles both string[] and {name, logo, year}[] formats
 */
export const normalizeAccreditations = (accreditations: any[]): string[] => {
    if (!Array.isArray(accreditations)) return [];

    return accreditations.map(acc => {
        if (typeof acc === 'string') return acc.toUpperCase();
        if (acc && typeof acc === 'object' && acc.name) {
            return String(acc.name).toUpperCase();
        }
        return '';
    }).filter(Boolean);
};

/**
 * Normalize languages array
 */
export const normalizeLanguages = (languages: any[]): string[] => {
    if (!Array.isArray(languages)) return ['English'];
    return languages.map(lang => toTitleCase(String(lang))).filter(Boolean);
};

/**
 * Full treatment data normalization
 */
export const normalizeTreatment = (treatment: any) => ({
    ...treatment,
    name: normalizeName(treatment.name),
    category: normalizeCategory(treatment.category),
    shortDescription: normalizeDescription(treatment.shortDescription, 150),
    successRate: normalizeSuccessRate(treatment.successRate),
    hospitalName: normalizeName(treatment.hospitalName),
});

/**
 * Full hospital data normalization
 */
export const normalizeHospital = (hospital: any) => ({
    ...hospital,
    name: normalizeName(hospital.name),
    type: toTitleCase(hospital.type || 'General'),
    shortDescription: normalizeDescription(hospital.shortDescription, 200),
    accreditations: normalizeAccreditations(hospital.accreditations),
});

/**
 * Full doctor data normalization
 */
export const normalizeDoctor = (doctor: any) => ({
    ...doctor,
    name: normalizeName(doctor.name),
    specialty: normalizeCategory(doctor.specialty),
    experience: normalizeExperience(doctor.experience),
    rating: normalizeRating(doctor.rating),
    languages: normalizeLanguages(doctor.languages),
    hospitalName: normalizeName(doctor.hospitalName),
});

/**
 * Normalize specialties array - handles various input formats
 * Cleans up long specialty names and removes duplicates
 */
export const normalizeSpecialties = (specialties: any): string[] => {
    if (!specialties) return ['General Medicine'];

    if (Array.isArray(specialties)) {
        const cleaned: string[] = [];
        for (const spec of specialties) {
            if (typeof spec !== 'string') continue;
            if (spec.length > 30) {
                const match = spec.match(/^([A-Za-z\s&]+?)[\s:\/\-]/);
                if (match) {
                    cleaned.push(match[1].trim());
                } else {
                    cleaned.push(spec.split(' ').slice(0, 2).join(' '));
                }
            } else {
                cleaned.push(spec.trim());
            }
        }
        return [...new Set(cleaned)].slice(0, 6);
    }

    if (typeof specialties === 'string') {
        if (specialties.includes(',')) {
            return specialties.split(',').map(s => s.trim()).filter(Boolean).slice(0, 6);
        }
        return [specialties.length > 30 ? specialties.split(' ').slice(0, 2).join(' ') : specialties];
    }

    return ['General Medicine'];
};
