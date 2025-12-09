"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Award, Menu, X, Heart, Stethoscope, Leaf, Globe, ChevronDown } from 'lucide-react';
import { LANGUAGES, CONTACT_INFO } from '@/app/utils/constants';
import { useSiteMode, MEDICAL_NAV_LINKS, WELLNESS_NAV_LINKS, THEME_COLORS } from '@/app/context/SiteModeContext';
import { ModeToggleCompact } from './ModeToggle';

interface HeaderProps {
      scrolled?: boolean;
      highContrast?: boolean;
}

const Header: React.FC<HeaderProps> = ({
      scrolled = false,
      highContrast = false,
}) => {
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const [selectedLanguage, setSelectedLanguage] = useState('English');

      // Use site mode context - with fallback for pages not wrapped in provider
      let mode: 'medical' | 'wellness' = 'medical';
      let isMedical = true;
      let navLinks = MEDICAL_NAV_LINKS;
      let theme = THEME_COLORS.medical;

      try {
            const siteMode = useSiteMode();
            mode = siteMode.mode;
            isMedical = siteMode.isMedical;
            navLinks = isMedical ? MEDICAL_NAV_LINKS : WELLNESS_NAV_LINKS;
            theme = THEME_COLORS[mode];
      } catch {
            // Context not available, use defaults
      }

      const getTextColor = () => {
            if (highContrast) return 'text-yellow-400';
            if (scrolled) return 'text-gray-700';
            return 'text-white';
      };

      const getAccentColor = () => {
            if (highContrast) return 'text-yellow-400';
            if (scrolled) return isMedical ? 'text-emerald-600' : 'text-amber-600';
            return 'text-white';
      };

      const getBorderColor = () => {
            if (highContrast) return 'border-yellow-400';
            if (scrolled) return 'border-gray-300';
            return 'border-white/30';
      };

      const getLogoGradient = () => {
            if (highContrast) return 'text-yellow-400';
            if (scrolled) {
                  return isMedical
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'
                        : 'bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent';
            }
            return 'text-white';
      };

      return (
            <>
                  <header
                        className={`fixed w-full z-50 transition-all duration-500 ${scrolled
                                    ? 'bg-white shadow-lg py-2'
                                    : 'bg-gradient-to-b from-black/50 to-transparent py-4'
                              } ${highContrast ? 'bg-black border-b-2 border-yellow-400' : ''}`}
                  >
                        <div className="container mx-auto px-4">
                              {/* Top Utility Bar */}
                              <div className="flex justify-between items-center text-sm mb-2">
                                    <div className="flex items-center gap-4">
                                          {/* Language Selector */}
                                          <select
                                                value={selectedLanguage}
                                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                                className={`bg-transparent border rounded px-2 py-1 text-xs ${getTextColor()} ${getBorderColor()}`}
                                                aria-label="Select language"
                                          >
                                                {LANGUAGES.map((lang) => (
                                                      <option key={lang.code} value={lang.label} className="text-gray-800">
                                                            {lang.label}
                                                      </option>
                                                ))}
                                          </select>

                                          {/* Phone */}
                                          <div className={`hidden md:flex items-center gap-2 ${getTextColor()}`}>
                                                <Phone className="w-4 h-4" />
                                                <span className="font-semibold">{CONTACT_INFO.phone}</span>
                                          </div>
                                    </div>

                                    {/* Mode Toggle - Center */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2">
                                          <ModeToggleCompact />
                                    </div>

                                    {/* Trust Badge */}
                                    <div className={`hidden md:flex items-center gap-2 ${getAccentColor()}`}>
                                          {isMedical ? (
                                                <>
                                                      <Award className="w-4 h-4" />
                                                      <span className="text-xs font-medium">NABH-Accredited Network</span>
                                                </>
                                          ) : (
                                                <>
                                                      <Leaf className="w-4 h-4" />
                                                      <span className="text-xs font-medium">AYUSH Certified Wellness</span>
                                                </>
                                          )}
                                    </div>
                              </div>

                              {/* Main Navigation */}
                              <div className="flex justify-between items-center gap-4">
                                    {/* Logo */}
                                    <Link href="/" className={`text-2xl font-bold ${getLogoGradient()} flex items-center gap-2`}>
                                          {isMedical ? (
                                                <Stethoscope className={`w-7 h-7 ${scrolled ? (isMedical ? 'text-emerald-600' : 'text-amber-600') : 'text-white'}`} />
                                          ) : (
                                                <Leaf className={`w-7 h-7 ${scrolled ? 'text-amber-600' : 'text-white'}`} />
                                          )}
                                          <span>
                                                {isMedical ? 'Pondy HealthPort' : 'Pondy Wellness'}
                                          </span>
                                    </Link>

                                    {/* Desktop Navigation */}
                                    <nav className="hidden lg:flex items-center gap-1">
                                          {navLinks.map((link) => (
                                                <Link
                                                      key={link.href}
                                                      href={link.href}
                                                      className={`px-4 py-2 rounded-lg font-medium transition-all hover:bg-white/10 ${getTextColor()} ${scrolled ? 'hover:bg-gray-100' : ''
                                                            }`}
                                                >
                                                      {link.label}
                                                </Link>
                                          ))}
                                    </nav>

                                    {/* CTA Buttons */}
                                    <div className="hidden md:flex items-center gap-3">
                                          <Link
                                                href="/booking"
                                                className={`px-6 py-2 rounded-full font-semibold transition-all ${isMedical
                                                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg'
                                                            : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg'
                                                      }`}
                                          >
                                                {isMedical ? 'Book Consultation' : 'Book Retreat'}
                                          </Link>
                                    </div>

                                    {/* Mobile Menu Button */}
                                    <button
                                          className={`lg:hidden p-2 ${getTextColor()}`}
                                          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                          aria-label="Toggle menu"
                                    >
                                          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                    </button>
                              </div>
                        </div>
                  </header>

                  {/* Mobile Menu */}
                  <div
                        className={`fixed inset-0 z-40 transition-all duration-300 lg:hidden ${mobileMenuOpen ? 'visible' : 'invisible'
                              }`}
                  >
                        {/* Backdrop */}
                        <div
                              className={`absolute inset-0 bg-black transition-opacity ${mobileMenuOpen ? 'opacity-50' : 'opacity-0'
                                    }`}
                              onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <div
                              className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transition-transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                                    }`}
                        >
                              <div className="p-6">
                                    {/* Mobile Menu Header */}
                                    <div className="flex items-center justify-between mb-8">
                                          <span className={`text-xl font-bold ${isMedical ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                {isMedical ? 'Pondy HealthPort' : 'Pondy Wellness'}
                                          </span>
                                          <button onClick={() => setMobileMenuOpen(false)}>
                                                <X className="w-6 h-6 text-gray-500" />
                                          </button>
                                    </div>

                                    {/* Mode Toggle in Mobile */}
                                    <div className="mb-6 pb-6 border-b">
                                          <p className="text-sm text-gray-500 mb-3">Switch Mode</p>
                                          <ModeToggleCompact />
                                    </div>

                                    {/* Mobile Navigation Links */}
                                    <nav className="space-y-2">
                                          {navLinks.map((link) => (
                                                <Link
                                                      key={link.href}
                                                      href={link.href}
                                                      onClick={() => setMobileMenuOpen(false)}
                                                      className={`block px-4 py-3 rounded-lg font-medium text-gray-700 hover:${theme.bg} transition-colors`}
                                                >
                                                      {link.label}
                                                </Link>
                                          ))}
                                    </nav>

                                    {/* Mobile CTA */}
                                    <div className="mt-8">
                                          <Link
                                                href="/booking"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`block w-full text-center py-3 rounded-full font-semibold text-white ${isMedical
                                                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                                                            : 'bg-gradient-to-r from-amber-500 to-orange-500'
                                                      }`}
                                          >
                                                {isMedical ? 'Book Consultation' : 'Book Retreat'}
                                          </Link>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="mt-8 pt-6 border-t">
                                          <div className="flex items-center gap-3 text-gray-600">
                                                <Phone className="w-5 h-5" />
                                                <span>{CONTACT_INFO.phone}</span>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default Header;
