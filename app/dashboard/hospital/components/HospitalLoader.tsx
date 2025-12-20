"use client";

import { Building2 } from "lucide-react";

interface HospitalLoaderProps {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function HospitalLoader({ message = "Loading...", size = 'md' }: HospitalLoaderProps) {
    const sizes = {
        sm: { logo: 'w-8 h-8', spinner: 'w-12 h-12', text: 'text-sm' },
        md: { logo: 'w-12 h-12', spinner: 'w-16 h-16', text: 'text-base' },
        lg: { logo: 'w-16 h-16', spinner: 'w-20 h-20', text: 'text-lg' }
    };

    const s = sizes[size];

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="relative">
                {/* Spinning ring */}
                <div className={`${s.spinner} border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin`}></div>

                {/* Hospital logo in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg p-2 shadow-lg">
                        <Building2 className={`${s.logo} text-white`} />
                    </div>
                </div>
            </div>

            <p className={`mt-4 ${s.text} font-medium text-gray-600 animate-pulse`}>{message}</p>
        </div>
    );
}
