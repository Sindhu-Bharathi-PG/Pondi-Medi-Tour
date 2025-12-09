"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Award, Menu, X, Heart } from 'lucide-react';
import { LANGUAGES, CONTACT_INFO, NAV_LINKS } from '@/app/utils/constants';
import Navigation from './Navigation';

interface HeaderProps {
      scrolled?: boolean;
      highContrast?: boolean;
      // Search props (optional - only if search is needed)
      searchQuery?: string;
      setSearchQuery?: (query: string) => void;
      searchFocused?: boolean;
      setSearchFocused?: (focused: boolean) => void;
      filteredResults?: string[];
      hospitals?: string[];
}

const Header: React.FC<HeaderProps> = ({
      scrolled = false,
      highContrast = false,
      searchQuery = '',
      setSearchQuery,
      searchFocused = false,
      setSearchFocused,
      filteredResults = [],
      hospitals = []
}) => {
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const [selectedLanguage, setSelectedLanguage] = useState('English');

      const getTextColor = () => {
            if (highContrast) return 'text-yellow-400';
            if (scrolled) return 'text-gray-700';
            return 'text-white';
      };

      const getBorderColor = () => {
            if (highContrast) return 'border-yellow-400';
            if (scrolled) return 'border-gray-300';
            return 'border-white/30';
      };

      return (
            <>
                  <header
                        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-gradient-to-b from-black/50 to-transparent py-4'
                              } ${highContrast ? 'bg-black border-b-2 border-yellow-400' : ''}`}
                  >
                        <div className="container mx-auto px-4">
                              {/* Top Utility Bar */}
                              <div className="flex justify-between items-center text-sm mb-2">
                                    <div className="flex items-center gap-4">
                                          <select
                                                value={selectedLanguage}
                                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                                className={`bg-transparent border rounded px-2 py-1 ${getTextColor()} ${getBorderColor()}`}
                                                aria-label="Select language"
                                          >
                                                {LANGUAGES.map((lang) => (
                                                      <option key={lang.code} value={lang.label}>
                                                            {lang.label}
                                                      </option>
                                                ))}
                                          </select>
                                          <div className={`flex items-center gap-2 ${getTextColor()}`}>
                                                <Phone className="w-4 h-4" />
                                                <span className="font-semibold">24/7: {CONTACT_INFO.phone}</span>
                                          </div>
                                    </div>
                                    <div className={`flex items-center gap-2 ${scrolled ? 'text-emerald-600' : 'text-white'} ${highContrast ? 'text-yellow-400' : ''}`}>
                                          <Award className="w-4 h-4" />
                                          <span className="text-xs font-medium">NABH-Accredited Network</span>
                                    </div>
                              </div>

                              {/* Main Navigation */}
                              <div className="flex justify-between items-center gap-4">
                                    {/* Logo */}
                                    <Link
                                          href="/"
                                          className={`text-2xl font-bold ${scrolled ? 'text-emerald-600' : 'text-white'} ${highContrast ? 'text-yellow-400' : ''}`}
                                    >
                                          Pondy HealthPort
                                    </Link>

                                    {/* Search Bar */}
                                    {setSearchQuery && setSearchFocused && (
                                          <div className="flex-1 max-w-md mx-4 relative">
                                                <div className="relative">
                                                      <input
                                                            type="text"
                                                            placeholder="Search hospitals or treatments..."
                                                            value={searchQuery}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                            onFocus={() => setSearchFocused(true)}
                                                            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                                                            className={`w-full px-4 py-2 pl-10 rounded-full border-2 transition-all ${scrolled
                                                                        ? 'bg-white border-gray-300 text-gray-800'
                                                                        : 'bg-white/20 backdrop-blur-md border-white/30 text-white placeholder-white/70'
                                                                  } ${highContrast ? 'bg-black border-yellow-400 text-yellow-400' : ''} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                                                            aria-label="Search hospitals and treatments"
                                                      />
                                                      <svg
                                                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${scrolled ? 'text-gray-400' : 'text-white/70'
                                                                  } ${highContrast ? 'text-yellow-400' : ''}`}
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                      >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                      </svg>
                                                </div>

                                                {/* Search Results Dropdown */}
                                                {searchFocused && filteredResults.length > 0 && (
                                                      <div className={`absolute top-full mt-2 w-full rounded-2xl shadow-2xl overflow-hidden z-50 ${highContrast ? 'bg-black border-2 border-yellow-400' : 'bg-white'}`}>
                                                            <div className="max-h-80 overflow-y-auto">
                                                                  {filteredResults.map((result, index) => (
                                                                        <button
                                                                              key={index}
                                                                              className={`w-full px-4 py-3 text-left transition flex items-center gap-3 ${highContrast ? 'hover:bg-yellow-400 hover:text-black text-yellow-400' : 'hover:bg-emerald-50 text-gray-700'
                                                                                    }`}
                                                                              onClick={() => {
                                                                                    setSearchQuery(result);
                                                                                    setSearchFocused(false);
                                                                              }}
                                                                        >
                                                                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${hospitals.includes(result)
                                                                                          ? highContrast ? 'bg-yellow-400 text-black' : 'bg-blue-100 text-blue-600'
                                                                                          : highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-100 text-emerald-600'
                                                                                    }`}>
                                                                                    {hospitals.includes(result) ? (
                                                                                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                                                                          </svg>
                                                                                    ) : (
                                                                                          <Heart className="w-4 h-4" />
                                                                                    )}
                                                                              </div>
                                                                              <div className="flex-1">
                                                                                    <div className="font-semibold">{result}</div>
                                                                                    <div className={`text-xs ${highContrast ? 'text-yellow-400/70' : 'text-gray-500'}`}>
                                                                                          {hospitals.includes(result) ? 'Hospital / Clinic' : 'Treatment / Specialty'}
                                                                                    </div>
                                                                              </div>
                                                                        </button>
                                                                  ))}
                                                            </div>
                                                      </div>
                                                )}

                                                {searchFocused && searchQuery && filteredResults.length === 0 && (
                                                      <div className={`absolute top-full mt-2 w-full rounded-2xl shadow-2xl p-4 ${highContrast ? 'bg-black border-2 border-yellow-400 text-yellow-400' : 'bg-white text-gray-600'}`}>
                                                            No results found. Try different keywords.
                                                      </div>
                                                )}
                                          </div>
                                    )}

                                    {/* Desktop Navigation */}
                                    <Navigation scrolled={scrolled} highContrast={highContrast} />

                                    {/* Mobile Menu Button */}
                                    <button
                                          className={`md:hidden ${getTextColor()}`}
                                          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                          aria-label="Toggle mobile menu"
                                          aria-expanded={mobileMenuOpen}
                                    >
                                          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                    </button>
                              </div>
                        </div>
                  </header>

                  {/* Mobile Menu Overlay */}
                  {mobileMenuOpen && (
                        <div className="fixed inset-0 z-40 md:hidden">
                              <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
                              <div className={`fixed top-0 right-0 h-full w-80 ${highContrast ? 'bg-black' : 'bg-white'} shadow-2xl p-6 pt-20`}>
                                    <Navigation
                                          variant="mobile"
                                          highContrast={highContrast}
                                          onLinkClick={() => setMobileMenuOpen(false)}
                                    />
                              </div>
                        </div>
                  )}
            </>
      );
};

export default Header;
