"use client";

import { Activity, Building2, ChevronDown, FileEdit, Home, LayoutDashboard, LogOut, Menu, Settings, Shield, Users, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
    { href: '/dashboard/superadmin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/superadmin/page-builder', label: 'Page Builder', icon: FileEdit },
    { href: '/dashboard/superadmin/users', label: 'User Management', icon: Users },
    { href: '/dashboard/superadmin/hospitals', label: 'Hospital Management', icon: Building2 },
    { href: '/dashboard/superadmin/activity', label: 'Activity Logs', icon: Activity },
    { href: '/dashboard/superadmin/settings', label: 'Settings', icon: Settings },
];

export default function SuperAdminShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const userMenuRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        router.push('/login/admin');
    };

    // Close user menu on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 transform transition-transform duration-300 lg:transform-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-slate-700/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-white text-lg">Super Admin</h1>
                            <p className="text-xs text-slate-400">Control Panel</p>
                        </div>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/dashboard/superadmin' && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all">
                        <Home className="w-5 h-5" />
                        <span className="font-medium">View Site</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-lg font-semibold text-slate-900 hidden sm:block">
                            {navItems.find(item => pathname === item.href || (item.href !== '/dashboard/superadmin' && pathname.startsWith(item.href)))?.label || 'Dashboard'}
                        </h2>
                    </div>

                    {/* User Menu */}
                    <div className="relative" ref={userMenuRef}>
                        <button
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                S
                            </div>
                            <span className="hidden sm:block text-sm font-medium">Super Admin</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {userMenuOpen && (
                            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                                <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                                    <p className="font-bold text-slate-900">Super Admin</p>
                                    <p className="text-xs text-slate-500">superadmin@pondimeditour.in</p>
                                </div>
                                <div className="py-1">
                                    <Link
                                        href="/dashboard/superadmin/settings"
                                        onClick={() => setUserMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                    >
                                        <Settings className="w-4 h-4 text-slate-400" />
                                        Settings
                                    </Link>
                                </div>
                                <div className="border-t border-slate-100 py-1">
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
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
