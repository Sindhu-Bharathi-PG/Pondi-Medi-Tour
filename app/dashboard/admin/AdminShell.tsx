"use client";

import { Bell, LogOut, Menu, Search } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { data: session } = useSession();

    const userName = session?.user?.name || 'Admin User';
    const userEmail = session?.user?.email || 'admin@pondimeditour.com';

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AdminSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0">
                {/* Header - Clean White Theme */}
                <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
                    {/* Left: Menu button (mobile) */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition"
                    >
                        <Menu className="w-6 h-6 text-gray-700" />
                    </button>

                    {/* Center: Search Bar (desktop) */}
                    <div className="hidden lg:flex flex-1 max-w-md">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none text-gray-700 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Mobile Title */}
                    <h1 className="text-lg font-bold text-gray-900 lg:hidden">Admin Panel</h1>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3">
                        {/* Notifications */}
                        <button className="relative p-2.5 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* User Dropdown - Desktop */}
                        <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-violet-500/25">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                            <div className="hidden xl:block">
                                <p className="text-sm font-semibold text-gray-900">{userName}</p>
                                <p className="text-xs text-gray-500">{userEmail}</p>
                            </div>
                            <button
                                onClick={() => signOut({ callbackUrl: '/login/admin' })}
                                className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
}
