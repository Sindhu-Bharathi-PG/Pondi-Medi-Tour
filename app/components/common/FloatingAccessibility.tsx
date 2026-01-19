"use client";

import { CURRENCIES, useCurrency } from '@/app/context/CurrencyContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Accessibility, ArrowUp, Coins, Eye, RotateCcw, Type, X, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type FontSize = 'normal' | 'large' | 'xlarge';

interface AccessibilitySettings {
    fontSize: FontSize;
    highContrast: boolean;
    reducedMotion: boolean;
}

const STORAGE_KEY = 'pondi_accessibility_settings';

const FloatingAccessibility = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [isDividing, setIsDividing] = useState(false);
    const [mounted, setMounted] = useState(false);
    const hasShownScrollTop = useRef(false);

    // Currency context
    const { selectedCurrency, setSelectedCurrency } = useCurrency();

    // Accessibility settings state
    const [settings, setSettings] = useState<AccessibilitySettings>({
        fontSize: 'normal',
        highContrast: false,
        reducedMotion: false
    });

    // Load settings on mount
    useEffect(() => {
        setMounted(true);
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                setSettings(parsed);
            }
        } catch (error) {
            console.error('Error loading accessibility settings:', error);
        }
    }, []);

    // Apply settings to document
    useEffect(() => {
        if (!mounted) return;

        const html = document.documentElement;

        // Font size classes
        html.classList.remove('a11y-font-normal', 'a11y-font-large', 'a11y-font-xlarge');
        html.classList.add(`a11y-font-${settings.fontSize}`);

        // High contrast
        html.classList.toggle('a11y-high-contrast', settings.highContrast);

        // Reduced motion  
        html.classList.toggle('a11y-reduced-motion', settings.reducedMotion);

        // Save to localStorage
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch (error) {
            console.error('Error saving accessibility settings:', error);
        }
    }, [settings, mounted]);

    // Scroll handling
    useEffect(() => {
        const handleScroll = () => {
            const shouldShow = window.scrollY > 300;

            if (shouldShow && !hasShownScrollTop.current) {
                setIsDividing(true);
                hasShownScrollTop.current = true;

                setTimeout(() => {
                    setShowScrollTop(true);
                    setIsDividing(false);
                }, 1200);
            } else if (!shouldShow) {
                setShowScrollTop(false);
                hasShownScrollTop.current = false;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const updateSetting = <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const resetAll = () => {
        setSettings({
            fontSize: 'normal',
            highContrast: false,
            reducedMotion: false
        });
    };

    return (
        <>
            {/* Accessibility Menu Panel */}
            <AnimatePresence>
                {showMenu && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowMenu(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 100, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.9 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed right-6 bottom-28 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Accessibility className="w-6 h-6 text-white" />
                                    <h3 className="text-lg font-bold text-white">Accessibility</h3>
                                </div>
                                <button
                                    onClick={() => setShowMenu(false)}
                                    className="p-1.5 hover:bg-white/20 rounded-lg transition"
                                    aria-label="Close menu"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>

                            {/* Settings */}
                            <div className="p-5 space-y-5">
                                {/* Text Size */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                        <Type className="w-4 h-4" />
                                        Text Size
                                    </label>
                                    <div className="flex gap-2">
                                        {(['normal', 'large', 'xlarge'] as FontSize[]).map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => updateSetting('fontSize', size)}
                                                className={`flex-1 py-2.5 rounded-xl font-medium transition-all ${settings.fontSize === size
                                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                                aria-pressed={settings.fontSize === size}
                                            >
                                                <span className={size === 'normal' ? 'text-sm' : size === 'large' ? 'text-base' : 'text-lg'}>
                                                    A
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* High Contrast */}
                                <div>
                                    <button
                                        onClick={() => updateSetting('highContrast', !settings.highContrast)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${settings.highContrast
                                            ? 'bg-yellow-400 text-black shadow-lg'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        aria-pressed={settings.highContrast}
                                    >
                                        <span className="flex items-center gap-2">
                                            <Eye className="w-4 h-4" />
                                            High Contrast
                                        </span>
                                        {settings.highContrast && <span>✓</span>}
                                    </button>
                                </div>

                                {/* Reduced Motion */}
                                <div>
                                    <button
                                        onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${settings.reducedMotion
                                            ? 'bg-purple-500 text-white shadow-lg'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        aria-pressed={settings.reducedMotion}
                                    >
                                        <span className="flex items-center gap-2">
                                            <Zap className="w-4 h-4" />
                                            Reduce Motion
                                        </span>
                                        {settings.reducedMotion && <span>✓</span>}
                                    </button>
                                </div>

                                {/* Currency Selector */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                        <Coins className="w-4 h-4" />
                                        Currency
                                    </label>
                                    <select
                                        value={selectedCurrency.code}
                                        onChange={(e) => {
                                            const currency = CURRENCIES.find(c => c.code === e.target.value);
                                            if (currency) setSelectedCurrency(currency);
                                        }}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium border-0 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    >
                                        {CURRENCIES.map((currency) => (
                                            <option key={currency.code} value={currency.code}>
                                                {currency.symbol} {currency.code} - {currency.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Reset Button */}
                                <button
                                    onClick={resetAll}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-medium transition"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Reset All
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Floating Buttons */}
            <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
                {/* Accessibility Button */}
                <motion.button
                    onClick={() => setShowMenu(!showMenu)}
                    className={`relative w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow group overflow-visible ${showMenu
                        ? 'bg-gradient-to-br from-indigo-600 to-purple-700'
                        : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                        }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={isDividing ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    aria-label="Accessibility Options"
                    aria-expanded={showMenu}
                >
                    {/* Pulsing ring during division */}
                    <AnimatePresence>
                        {isDividing && (
                            <motion.div
                                initial={{ scale: 1, opacity: 0.6 }}
                                animate={{ scale: 2.5, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="absolute inset-0 border-4 border-blue-400 rounded-full"
                            />
                        )}
                    </AnimatePresence>

                    {/* Cell Division Animation */}
                    <AnimatePresence>
                        {isDividing && (
                            <>
                                <motion.div
                                    initial={{ scale: 1, x: 0, y: 0, rotate: 0 }}
                                    animate={{
                                        scale: [1, 0.8, 1],
                                        x: 0,
                                        y: 68,
                                        rotate: [0, 180, 360],
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 1,
                                        ease: [0.34, 1.56, 0.64, 1],
                                        scale: { times: [0, 0.5, 1] }
                                    }}
                                    className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-lg"
                                    style={{ zIndex: 1 }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 0.8, 0] }}
                                        transition={{ duration: 1, times: [0, 0.5, 1] }}
                                        className="absolute inset-0 bg-emerald-400 blur-md rounded-full"
                                    />
                                    <div className="flex items-center justify-center w-full h-full relative z-10">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                            transition={{ delay: 0.5, duration: 0.4, ease: "backOut" }}
                                        >
                                            <ArrowUp className="w-6 h-6 text-white" />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Icon */}
                    <motion.div
                        className="relative z-10 flex items-center justify-center w-full h-full"
                        animate={isDividing ? { scale: [1, 0.9, 1], opacity: [1, 0.7, 1] } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <Accessibility className="w-6 h-6 text-white" />
                    </motion.div>

                    {/* Tooltip */}
                    <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Accessibility
                    </span>
                </motion.button>

                {/* Scroll to Top Button */}
                <AnimatePresence>
                    {showScrollTop && (
                        <motion.button
                            initial={{ scale: 1, opacity: 1 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{
                                scale: 0,
                                opacity: 0,
                                transition: { duration: 0.3, ease: "easeIn" }
                            }}
                            onClick={scrollToTop}
                            className="relative w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-lg hover:shadow-2xl transition-all group"
                            whileHover={{
                                scale: 1.15,
                                boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.3), 0 10px 10px -5px rgba(16, 185, 129, 0.2)"
                            }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Scroll to top"
                        >
                            <motion.div
                                className="absolute inset-0 bg-emerald-400 blur-md rounded-full opacity-0 group-hover:opacity-50 transition-opacity"
                            />
                            <div className="flex items-center justify-center w-full h-full relative z-10">
                                <motion.div
                                    animate={{ y: [0, -2, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <ArrowUp className="w-6 h-6 text-white" />
                                </motion.div>
                            </div>
                            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                Back to Top
                            </span>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default FloatingAccessibility;
