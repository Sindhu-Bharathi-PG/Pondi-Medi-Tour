"use client";

import { BarChart3, Building2, CheckCircle2, LayoutDashboard, MessageSquare, Package, Settings, Shield, Users, X } from "lucide-react";
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
            color: "text-violet-600",
            bgActive: "bg-violet-50",
            borderActive: "border-violet-500"
        },
        {
            title: "Users",
            icon: Users,
            href: "/dashboard/admin/users",
            color: "text-blue-600",
            bgActive: "bg-blue-50",
            borderActive: "border-blue-500"
        },
        {
            title: "Hospitals",
            icon: Building2,
            href: "/dashboard/admin/hospitals",
            color: "text-emerald-600",
            bgActive: "bg-emerald-50",
            borderActive: "border-emerald-500"
        },
        {
            title: "Inquiries",
            icon: MessageSquare,
            href: "/dashboard/admin/inquiries",
            color: "text-pink-600",
            bgActive: "bg-pink-50",
            borderActive: "border-pink-500"
        },
        {
            title: "Packages",
            icon: Package,
            href: "/dashboard/admin/packages",
            color: "text-orange-600",
            bgActive: "bg-orange-50",
            borderActive: "border-orange-500"
        },
        {
            title: "Approvals",
            icon: CheckCircle2,
            href: "/dashboard/admin/approvals",
            color: "text-green-600",
            bgActive: "bg-green-50",
            borderActive: "border-green-500"
        },
        {
            title: "Analytics",
            icon: BarChart3,
            href: "/dashboard/admin/analytics",
            color: "text-amber-600",
            bgActive: "bg-amber-50",
            borderActive: "border-amber-500"
        },
        {
            title: "Settings",
            icon: Settings,
            href: "/dashboard/admin/settings",
            color: "text-gray-600",
            bgActive: "bg-gray-50",
            borderActive: "border-gray-500"
        }
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar - Clean White Theme */}
            <aside className={`
                fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200
                shadow-lg transform transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:sticky lg:top-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-5 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                                    <Shield className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-gray-900 text-lg">Admin</h2>
                                    <p className="text-xs text-gray-500">Control Panel</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => onClose()}
                                    className={`
                                        group flex items-center gap-3 px-4 py-3 rounded-xl
                                        transition-all duration-200 border-l-4
                                        ${isActive
                                            ? `${item.bgActive} ${item.color} ${item.borderActive} font-semibold`
                                            : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }
                                    `}
                                >
                                    <item.icon className={`w-5 h-5 ${isActive ? item.color : 'text-gray-400 group-hover:text-gray-600'}`} />
                                    <span className="font-medium">{item.title}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="px-4 py-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-100">
                            <p className="text-xs text-gray-500 mb-1">Logged in as</p>
                            <p className="text-sm font-semibold text-violet-700">Super Admin</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
