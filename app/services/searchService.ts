/**
 * Search Service
 * Provides comprehensive search functionality across all pages
 * with card-type references for better UX
 */

export interface SearchableCard {
  id: string;
  title: string;
  description: string;
  category: 'medical' | 'wellness' | 'service' | 'info' | 'booking';
  type: 'treatment' | 'hospital' | 'doctor' | 'package' | 'destination' | 'wellness' | 'ayush' | 'page' | 'service';
  url: string;
  tags: string[];
  keywords: string[];
  image?: string;
  badge?: string;
  icon?: string;
}

export const pageRegistry: SearchableCard[] = [
  // Home & About
  {
    id: 'home',
    title: 'Home',
    description: 'Discover world-class medical and wellness tourism in Pondicherry, India. Premium healthcare at 70% savings.',
    category: 'info',
    type: 'page',
    url: '/',
    tags: ['home', 'main', 'landing'],
    keywords: ['medical tourism', 'wellness', 'healthcare', 'india', 'pondicherry', 'treatments'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
    icon: 'Home',
  },
  {
    id: 'about',
    title: 'About - Why India & Pondicherry',
    description: 'Learn why India is the world\'s premier medical tourism hub and why Pondicherry is the perfect healing destination.',
    category: 'info',
    type: 'page',
    url: '/about',
    tags: ['about', 'why india', 'why pondicherry', 'information'],
    keywords: ['india healthcare', 'pondicherry', 'medical tourism', 'cost savings', 'JCI hospitals', 'NABH', 'french heritage'],
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400',
    badge: 'Popular',
    icon: 'MapPin',
  },

  // Medical Tourism
  {
    id: 'medical-tourism',
    title: 'Medical Tourism',
    description: 'Comprehensive medical tourism packages with world-class treatments at affordable prices.',
    category: 'medical',
    type: 'page',
    url: '/medical-tourism',
    tags: ['medical', 'tourism', 'treatments', 'healthcare'],
    keywords: ['medical tourism', 'surgery', 'treatments', 'hospitals', 'doctors', 'affordable healthcare'],
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400',
    icon: 'Heart',
  },
  {
    id: 'services',
    title: 'Medical Services & Treatments',
    description: 'Browse our comprehensive range of medical services from cardiac care to orthopedics.',
    category: 'medical',
    type: 'service',
    url: '/services',
    tags: ['services', 'treatments', 'medical', 'specialties'],
    keywords: ['cardiac surgery', 'orthopedics', 'oncology', 'neurology', 'cosmetic surgery', 'dental', 'IVF'],
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400',
    icon: 'Activity',
  },
  {
    id: 'hospital',
    title: 'Hospitals',
    description: 'Explore JCI and NABH accredited hospitals with cutting-edge facilities.',
    category: 'medical',
    type: 'hospital',
    url: '/hospital',
    tags: ['hospitals', 'facilities', 'accredited', 'JCI', 'NABH'],
    keywords: ['hospitals', 'medical centers', 'JCI accredited', 'NABH certified', 'healthcare facilities'],
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400',
    icon: 'Building2',
  },
  {
    id: 'doctor',
    title: 'Doctors & Specialists',
    description: 'Connect with internationally trained specialists across all medical fields.',
    category: 'medical',
    type: 'doctor',
    url: '/doctor',
    tags: ['doctors', 'specialists', 'physicians', 'surgeons'],
    keywords: ['doctors', 'specialists', 'surgeons', 'physicians', 'consultants', 'US trained', 'UK trained'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
    icon: 'Stethoscope',
  },

  // Wellness Tourism
  {
    id: 'wellness-tourism',
    title: 'Wellness Tourism',
    description: 'Transform your life with holistic wellness programs combining ancient wisdom and modern science.',
    category: 'wellness',
    type: 'wellness',
    url: '/wellness-tourism',
    tags: ['wellness', 'holistic', 'healing', 'retreat'],
    keywords: ['wellness tourism', 'holistic healing', 'ayurveda', 'yoga', 'meditation', 'spa', 'rejuvenation'],
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400',
    badge: 'Trending',
    icon: 'Sparkles',
  },
  {
    id: 'wellness',
    title: 'Wellness Programs',
    description: 'Comprehensive wellness packages for complete mind-body-spirit transformation.',
    category: 'wellness',
    type: 'package',
    url: '/wellness',
    tags: ['wellness', 'programs', 'packages', 'healing'],
    keywords: ['wellness programs', 'detox', 'stress relief', 'weight loss', 'anti-aging', 'rejuvenation'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400',
    icon: 'Leaf',
  },
  {
    id: 'ayush',
    title: 'AYUSH Therapies',
    description: 'Experience authentic Ayurveda, Yoga, Unani, Siddha, and Homeopathy treatments.',
    category: 'wellness',
    type: 'ayush',
    url: '/ayush',
    tags: ['ayush', 'ayurveda', 'yoga', 'traditional medicine'],
    keywords: ['ayurveda', 'yoga', 'unani', 'siddha', 'homeopathy', 'traditional medicine', 'herbal'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    icon: 'Flower2',
  },
  {
    id: 'yoga-meditation',
    title: 'Yoga & Meditation',
    description: 'Learn authentic yoga and meditation practices in their birthplace.',
    category: 'wellness',
    type: 'wellness',
    url: '/yoga-meditation',
    tags: ['yoga', 'meditation', 'mindfulness', 'spiritual'],
    keywords: ['yoga', 'meditation', 'pranayama', 'mindfulness', 'spiritual', 'ashtanga', 'hatha'],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
    icon: 'Brain',
  },
  {
    id: 'spa-rejuvenation',
    title: 'Spa & Rejuvenation',
    description: 'Luxury spa treatments combining traditional Ayurvedic therapies with modern wellness.',
    category: 'wellness',
    type: 'wellness',
    url: '/spa-rejuvenation',
    tags: ['spa', 'rejuvenation', 'massage', 'therapy'],
    keywords: ['spa', 'massage', 'rejuvenation', 'aromatherapy', 'body treatments', 'facial'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
    icon: 'Droplets',
  },

  // Packages & Destinations
  {
    id: 'packages',
    title: 'All Packages',
    description: 'Browse comprehensive medical and wellness packages tailored to your needs.',
    category: 'service',
    type: 'package',
    url: '/packages',
    tags: ['packages', 'deals', 'offers', 'bundles'],
    keywords: ['packages', 'deals', 'combo offers', 'treatment packages', 'wellness packages', 'medical packages'],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400',
    icon: 'Package',
  },
  {
    id: 'destination',
    title: 'Destinations',
    description: 'Explore Pondicherry\'s healing destinations and tourist attractions.',
    category: 'info',
    type: 'destination',
    url: '/destination',
    tags: ['destination', 'tourism', 'attractions', 'pondicherry'],
    keywords: ['pondicherry', 'auroville', 'french quarter', 'beaches', 'tourist attractions', 'heritage'],
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400',
    icon: 'MapPin',
  },

  // Booking & Services
  {
    id: 'booking',
    title: 'Book Appointment',
    description: 'Schedule your consultation with top specialists. Get instant confirmation.',
    category: 'booking',
    type: 'service',
    url: '/booking',
    tags: ['booking', 'appointment', 'consultation', 'schedule'],
    keywords: ['book appointment', 'consultation', 'schedule', 'doctor booking', 'treatment booking'],
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400',
    badge: 'Quick Action',
    icon: 'Calendar',
  },
  {
    id: 'visa',
    title: 'Visa Assistance',
    description: 'Complete medical visa support. Get approved in 72 hours.',
    category: 'service',
    type: 'service',
    url: '/visa',
    tags: ['visa', 'travel', 'assistance', 'medical visa'],
    keywords: ['medical visa', 'visa assistance', 'travel documents', 'visa application', 'e-visa'],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400',
    icon: 'Plane',
  },
  {
    id: 'cost-calculator',
    title: 'Cost Calculator',
    description: 'Get instant transparent pricing for treatments. Compare costs with your country.',
    category: 'service',
    type: 'service',
    url: '/cost-calculator',
    tags: ['cost', 'calculator', 'pricing', 'estimate'],
    keywords: ['cost calculator', 'pricing', 'treatment cost', 'estimate', 'savings', 'price comparison'],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
    badge: 'Popular',
    icon: 'Calculator',
  },

  // Support & Info
  {
    id: 'testimonials',
    title: 'Patient Testimonials',
    description: 'Read success stories from patients across 150+ countries.',
    category: 'info',
    type: 'page',
    url: '/testimonials',
    tags: ['testimonials', 'reviews', 'success stories', 'patients'],
    keywords: ['patient reviews', 'testimonials', 'success stories', 'patient experiences', 'feedback'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    icon: 'Star',
  },
  {
    id: 'contact',
    title: 'Contact Us',
    description: '24/7 support via phone, email, or live chat. Get help in your language.',
    category: 'service',
    type: 'service',
    url: '/contact',
    tags: ['contact', 'support', 'help', 'assistance'],
    keywords: ['contact', 'support', 'help', 'customer service', 'phone', 'email', 'chat'],
    image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=400',
    icon: 'Phone',
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Manage your appointments, medical records, and treatment plans.',
    category: 'service',
    type: 'page',
    url: '/dashboard',
    tags: ['dashboard', 'account', 'profile', 'appointments'],
    keywords: ['dashboard', 'my account', 'appointments', 'medical records', 'treatment plan'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    icon: 'LayoutDashboard',
  },
  {
    id: 'global-opportunity',
    title: 'Global Opportunities',
    description: 'Explore partnership and collaboration opportunities worldwide.',
    category: 'info',
    type: 'page',
    url: '/global-opportunity',
    tags: ['partnership', 'opportunities', 'collaboration', 'business'],
    keywords: ['partnership', 'collaboration', 'business opportunities', 'franchise', 'agents'],
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400',
    icon: 'Globe',
  },

  // Legal
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    description: 'Our commitment to protecting your personal information and medical data.',
    category: 'info',
    type: 'page',
    url: '/privacy-policy',
    tags: ['privacy', 'policy', 'legal', 'data protection'],
    keywords: ['privacy policy', 'data protection', 'GDPR', 'confidentiality', 'security'],
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400',
    icon: 'Shield',
  },
  {
    id: 'terms-of-service',
    title: 'Terms of Service',
    description: 'Terms and conditions for using our medical tourism services.',
    category: 'info',
    type: 'page',
    url: '/terms-of-service',
    tags: ['terms', 'conditions', 'legal', 'agreement'],
    keywords: ['terms of service', 'conditions', 'legal', 'agreement', 'user agreement'],
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',
    icon: 'FileText',
  },
];

/**
 * Search function with fuzzy matching and ranking
 */
export function searchPages(query: string): SearchableCard[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const searchTerms = normalizedQuery.split(' ').filter(term => term.length > 0);

  const results = pageRegistry.map(card => {
    let score = 0;

    // Exact title match (highest priority)
    if (card.title.toLowerCase().includes(normalizedQuery)) {
      score += 100;
    }

    // Title word matches
    searchTerms.forEach(term => {
      if (card.title.toLowerCase().includes(term)) {
        score += 50;
      }
    });

    // Description matches
    if (card.description.toLowerCase().includes(normalizedQuery)) {
      score += 30;
    }

    searchTerms.forEach(term => {
      if (card.description.toLowerCase().includes(term)) {
        score += 15;
      }
    });

    // Tag matches
    card.tags.forEach(tag => {
      if (tag.includes(normalizedQuery)) {
        score += 40;
      }
      searchTerms.forEach(term => {
        if (tag.includes(term)) {
          score += 20;
        }
      });
    });

    // Keyword matches
    card.keywords.forEach(keyword => {
      if (keyword.includes(normalizedQuery)) {
        score += 35;
      }
      searchTerms.forEach(term => {
        if (keyword.includes(term)) {
          score += 18;
        }
      });
    });

    // Category/Type matches
    if (card.category.includes(normalizedQuery) || card.type.includes(normalizedQuery)) {
      score += 25;
    }

    return { ...card, score };
  })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score);

  return results;
}

/**
 * Get pages by category
 */
export function getPagesByCategory(category: SearchableCard['category']): SearchableCard[] {
  return pageRegistry.filter(card => card.category === category);
}

/**
 * Get pages by type
 */
export function getPagesByType(type: SearchableCard['type']): SearchableCard[] {
  return pageRegistry.filter(card => card.type === type);
}

/**
 * Get popular/featured pages
 */
export function getFeaturedPages(): SearchableCard[] {
  return pageRegistry.filter(card => card.badge === 'Popular' || card.badge === 'Trending');
}

/**
 * Get all medical pages
 */
export function getMedicalPages(): SearchableCard[] {
  return pageRegistry.filter(card => card.category === 'medical');
}

/**
 * Get all wellness pages
 */
export function getWellnessPages(): SearchableCard[] {
  return pageRegistry.filter(card => card.category === 'wellness');
}

/**
 * Get quick action pages (booking, contact, etc.)
 */
export function getQuickActionPages(): SearchableCard[] {
  return pageRegistry.filter(card =>
    ['booking', 'contact', 'cost-calculator'].includes(card.id)
  );
}

/**
 * Get page by ID
 */
export function getPageById(id: string): SearchableCard | undefined {
  return pageRegistry.find(card => card.id === id);
}

/**
 * Get page by URL
 */
export function getPageByUrl(url: string): SearchableCard | undefined {
  return pageRegistry.find(card => card.url === url);
}

/**
 * Get suggestions based on current page
 */
export function getRelatedPages(currentPageId: string, limit: number = 3): SearchableCard[] {
  const currentPage = getPageById(currentPageId);
  if (!currentPage) return [];

  // Find pages with same category or overlapping tags
  const related = pageRegistry
    .filter(card => card.id !== currentPageId)
    .map(card => {
      let relevance = 0;
      if (card.category === currentPage.category) relevance += 10;
      if (card.type === currentPage.type) relevance += 5;

      card.tags.forEach(tag => {
        if (currentPage.tags.includes(tag)) relevance += 3;
      });

      return { ...card, relevance };
    })
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit);

  return related;
}

/**
 * Get all categories
 */
export function getAllCategories(): string[] {
  return Array.from(new Set(pageRegistry.map(card => card.category)));
}

/**
 * Get all types
 */
export function getAllTypes(): string[] {
  return Array.from(new Set(pageRegistry.map(card => card.type)));
}
