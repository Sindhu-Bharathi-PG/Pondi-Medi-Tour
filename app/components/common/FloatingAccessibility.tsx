"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { Accessibility, ArrowUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const FloatingAccessibility = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isDividing, setIsDividing] = useState(false);
    const hasShownScrollTop = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            const shouldShow = window.scrollY > 300;

            // Trigger division animation when scroll top button should appear for the first time
            if (shouldShow && !hasShownScrollTop.current) {
                setIsDividing(true);
                hasShownScrollTop.current = true;

                // Show scroll button after division animation
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

    const handleAccessibilityClick = () => {
        // You can add accessibility menu/modal logic here
        console.log('Accessibility options clicked');
    };

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
            {/* Accessibility Button */}
            <motion.button
                onClick={handleAccessibilityClick}
                className="relative w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg hover:shadow-xl transition-shadow group overflow-visible"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={isDividing ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
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

                {/* Cell Division Animation - Creates Scroll Button */}
                <AnimatePresence>
                    {isDividing && (
                        <>
                            {/* Cell that becomes the scroll-to-top button */}
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
                                {/* Glow effect */}
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

                            {/* Other dividing cells - disperse with trail effect */}
                            {[
                                { x: -35, y: -35, delay: 0 },
                                { x: 35, y: -35, delay: 0.1 },
                                { x: -35, y: 35, delay: 0.2 },
                            ].map((cell, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
                                    animate={{
                                        scale: [1, 0.7, 0.4],
                                        x: [0, cell.x * 0.5, cell.x],
                                        y: [0, cell.y * 0.5, cell.y],
                                        opacity: [1, 0.6, 0],
                                        rotate: [0, 180, 360]
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: cell.delay,
                                        ease: "easeOut"
                                    }}
                                    className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full"
                                >
                                    {/* Particle trail */}
                                    <motion.div
                                        initial={{ scale: 1, opacity: 0.5 }}
                                        animate={{ scale: 1.5, opacity: 0 }}
                                        transition={{ duration: 0.6, delay: cell.delay }}
                                        className="absolute inset-0 bg-blue-300 blur-sm rounded-full"
                                    />
                                </motion.div>
                            ))}
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
                    >
                        {/* Glow on hover */}
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

                        {/* Tooltip */}
                        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Back to Top
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatingAccessibility;
