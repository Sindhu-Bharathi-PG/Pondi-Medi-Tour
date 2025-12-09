"use client";

import React from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '@/app/utils/constants';

interface NavigationProps {
      scrolled?: boolean;
      highContrast?: boolean;
      className?: string;
      variant?: 'default' | 'mobile';
      onLinkClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
      scrolled = false,
      highContrast = false,
      className = '',
      variant = 'default',
      onLinkClick
}) => {
      const getTextColor = () => {
            if (highContrast) return 'text-yellow-400';
            if (scrolled) return 'text-gray-700';
            return 'text-white';
      };

      if (variant === 'mobile') {
            return (
                  <nav className={`flex flex-col gap-4 ${className}`}>
                        {NAV_LINKS.map((link) => (
                              <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={onLinkClick}
                                    className={`font-medium py-2 px-4 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition ${highContrast ? 'text-yellow-400 hover:bg-yellow-400 hover:text-black' : 'text-gray-700'
                                          }`}
                              >
                                    {link.label}
                              </Link>
                        ))}
                        <button
                              className={`mt-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${highContrast
                                          ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                                          : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg'
                                    }`}
                        >
                              Get Free Quote
                        </button>
                  </nav>
            );
      }

      return (
            <nav className={`hidden md:flex items-center gap-8 ${className}`}>
                  {NAV_LINKS.map((link) => (
                        <Link
                              key={link.href}
                              href={link.href}
                              className={`font-medium hover:text-emerald-600 transition ${getTextColor()}`}
                        >
                              {link.label}
                        </Link>
                  ))}
                  <button
                        className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${highContrast
                                    ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                                    : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:scale-105'
                              }`}
                  >
                        Get Free Quote
                  </button>
            </nav>
      );
};

export default Navigation;
