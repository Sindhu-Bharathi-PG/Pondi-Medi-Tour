"use client";

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SearchBarProps {
    mode?: 'medical' | 'wellness';
    placeholder?: string;
    onSearch?: (query: string) => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function SearchBar({
    mode = 'medical',
    placeholder,
    onSearch,
    className = '',
    size = 'lg'
}: SearchBarProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            if (onSearch) {
                onSearch(searchQuery.trim());
            } else {
                // Navigate to search page with query
                router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Theme colors based on mode
    const themeColors = mode === 'medical'
        ? {
            iconColor: 'text-emerald-500',
            buttonGradient: 'from-emerald-500 to-teal-500',
            buttonShadow: 'hover:shadow-emerald-500/30',
        }
        : {
            iconColor: 'text-amber-500',
            buttonGradient: 'from-amber-500 to-orange-500',
            buttonShadow: 'hover:shadow-amber-500/30',
        };

    // Default placeholders based on mode
    const defaultPlaceholder = mode === 'medical'
        ? 'Search treatments, hospitals, doctors...'
        : 'Search wellness programs, therapies...';

    // Size-based styling
    const sizeClasses = {
        sm: {
            container: 'px-4 py-2',
            icon: 'w-4 h-4',
            input: 'text-sm',
            button: 'px-4 py-2 text-xs',
        },
        md: {
            container: 'px-5 py-3',
            icon: 'w-5 h-5',
            input: 'text-base',
            button: 'px-5 py-2.5 text-sm',
        },
        lg: {
            container: 'px-6 py-4',
            icon: 'w-6 h-6',
            input: 'text-base md:text-lg',
            button: 'px-6 py-2.5 text-sm',
        },
    };

    const currentSize = sizeClasses[size];

    return (
        <div className={`max-w-2xl ${className}`}>
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className={`relative flex items-center gap-3 bg-white/95 backdrop-blur-xl rounded-2xl ${currentSize.container} shadow-2xl border border-white/20`}>
                    <Search className={`${currentSize.icon} ${themeColors.iconColor} flex-shrink-0`} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder || defaultPlaceholder}
                        className={`flex-1 bg-transparent text-gray-800 placeholder-gray-400 ${currentSize.input} outline-none`}
                    />
                    <button
                        onClick={handleSearch}
                        className={`${currentSize.button} bg-gradient-to-r ${themeColors.buttonGradient} text-white rounded-xl font-semibold hover:shadow-lg ${themeColors.buttonShadow} transition-all duration-300 flex-shrink-0`}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}
