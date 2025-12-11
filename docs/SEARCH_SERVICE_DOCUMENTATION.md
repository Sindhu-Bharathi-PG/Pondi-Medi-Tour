# Search Service Documentation

## Overview

The Search Service provides comprehensive search functionality across all pages in the Pondy HealthPort application with card-type references for better UX.

## File Structure

```
app/
├── services/
│   └── searchService.ts          # Core search logic and page registry
├── components/
│   └── search/
│       ├── SearchResults.tsx      # Search results display component
│       └── index.ts              # Export barrel
└── search/
    └── page.tsx                  # Search page implementation
```

## Core Components

### 1. Search Service (`app/services/searchService.ts`)

#### Page Registry

Contains all searchable pages with metadata:

```typescript
interface SearchableCard {
  id: string; // Unique identifier
  title: string; // Display title
  description: string; // Brief description
  category: "medical" | "wellness" | "service" | "info" | "booking";
  type:
    | "treatment"
    | "hospital"
    | "doctor"
    | "package"
    | "destination"
    | "wellness"
    | "ayush"
    | "page"
    | "service";
  url: string; // Page route
  tags: string[]; // Search tags
  keywords: string[]; // Search keywords
  image?: string; // Optional image URL
  badge?: string; // Optional badge (Popular, Trending, New)
  icon?: string; // Lucide icon name
}
```

#### Available Functions

**Search Functions:**

- `searchPages(query: string)` - Fuzzy search with ranking
- `getPageById(id: string)` - Get specific page by ID
- `getPageByUrl(url: string)` - Get page by URL
- `getRelatedPages(currentPageId: string, limit?: number)` - Get related pages

**Category Filters:**

- `getPagesByCategory(category)` - Filter by category
- `getPagesByType(type)` - Filter by type
- `getMedicalPages()` - Get all medical pages
- `getWellnessPages()` - Get all wellness pages
- `getFeaturedPages()` - Get featured/popular pages
- `getQuickActionPages()` - Get quick action pages

**Utility Functions:**

- `getAllCategories()` - List all categories
- `getAllTypes()` - List all types

### 2. Search Results Component (`app/components/search/SearchResults.tsx`)

Displays search results with:

- Card-based layout
- Category color coding
- Badge display
- Hover effects
- Empty state handling

```typescript
interface SearchResultsProps {
  results: SearchableCard[];
  query: string;
  onResultClick?: (card: SearchableCard) => void;
}
```

### 3. Search Page (`app/search/page.tsx`)

Main search interface with:

- Hero search bar
- Category filters
- Quick actions section
- Featured services
- Results display

## Page Registry

### Medical Tourism (5 pages)

1. **Home** - Main landing page
2. **About** - Why India & Pondicherry
3. **Medical Tourism** - Medical tourism overview
4. **Services** - Medical services & treatments
5. **Hospital** - Hospital listings
6. **Doctor** - Doctor profiles

### Wellness Tourism (4 pages)

1. **Wellness Tourism** - Wellness overview
2. **Wellness Programs** - Wellness packages
3. **AYUSH Therapies** - Traditional medicine
4. **Yoga & Meditation** - Yoga programs
5. **Spa & Rejuvenation** - Spa services

### Services & Booking (7 pages)

1. **Packages** - All packages
2. **Booking** - Appointment booking
3. **Telemedicine** - Virtual consultations
4. **Visa Assistance** - Medical visa support
5. **Cost Calculator** - Treatment cost calculator
6. **Contact** - Contact support
7. **Dashboard** - User dashboard

### Information (4 pages)

1. **Testimonials** - Patient reviews
2. **Destinations** - Pondicherry attractions
3. **Global Opportunities** - Partnership info
4. **Privacy Policy** - Privacy information
5. **Terms of Service** - Terms & conditions

## Search Algorithm

The search function uses a ranking system:

1. **Title Match** (100 points)
   - Exact match in title
2. **Title Word Match** (50 points per word)

   - Individual search terms in title

3. **Description Match** (30 points)

   - Exact match in description
   - 15 points per word for individual terms

4. **Tag Match** (40 points)

   - Exact match in tags
   - 20 points per word for individual terms

5. **Keyword Match** (35 points)

   - Exact match in keywords
   - 18 points per word for individual terms

6. **Category/Type Match** (25 points)
   - Match in category or type fields

Results are sorted by score (highest first).

## Usage Examples

### Basic Search

```typescript
import { searchPages } from "@/app/services/searchService";

const results = searchPages("cardiology");
// Returns all pages mentioning cardiology
```

### Category Filtering

```typescript
import {
  getMedicalPages,
  getWellnessPages,
} from "@/app/services/searchService";

const medicalPages = getMedicalPages();
const wellnessPages = getWellnessPages();
```

### Get Related Pages

```typescript
import { getRelatedPages } from "@/app/services/searchService";

const related = getRelatedPages("medical-tourism", 3);
// Returns 3 pages related to medical tourism
```

### Featured Pages

```typescript
import { getFeaturedPages } from "@/app/services/searchService";

const featured = getFeaturedPages();
// Returns pages with 'Popular' or 'Trending' badges
```

## Customization

### Adding New Pages

Add to `pageRegistry` array in `searchService.ts`:

```typescript
{
  id: 'new-page',
  title: 'New Page Title',
  description: 'Page description...',
  category: 'medical',
  type: 'treatment',
  url: '/new-page',
  tags: ['tag1', 'tag2'],
  keywords: ['keyword1', 'keyword2'],
  image: 'https://...',
  badge: 'New',
  icon: 'Heart',
}
```

### Modifying Search Weights

Adjust scores in `searchPages()` function:

```typescript
// Increase title match importance
if (card.title.toLowerCase().includes(normalizedQuery)) {
  score += 200; // Changed from 100
}
```

### Custom Styling

Modify category colors in `SearchResults.tsx`:

```typescript
const getCategoryColor = (category: string) => {
  switch (category) {
    case "medical":
      return "from-emerald-500 to-teal-500";
    case "custom":
      return "from-purple-500 to-pink-500"; // Add custom
    // ...
  }
};
```

## Integration with SearchBar

The SearchBar component automatically redirects to the search page:

```typescript
window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
```

The search page reads the query parameter and displays results.

## Best Practices

1. **Minimum Query Length**: Require at least 2 characters for search
2. **Fuzzy Matching**: Use lowercase comparison and word splitting
3. **Empty States**: Always show helpful messages when no results
4. **Quick Actions**: Display popular actions when search is empty
5. **Related Pages**: Show related content on individual pages
6. **Performance**: Page registry is static and cached
7. **SEO**: Include relevant keywords and descriptions

## Future Enhancements

Potential improvements:

- Server-side search API
- Search history tracking
- Auto-complete suggestions
- Advanced filters (price, rating, location)
- Search analytics
- Multilingual search
- Voice search integration
- AI-powered semantic search

## Support

For issues or questions:

- Check console for errors
- Verify page registry data
- Test search algorithm weights
- Review component props
- Check URL parameters
