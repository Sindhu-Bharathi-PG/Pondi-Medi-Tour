"use client";

import { BarChart3, FileEdit, LayoutDashboard, Settings, Shield, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SuperAdminDashboard() {
    const [stats, setStats] = useState({
        totalPages: 5,
        publishedPages: 3,
        draftPages: 2,
        lastEdit: 'Home Page - 2 hours ago'
    });

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/25">
                            <Shield className="w-7 h-7 text-white" />
                        </div>
                        Super Admin Dashboard
                    </h1>
                    <p className="text-slate-600 mt-1">Manage platform content and configuration</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Pages', value: stats.totalPages, icon: FileEdit, gradient: 'from-indigo-500 to-purple-600', href: '/dashboard/superadmin/page-builder' },
                    { label: 'Published', value: stats.publishedPages, icon: LayoutDashboard, gradient: 'from-emerald-500 to-teal-600', href: '/dashboard/superadmin/page-builder' },
                    { label: 'Drafts', value: stats.draftPages, icon: FileEdit, gradient: 'from-amber-500 to-orange-600', href: '/dashboard/superadmin/page-builder' },
                    { label: 'Admins', value: '2', icon: Users, gradient: 'from-rose-500 to-pink-600', href: '/dashboard/admin/users' },
                ].map((stat, i) => (
                    <Link key={i} href={stat.href} className="group">
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link href="/dashboard/superadmin/page-builder" className="group p-4 rounded-xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                                <FileEdit className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900">Page Builder</p>
                                <p className="text-xs text-slate-500">Design landing pages</p>
                            </div>
                        </div>
                    </Link>

                    <Link href="/dashboard/admin/analytics" className="group p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                                <BarChart3 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900">Analytics</p>
                                <p className="text-xs text-slate-500">View platform metrics</p>
                            </div>
                        </div>
                    </Link>

                    <Link href="/dashboard/admin/settings" className="group p-4 rounded-xl border-2 border-slate-200 hover:border-violet-500 hover:bg-violet-50 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                                <Settings className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900">Settings</p>
                                <p className="text-xs text-slate-500">System configuration</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h2>
                <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2"></div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">Home page updated</p>
                            <p className="text-xs text-slate-500">2 hours ago</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2"></div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">About page published</p>
                            <p className="text-xs text-slate-500">1 day ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
