"use client";

import { CONTACT_INFO } from '@/app/utils/constants';
import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
      const currentYear = new Date().getFullYear();

      return (
            <footer className="bg-gray-900 text-gray-300 py-16">
                  <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-4 gap-8 mb-8">
                              {/* Brand */}
                              <div>
                                    <h3 className="text-white text-xl font-bold mb-4">
                                          Pondicherry Medical Journeys
                                    </h3>
                                    <p className="text-sm leading-relaxed">
                                          Transforming healthcare through world-class medical expertise and serene coastal healing.
                                    </p>
                              </div>

                              {/* Popular Treatments */}
                              <div>
                                    <h4 className="text-white font-semibold mb-4">Popular Treatments</h4>
                                    <ul className="space-y-2 text-sm">
                                          <li>
                                                <Link href="/services/orthopedics" className="hover:text-emerald-400 transition">
                                                      Orthopedics
                                                </Link>
                                          </li>
                                          <li>
                                                <Link href="/services/ivf" className="hover:text-emerald-400 transition">
                                                      IVF & Fertility
                                                </Link>
                                          </li>
                                          <li>
                                                <Link href="/services/dental" className="hover:text-emerald-400 transition">
                                                      Dental Care
                                                </Link>
                                          </li>
                                          <li>
                                                <Link href="/services/gastroenterology" className="hover:text-emerald-400 transition">
                                                      Gastroenterology
                                                </Link>
                                          </li>
                                          <li>
                                                <Link href="/services/eye" className="hover:text-emerald-400 transition">
                                                      Eye Surgery
                                                </Link>
                                          </li>
                                    </ul>
                              </div>

                              {/* Plan Your Trip */}
                              <div>
                                    <h4 className="text-white font-semibold mb-4">Plan Your Trip</h4>
                                    <ul className="space-y-2 text-sm">
                                          <li>
                                                <Link href="/about" className="hover:text-emerald-400 transition">
                                                      How It Works
                                                </Link>
                                          </li>
                                          <li>
                                                <Link href="/visa" className="hover:text-emerald-400 transition">
                                                      Visa Information
                                                </Link>
                                          </li>
                                          <li>
                                                <Link href="/testimonials" className="hover:text-emerald-400 transition">
                                                      Patient Stories
                                                </Link>
                                          </li>
                                          <li>
                                                <Link href="/wellness" className="hover:text-emerald-400 transition">
                                                      Wellness Partners
                                                </Link>
                                          </li>
                                          <li>
                                                <Link href="/login/partner" className="hover:text-emerald-400 transition font-semibold">
                                                      Partner Login
                                                </Link>
                                          </li>
                                    </ul>
                              </div>

                              {/* Contact Us */}
                              <div>
                                    <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                                    <ul className="space-y-3 text-sm">
                                          <li className="flex items-start gap-2">
                                                <MapPin className="w-4 h-4 mt-1 shrink-0" />
                                                <span>{CONTACT_INFO.location}</span>
                                          </li>
                                          <li className="flex items-start gap-2">
                                                <Phone className="w-4 h-4 mt-1 shrink-0" />
                                                <span>24/7: {CONTACT_INFO.phone}</span>
                                          </li>
                                          <li className="flex items-start gap-2">
                                                <Mail className="w-4 h-4 mt-1 shrink-0" />
                                                <span>{CONTACT_INFO.email}</span>
                                          </li>
                                    </ul>
                              </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="border-t border-gray-800 pt-8 text-center text-sm">
                              <p>
                                    © {currentYear} Pondicherry Medical Journeys. All rights reserved. |{' '}
                                    <Link href="/privacy-policy" className="hover:text-emerald-400 transition">
                                          Privacy Policy
                                    </Link>{' '}
                                    |{' '}
                                    <Link href="/terms-of-service" className="hover:text-emerald-400 transition">
                                          Terms of Use
                                    </Link>
                              </p>
                        </div>
                  </div>
            </footer>
      );
};

export default Footer;
