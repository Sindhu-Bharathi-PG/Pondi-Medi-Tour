"use client";

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Hospital {
    id: number;
    name: string;
    slug: string;
    type: string;
    specialties: string[];
    location: string;
    [key: string]: any;
}

interface HospitalFilterProps {
    hospitals: Hospital[];
    onFilterChange: (filtered: Hospital[]) => void;
    filterOptions: { id: string; label: string; icon: any }[];
}

export function HospitalFilter({ hospitals, onFilterChange, filterOptions }: HospitalFilterProps) {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const resultsRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to results when search/filter changes
    useEffect(() => {
        if ((searchQuery || activeFilter !== 'all') && resultsRef.current) {
            setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [searchQuery, activeFilter]);

    // Filter logic
    useEffect(() => {
        const filtered = hospitals.filter(h => {
            const matchesFilter = activeFilter === 'all' || h.type === activeFilter;
            const query = searchQuery.toLowerCase();
            const matchesSearch = !query ||
                h.name.toLowerCase().includes(query) ||
                h.specialties?.some(s => s.toLowerCase().includes(query)) ||
                h.location?.toLowerCase().includes(query);
            return matchesFilter && matchesSearch;
        });
        onFilterChange(filtered);
    }, [activeFilter, searchQuery, hospitals, onFilterChange]);

    return (
        <>
            {/* Search Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-xl"
            >
                <div className="flex items-center bg-white rounded-xl shadow-2xl overflow-hidden">
                    <Search className="w-5 h-5 text-gray-400 ml-4" />
                    <input
                        type="text"
                        placeholder="Search hospitals or specialties..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-4 py-4 text-gray-800 focus:outline-none"
                    />
                    <button className="bg-[var(--medical-teal)] text-white px-6 py-4 font-semibold hover:bg-[var(--medical-dark-teal)] transition-all">
                        Search
                    </button>
                </div>
            </motion.div>

            {/* Filter Section */}
            <section className="py-8 bg-white border-b border-gray-100 sticky top-0 z-20">
                <div className="container-premium">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {filterOptions.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${activeFilter === filter.id
                                        ? 'bg-[var(--medical-teal)] text-white shadow-lg'
                                        : 'bg-gray-100 text-[var(--medical-slate)] hover:bg-gray-200'
                                    }`}
                            >
                                <filter.icon className="w-4 h-4" />
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
