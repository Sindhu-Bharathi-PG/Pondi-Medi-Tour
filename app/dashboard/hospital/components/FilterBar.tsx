"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Filter, Search, X } from 'lucide-react';
import { useState } from 'react';

export interface FilterConfig {
    search?: string;
    status?: string;
    priority?: string;
    dateRange?: { start: Date | null; end: Date | null };
    treatmentType?: string;
    country?: string;
    [key: string]: any;
}

interface FilterOption {
    value: string;
    label: string;
}

interface FilterBarProps {
    onFilterChange: (filters: FilterConfig) => void;
    statusOptions?: FilterOption[];
    priorityOptions?: FilterOption[];
    treatmentOptions?: FilterOption[];
    showDateRange?: boolean;
    showCountry?: boolean;
}

export default function FilterBar({
    onFilterChange,
    statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'responded', label: 'Responded' },
        { value: 'closed', label: 'Closed' },
    ],
    priorityOptions = [
        { value: 'all', label: 'All Priority' },
        { value: 'urgent', label: 'Urgent' },
        { value: 'high', label: 'High' },
        { value: 'normal', label: 'Normal' },
        { value: 'low', label: 'Low' },
    ],
    treatmentOptions = [],
    showDateRange = true,
    showCountry = false,
}: FilterBarProps) {
    const [filters, setFilters] = useState<FilterConfig>({
        search: '',
        status: 'all',
        priority: 'all',
        dateRange: { start: null, end: null },
        treatmentType: 'all',
        country: '',
    });

    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleFilterChange = (key: string, value: any) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const clearedFilters: FilterConfig = {
            search: '',
            status: 'all',
            priority: 'all',
            dateRange: { start: null, end: null },
            treatmentType: 'all',
            country: '',
        };
        setFilters(clearedFilters);
        onFilterChange(clearedFilters);
    };

    const getActiveFilterCount = () => {
        let count = 0;
        if (filters.search) count++;
        if (filters.status && filters.status !== 'all') count++;
        if (filters.priority && filters.priority !== 'all') count++;
        if (filters.dateRange?.start || filters.dateRange?.end) count++;
        if (filters.treatmentType && filters.treatmentType !== 'all') count++;
        if (filters.country) count++;
        return count;
    };

    const activeCount = getActiveFilterCount();

    return (
        <div className="space-y-4">
            {/* Main Filter Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-3 items-center">
                    {/* Search */}
                    <div className="flex-1 min-w-[250px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or keywords..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {/* Priority Filter */}
                    <select
                        value={filters.priority}
                        onChange={(e) => handleFilterChange('priority', e.target.value)}
                        className="px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    >
                        {priorityOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {/* Advanced Filters Toggle */}
                    <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${showAdvanced
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                    >
                        <Filter className="w-4 h-4" />
                        <span className="hidden sm:inline">Filters</span>
                        {activeCount > 0 && (
                            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold">
                                {activeCount}
                            </span>
                        )}
                        <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Clear Filters */}
                    {activeCount > 0 && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 font-medium transition-all"
                        >
                            <X className="w-4 h-4" />
                            <span className="hidden sm:inline">Clear All</span>
                        </button>
                    )}
                </div>

                {/* Advanced Filters Panel */}
                <AnimatePresence>
                    {showAdvanced && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                {/* Date Range */}
                                {showDateRange && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Date Range
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="date"
                                                className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                onChange={(e) =>
                                                    handleFilterChange('dateRange', {
                                                        ...filters.dateRange,
                                                        start: e.target.value ? new Date(e.target.value) : null,
                                                    })
                                                }
                                            />
                                            <input
                                                type="date"
                                                className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                onChange={(e) =>
                                                    handleFilterChange('dateRange', {
                                                        ...filters.dateRange,
                                                        end: e.target.value ? new Date(e.target.value) : null,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Treatment Type */}
                                {treatmentOptions.length > 0 && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Treatment Type
                                        </label>
                                        <select
                                            value={filters.treatmentType}
                                            onChange={(e) => handleFilterChange('treatmentType', e.target.value)}
                                            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="all">All Treatments</option>
                                            {treatmentOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Country */}
                                {showCountry && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter country..."
                                            value={filters.country}
                                            onChange={(e) => handleFilterChange('country', e.target.value)}
                                            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 dark:placeholder-gray-400"
                                        />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Active Filter Chips */}
            {activeCount > 0 && (
                <div className="flex flex-wrap gap-2">
                    {filters.search && (
                        <FilterChip
                            label={`Search: "${filters.search}"`}
                            onRemove={() => handleFilterChange('search', '')}
                        />
                    )}
                    {filters.status && filters.status !== 'all' && (
                        <FilterChip
                            label={`Status: ${statusOptions.find((o) => o.value === filters.status)?.label}`}
                            onRemove={() => handleFilterChange('status', 'all')}
                        />
                    )}
                    {filters.priority && filters.priority !== 'all' && (
                        <FilterChip
                            label={`Priority: ${priorityOptions.find((o) => o.value === filters.priority)?.label}`}
                            onRemove={() => handleFilterChange('priority', 'all')}
                        />
                    )}
                    {filters.treatmentType && filters.treatmentType !== 'all' && (
                        <FilterChip
                            label={`Treatment: ${treatmentOptions.find((o) => o.value === filters.treatmentType)?.label}`}
                            onRemove={() => handleFilterChange('treatmentType', 'all')}
                        />
                    )}
                    {filters.country && (
                        <FilterChip
                            label={`Country: ${filters.country}`}
                            onRemove={() => handleFilterChange('country', '')}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
        >
            <span>{label}</span>
            <button
                onClick={onRemove}
                className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 transition-colors"
            >
                <X className="w-3.5 h-3.5" />
            </button>
        </motion.div>
    );
}
