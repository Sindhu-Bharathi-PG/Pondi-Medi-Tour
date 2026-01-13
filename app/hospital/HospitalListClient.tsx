"use client";

import { Hospital } from '@/app/types';
import { Award, Building2, Globe, Stethoscope } from 'lucide-react';
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

    return (
        <>
            {/* Filter Section */}
            <section className="py-8 bg-white border-b border-gray-100 sticky top-0 z-20">
                <div className="container-premium">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {filterOptions.map((filter) => {
                            const IconComponent = iconMap[filter.icon] || Building2;
                            return (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${activeFilter === filter.id
                                            ? 'bg-[var(--medical-teal)] text-white shadow-lg'
                                            : 'bg-gray-100 text-[var(--medical-slate)] hover:bg-gray-200'
                                        }`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    {filter.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Search Bar */}
            <section className="py-6 bg-gray-50">
                <div className="container-premium">
                    <div className="max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search hospitals, specialties, or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-[var(--medical-teal)] focus:outline-none text-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section-premium">
                <div className="container-premium">
                    <HospitalGrid hospitals={filteredHospitals} />
                </div>
            </section>
        </>
    );
}
