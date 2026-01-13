"use client";

import {
    Activity,
    Building2,
    FileText,
    LayoutDashboard,
    LogOut,
    Package,
    Settings,
    Star,
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
            title: "Reviews",
            icon: Star,
            href: "/dashboard/hospital/reviews"
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

            {/* Sidebar - WHITE/LIGHT Theme */}
            <aside
                className={`
                    fixed lg:sticky top-0 left-0 h-screen
                    w-64 bg-white border-r border-gray-200
                    z-50 lg:z-auto
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    flex flex-col shadow-sm
                `}
            >
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
                    <Link href="/dashboard/hospital" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-tr from-teal-500 to-emerald-600 rounded-xl shadow-md flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-900 text-lg leading-none">MediTour</span>
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium mt-0.5">Hospital Portal</span>
                        </div>
                    </Link>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-4 px-4 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.href === "/dashboard/hospital"
                            ? pathname === item.href
                            : pathname?.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => window.innerWidth < 1024 && onClose()}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
                                    ${isActive
                                        ? "bg-teal-50 text-teal-700 border border-teal-100"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }
                                `}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? "text-teal-600" : "text-gray-400"}`} />
                                <span>{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100">
                    <Link
                        href="/api/auth/signout"
                        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}
