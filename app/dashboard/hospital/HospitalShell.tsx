"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import HospitalSidebar from "./components/HospitalSidebar";
import NotificationBell from "./components/NotificationBell";
import UserMenu from "./components/UserMenu";

export default function HospitalShell({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
                    {/* Left: Mobile menu + Title */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                            aria-label="Open menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <span className="font-bold text-gray-900 text-lg hidden sm:block">Hospital Portal</span>
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
