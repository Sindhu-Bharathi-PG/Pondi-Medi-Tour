"use client";

import { Hospital } from '@/app/types';
import { Award, Building2, Globe, Search, Stethoscope, X } from 'lucide-react';
import { useState } from 'react';
import { HospitalGrid } from '../components/hospitals/HospitalGrid';

// Icon map to resolve string names to components
const iconMap: Record<string, any> = {
    Building2,
    Award,
    Globe,
    Stethoscope,
};

interface HospitalListClientProps {
    initialHospitals: Hospital[];
    filterOptions: { id: string; label: string; icon: string }[];
}

export function HospitalListClient({ initialHospitals, filterOptions }: HospitalListClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    // Client-side filtering for instant results
    const filteredHospitals = initialHospitals.filter(h => {
        const matchesFilter = activeFilter === 'all' || h.type === activeFilter;
        const query = searchQuery.toLowerCase();
        const matchesSearch = !query ||
            h.name.toLowerCase().includes(query) ||
            h.specialties?.some((s: string) => s.toLowerCase().includes(query)) ||
            h.location?.toLowerCase().includes(query);
        return matchesFilter && matchesSearch;
    });

    const clearSearch = () => {
        setSearchQuery('');
    };

    return (
        <>
            {/* Search Bar - Full Width Responsive */}
            <section className="py-4 md:py-6 bg-gray-50 sticky top-0 z-30 shadow-sm">
                <div className="container-premium px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search hospitals, specialties, or location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-12 py-3 md:py-4 rounded-xl border-2 border-gray-200 focus:border-[var(--medical-teal)] focus:outline-none focus:ring-2 focus:ring-[var(--medical-teal)]/20 text-base md:text-lg bg-white shadow-sm transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-4 md:py-6 bg-white border-b border-gray-100">
                <div className="container-premium px-4">
                    {/* Filter Buttons - Horizontally scrollable on mobile */}
                    <div className="flex gap-2 md:gap-3 justify-start md:justify-center overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                        {filterOptions.map((filter) => {
                            const IconComponent = iconMap[filter.icon] || Building2;
                            return (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-medium transition-all whitespace-nowrap text-sm md:text-base ${activeFilter === filter.id
                                        ? 'bg-[var(--medical-teal)] text-white shadow-lg'
                                        : 'bg-gray-100 text-[var(--medical-slate)] hover:bg-gray-200'
                                        }`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    <span className="hidden sm:inline">{filter.label}</span>
                                    <span className="sm:hidden">{filter.label.split(' ')[0]}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Results count */}
                    <div className="text-center mt-4 text-sm text-gray-500">
                        {searchQuery || activeFilter !== 'all' ? (
                            <span>
                                Showing <span className="font-semibold text-[var(--medical-teal)]">{filteredHospitals.length}</span>
                                {filteredHospitals.length === 1 ? ' hospital' : ' hospitals'}
                                {searchQuery && <span> for &quot;{searchQuery}&quot;</span>}
                            </span>
                        ) : (
                            <span>
                                <span className="font-semibold text-[var(--medical-teal)]">{filteredHospitals.length}</span> partner hospitals available
                            </span>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section-premium py-8 md:py-12">
                <div className="container-premium px-4">
                    {filteredHospitals.length > 0 ? (
                        <HospitalGrid hospitals={filteredHospitals} />
                    ) : (
                        <div className="text-center py-16">
                            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hospitals found</h3>
                            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                            <button
                                onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                                className="px-6 py-2 bg-[var(--medical-teal)] text-white rounded-xl hover:bg-[var(--medical-dark-teal)] transition-colors"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
