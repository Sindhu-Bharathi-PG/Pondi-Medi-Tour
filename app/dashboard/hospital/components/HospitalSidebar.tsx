"use client";

import {
    Activity,
    Building2,
    Calendar,
    FileText,
    LayoutDashboard,
    LogOut,
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
            title: "Appointments",
            icon: Calendar,
            href: "/dashboard/hospital/appointments"
        },
        {
            title: "Treatments",
            icon: Activity,
            href: "/dashboard/hospital/treatments"
        },
        {
            title: "Settings",
            icon: Settings,
            href: "/dashboard/hospital/settings"
        }
    ];

    const sidebarClasses = `
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:shadow-none
    `;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={sidebarClasses}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
                        <Link href="/dashboard/hospital" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-gray-900 text-lg tracking-tight">MediTour</span>
                        </Link>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
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
                                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium
                                        ${isActive
                                            ? "bg-emerald-50 text-emerald-700 shadow-sm"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }
                                    `}
                                >
                                    <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-600"}`} />
                                    {item.title}
                                    {isActive && (
                                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-100">
                        <Link
                            href="/api/auth/signout"
                            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                        >
                            <LogOut className="w-5 h-5" />
                            Sign Out
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}
