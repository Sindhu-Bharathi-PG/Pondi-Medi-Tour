"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Tag, Sparkles } from 'lucide-react';
import { SearchableCard } from '@/app/services/searchService';
import * as Icons from 'lucide-react';

interface SearchResultsProps {
  results: SearchableCard[];
  query: string;
  onResultClick?: (card: SearchableCard) => void;
}

export default function SearchResults({ results, query, onResultClick }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <Icons.SearchX className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No results found</h3>
        <p className="text-gray-600 mb-6">
          We couldn&apos;t find anything matching &quot;{query}&quot;
        </p>
        <p className="text-sm text-gray-500">
          Try different keywords or browse our categories below
        </p>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medical': return 'from-emerald-500 to-teal-500';
      case 'wellness': return 'from-amber-500 to-orange-500';
      case 'service': return 'from-blue-500 to-indigo-500';
      case 'booking': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'medical': return 'bg-emerald-100 text-emerald-700';
      case 'wellness': return 'bg-amber-100 text-amber-700';
      case 'service': return 'bg-blue-100 text-blue-700';
      case 'booking': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getIconComponent = (iconName?: string) => {
    if (!iconName) return Icons.FileText;
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || Icons.FileText;
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Found {results.length} {results.length === 1 ? 'result' : 'results'} for &quot;{query}&quot;
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((card) => {
          const IconComponent = getIconComponent(card.icon);
          
          return (
            <Link
              key={card.id}
              href={card.url}
              onClick={() => onResultClick?.(card)}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-transparent hover:-translate-y-2"
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${getCategoryColor(card.category)}`} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Badge */}
                {card.badge && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-xs font-bold text-gray-800">{card.badge}</span>
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className="absolute bottom-4 left-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(card.category)} rounded-xl flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="mb-3">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadgeColor(card.category)}`}>
                    <Tag className="w-3 h-3" />
                    {card.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {card.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {card.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-semibold text-gray-700 capitalize">
                    {card.type}
                  </span>
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all">
                    <span className="text-sm">Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
