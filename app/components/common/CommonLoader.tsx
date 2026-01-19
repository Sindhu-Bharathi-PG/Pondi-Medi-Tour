"use client";

import { Building2, Heart, Loader2 } from 'lucide-react';

interface CommonLoaderProps {
    variant?: 'spinner' | 'pulse' | 'medical' | 'skeleton' | 'dots';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    message?: string;
    className?: string;
    fullScreen?: boolean;
}

/**
 * Common Loader Component
 * A versatile, modern loading component with multiple variants
 */
export default function CommonLoader({
    variant = 'medical',
    size = 'md',
    message,
    className = '',
    fullScreen = false
}: CommonLoaderProps) {
    const sizes = {
        sm: { icon: 'w-4 h-4', container: 'w-8 h-8', text: 'text-xs' },
        md: { icon: 'w-6 h-6', container: 'w-12 h-12', text: 'text-sm' },
        lg: { icon: 'w-8 h-8', container: 'w-16 h-16', text: 'text-base' },
        xl: { icon: 'w-12 h-12', container: 'w-24 h-24', text: 'text-lg' }
    };

    const s = sizes[size];

    const wrapperClass = fullScreen
        ? 'fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center'
        : `flex flex-col items-center justify-center py-8 ${className}`;

    const renderLoader = () => {
        switch (variant) {
            case 'spinner':
                return (
                    <div className={`${s.container} relative`}>
                        <div className={`${s.container} border-4 border-gray-200 border-t-emerald-500 rounded-full animate-spin`} />
                    </div>
                );

            case 'pulse':
                return (
                    <div className="flex items-center gap-2">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} bg-emerald-500 rounded-full animate-pulse`}
                                style={{ animationDelay: `${i * 0.2}s` }}
                            />
                        ))}
                    </div>
                );

            case 'medical':
                return (
                    <div className="relative">
                        {/* Outer spinning ring */}
                        <div className={`${s.container} border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin`} />

                        {/* Inner content */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg p-1.5 shadow-lg animate-pulse">
                                <Building2 className={`${s.icon} text-white`} />
                            </div>
                        </div>
                    </div>
                );

            case 'dots':
                return (
                    <div className="flex items-center gap-1.5">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className={`${size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : 'w-2.5 h-2.5'} bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full`}
                                style={{
                                    animation: 'bounce 1s infinite',
                                    animationDelay: `${i * 0.1}s`
                                }}
                            />
                        ))}
                    </div>
                );

            default:
                return <Loader2 className={`${s.icon} text-emerald-500 animate-spin`} />;
        }
    };

    return (
        <div className={wrapperClass}>
            {renderLoader()}
            {message && (
                <p className={`mt-4 ${s.text} font-medium text-gray-600 animate-pulse`}>
                    {message}
                </p>
            )}

            <style jsx>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); opacity: 1; }
                    50% { transform: translateY(-8px); opacity: 0.5; }
                }
            `}</style>
        </div>
    );
}

/**
 * Skeleton Loader for content placeholders
 */
export function SkeletonLoader({ className = '' }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg ${className}`}
            style={{ backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }}>
            <style jsx>{`
                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
        </div>
    );
}

/**
 * Skeleton Card for dashboard cards
 */
export function SkeletonCard() {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
            </div>
        </div>
    );
}

/**
 * Skeleton Stats Card
 */
export function SkeletonStatCard() {
    return (
        <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl p-5 animate-pulse">
            <div className="w-12 h-12 bg-white/20 rounded-xl mb-4" />
            <div className="h-4 bg-white/20 rounded w-2/3 mb-2" />
            <div className="h-8 bg-white/20 rounded w-1/2" />
        </div>
    );
}

/**
 * Skeleton Table Row
 */
export function SkeletonTableRow() {
    return (
        <div className="px-6 py-4 flex items-center gap-4 animate-pulse">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
            <div className="h-6 bg-gray-200 rounded w-16" />
        </div>
    );
}

/**
 * Dashboard Loading State - Full dashboard skeleton
 */
export function DashboardSkeleton() {
    return (
        <div className="space-y-6 p-6 animate-pulse">
            {/* Header skeleton */}
            <div className="bg-gray-200 rounded-2xl h-40" />

            {/* Stats grid skeleton */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <SkeletonStatCard key={i} />
                ))}
            </div>

            {/* Content grid skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/4" />
                    {[1, 2, 3].map((i) => (
                        <SkeletonTableRow key={i} />
                    ))}
                </div>
                <div className="bg-white rounded-2xl p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/3" />
                    {[1, 2, 3, 4].map((i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}

/**
 * Page Loader - For full page transitions
 */
export function PageLoader({ message = 'Loading...' }: { message?: string }) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="relative mb-6">
                {/* Pulsing ring */}
                <div className="w-20 h-20 border-4 border-emerald-100 rounded-full animate-ping absolute" />

                {/* Spinning ring */}
                <div className="w-20 h-20 border-4 border-transparent border-t-emerald-500 border-r-teal-500 rounded-full animate-spin" />

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-xl p-2 shadow-lg">
                        <Heart className="w-8 h-8 text-white animate-pulse" />
                    </div>
                </div>
            </div>

            <p className="text-lg font-medium text-gray-700">{message}</p>
            <p className="text-sm text-gray-500 mt-1">Please wait a moment</p>
        </div>
    );
}

/**
 * Package Card Skeleton - For package listings
 */
export function PackageCardSkeleton() {
    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl animate-pulse">
            {/* Image placeholder */}
            <div className="h-52 bg-gradient-to-br from-gray-200 to-gray-300" />

            {/* Body */}
            <div className="p-6">
                {/* Price row */}
                <div className="flex items-center justify-between mb-5 pb-5 border-b border-gray-100">
                    <div>
                        <div className="h-3 bg-gray-200 rounded w-12 mb-2" />
                        <div className="h-8 bg-gray-300 rounded w-24" />
                    </div>
                    <div className="flex gap-1.5">
                        <div className="h-6 bg-gray-200 rounded-full w-16" />
                        <div className="h-6 bg-gray-200 rounded-full w-12" />
                    </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-gray-200 rounded-full" />
                            <div className="h-3 bg-gray-200 rounded flex-1" style={{ width: `${60 + Math.random() * 30}%` }} />
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="h-14 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl" />
            </div>
        </div>
    );
}

/**
 * Hospital Card Skeleton - For hospital listings
 */
export function HospitalCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
            {/* Image */}
            <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300" />

            {/* Content */}
            <div className="p-5">
                <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
                    <div className="flex-1">
                        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                </div>

                {/* Stats */}
                <div className="flex gap-4 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-16" />
                    <div className="h-4 bg-gray-200 rounded w-20" />
                    <div className="h-4 bg-gray-200 rounded w-12" />
                </div>

                {/* Specialties */}
                <div className="flex gap-2 mb-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-6 bg-gray-100 rounded-full w-20" />
                    ))}
                </div>

                {/* Button */}
                <div className="h-10 bg-gray-200 rounded-xl" />
            </div>
        </div>
    );
}

/**
 * Treatment Card Skeleton - For treatment listings
 */
export function TreatmentCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
            {/* Icon and title */}
            <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl" />
                <div className="flex-1">
                    <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
            </div>

            {/* Stats row */}
            <div className="flex justify-between pt-4 border-t border-gray-100">
                <div className="h-4 bg-gray-200 rounded w-20" />
                <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
        </div>
    );
}

/**
 * Inquiry Card Skeleton - For inquiry listings
 */
export function InquiryCardSkeleton() {
    return (
        <div className="grid grid-cols-12 gap-4 px-6 py-4 animate-pulse">
            <div className="col-span-4">
                <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="col-span-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
            <div className="col-span-2">
                <div className="h-6 bg-gray-200 rounded-full w-20" />
            </div>
            <div className="col-span-2">
                <div className="h-6 bg-gray-200 rounded-full w-16" />
            </div>
            <div className="col-span-2">
                <div className="h-4 bg-gray-200 rounded w-12" />
            </div>
        </div>
    );
}

/**
 * Card Grid Skeleton - For loading grids of cards
 */
export function CardGridSkeleton({
    count = 6,
    type = 'package'
}: {
    count?: number;
    type?: 'package' | 'hospital' | 'treatment' | 'inquiry'
}) {
    const SkeletonComponent = {
        package: PackageCardSkeleton,
        hospital: HospitalCardSkeleton,
        treatment: TreatmentCardSkeleton,
        inquiry: InquiryCardSkeleton
    }[type];

    if (type === 'inquiry') {
        return (
            <div className="divide-y divide-gray-100">
                {Array.from({ length: count }).map((_, i) => (
                    <SkeletonComponent key={i} />
                ))}
            </div>
        );
    }

    return (
        <div className={`grid gap-6 ${type === 'package' ? 'lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonComponent key={i} />
            ))}
        </div>
    );
}
