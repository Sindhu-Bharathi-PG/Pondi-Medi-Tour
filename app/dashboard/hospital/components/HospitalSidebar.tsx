"use client";

import {
    Activity,
    Building2,
    FileText,
    LayoutDashboard,
    LogOut,
    Package,
    Settings,
    Users,
    X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HospitalSidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    const menuItems = [
        {
            title: "Dashboard",
            icon: LayoutDashboard,
            href: "/dashboard/hospital"
        },
        {
            title: "Hospital Profile",
            icon: Building2,
            href: "/dashboard/hospital/profile"
        },
        {
            title: "Doctors",
            icon: Users,
            href: "/dashboard/hospital/doctors"
        },
        {
            title: "Inquiries",
            icon: FileText,
            href: "/dashboard/hospital/inquiries"
        },
        {
            title: "Treatments",
            icon: Activity,
            href: "/dashboard/hospital/treatments"
        },
        {
            title: "Packages",
            icon: Package,
            href: "/dashboard/hospital/packages"
        },
        {
            title: "Settings",
            icon: Settings,
            href: "/dashboard/hospital/settings"
        }
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:sticky top-0 left-0 h-screen
                    w-64 bg-white border-r border-gray-100
                    z-50 lg:z-auto
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    flex flex-col
                `}
            >
                <div className="flex flex-col h-full bg-white/80 backdrop-blur-xl">
                    {/* Header */}
                    <div className="h-20 flex items-center justify-between px-8 border-b border-gray-100/50">
                        <Link href="/dashboard/hospital" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center transform group-hover:scale-105 transition-all duration-300">
                                <Building2 className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-900 text-xl tracking-tight leading-none">MediTour</span>
                                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mt-1">Hospital Portal</span>
                            </div>
                        </Link>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            // Exact match for dashboard home, startsWith for others
                            const isActive = item.href === "/dashboard/hospital"
                                ? pathname === item.href
                                : pathname?.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => window.innerWidth < 1024 && onClose()}
                                    className={`
                                        relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group font-medium overflow-hidden
                                        ${isActive
                                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 translate-x-1"
                                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1"
                                        }
                                    `}
                                >
                                    <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-400 group-hover:text-blue-600"}`} />
                                    <span className="relative z-10">{item.title}</span>

                                    {/* Active Indicator Pulse */}
                                    {isActive && (
                                        <div className="absolute right-3 w-2 h-2 rounded-full bg-white/30 animate-pulse" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-100/50">
                        <Link
                            href="/api/auth/signout"
                            className="flex items-center gap-3 px-4 py-3.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 group font-medium"
                        >
                            <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-red-100 transition-colors">
                                <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                            </div>
                            <span>Sign Out</span>
                        </Link>

                        <div className="mt-6 flex items-center gap-3 px-4">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">System Online</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
