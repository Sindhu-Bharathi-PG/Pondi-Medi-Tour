"use client";

/**
 * Header Component
 * 
 * A responsive, accessible header with:
 * - Fixed top navigation
 * - Language & currency selection
 * - Search functionality
 * - Medical/Wellness mode toggle
 * - Mobile-responsive drawer menu
 * 
 * @component
 */

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Search, Globe, DollarSign, ChevronDown, Stethoscope, Leaf, Accessibility } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useCurrency, CURRENCIES } from '@/app/context/CurrencyContext';
import { useSiteMode, MEDICAL_NAV_LINKS, WELLNESS_NAV_LINKS } from '@/app/context/SiteModeContext';

// ============================================================================
// Utilities
// ============================================================================

/**
 * Merge Tailwind CSS classes with proper precedence handling
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================================================
// Types & Constants
// ============================================================================

type Language = 'en' | 'hi' | 'ta' | 'ml' | 'te' | 'fr' | 'de' | 'es' | 'it' | 'pt' | 'ja' | 'zh';

interface ILanguage {
  code: Language;
  name: string;
  flag: string;
}

const LANGUAGES: ILanguage[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

// ============================================================================
// Header Component
// ============================================================================

const Header: React.FC = () => {
  // ──────────────────────────────────────────────────────────────────────────
  // Hooks & State Management
  // ──────────────────────────────────────────────────────────────────────────

  const router = useRouter();
  const pathname = usePathname();
  const siteMode = useSiteMode();
  const { selectedCurrency, setSelectedCurrency } = useCurrency();

  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage>(LANGUAGES[0]);

  // Refs
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const languageDropdownRef = useRef<HTMLDivElement | null>(null);
  const currencyDropdownRef = useRef<HTMLDivElement | null>(null);

  // Theme
  const isMedical = siteMode?.isMedical ?? true;
  const navLinks = isMedical ? MEDICAL_NAV_LINKS : WELLNESS_NAV_LINKS;

  // ──────────────────────────────────────────────────────────────────────────
  // Effects
  // ──────────────────────────────────────────────────────────────────────────

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-focus search input
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(ev.target as Node)) {
        setLanguageDropdownOpen(false);
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(ev.target as Node)) {
        setCurrencyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // ──────────────────────────────────────────────────────────────────────────
  // Helpers
  // ──────────────────────────────────────────────────────────────────────────

  const isActiveLink = (href: string): boolean => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href) ?? false;
  };

  const getLinkColor = (active: boolean): string => {
    if (active) return 'text-emerald-600 font-semibold';
    return 'text-gray-700 hover:text-emerald-600';
  };

  const getBgColor = (active: boolean): string => {
    if (active) return 'bg-emerald-100';
    return '';
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  // ──────────────────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <motion.nav
          layout
          initial={false}
          animate={{
            backgroundColor: hasScrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.96)',
            boxShadow: hasScrolled ? '0 8px 28px rgba(0,0,0,0.06)' : 'none',
          }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className={cn(
            'backdrop-blur-md border-b border-gray-100',
            'max-w-[1400px] mx-auto w-full px-6 md:px-8 py-3 md:py-4 flex items-center gap-4',
            'rounded-b-2xl'
          )}
          style={{ margin: '0 auto' }}
        >
          {/* Logo Section */}
          <div className="shrink-0 flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div
                className={cn(
                  'w-11 h-11 rounded-full flex items-center justify-center shadow-md',
                  isMedical ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-white'
                )}
              >
                {isMedical ? <Stethoscope className="w-5 h-5" /> : <Leaf className="w-5 h-5" />}
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="font-semibold text-lg">PondyHealth</span>
                <span className="text-[10px] text-gray-500 uppercase">{isMedical ? 'Medical' : 'Wellness'}</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="flex-1 flex items-center justify-center">
            <nav className="hidden lg:flex items-center gap-1">
              <ul className="flex items-center gap-1">
                {navLinks.map((link) => {
                  const active = isActiveLink(link.href);
                  const linkColor = getLinkColor(active);
                  const bgColor = getBgColor(active);
                  return (
                    <li key={link.href} className="relative">
                      <Link
                        href={link.href}
                        className={cn('px-4 py-2 rounded-full text-sm font-medium transition-colors', linkColor)}
                      >
                        {link.label}
                      </Link>
                      {active && (
                        <motion.span
                          layoutId="activePill"
                          className={cn('absolute inset-0 rounded-full -z-10', bgColor)}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Action Items */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:flex items-center">
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.26 }}
                    className="absolute right-12 top-1/2 -translate-y-1/2 overflow-hidden"
                  >
                    <input
                      ref={searchInputRef}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch();
                        if (e.key === 'Escape') setSearchOpen(false);
                      }}
                      placeholder="Search treatments, hospitals, doctors..."
                      className="w-full px-4 py-2 rounded-full border border-gray-200 bg-white text-sm outline-none shadow-sm"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => {
                  if (searchOpen && searchQuery.trim()) {
                    handleSearch();
                  } else {
                    setSearchOpen((s) => !s);
                  }
                }}
                aria-label="Search"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Language Selector */}
            <div ref={languageDropdownRef} className="relative hidden lg:block">
              <button
                onClick={() => {
                  setLanguageDropdownOpen((s) => !s);
                  setCurrencyDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-transparent hover:border-gray-200 transition-colors"
                aria-label="Change language"
              >
                <span className="text-sm">{selectedLanguage.flag}</span>
                <ChevronDown className={cn('w-3 h-3 transition-transform', languageDropdownOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {languageDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden"
                  >
                    <div className="p-1">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLanguage(lang);
                            setLanguageDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                        >
                          <span className="mr-3">{lang.flag}</span>
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Currency Selector */}
            <div ref={currencyDropdownRef} className="relative hidden md:block">
              <button
                onClick={() => {
                  setCurrencyDropdownOpen((s) => !s);
                  setLanguageDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-transparent hover:border-gray-200 transition-colors"
                aria-label="Change currency"
              >
                <span className="text-xs font-semibold">{selectedCurrency.code}</span>
                <ChevronDown className={cn('w-3 h-3 transition-transform', currencyDropdownOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {currencyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden"
                  >
                    <div className="p-1">
                      {CURRENCIES.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => {
                            setSelectedCurrency(c);
                            setCurrencyDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="w-6 text-center">{c.symbol}</span>
                          <span>{c.code}</span>
                          <span className="ml-auto text-xs text-gray-400">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mode Toggle */}
            <button
              onClick={() => siteMode?.toggleMode?.()}
              className={cn('flex items-center gap-1 px-3 py-1.5 rounded-full border border-transparent hover:border-emerald-200 transition-colors')}
              aria-label="Toggle medical/wellness mode"
            >
              <div className="w-7 h-7 flex items-center justify-center rounded-full text-white bg-emerald-500 hover:bg-emerald-600 transition-colors">
                {isMedical ? <Stethoscope className="w-4 h-4" /> : <Leaf className="w-4 h-4" />}
              </div>
            </button>

            {/* Accessibility */}
            <button
              aria-label="Accessibility options"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors hidden md:inline-flex"
            >
              <Accessibility className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Spacer */}
      <div className="h-20 md:h-24" aria-hidden="true" />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-emerald-500">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div className="font-semibold text-lg">PondyHealth</div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-3 mb-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn('w-full block px-4 py-3 rounded-lg bg-gray-50 text-gray-700 font-medium hover:bg-gray-100 transition-colors')}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="space-y-4">
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-50/90 border border-gray-100 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search treatments, hospitals..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                      setMobileMenuOpen(false);
                    }
                  }}
                />

                <div className="grid grid-cols-2 gap-3">
                  <button
                    className="p-3 rounded-lg bg-gray-50 flex items-center gap-3 w-full justify-between hover:bg-gray-100 transition-colors"
                    onClick={() => setLanguageDropdownOpen((s) => !s)}
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Language</span>
                    </div>
                    <span className="text-sm">{selectedLanguage.flag}</span>
                  </button>

                  <button
                    className="p-3 rounded-lg bg-gray-50 flex items-center gap-3 w-full justify-between hover:bg-gray-100 transition-colors"
                    onClick={() => setCurrencyDropdownOpen((s) => !s)}
                  >
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Currency</span>
                    </div>
                    <span className="text-sm">{selectedCurrency.code}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
