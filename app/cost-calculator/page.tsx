"use client";

import React, { useState } from 'react';
import { Calculator, DollarSign, Plane, Building2, Stethoscope, Shield, ChevronRight, TrendingDown, CheckCircle, Globe } from 'lucide-react';
import { Header, Footer } from '../components/common';
import { useScrolled } from '../hooks';

const CostCalculatorPage = () => {
      const scrolled = useScrolled(50);
      const [selectedProcedure, setSelectedProcedure] = useState('');
      const [selectedCountry, setSelectedCountry] = useState('usa');
      const [showResults, setShowResults] = useState(false);

      const procedures = [
            { id: 'knee', name: 'Knee Replacement', pondicherryPrice: 6500, usaPrice: 45000, ukPrice: 18000 },
            { id: 'hip', name: 'Hip Replacement', pondicherryPrice: 7500, usaPrice: 50000, ukPrice: 20000 },
            { id: 'heart', name: 'Heart Bypass', pondicherryPrice: 8000, usaPrice: 120000, ukPrice: 35000 },
            { id: 'ivf', name: 'IVF Treatment', pondicherryPrice: 3500, usaPrice: 15000, ukPrice: 8000 },
            { id: 'cataract', name: 'Cataract Surgery', pondicherryPrice: 2000, usaPrice: 12000, ukPrice: 6000 },
            { id: 'dental', name: 'Dental Implants', pondicherryPrice: 8000, usaPrice: 50000, ukPrice: 25000 },
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
            <div className="min-h-screen bg-gray-50">
                  <Header scrolled={scrolled} />
                  <section className="relative pt-32 pb-20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900" />
                        <div className="relative container mx-auto px-4 text-center text-white">
                              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                                    <TrendingDown className="w-5 h-5 text-green-400" />
                                    <span className="text-sm font-medium">Save 60-80% on Medical Procedures</span>
                              </div>
                              <h1 className="text-5xl md:text-7xl font-bold mb-6">Compare Costs<span className="block text-green-300">See Your Savings</span></h1>
                              <p className="text-xl text-emerald-100 max-w-3xl mx-auto">Calculate the all-inclusive cost of your treatment in Pondicherry.</p>
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
                                                      {procedures.map((proc) => (
                                                            <button key={proc.id} onClick={() => { setSelectedProcedure(proc.id); setShowResults(true); }}
                                                                  className={`p-4 rounded-xl border-2 text-left transition-all ${selectedProcedure === proc.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'}`}>
                                                                  <Stethoscope className={`w-5 h-5 mb-2 ${selectedProcedure === proc.id ? 'text-emerald-600' : 'text-gray-400'}`} />
                                                                  <span className="font-medium">{proc.name}</span>
                                                            </button>
                                                      ))}
                                                </div>
                                          </div>
                                          <div className="mb-8">
                                                <label className="block text-lg font-semibold text-gray-800 mb-4">2. Your Home Country</label>
                                                <div className="flex gap-3">
                                                      {countries.map((country) => (
                                                            <button key={country.id} onClick={() => setSelectedCountry(country.id)}
                                                                  className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 ${selectedCountry === country.id ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                                                                  <span className="text-xl">{country.flag}</span>{country.name}
                                                            </button>
                                                      ))}
                                                </div>
                                          </div>
                                          {showResults && selectedProc && (
                                                <div className="pt-8 border-t">
                                                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                                                            <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-100">
                                                                  <Globe className="w-5 h-5 text-red-600 mb-2" />
                                                                  <div className="text-4xl font-bold text-red-600">${homePrice.toLocaleString()}</div>
                                                                  <p className="text-red-600/70 text-sm">In {countries.find(c => c.id === selectedCountry)?.name}</p>
                                                            </div>
                                                            <div className="bg-emerald-50 rounded-2xl p-6 border-2 border-emerald-200">
                                                                  <Shield className="w-5 h-5 text-emerald-600 mb-2" />
                                                                  <div className="text-4xl font-bold text-emerald-600">${totalPackage.toLocaleString()}</div>
                                                                  <p className="text-emerald-600/70 text-sm">All-Inclusive Pondicherry Package</p>
                                                            </div>
                                                      </div>
                                                      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white text-center mb-8">
                                                            <div className="text-lg mb-2">Your Total Savings</div>
                                                            <div className="text-5xl font-bold mb-2">${savings.toLocaleString()}</div>
                                                            <div className="text-emerald-100">That&apos;s <span className="font-bold text-yellow-300">{savingsPercent}%</span> savings!</div>
                                                      </div>
                                                      <div className="text-center">
                                                            <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-2">
                                                                  Get Detailed Quote<ChevronRight className="w-5 h-5" />
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
