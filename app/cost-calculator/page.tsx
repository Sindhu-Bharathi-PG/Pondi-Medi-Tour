"use client";

import { Calculator, ChevronRight, Globe, Shield, Stethoscope } from 'lucide-react';
import { useState } from 'react';
import { Footer, Header } from '../components/common';
import { ConvertedPrice } from '../components/common/ConvertedPrice';
import { useScrolled } from '../hooks';

const CostCalculatorPage = () => {
      const scrolled = useScrolled(50);
      const [selectedProcedure, setSelectedProcedure] = useState('');
      const [selectedCountry, setSelectedCountry] = useState('usa');
      const [showResults, setShowResults] = useState(false);

      const procedures = [
            { id: 'knee', name: 'Knee Replacement', pondicherryPrice: 6500, usaPrice: 45000, ukPrice: 18000, image: 'https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&w=400&q=80' },
            { id: 'hip', name: 'Hip Replacement', pondicherryPrice: 7500, usaPrice: 50000, ukPrice: 20000, image: 'https://images.unsplash.com/photo-1559757175-9e35f55ce715?auto=format&fit=crop&w=400&q=80' },
            { id: 'heart', name: 'Heart Bypass', pondicherryPrice: 8000, usaPrice: 120000, ukPrice: 35000, image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=400&q=80' },
            { id: 'ivf', name: 'IVF Treatment', pondicherryPrice: 3500, usaPrice: 15000, ukPrice: 8000, image: 'https://images.unsplash.com/photo-1595150993921-6dc7abac54b2?auto=format&fit=crop&w=400&q=80' },
            { id: 'cataract', name: 'Cataract Surgery', pondicherryPrice: 2000, usaPrice: 12000, ukPrice: 6000, image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80' },
            { id: 'dental', name: 'Dental Implants', pondicherryPrice: 8000, usaPrice: 50000, ukPrice: 25000, image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80' },
      ];

      const countries = [
            { id: 'usa', name: 'United States', flag: '🇺🇸' },
            { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
      ];

      const additionalCosts = { flights: 1200, accommodation: 1500, transport: 200, meals: 400 };
      const selectedProc = procedures.find(p => p.id === selectedProcedure);
      const homePrice = selectedProc ? (selectedCountry === 'usa' ? selectedProc.usaPrice : selectedProc.ukPrice) : 0;
      const totalPackage = selectedProc ? selectedProc.pondicherryPrice + 3300 : 0;
      const savings = homePrice - totalPackage;
      const savingsPercent = homePrice > 0 ? Math.round((savings / homePrice) * 100) : 0;

      return (
            <div className="min-h-screen bg-[var(--medical-cream)]">
                  <Header />
                  <section className="relative pt-28 pb-12 md:pt-32 md:pb-16 overflow-hidden hero-premium">
                        <div className="relative container-premium">
                              {/* Breadcrumb */}
                              <nav className="breadcrumb text-white/70 mb-8">
                                    <a href="/">Home</a>
                                    <span className="mx-2">/</span>
                                    <span className="text-white">Cost Calculator</span>
                              </nav>

                              <div className="max-w-4xl">
                                    <div className="gov-seal mb-6">
                                          <span>No Hidden Fees Guarantee</span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                                          Cost Transparency
                                          <span className="block text-[#bf9b30]">Calculator</span>
                                    </h1>
                                    <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                                          Get accurate cost estimates for your treatment. We account for hospital stay, medications, and post-op care—complete transparency.
                                    </p>
                              </div>
                        </div>
                  </section>

                  <section className="py-16 -mt-8 relative z-10">
                        <div className="container mx-auto px-4 max-w-5xl">
                              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                                          <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center"><Calculator className="w-8 h-8" /></div>
                                                <div><h2 className="text-2xl font-bold">Medical Cost Calculator</h2><p className="text-emerald-100">All-inclusive package comparison</p></div>
                                          </div>
                                    </div>
                                    <div className="p-8">
                                          <div className="mb-8">
                                                <label className="block text-lg font-semibold text-gray-800 mb-4">1. Select Your Procedure</label>
                                                <div className="grid md:grid-cols-3 gap-3">
                                                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                            {procedures.map((proc) => (
                                                                  <button key={proc.id} onClick={() => { setSelectedProcedure(proc.id); setShowResults(true); }}
                                                                        className={`group relative overflow-hidden rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg ${selectedProcedure === proc.id ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-gray-100 hover:border-emerald-300'}`}>
                                                                        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity ${selectedProcedure === proc.id ? 'opacity-90' : 'opacity-70 group-hover:opacity-80'}`} />
                                                                        <img src={proc.image} alt={proc.name} className="absolute inset-0 w-full h-full object-cover -z-10 group-hover:scale-110 transition-transform duration-500" />
                                                                        <div className="relative p-5 h-32 flex flex-col justify-end">
                                                                              <div className={`flex items-center gap-2 ${selectedProcedure === proc.id ? 'text-emerald-300' : 'text-white/90'}`}>
                                                                                    <Stethoscope className="w-5 h-5" />
                                                                                    <span className="font-bold text-lg leading-tight text-white">{proc.name}</span>
                                                                              </div>
                                                                              {selectedProcedure === proc.id && (
                                                                                    <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">Selected</div>
                                                                              )}
                                                                        </div>
                                                                  </button>
                                                            ))}
                                                      </div>
                                                </div>
                                          </div>
                                          <div className="mb-8">
                                                <label className="block text-lg font-semibold text-gray-800 mb-4">2. Your Home Country</label>
                                                <div className="flex gap-3">
                                                      {countries.map((country) => (
                                                            <button key={country.id} onClick={() => setSelectedCountry(country.id)}
                                                                  className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 ${selectedCountry === country.id ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                                                                  <span className="text-xl">{country.flag}</span>{country.name}
                                                            </button>
                                                      ))}
                                                </div>
                                          </div>
                                          {showResults && selectedProc && (
                                                <div className="pt-8 border-t border-gray-100">
                                                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                                                            <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-100 shadow-sm">
                                                                  <Globe className="w-5 h-5 text-red-600 mb-2" />
                                                                  <div className="text-4xl font-bold text-red-700">
                                                                        <ConvertedPrice amount={homePrice} fromCurrency="USD" className="text-red-700" />
                                                                  </div>
                                                                  <p className="text-red-600/80 text-sm font-medium mt-1">In {countries.find(c => c.id === selectedCountry)?.name}</p>
                                                            </div>
                                                            <div className="bg-emerald-50 rounded-2xl p-6 border-2 border-emerald-200 shadow-sm">
                                                                  <Shield className="w-5 h-5 text-emerald-600 mb-2" />
                                                                  <div className="text-4xl font-bold text-emerald-700">
                                                                        <ConvertedPrice amount={totalPackage} fromCurrency="USD" className="text-emerald-700" />
                                                                  </div>
                                                                  <p className="text-emerald-600/80 text-sm font-medium mt-1">All-Inclusive Pondicherry Package</p>
                                                            </div>
                                                      </div>
                                                      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-10 text-white text-center mb-8 shadow-xl">
                                                            <div className="text-xl font-medium mb-3 text-emerald-50">Your Total Savings</div>
                                                            <div className="text-6xl font-black mb-4 tracking-tight drop-shadow-md">
                                                                  <ConvertedPrice amount={savings} fromCurrency="USD" className="text-white" />
                                                            </div>
                                                            <div className="text-emerald-50 text-lg">That&apos;s <span className="font-bold text-yellow-300 underline decoration-2 underline-offset-4">{savingsPercent}%</span> savings!</div>
                                                      </div>
                                                      <div className="text-center">
                                                            <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-12 py-5 rounded-full font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3 shadow-lg">
                                                                  Get Detailed Quote<ChevronRight className="w-6 h-6" />
                                                            </button>
                                                      </div>
                                                </div>
                                          )}
                                    </div>
                              </div>
                        </div>
                  </section>
                  <Footer />
            </div>
      );
};

export default CostCalculatorPage;
