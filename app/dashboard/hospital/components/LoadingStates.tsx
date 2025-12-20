"use client";

import { Building2, RefreshCw, WifiOff } from "lucide-react";

interface LoadingSpinnerProps {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ message = "Loading...", size = 'md' }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    };

    return (
        <div className="min-h-[400px] flex flex-col items-center justify-center">
            <div className="relative">
                <div className={`${sizeClasses[size]} border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-emerald-500" />
                </div>
            </div>
            <p className="mt-4 text-gray-500 text-sm font-medium">{message}</p>
        </div>
    );
}

interface ErrorStateProps {
    message: string;
    onRetry?: () => void;
    showLogin?: boolean;
}

export function ErrorState({ message, onRetry, showLogin }: ErrorStateProps) {
    return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <WifiOff className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-gray-500 text-center max-w-md mb-6">{message}</p>
            <div className="flex gap-3">
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </button>
                )}
                {showLogin && (
                    <a
                        href="/login/hospital"
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
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

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
    return (
        <div className="min-h-[300px] flex flex-col items-center justify-center p-8 text-center">
            {icon && (
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    {icon}
                </div>
            )}
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 max-w-md mb-6">{description}</p>
            {action && (
                <button
                    onClick={action.onClick}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}

// Full page loader for dashboard
export function DashboardLoader() {
    return (
        <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
            <div className="text-center">
                <div className="relative inline-block">
                    <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-emerald-500" />
                    </div>
                </div>
                <p className="mt-4 text-gray-600 font-medium">Loading Dashboard...</p>
            </div>
        </div>
    );
}
