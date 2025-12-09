"use client";

import React, { Dispatch, SetStateAction } from 'react';
import { X } from 'lucide-react';

type FontSize = 'normal' | 'large' | 'xlarge';

interface AccessibilityMenuProps {
      fontSize: FontSize;
      setFontSize: Dispatch<SetStateAction<FontSize>>;
      highContrast: boolean;
      setHighContrast: Dispatch<SetStateAction<boolean>>;
      showAccessibilityMenu: boolean;
      setShowAccessibilityMenu: Dispatch<SetStateAction<boolean>>;
}

const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({
      fontSize,
      setFontSize,
      highContrast,
      setHighContrast,
      showAccessibilityMenu,
      setShowAccessibilityMenu,
}) => {
      return (
            <>
                  {/* Accessibility Floating Button */}
                  <button
                        onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
                        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 bg-blue-600 text-white p-3 rounded-full shadow-2xl hover:bg-blue-700 transition-all hover:scale-110"
                        aria-label="Accessibility Options"
                        title="Accessibility Options"
                  >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                        </svg>
                  </button>

                  {/* Accessibility Menu */}
                  {showAccessibilityMenu && (
                        <div className="fixed left-4 top-1/2 transform -translate-y-1/2 translate-x-16 z-50 bg-white shadow-2xl rounded-2xl p-6 w-72 border-2 border-blue-600">
                              <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                                    </svg>
                                    Accessibility
                              </h3>

                              <div className="space-y-4">
                                    <div>
                                          <label className="block text-sm font-semibold mb-2 text-gray-700">Text Size</label>
                                          <div className="flex gap-2">
                                                <button
                                                      onClick={() => setFontSize('normal')}
                                                      className={`flex-1 px-3 py-2 rounded-lg font-medium transition ${fontSize === 'normal' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                                      aria-pressed={fontSize === 'normal'}
                                                >
                                                      A
                                                </button>
                                                <button
                                                      onClick={() => setFontSize('large')}
                                                      className={`flex-1 px-3 py-2 rounded-lg font-medium text-lg transition ${fontSize === 'large' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                                      aria-pressed={fontSize === 'large'}
                                                >
                                                      A
                                                </button>
                                                <button
                                                      onClick={() => setFontSize('xlarge')}
                                                      className={`flex-1 px-3 py-2 rounded-lg font-medium text-xl transition ${fontSize === 'xlarge' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                                      aria-pressed={fontSize === 'xlarge'}
                                                >
                                                      A
                                                </button>
                                          </div>
                                    </div>

                                    <div>
                                          <button
                                                onClick={() => setHighContrast(!highContrast)}
                                                className={`w-full px-4 py-3 rounded-lg font-semibold transition ${highContrast ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                                aria-pressed={highContrast}
                                          >
                                                {highContrast ? '✓ High Contrast On' : 'High Contrast'}
                                          </button>
                                    </div>

                                    <div>
                                          <button
                                                onClick={() => {
                                                      setFontSize('normal');
                                                      setHighContrast(false);
                                                }}
                                                className="w-full px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 font-medium transition"
                                          >
                                                Reset All
                                          </button>
                                    </div>
                              </div>

                              <button
                                    onClick={() => setShowAccessibilityMenu(false)}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                                    aria-label="Close accessibility menu"
                              >
                                    <X className="w-5 h-5" />
                              </button>
                        </div>
                  )}
            </>
      );
};

export default AccessibilityMenu;
