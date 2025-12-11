"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import * as Icons from 'lucide-react';
import { SearchableCard } from '@/app/services/searchService';

interface PageCardProps {
  card: SearchableCard;
  variant?: 'default' | 'compact' | 'featured';
  onClick?: () => void;
}

/**
 * Reusable page card component
 * Can be used anywhere to display pages from the registry
 */
export default function PageCard({ card, variant = 'default', onClick }: PageCardProps) {
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

  // Get icon name and use it directly in JSX
  const iconName = card.icon || 'FileText';
  const Icon = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[iconName] || Icons.FileText;

  if (variant === 'compact') {
    return (
      <Link
        href={card.url}
        onClick={onClick}
        className="group flex items-center gap-4 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-emerald-200"
      >
        <div className={`w-12 h-12 bg-linear-to-br ${getCategoryColor(card.category)} rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 truncate group-hover:text-emerald-600 transition-colors">
            {card.title}
          </h3>
          <p className="text-sm text-gray-600 truncate">{card.description}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all shrink-0" />
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link
        href={card.url}
        onClick={onClick}
        className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-3"
      >
        {/* Background Image */}
        <div className="relative h-80 overflow-hidden">
          {card.image ? (
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
        ) : (
          <div className={`w-full h-full bg-linear-to-br ${getCategoryColor(card.category)}`} />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />          {/* Badge */}
          {card.badge && (
            <div className="absolute top-6 right-6">
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-bold text-gray-800">{card.badge}</span>
              </div>
            </div>
          )}

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className={`inline-flex items-center gap-2 bg-linear-to-r ${getCategoryColor(card.category)} text-white px-4 py-2 rounded-full mb-4 text-sm font-semibold shadow-lg`}>
              <Icon className="w-4 h-4" />
              {card.category}
            </div>
            <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors">
              {card.title}
            </h2>
            <p className="text-white/90 text-lg mb-4 line-clamp-2">
              {card.description}
            </p>
            <div className="flex items-center gap-3 text-white font-semibold group-hover:gap-4 transition-all">
              <span>Explore Now</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      href={card.url}
      onClick={onClick}
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
          <div className={`w-full h-full bg-linear-to-br ${getCategoryColor(card.category)}`} />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
        
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
          <div className={`w-12 h-12 bg-linear-to-br ${getCategoryColor(card.category)} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadgeColor(card.category)}`}>
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
}
