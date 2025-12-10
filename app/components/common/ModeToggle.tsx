"use client";

import React from 'react';
import { Heart, Sparkles, Leaf, Stethoscope } from 'lucide-react';
import { useSiteMode } from '@/app/context/SiteModeContext';

const ModeToggle: React.FC = () => {
      const { mode, toggleMode, isMedical, isWellness } = useSiteMode();

      return (
            <div className="relative">
                  {/* Toggle Container */}
                  <button
                        onClick={toggleMode}
                        className="relative flex items-center gap-1 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 shadow-inner"
                        aria-label={`Switch to ${isMedical ? 'Wellness' : 'Medical'} mode`}
                        aria-pressed={isMedical}
                  >
                        {/* Medical Option */}
                        <div
                              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isMedical
                                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                                          : 'text-gray-500 hover:text-gray-700'
                                    }`}
                        >
                              <Stethoscope className="w-4 h-4" />
                              <span className="text-sm font-semibold hidden sm:inline">Medical</span>
                        </div>

                        {/* Wellness Option */}
                        <div
                              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isWellness
                                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                                          : 'text-gray-500 hover:text-gray-700'
                                    }`}
                        >
                              <Leaf className="w-4 h-4" />
                              <span className="text-sm font-semibold hidden sm:inline">Wellness</span>
                        </div>
                  </button>

                  {/* Floating Indicator */}
                  <div
                        className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap transition-all duration-300 ${isMedical ? 'text-emerald-600' : 'text-amber-600'
                              }`}
                  >
                        {isMedical ? '🏥 Medical Tourism Mode' : '🌿 Wellness & AYUSH Mode'}
                  </div>
            </div>
      );
};

// Compact version for mobile
export const ModeToggleCompact: React.FC = () => {
      const { mode, toggleMode, isMedical } = useSiteMode();

      return (
            <button
                  onClick={toggleMode}
                  className={`relative w-16 h-8 rounded-full transition-all duration-300 ${isMedical
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                              : 'bg-gradient-to-r from-amber-500 to-orange-500'
                        }`}
                  aria-label="Toggle site mode"
                  aria-pressed={isMedical}
            >
                  {/* Slider */}
                  <div
                        className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${isMedical ? 'left-1' : 'left-9'
                              }`}
                  >
                        {isMedical ? (
                              <Stethoscope className="w-3 h-3 text-emerald-600" />
                        ) : (
                              <Leaf className="w-3 h-3 text-amber-600" />
                        )}
                  </div>
            </button>
      );
};

export default ModeToggle;
