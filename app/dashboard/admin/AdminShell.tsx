"use client";

import { LogOut, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import AdminNotifications from "./components/AdminNotifications";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { data: session } = useSession();

    const userName = session?.user?.name || 'Admin User';
    const userEmail = session?.user?.email || 'admin@pondimeditour.com';

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <AdminSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0">
                {/* Header - Both Mobile & Desktop */}
                <header className="bg-white border-b border-slate-200 px-4 lg:px-8 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
                    {/* Left: Menu button (mobile) */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition"
                    >
                        <Menu className="w-6 h-6 text-slate-700" />
                    </button>

                    {/* Center: Title (mobile) / Left: Welcome (desktop) */}
                    <div className="lg:flex-1">
                        <h1 className="text-lg font-bold text-slate-900 lg:hidden">Admin Panel</h1>
                        <div className="hidden lg:block">
                            <p className="text-sm text-slate-500">Welcome back,</p>
                            <h2 className="font-bold text-slate-900">{userName}</h2>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 lg:gap-4">
                        {/* Notifications */}
                        <AdminNotifications />

                        {/* User Dropdown - Desktop */}
                        <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-violet-500/25">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                            <div className="hidden xl:block">
                                <p className="text-sm font-medium text-slate-900">{userName}</p>
                                <p className="text-xs text-slate-500">{userEmail}</p>
                            </div>
                            <button
                                onClick={() => signOut({ callbackUrl: '/login/admin' })}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

