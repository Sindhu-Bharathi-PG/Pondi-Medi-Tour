"use client";

import { CURRENCIES, useCurrency } from '@/app/context/CurrencyContext';
import { MEDICAL_NAV_LINKS, useSiteMode, WELLNESS_NAV_LINKS } from '@/app/context/SiteModeContext';
import { clsx, type ClassValue } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Bath, Building2, Calculator, ChevronDown, Compass, DollarSign, Globe, Home, Leaf, MapPin, Menu, Package, Search, Sparkles, Stethoscope, Tent, UserRound, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

// Utility for merging tailwind classes
function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
}

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
      Home,
      MapPin,
      Stethoscope,
      Building2,
      UserRound,
      Package,
      Calculator,
      Tent,
      Sparkles,
      Bath,
      Compass,
      FlowerLotus: Sparkles, // Fallback since FlowerLotus might not exist
};

// Language type definition
type Language = 'en' | 'hi' | 'ta' | 'ml' | 'te' | 'fr' | 'de' | 'es' | 'it' | 'pt' | 'ja' | 'zh';

// Language options with flags
const LANGUAGES: Array<{ code: Language; name: string; flag: string }> = [
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



interface HeaderProps {
      highContrast?: boolean;
}

const Header: React.FC<HeaderProps> = ({
      highContrast = false,
}) => {
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const [hasScrolled, setHasScrolled] = useState(false);
      const [hoveredLink, setHoveredLink] = useState<string | null>(null);
      const pathname = usePathname();

      // Get language from context
      // const { currentLanguage, setLanguage, isLoading, t } = useLanguage();

      // New state for language, currency, and search
      const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
      const { selectedCurrency, setSelectedCurrency } = useCurrency();
      const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
      const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
      const [searchOpen, setSearchOpen] = useState(false);
      const [searchQuery, setSearchQuery] = useState('');

      const searchInputRef = useRef<HTMLInputElement>(null);
      const languageDropdownRef = useRef<HTMLDivElement>(null);
      const currencyDropdownRef = useRef<HTMLDivElement>(null);

      // Update selected language when context changes
      // useEffect(() => {
      //       const langOption = LANGUAGES.find(l => l.code === currentLanguage);
      //       if (langOption) {
      //             setSelectedLanguage(langOption);
      //       }
      // }, [currentLanguage]);

      // Close dropdowns when clicking outside
      useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                  if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
                        setLanguageDropdownOpen(false);
                  }
                  if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
                        setCurrencyDropdownOpen(false);
                  }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);

      // Focus search input when opened
      useEffect(() => {
            if (searchOpen && searchInputRef.current) {
                  searchInputRef.current.focus();
            }
      }, [searchOpen]);

      // Track scroll for navbar transformation
      useEffect(() => {
            const handleScroll = () => {
                  setHasScrolled(window.scrollY > 50);
            };
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
            return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      // Use site mode context
      let mode: 'medical' | 'wellness' = 'medical';
      let isMedical = true;
      let navLinks: typeof MEDICAL_NAV_LINKS = MEDICAL_NAV_LINKS;
      let toggleMode = () => { };

      try {
            const siteMode = useSiteMode();
            mode = siteMode.mode;
            isMedical = siteMode.isMedical;
            toggleMode = siteMode.toggleMode;
            navLinks = (isMedical ? MEDICAL_NAV_LINKS : WELLNESS_NAV_LINKS) as typeof MEDICAL_NAV_LINKS;
      } catch {
            // Context not available, use defaults
      }

      // ----------------------------------------------------------------------
      // Styles & Theme Logic
      // ----------------------------------------------------------------------

      const isActiveLink = (href: string) => {
            if (href === '/') return pathname === '/';
            return pathname.startsWith(href);
      };

      const accentColor = isMedical ? 'text-emerald-500' : 'text-amber-500';
      const activePillColor = isMedical ? 'bg-emerald-500' : 'bg-amber-500';
      const activeTextColor = isMedical ? 'text-emerald-600' : 'text-amber-600';

      const glassBase = hasScrolled
            ? 'border-opacity-50 shadow-xl shadow-black/5'
            : 'border-opacity-20 shadow-none';

      const containerWidth = hasScrolled ? 'max-w-[1400px] w-[96%]' : 'max-w-5xl w-[92%]';

      const themeColors = isMedical
            ? {
                  bg: hasScrolled ? 'bg-white/90' : 'bg-black/20',
                  border: hasScrolled ? 'border-emerald-100' : 'border-white/10',
                  text: hasScrolled ? 'text-gray-700' : 'text-white',
                  subText: hasScrolled ? 'text-gray-500' : 'text-white/70',
                  hoverBg: hasScrolled ? 'hover:bg-emerald-50' : 'hover:bg-white/10',
            }
            : {
                  bg: hasScrolled ? 'bg-white/90' : 'bg-black/20',
                  border: hasScrolled ? 'border-amber-100' : 'border-white/10',
                  text: hasScrolled ? 'text-gray-700' : 'text-white',
                  subText: hasScrolled ? 'text-gray-500' : 'text-white/70',
                  hoverBg: hasScrolled ? 'hover:bg-amber-50' : 'hover:bg-white/10',
            };

      return (
            <>
                  {/* Floating Navbar Container */}
                  <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
                        <motion.nav
                              layout
                              initial={false}
                              animate={{
                                    width: hasScrolled ? "96%" : "92%",
                                    maxWidth: hasScrolled ? 1200 : 1100,
                                    backgroundColor: hasScrolled ? "rgba(255, 255, 255, 0.92)" : "rgba(10, 10, 10, 0.35)",
                                    borderColor: hasScrolled
                                          ? (isMedical ? "rgba(209, 250, 229, 0.6)" : "rgba(254, 243, 199, 0.6)")
                                          : "rgba(255, 255, 255, 0.2)",
                                    padding: hasScrolled ? "0.4rem 0.6rem" : "0.6rem 1rem",
                              }}
                              transition={{ type: "spring", stiffness: 140, damping: 22 }}
                              className={cn(
                                    "pointer-events-auto relative flex items-center justify-between rounded-full backdrop-blur-2xl border transition-shadow duration-500",
                                    glassBase,
                                    hasScrolled && "shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
                              )}
                        >
                              {/* ----------------------------------------------------------------------
                                  Left: Logo 
                              ---------------------------------------------------------------------- */}
                              <Link href="/" className="flex items-center gap-2 pl-1 group shrink-0">
                                    <div className={cn(
                                          "w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12",
                                          isMedical
                                                ? "bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 text-white shadow-emerald-500/30"
                                                : "bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 text-white shadow-amber-500/30"
                                    )}>
                                          {isMedical ? <Stethoscope className="w-4 h-4 group-hover:scale-110 transition-transform" /> : <Leaf className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                                    </div>
                                    <div className="hidden sm:flex flex-col">
                                          <span className={cn(
                                                "text-lg font-bold tracking-tight leading-none transition-all duration-300",
                                                hasScrolled
                                                      ? "bg-gradient-to-r bg-clip-text text-transparent from-gray-900 via-gray-700 to-gray-600"
                                                      : "text-white drop-shadow-lg"
                                          )}>
                                                Pondy<span className={cn("font-extrabold", isMedical ? "text-emerald-500" : "text-amber-400")}>Health</span>
                                          </span>
                                          <span className={cn(
                                                "text-[9px] font-semibold tracking-wider uppercase transition-all duration-300",
                                                hasScrolled ? "text-gray-500" : "text-white/90"
                                          )}>
                                                {isMedical ? '🏥 Medical' : '🧘 Wellness'}
                                          </span>
                                    </div>
                              </Link>

                              {/* ----------------------------------------------------------------------
                                  Center: Navigation 
                              ---------------------------------------------------------------------- */}
                              <div className={cn(
                                    "hidden lg:flex items-center flex-1 px-4 transition-all duration-300",
                                    searchOpen ? "justify-start" : "justify-center"
                              )}>
                                    <ul className="flex items-center gap-0.5">
                                          {navLinks.map((link) => {
                                                const isActive = isActiveLink(link.href);
                                                const IconComponent = link.icon ? iconMap[link.icon] : null;
                                                return (
                                                      <li key={link.href} className="relative group">
                                                            <Link
                                                                  href={link.href}
                                                                  onMouseEnter={() => setHoveredLink(link.href)}
                                                                  onMouseLeave={() => setHoveredLink(null)}
                                                                  className={cn(
                                                                        "relative z-10 flex items-center px-2.5 py-1.5 text-xs font-semibold transition-all duration-300",
                                                                        isActive
                                                                              ? "text-white drop-shadow-sm"
                                                                              : (hasScrolled ? "text-gray-700 hover:text-gray-900" : "text-white/85 hover:text-white drop-shadow-sm")
                                                                  )}
                                                            >
                                                                  <span className={cn(
                                                                        "transition-all duration-300 overflow-hidden whitespace-nowrap",
                                                                        searchOpen ? "w-0 opacity-0" : "w-auto opacity-100"
                                                                  )}>
                                                                        {link.label}
                                                                  </span>
                                                            </Link>

                                                            {/* Active Indicator (Pill) */}
                                                            {isActive && (
                                                                  <motion.div
                                                                        layoutId="activePill"
                                                                        className={cn(
                                                                              "absolute inset-0 rounded-full shadow-lg",
                                                                              isMedical
                                                                                    ? "bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 shadow-emerald-500/40"
                                                                                    : "bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 shadow-amber-500/40"
                                                                        )}
                                                                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                                                  />
                                                            )}

                                                            {/* Hover Indicator (Subtable bg) */}
                                                            {hoveredLink === link.href && !isActive && (
                                                                  <motion.div
                                                                        layoutId="hoverPill"
                                                                        className={cn(
                                                                              "absolute inset-0 rounded-full",
                                                                              hasScrolled
                                                                                    ? "bg-gray-100"
                                                                                    : "bg-white/10"
                                                                        )}
                                                                        transition={{ type: "spring", bounce: 0, duration: 0.2 }}
                                                                  />
                                                            )}
                                                      </li>
                                                );
                                          })}
                                    </ul>
                              </div>

                              {/* ----------------------------------------------------------------------
                                  Right: Actions 
                              ---------------------------------------------------------------------- */}
                              <div className="flex items-center gap-0.5 md:gap-1 pr-1 shrink-0">

                                    {/* Search Bar */}
                                    <div className="relative hidden md:flex items-center">
                                          <AnimatePresence>
                                                {searchOpen && (
                                                      <motion.div
                                                            initial={{ width: 0, opacity: 0 }}
                                                            animate={{ width: 200, opacity: 1 }}
                                                            exit={{ width: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                            className="absolute right-10 top-1/2 -translate-y-1/2 overflow-hidden"
                                                            style={{ marginRight: '0.5rem' }}
                                                      >
                                                            <input
                                                                  ref={searchInputRef}
                                                                  type="text"
                                                                  placeholder="Search..."
                                                                  value={searchQuery}
                                                                  onChange={(e) => setSearchQuery(e.target.value)}
                                                                  onKeyDown={(e) => {
                                                                        if (e.key === 'Escape') {
                                                                              setSearchOpen(false);
                                                                              setSearchQuery('');
                                                                        } else if (e.key === 'Enter' && searchQuery) {
                                                                              console.log('Searching for:', searchQuery);
                                                                        }
                                                                  }}
                                                                  className={cn(
                                                                        "w-full px-4 py-2 text-xs rounded-full border outline-none transition-all font-medium",
                                                                        hasScrolled
                                                                              ? "bg-white border-gray-200 text-gray-700 placeholder-gray-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 shadow-lg"
                                                                              : "bg-white/95 border-white/30 text-gray-700 placeholder-gray-500 focus:border-white/50 shadow-xl backdrop-blur-xl"
                                                                  )}
                                                            />
                                                      </motion.div>
                                                )}
                                          </AnimatePresence>
                                          <button
                                                onClick={() => {
                                                      if (searchOpen && searchQuery) {
                                                            console.log('Searching for:', searchQuery);
                                                      }
                                                      setSearchOpen(!searchOpen);
                                                }}
                                                aria-label="Search"
                                                className={cn(
                                                      "p-2 rounded-full transition-all relative z-10 hover:scale-105 active:scale-95",
                                                      hasScrolled
                                                            ? "hover:bg-gray-100 text-gray-600"
                                                            : "hover:bg-white/10 text-white/90"
                                                )}
                                          >
                                                <Search className="w-4 h-4" />
                                          </button>
                                    </div>

                                    {/* Language Selector */}
                                    <div ref={languageDropdownRef} className="relative hidden lg:block">
                                          <button
                                                onClick={() => {
                                                      setLanguageDropdownOpen(!languageDropdownOpen);
                                                      setCurrencyDropdownOpen(false);
                                                }}
                                                className={cn(
                                                      "flex items-center gap-1 px-2 py-1.5 rounded-full text-sm font-medium transition-colors disabled:opacity-50",
                                                      hasScrolled
                                                            ? "hover:bg-gray-100 text-gray-600"
                                                            : "hover:bg-white/10 text-white/80"
                                                )}
                                          >
                                                <span className="text-sm">{selectedLanguage.flag}</span>
                                                <ChevronDown className={cn(
                                                      "w-3 h-3 transition-transform",
                                                      languageDropdownOpen && "rotate-180"
                                                )} />
                                          </button>

                                          <AnimatePresence>
                                                {languageDropdownOpen && (
                                                      <motion.div
                                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            transition={{ duration: 0.15 }}
                                                            className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                                                      >
                                                            <div className="p-1">
                                                                  {LANGUAGES.map((lang) => (
                                                                        <button
                                                                              key={lang.code}
                                                                              onClick={() => {
                                                                                    // setLanguage(lang.code);
                                                                                    setLanguageDropdownOpen(false);
                                                                              }}
                                                                        // className={cn(
                                                                        //       "w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors",
                                                                        //       // currentLanguage === lang.code
                                                                        //             ? "bg-blue-500 text-white"
                                                                        //             : "hover:bg-gray-100 text-gray-700"
                                                                        // )}
                                                                        >
                                                                              <span className="mr-2">{lang.flag}</span>
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
                                                      setCurrencyDropdownOpen(!currencyDropdownOpen);
                                                      setLanguageDropdownOpen(false);
                                                }}
                                                className={cn(
                                                      "flex items-center gap-1 px-2 py-1.5 rounded-full text-sm font-medium transition-colors",
                                                      hasScrolled
                                                            ? "hover:bg-gray-100 text-gray-600"
                                                            : "hover:bg-white/10 text-white/80"
                                                )}
                                          >
                                                <span className="text-xs font-bold">{selectedCurrency.code}</span>
                                                <ChevronDown className={cn(
                                                      "w-3 h-3 transition-transform",
                                                      currencyDropdownOpen && "rotate-180"
                                                )} />
                                          </button>

                                          <AnimatePresence>
                                                {currencyDropdownOpen && (
                                                      <motion.div
                                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            transition={{ duration: 0.15 }}
                                                            className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                                                      >
                                                            <div className="p-1">
                                                                  {CURRENCIES.map((currency) => (
                                                                        <button
                                                                              key={currency.code}
                                                                              onClick={() => {
                                                                                    setSelectedCurrency(currency);
                                                                                    setCurrencyDropdownOpen(false);
                                                                              }}
                                                                              className={cn(
                                                                                    "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                                                                                    selectedCurrency.code === currency.code
                                                                                          ? (isMedical ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")
                                                                                          : "hover:bg-gray-50 text-gray-700"
                                                                              )}
                                                                        >
                                                                              <span className="w-6 text-center font-medium">{currency.symbol}</span>
                                                                              <span>{currency.code}</span>
                                                                              <span className="text-gray-400 text-xs ml-auto">{currency.name}</span>
                                                                        </button>
                                                                  ))}
                                                            </div>
                                                      </motion.div>
                                                )}
                                          </AnimatePresence>
                                    </div>

                                    {/* Medical/Wellness Toggle */}
                                    <div 
                                          className={cn(
                                                "relative p-0.5 rounded-full flex cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95",
                                                hasScrolled ? "bg-gray-100 shadow-inner" : "bg-white/15 border border-white/20"
                                          )} 
                                          onClick={toggleMode}
                                    >
                                          <div className={cn(
                                                "absolute inset-0.5 w-[calc(50%-2px)] rounded-full shadow-lg transition-all duration-500 ease-out",
                                                isMedical
                                                      ? "left-0.5 bg-gradient-to-r from-emerald-400 to-emerald-500"
                                                      : "left-[calc(50%)] bg-gradient-to-r from-amber-400 to-amber-500",
                                                hasScrolled ? "shadow-md" : "shadow-lg bg-white"
                                          )} />
                                          <div className={cn(
                                                "relative z-10 p-1.5 rounded-full transition-all duration-300", 
                                                isMedical ? "text-white scale-110" : (hasScrolled ? "text-gray-400" : "text-white/50")
                                          )}>
                                                <Stethoscope className="w-3.5 h-3.5" />
                                          </div>
                                          <div className={cn(
                                                "relative z-10 p-1.5 rounded-full transition-all duration-300", 
                                                !isMedical ? "text-white scale-110" : (hasScrolled ? "text-gray-400" : "text-white/50")
                                          )}>
                                                <Leaf className="w-3.5 h-3.5" />
                                          </div>
                                    </div>



                                    {/* Mobile Menu Toggle */}
                                    <button
                                          onClick={() => setMobileMenuOpen(true)}
                                          className={cn(
                                                "lg:hidden p-2.5 rounded-full transition-colors",
                                                hasScrolled ? "bg-gray-100 hover:bg-gray-200 text-gray-700" : "bg-white/10 hover:bg-white/20 text-white"
                                          )}
                                    >
                                          <Menu className="w-5 h-5" />
                                    </button>
                              </div>
                        </motion.nav>
                  </div>

                  {/* ----------------------------------------------------------------------
                      Mobile Menu Overlay 
                  ---------------------------------------------------------------------- */}
                  <AnimatePresence>
                        {mobileMenuOpen && (
                              <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-sm"
                                    onClick={() => setMobileMenuOpen(false)}
                              >
                                    <motion.div
                                          initial={{ x: "100%" }}
                                          animate={{ x: 0 }}
                                          exit={{ x: "100%" }}
                                          transition={{ type: "spring", damping: 28, stiffness: 280 }}
                                          className={cn(
                                                "absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-gradient-to-br from-white to-gray-50 shadow-2xl p-6 overflow-y-auto",
                                                isMedical ? "border-l-4 border-emerald-500" : "border-l-4 border-amber-500"
                                          )}
                                          onClick={(e) => e.stopPropagation()}
                                    >
                                          {/* Mobile Header */}
                                          <div className="flex items-center justify-between mb-8">
                                                <div className="flex items-center gap-3">
                                                      <div className={cn(
                                                            "w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg",
                                                            isMedical ? "bg-emerald-500" : "bg-amber-500"
                                                      )}>
                                                            {isMedical ? <Stethoscope className="w-5 h-5" /> : <Leaf className="w-5 h-5" />}
                                                      </div>
                                                      <span className={cn("font-bold text-lg", isMedical ? "text-emerald-700" : "text-amber-700")}>
                                                            PondyHealth
                                                      </span>
                                                </div>
                                                <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                                                      <X className="w-5 h-5 text-gray-500" />
                                                </button>
                                          </div>

                                          {/* Mobile Nav Links */}
                                          <nav className="space-y-2 mb-8">
                                                {navLinks.map((link, i) => (
                                                      <motion.div
                                                            key={link.href}
                                                            initial={{ opacity: 0, x: 20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.05 }}
                                                      >
                                                            <Link
                                                                  href={link.href}
                                                                  onClick={() => setMobileMenuOpen(false)}
                                                                  className={cn(
                                                                        "flex items-center justify-between p-4 rounded-xl font-medium transition-all active:scale-95",
                                                                        isActiveLink(link.href)
                                                                              ? (isMedical ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")
                                                                              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                                                  )}
                                                            >
                                                                  {link.label}
                                                                  {isActiveLink(link.href) && (
                                                                        <span className={cn("w-2 h-2 rounded-full", isMedical ? "bg-emerald-500" : "bg-amber-500")} />
                                                                  )}
                                                            </Link>
                                                      </motion.div>
                                                ))}
                                          </nav>

                                          {/* Mobile Actions */}
                                          <div className="space-y-4">
                                                {/* Mobile Search */}
                                                <div className="relative">
                                                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                      <input
                                                            type="text"
                                                            placeholder="Search treatments, hospitals..."
                                                            value={searchQuery}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-300"
                                                      />
                                                </div>

                                                {/* Mobile Language & Currency Row */}
                                                <div className="flex gap-3">
                                                      {/* Language Selector */}
                                                      <div className="flex-1 relative">
                                                            <button
                                                                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                                                                  className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100"
                                                            >
                                                                  <div className="flex items-center gap-2">
                                                                        <Globe className="w-4 h-4 text-gray-500" />
                                                                        <span className="text-sm font-medium text-gray-600">Language</span>
                                                                  </div>
                                                                  <div className="flex items-center gap-1.5">
                                                                        <span className="text-base">{selectedLanguage.flag}</span>
                                                                        <span className="text-xs text-gray-500">{selectedLanguage.code.toUpperCase()}</span>
                                                                  </div>
                                                            </button>

                                                            <AnimatePresence>
                                                                  {languageDropdownOpen && (
                                                                        <motion.div
                                                                              initial={{ opacity: 0, y: -5 }}
                                                                              animate={{ opacity: 1, y: 0 }}
                                                                              exit={{ opacity: 0, y: -5 }}
                                                                              className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                                                                        >
                                                                              <div className="p-1 max-h-48 overflow-y-auto">
                                                                                    {LANGUAGES.map((lang) => (
                                                                                          <button
                                                                                                key={lang.code}
                                                                                                onClick={() => {
                                                                                                      setSelectedLanguage(lang);
                                                                                                      setLanguageDropdownOpen(false);
                                                                                                }}
                                                                                                className={cn(
                                                                                                      "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                                                                                                      selectedLanguage.code === lang.code
                                                                                                            ? (isMedical ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")
                                                                                                            : "hover:bg-gray-50 text-gray-700"
                                                                                                )}
                                                                                          >
                                                                                                <span className="text-lg">{lang.flag}</span>
                                                                                                <span>{lang.name}</span>
                                                                                          </button>
                                                                                    ))}
                                                                              </div>
                                                                        </motion.div>
                                                                  )}
                                                            </AnimatePresence>
                                                      </div>

                                                      {/* Currency Selector */}
                                                      <div className="flex-1 relative">
                                                            <button
                                                                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                                                                  className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100"
                                                            >
                                                                  <div className="flex items-center gap-2">
                                                                        <DollarSign className="w-4 h-4 text-gray-500" />
                                                                        <span className="text-sm font-medium text-gray-600">Currency</span>
                                                                  </div>
                                                                  <span className="text-xs font-medium text-gray-700">{selectedCurrency.code}</span>
                                                            </button>

                                                            <AnimatePresence>
                                                                  {currencyDropdownOpen && (
                                                                        <motion.div
                                                                              initial={{ opacity: 0, y: -5 }}
                                                                              animate={{ opacity: 1, y: 0 }}
                                                                              exit={{ opacity: 0, y: -5 }}
                                                                              className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                                                                        >
                                                                              <div className="p-1 max-h-48 overflow-y-auto">
                                                                                    {CURRENCIES.map((currency) => (
                                                                                          <button
                                                                                                key={currency.code}
                                                                                                onClick={() => {
                                                                                                      setSelectedCurrency(currency);
                                                                                                      setCurrencyDropdownOpen(false);
                                                                                                }}
                                                                                                className={cn(
                                                                                                      "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors",
                                                                                                      selectedCurrency.code === currency.code
                                                                                                            ? (isMedical ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")
                                                                                                            : "hover:bg-gray-50 text-gray-700"
                                                                                                )}
                                                                                          >
                                                                                                <span className="w-5 text-center font-medium">{currency.symbol}</span>
                                                                                                <span>{currency.code}</span>
                                                                                          </button>
                                                                                    ))}
                                                                              </div>
                                                                        </motion.div>
                                                                  )}
                                                            </AnimatePresence>
                                                      </div>
                                                </div>

                                                <button
                                                      onClick={toggleMode}
                                                      className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100"
                                                >
                                                      <span className="font-medium text-gray-600">Switch Mode</span>
                                                      <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm border border-gray-100">
                                                            {isMedical ? <Stethoscope className="w-4 h-4 text-emerald-500" /> : <Leaf className="w-4 h-4 text-amber-500" />}
                                                            <span className={cn("text-xs font-bold uppercase", isMedical ? "text-emerald-600" : "text-amber-600")}>
                                                                  {isMedical ? 'Medical' : 'Wellness'}
                                                            </span>
                                                      </div>
                                                </button>
                                          </div>
                                    </motion.div>
                              </motion.div>
                        )}
                  </AnimatePresence>
            </>
      );
};

export default Header;
