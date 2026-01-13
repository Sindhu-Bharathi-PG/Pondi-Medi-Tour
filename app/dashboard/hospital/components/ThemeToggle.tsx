"use client";

import { useTheme } from '@/app/context/ThemeContext';
import { motion } from 'framer-motion';
import { Monitor, Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
    const { theme, setTheme, effectiveTheme } = useTheme();

    const themes = [
        { value: 'light' as const, icon: Sun, label: 'Light' },
        { value: 'dark' as const, icon: Moon, label: 'Dark' },
        { value: 'system' as const, icon: Monitor, label: 'System' },
    ];

    return (
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {themes.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={`
            relative px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
            ${theme === value
                            ? 'text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                        }
          `}
                    title={label}
                >
                    {theme === value && (
                        <motion.div
                            layout
                            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                        />
                    )}
                    <Icon className="w-4 h-4 relative z-10" />
                </button>
            ))}
        </div>
    );
}
