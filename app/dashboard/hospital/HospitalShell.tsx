"use client";

import { Building2, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import HospitalSidebar from "./components/HospitalSidebar";
import NotificationBell from "./components/NotificationBell";
import UserMenu from "./components/UserMenu";

interface HospitalInfo {
    name: string;
    logoUrl?: string;
}

export default function HospitalShell({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [hospital, setHospital] = useState<HospitalInfo | null>(null);

    // Fetch hospital info for header display
    useEffect(() => {
        const fetchHospitalInfo = async () => {
            try {
                const sessionRes = await fetch('/api/auth/session');
                const session = await sessionRes.json();
                const token = session?.accessToken;

                if (!token) return;

                const res = await fetch('http://localhost:3001/api/hospitals/me/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setHospital({
                        name: data.hospital?.name || 'Hospital Portal',
                        logoUrl: data.hospital?.logoUrl
                    });
                }
            } catch (error) {
                console.error('Error fetching hospital info:', error);
            }
        };

        fetchHospitalInfo();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <HospitalSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 pointer-events-auto">
                {/* Top Navbar */}
                <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
                    {/* Left: Mobile menu + Hospital Name */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Open menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Hospital Logo & Name */}
                        <div className="flex items-center gap-3">
                            {hospital?.logoUrl ? (
                                <img
                                    src={hospital.logoUrl}
                                    alt={hospital.name}
                                    className="w-8 h-8 rounded-lg object-cover"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                                    <Building2 className="w-5 h-5 text-white" />
                                </div>
                            )}
                            <div className="hidden sm:block">
                                <h1 className="font-bold text-gray-900 text-lg leading-tight">
                                    {hospital?.name || 'Hospital Portal'}
                                </h1>
                                <p className="text-xs text-gray-500">Admin Dashboard</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Notifications + User Menu */}
                    <div className="flex items-center gap-2">
                        <NotificationBell />
                        <UserMenu />
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
