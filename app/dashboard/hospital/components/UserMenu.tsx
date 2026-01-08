"use client";

import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface UserData {
    name?: string;
    email?: string;
}

export default function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<UserData>({ name: 'Hospital', email: '' });
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Load user from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('user');
            if (stored) {
                try {
                    setUser(JSON.parse(stored));
                } catch { }
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        router.push('/login/partner');
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                    {user.name?.charAt(0) || 'H'}
                </div>
                <span className="hidden sm:block text-sm font-medium max-w-[120px] truncate">{user.name || 'Hospital'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                        <p className="font-bold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                        <Link
                            href="/dashboard/hospital/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <User className="w-4 h-4 text-gray-400" />
                            My Profile
                        </Link>
                        <Link
                            href="/dashboard/hospital/settings"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <Settings className="w-4 h-4 text-gray-400" />
                            Settings
                        </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 py-1">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
