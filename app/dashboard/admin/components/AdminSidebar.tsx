"use client";

import { BarChart3, Building2, CheckCircle2, LayoutDashboard, MessageSquare, Settings, Shield, Users, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const pathname = usePathname();

    const menuItems = [
        {
            title: "Dashboard",
            icon: LayoutDashboard,
            href: "/dashboard/admin",
            gradient: "from-violet-500 to-purple-600"
        },
        {
            title: "Users",
            icon: Users,
            href: "/dashboard/admin/users",
            gradient: "from-cyan-500 to-blue-600"
        },
        {
            title: "Hospitals",
            icon: Building2,
            href: "/dashboard/admin/hospitals",
            gradient: "from-emerald-500 to-teal-600"
        },
        {
            title: "Inquiries",
            icon: MessageSquare,
            href: "/dashboard/admin/inquiries",
            gradient: "from-pink-500 to-rose-600" // Added gradient for Inquiries
        },
        {
            title: "Approvals",
            icon: CheckCircle2,
            href: "/dashboard/admin/approvals",
            gradient: "from-green-500 to-lime-600" // Added gradient for Approvals
        },
        {
            title: "Analytics",
            icon: BarChart3,
            href: "/dashboard/admin/analytics",
            gradient: "from-amber-500 to-orange-600"
        },
        {
            title: "Settings",
            icon: Settings,
            href: "/dashboard/admin/settings",
            gradient: "from-gray-500 to-slate-600"
        }
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-slate-900 to-slate-800 
                shadow-2xl transform transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:static lg:z-auto
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-slate-700/50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/50">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-white text-lg">Admin</h2>
                                    <p className="text-xs text-slate-400">Control Panel</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => onClose()}
                                    className={`
                                        group flex items-center gap-3 px-4 py-3 rounded-xl
                                        transition-all duration-200
                                        ${isActive
                                            ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                                        }
                                    `}
                                >
                                    <item.icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                                    <span className="font-medium">{item.title}</span>
                                    {isActive && (
                                        <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-slate-700/50">
                        <div className="px-4 py-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                            <p className="text-xs text-slate-400 mb-1">Logged in as</p>
                            <p className="text-sm font-medium text-white">Super Admin</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
