"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Sparkles, TrendingUp, Grid3x3, List } from 'lucide-react';
import { Header, Footer } from '../components/common';
import SearchResults from '../components/search/SearchResults';
import { 
  searchPages, 
  getPagesByCategory, 
  getFeaturedPages,
  getMedicalPages,
  getWellnessPages,
  getQuickActionPages,
  SearchableCard 
} from '../services/searchService';
import { useScrolled } from '../hooks';

function SearchContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [results, setResults] = useState<SearchableCard[]>([]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'medical' | 'wellness' | 'service'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Perform search when query changes
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const searchResults = searchPages(searchQuery);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  // Update search query when URL param changes
  useEffect(() => {
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [queryParam]);

  const handleSearch = () => {
    if (searchQuery.trim().length >= 2) {
      const searchResults = searchPages(searchQuery);
      setResults(searchResults);
      // Update URL
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const filteredResults = activeCategory === 'all' 
    ? results 
    : results.filter(r => r.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Results', icon: Grid3x3 },
    { id: 'medical', label: 'Medical', icon: Search },
    { id: 'wellness', label: 'Wellness', icon: Sparkles },
    { id: 'service', label: 'Services', icon: Filter },
  ];

  const featuredPages = getFeaturedPages();
  const quickActions = getQuickActionPages();

  // Helper functions
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medical': return 'from-emerald-500 to-teal-500';
      case 'wellness': return 'from-amber-500 to-orange-500';
      case 'service': return 'from-blue-500 to-indigo-500';
      case 'booking': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getIconComponent = (iconName?: string) => {
    if (!iconName) return Search;
    const Icons = require('lucide-react');
    return Icons[iconName] || Search;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Hero Search Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1600')] bg-cover bg-center" />
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4">
              <Search className="w-4 h-4 text-emerald-300" />
              <span className="text-sm font-medium text-white">Search Across All Services</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Find Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Healthcare Solution
              </span>
            </h1>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Search through treatments, hospitals, doctors, wellness programs, and more
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative flex items-center gap-3 bg-white/95 backdrop-blur-xl rounded-2xl px-6 py-5 shadow-2xl border border-white/20">
                <Search className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search treatments, hospitals, doctors, packages..."
                  className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-lg outline-none"
                  autoFocus
                />
                <button
                  onClick={handleSearch}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 flex-shrink-0"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                      activeCategory === cat.id
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {cat.label}
                    {activeCategory === cat.id && filteredResults.length > 0 && (
                      <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                        {filteredResults.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Results */}
          {searchQuery.trim().length >= 2 ? (
            <SearchResults 
              results={filteredResults} 
              query={searchQuery}
              onResultClick={(card) => console.log('Navigating to:', card.url)}
            />
          ) : (
            <div>
              {/* Quick Actions */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {quickActions.map((action) => {
                    const IconComponent = getIconComponent(action.icon);
                    return (
                      <a
                        key={action.id}
                        href={action.url}
                        className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
                      >
                        <div className={`w-14 h-14 bg-gradient-to-br ${getCategoryColor(action.category)} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {action.description.substring(0, 60)}...
                        </p>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
