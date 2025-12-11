/**
 * Search Service Usage Examples
 * 
 * This file demonstrates how to use the search service
 * and page registry in your components.
 */

import { 
  searchPages, 
  getPageById, 
  getMedicalPages,
  getWellnessPages,
  getFeaturedPages,
  getQuickActionPages,
  getRelatedPages
} from '@/app/services/searchService';
import { PageCard, SearchResults } from '@/app/components/search';

// =====================================
// Example 1: Basic Search
// =====================================
export function BasicSearchExample() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const searchResults = searchPages(query);
    setResults(searchResults);
  };

  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
      
      <SearchResults 
        results={results} 
        query={query}
      />
    </div>
  );
}

// =====================================
// Example 2: Medical Pages List
// =====================================
export function MedicalPagesExample() {
  const medicalPages = getMedicalPages();
  
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {medicalPages.map((page) => (
        <PageCard key={page.id} card={page} />
      ))}
    </div>
  );
}

// =====================================
// Example 3: Featured Pages Carousel
// =====================================
export function FeaturedPagesExample() {
  const featuredPages = getFeaturedPages();
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredPages.map((page) => (
        <PageCard 
          key={page.id} 
          card={page} 
          variant="featured" 
        />
      ))}
    </div>
  );
}

// =====================================
// Example 4: Quick Action Buttons
// =====================================
export function QuickActionsExample() {
  const quickActions = getQuickActionPages();
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {quickActions.map((action) => (
        <PageCard 
          key={action.id} 
          card={action} 
          variant="compact"
          onClick={() => console.log('Clicked:', action.title)}
        />
      ))}
    </div>
  );
}

// =====================================
// Example 5: Related Pages Sidebar
// =====================================
export function RelatedPagesExample({ currentPageId }: { currentPageId: string }) {
  const relatedPages = getRelatedPages(currentPageId, 3);
  
  return (
    <aside className="space-y-4">
      <h3 className="text-xl font-bold">You May Also Like</h3>
      {relatedPages.map((page) => (
        <PageCard 
          key={page.id} 
          card={page} 
          variant="compact"
        />
      ))}
    </aside>
  );
}

// =====================================
// Example 6: Category Filtering
// =====================================
export function CategoryFilterExample() {
  const [category, setCategory] = useState<'all' | 'medical' | 'wellness'>('all');
  
  const pages = category === 'all' 
    ? [...getMedicalPages(), ...getWellnessPages()]
    : category === 'medical'
    ? getMedicalPages()
    : getWellnessPages();

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <button onClick={() => setCategory('all')}>All</button>
        <button onClick={() => setCategory('medical')}>Medical</button>
        <button onClick={() => setCategory('wellness')}>Wellness</button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {pages.map((page) => (
          <PageCard key={page.id} card={page} />
        ))}
      </div>
    </div>
  );
}

// =====================================
// Example 7: Get Specific Page
// =====================================
export function SpecificPageExample() {
  const costCalculatorPage = getPageById('cost-calculator');
  
  if (!costCalculatorPage) return null;
  
  return (
    <PageCard 
      card={costCalculatorPage} 
      variant="featured"
    />
  );
}

// =====================================
// Example 8: Search with Auto-Complete
// =====================================
export function AutoCompleteExample() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInput = (value: string) => {
    setQuery(value);
    if (value.length >= 2) {
      const results = searchPages(value).slice(0, 5);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative">
      <input 
        value={query}
        onChange={(e) => handleInput(e.target.value)}
        placeholder="Start typing..."
      />
      
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-lg mt-2 p-4 space-y-2">
          {suggestions.map((suggestion) => (
            <PageCard 
              key={suggestion.id}
              card={suggestion}
              variant="compact"
              onClick={() => {
                setQuery('');
                setSuggestions([]);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// =====================================
// Example 9: Wellness vs Medical Toggle
// =====================================
export function ModeToggleExample() {
  const [mode, setMode] = useState<'medical' | 'wellness'>('medical');
  
  const pages = mode === 'medical' ? getMedicalPages() : getWellnessPages();

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => setMode('medical')}
          className={mode === 'medical' ? 'active' : ''}
        >
          🏥 Medical Tourism
        </button>
        <button 
          onClick={() => setMode('wellness')}
          className={mode === 'wellness' ? 'active' : ''}
        >
          🧘 Wellness Tourism
        </button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {pages.map((page) => (
          <PageCard key={page.id} card={page} />
        ))}
      </div>
    </div>
  );
}

// =====================================
// Example 10: Empty State with Featured
// =====================================
export function EmptyStateExample() {
  const [searchResults, setSearchResults] = useState([]);
  const featuredPages = getFeaturedPages();

  return (
    <div>
      {searchResults.length > 0 ? (
        <SearchResults results={searchResults} query="..." />
      ) : (
        <div>
          <p className="text-center text-gray-500 mb-8">
            No search results. Check out our featured pages:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPages.map((page) => (
              <PageCard key={page.id} card={page} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
