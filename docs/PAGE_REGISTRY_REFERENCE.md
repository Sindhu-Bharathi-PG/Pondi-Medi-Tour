# Page Registry Reference Card

## Quick Reference for All Pages

### 🏥 Medical Tourism (6 pages)

| ID                | Title                           | URL                | Badge   | Type     |
| ----------------- | ------------------------------- | ------------------ | ------- | -------- |
| `home`            | Home                            | `/`                | -       | page     |
| `about`           | About - Why India & Pondicherry | `/about`           | Popular | page     |
| `medical-tourism` | Medical Tourism                 | `/medical-tourism` | -       | page     |
| `services`        | Medical Services & Treatments   | `/services`        | -       | service  |
| `hospital`        | Hospitals                       | `/hospital`        | -       | hospital |
| `doctor`          | Doctors & Specialists           | `/doctor`          | -       | doctor   |

### 🧘 Wellness Tourism (5 pages)

| ID                 | Title              | URL                 | Badge    | Type     |
| ------------------ | ------------------ | ------------------- | -------- | -------- |
| `wellness-tourism` | Wellness Tourism   | `/wellness-tourism` | Trending | wellness |
| `wellness`         | Wellness Programs  | `/wellness`         | -        | package  |
| `ayush`            | AYUSH Therapies    | `/ayush`            | -        | ayush    |
| `yoga-meditation`  | Yoga & Meditation  | `/yoga-meditation`  | -        | wellness |
| `spa-rejuvenation` | Spa & Rejuvenation | `/spa-rejuvenation` | -        | wellness |

### 📦 Packages & Destinations (2 pages)

| ID            | Title        | URL            | Badge | Type        |
| ------------- | ------------ | -------------- | ----- | ----------- |
| `packages`    | All Packages | `/packages`    | -     | package     |
| `destination` | Destinations | `/destination` | -     | destination |

### 🎯 Booking & Services (5 pages)

| ID                | Title            | URL                | Badge        | Type    |
| ----------------- | ---------------- | ------------------ | ------------ | ------- |
| `booking`         | Book Appointment | `/booking`         | Quick Action | service |
| `telemedicine`    | Telemedicine     | `/telemedicine`    | New          | service |
| `visa`            | Visa Assistance  | `/visa`            | -            | service |
| `cost-calculator` | Cost Calculator  | `/cost-calculator` | Popular      | service |
| `contact`         | Contact Us       | `/contact`         | -            | service |

### 📊 Support & Info (5 pages)

| ID                   | Title                | URL                   | Badge | Type |
| -------------------- | -------------------- | --------------------- | ----- | ---- |
| `testimonials`       | Patient Testimonials | `/testimonials`       | -     | page |
| `dashboard`          | Dashboard            | `/dashboard`          | -     | page |
| `global-opportunity` | Global Opportunities | `/global-opportunity` | -     | page |
| `privacy-policy`     | Privacy Policy       | `/privacy-policy`     | -     | page |
| `terms-of-service`   | Terms of Service     | `/terms-of-service`   | -     | page |

## Category Breakdown

### By Category

- **medical**: 6 pages
- **wellness**: 5 pages
- **service**: 7 pages
- **info**: 5 pages
- **booking**: 1 page

**Total: 24 pages**

### By Type

- **page**: 8 pages
- **service**: 7 pages
- **wellness**: 3 pages
- **package**: 2 pages
- **hospital**: 1 page
- **doctor**: 1 page
- **destination**: 1 page
- **ayush**: 1 page

## Featured Pages (Badge: Popular or Trending)

1. **About** - Popular
2. **Wellness Tourism** - Trending
3. **Cost Calculator** - Popular

## Quick Action Pages

1. **Booking** - Book Appointment
2. **Telemedicine** - Virtual Consultations
3. **Cost Calculator** - Pricing Tool
4. **Contact** - Support

## Search Tags Summary

### Most Common Tags

- `medical`, `wellness`, `tourism`
- `treatments`, `services`, `packages`
- `hospitals`, `doctors`, `specialists`
- `yoga`, `ayurveda`, `spa`
- `booking`, `consultation`, `support`

### Most Common Keywords

- `medical tourism`, `healthcare`, `hospitals`
- `wellness`, `ayurveda`, `yoga`, `meditation`
- `treatments`, `surgery`, `doctors`
- `packages`, `cost savings`, `JCI accredited`
- `pondicherry`, `india`, `french heritage`

## Icon Reference

### Medical Icons

- `Home` - Home page
- `MapPin` - About, Destinations
- `Heart` - Medical Tourism, NABH
- `Activity` - Medical Services
- `Building2` - Hospitals
- `Stethoscope` - Doctors

### Wellness Icons

- `Sparkles` - Wellness Tourism
- `Leaf` - Wellness Programs
- `Flower2` - AYUSH
- `Brain` - Yoga & Meditation
- `Droplets` - Spa & Rejuvenation

### Service Icons

- `Package` - Packages
- `Calendar` - Booking
- `Video` - Telemedicine
- `Plane` - Visa
- `Calculator` - Cost Calculator
- `Phone` - Contact
- `LayoutDashboard` - Dashboard

### Info Icons

- `Star` - Testimonials
- `Globe` - Global Opportunities
- `Shield` - Privacy Policy
- `FileText` - Terms of Service

## Color Coding

### Category Colors (Gradients)

- **medical**: `from-emerald-500 to-teal-500`
- **wellness**: `from-amber-500 to-orange-500`
- **service**: `from-blue-500 to-indigo-500`
- **booking**: `from-purple-500 to-pink-500`
- **info**: `from-gray-500 to-gray-600`

### Badge Colors

- **medical**: `bg-emerald-100 text-emerald-700`
- **wellness**: `bg-amber-100 text-amber-700`
- **service**: `bg-blue-100 text-blue-700`
- **booking**: `bg-purple-100 text-purple-700`
- **info**: `bg-gray-100 text-gray-700`

## Usage Examples

### Get all medical pages

```typescript
import { getMedicalPages } from "@/app/services/searchService";
const pages = getMedicalPages(); // Returns 6 pages
```

### Search for "yoga"

```typescript
import { searchPages } from "@/app/services/searchService";
const results = searchPages("yoga");
// Returns: yoga-meditation, ayush, wellness pages
```

### Get featured pages

```typescript
import { getFeaturedPages } from "@/app/services/searchService";
const featured = getFeaturedPages();
// Returns: about, wellness-tourism, cost-calculator
```

### Get related pages

```typescript
import { getRelatedPages } from "@/app/services/searchService";
const related = getRelatedPages("medical-tourism", 3);
// Returns: services, hospital, doctor (or similar)
```

## API Reference

All functions available from `@/app/services/searchService`:

```typescript
// Search
searchPages(query: string): SearchableCard[]
getPageById(id: string): SearchableCard | undefined
getPageByUrl(url: string): SearchableCard | undefined
getRelatedPages(currentPageId: string, limit?: number): SearchableCard[]

// Filters
getPagesByCategory(category): SearchableCard[]
getPagesByType(type): SearchableCard[]
getMedicalPages(): SearchableCard[]
getWellnessPages(): SearchableCard[]
getFeaturedPages(): SearchableCard[]
getQuickActionPages(): SearchableCard[]

// Utilities
getAllCategories(): string[]
getAllTypes(): string[]
```

## Component Usage

### SearchResults Component

```tsx
import SearchResults from "@/app/components/search/SearchResults";

<SearchResults
  results={searchResults}
  query={searchQuery}
  onResultClick={(card) => console.log(card.url)}
/>;
```

### PageCard Component (3 variants)

```tsx
import { PageCard } from '@/app/components/search';

// Default
<PageCard card={pageData} />

// Compact
<PageCard card={pageData} variant="compact" />

// Featured
<PageCard card={pageData} variant="featured" />
```
