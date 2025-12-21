"use client";

import { Building2, Heart, RefreshCw, WifiOff } from "lucide-react";

interface LoadingSpinnerProps {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
}

/**
 * Enhanced Loading Spinner with modern animations
 */
export function LoadingSpinner({ message = "Loading...", size = 'md' }: LoadingSpinnerProps) {
    const sizes = {
        sm: { container: 'w-10 h-10', icon: 'w-4 h-4', ring: 'w-10 h-10 border-2' },
        md: { container: 'w-16 h-16', icon: 'w-6 h-6', ring: 'w-16 h-16 border-3' },
        lg: { container: 'w-20 h-20', icon: 'w-8 h-8', ring: 'w-20 h-20 border-4' }
    };

    const s = sizes[size];

    return (
        <div className="min-h-[400px] flex flex-col items-center justify-center">
            <div className="relative">
                {/* Pulsing outer ring */}
                <div className={`absolute inset-0 ${s.ring} border-emerald-300/30 rounded-full animate-ping`}
                    style={{ animationDuration: '2s' }} />

                {/* Spinning ring */}
                <div className={`${s.ring} border-emerald-500/30 border-t-emerald-500 border-r-teal-500 rounded-full animate-spin`} />

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg p-1.5 shadow-lg">
                        <Heart className={`${s.icon} text-white animate-pulse`} />
                    </div>
                </div>
            </div>
            <p className="mt-5 text-gray-600 font-medium animate-pulse">{message}</p>
            <p className="text-sm text-gray-400 mt-1">Please wait a moment</p>
        </div>
    );
}

interface ErrorStateProps {
    message: string;
    onRetry?: () => void;
    showLogin?: boolean;
}

/**
 * Enhanced Error State with modern styling
 */
export function ErrorState({ message, onRetry, showLogin }: ErrorStateProps) {
    return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <WifiOff className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-gray-500 text-center max-w-md mb-8">{message}</p>
            <div className="flex gap-3">
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </button>
                )}
                {showLogin && (
                    <a
                        href="/login/hospital"
                        className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
                    >
                        Go to Login
                    </a>
                )}
            </div>
        </div>
    );
}

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
}

/**
 * Enhanced Empty State with modern styling
 */
export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
    return (
        <div className="min-h-[300px] flex flex-col items-center justify-center p-8 text-center">
            {icon && (
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                    {icon}
                </div>
            )}
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 max-w-md mb-8">{description}</p>
            {action && (
                <button
                    onClick={action.onClick}
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}

/**
 * Full page loader for dashboard with enhanced medical-themed animation
 */
export function DashboardLoader() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30 flex items-center justify-center">
            <div className="text-center">
                <div className="relative inline-block mb-6">
                    {/* Outer pulsing rings */}
                    <div className="absolute inset-0 w-24 h-24 border-4 border-emerald-300/20 rounded-full animate-ping"
                        style={{ animationDuration: '2s' }} />
                    <div className="absolute inset-2 w-20 h-20 border-4 border-teal-300/30 rounded-full animate-ping"
                        style={{ animationDuration: '1.5s', animationDelay: '0.5s' }} />

                    {/* Main spinning ring */}
                    <div className="w-24 h-24 border-4 border-transparent border-t-emerald-500 border-r-teal-500 rounded-full animate-spin" />

                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-xl p-3 shadow-xl">
                            <Building2 className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-1">Loading Dashboard</h3>
                <p className="text-gray-500 text-sm">Preparing your workspace...</p>

                {/* Loading bar */}
                <div className="mt-6 w-48 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-full animate-loading-bar" />
                </div>
            </div>

            <style jsx>{`
                @keyframes loading-bar {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-loading-bar {
                    animation: loading-bar 1.5s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}

/**
 * Skeleton loaders for content placeholders
 */
export function SkeletonCard() {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse">
            <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-100 rounded-xl" />
                <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg w-3/4" />
                    <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg w-1/2" />
                </div>
            </div>
        </div>
    );
}

export function SkeletonRow() {
    return (
        <div className="px-6 py-4 flex items-center gap-4 animate-pulse border-b border-gray-50">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-100 rounded-full" />
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-1/3" />
                <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-50 rounded w-1/2" />
            </div>
            <div className="h-6 bg-gray-200 rounded-lg w-20" />
        </div>
    );
}
