"use client";

import {
    BarChart3,
    Building2,
    ChevronLeft,
    Crown,
    Database,
    Edit,
    LayoutDashboard,
    LogOut,
    Settings,
    Shield,
    Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface AdminSidebarProps {
    userType: "admin" | "superadmin";
}

export default function AdminSidebar({ userType }: AdminSidebarProps) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const adminLinks = [
        { href: "/dashboard/admin", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/dashboard/admin/users", icon: Users, label: "Users" },
        { href: "/dashboard/admin/hospitals", icon: Building2, label: "Hospitals" },
        { href: "/dashboard/admin/analytics", icon: BarChart3, label: "Analytics" },
        { href: "/dashboard/admin/settings", icon: Settings, label: "Settings" }
    ];

    const superAdminLinks = [
        { href: "/dashboard/superadmin", icon: Crown, label: "Super Admin" },
        { href: "/dashboard/superadmin/users", icon: Shield, label: "Permissions" },
        { href: "/dashboard/superadmin/database", icon: Database, label: "Database" },
        { href: "/dashboard/superadmin/page-builder", icon: Edit, label: "Page Builder" },
        { href: "/dashboard/superadmin/security", icon: Shield, label: "Security" },
        { href: "/dashboard/superadmin/settings", icon: Settings, label: "Settings" }
    ];

    const links = userType === "superadmin" ? superAdminLinks : adminLinks;

    return (
        <aside
            className={`${isCollapsed ? "w-20" : "w-64"
                } bg-white border-r border-slate-200 min-h-screen transition-all duration-300 relative`}
        >
            {/* Collapse Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-6 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition z-10"
            >
                <ChevronLeft
                    className={`w-4 h-4 text-slate-600 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
                />
            </button>

            {/* Logo/Header */}
            <div className="p-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${userType === "superadmin" ? "from-purple-600 to-pink-600" : "from-violet-600 to-purple-600"
                            } flex items-center justify-center flex-shrink-0`}
                    >
                        {userType === "superadmin" ? (
                            <Crown className="w-5 h-5 text-white" />
                        ) : (
                            <Shield className="w-5 h-5 text-white" />
                        )}
                    </div>
                    {!isCollapsed && (
                        <div>
                            <h2 className="font-bold text-slate-900">
                                {userType === "superadmin" ? "Super Admin" : "Admin"}
                            </h2>
                            <p className="text-xs text-slate-500">Control Panel</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="p-4 space-y-2">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive
                                    ? "bg-gradient-to-r from-violet-50 to-purple-50 text-violet-700 font-medium"
                                    : "text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            <link.icon
                                className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-violet-600" : "text-slate-400 group-hover:text-slate-600"
                                    }`}
                            />
                            {!isCollapsed && <span>{link.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
                <Link
                    href="/api/auth/signout"
                    className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition group"
                >
                    <LogOut className="w-5 h-5 flex-shrink-0 text-slate-400 group-hover:text-slate-600" />
                    {!isCollapsed && <span>Logout</span>}
                </Link>
            </div>
        </aside>
    );
}
