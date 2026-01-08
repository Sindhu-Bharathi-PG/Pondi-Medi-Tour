"use client";

import { API_BASE } from "@/app/hooks/useApi";
import { Activity, Building2, FileEdit, LayoutDashboard, Settings, Shield, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Stats {
    totalUsers: number;
    totalHospitals: number;
    pendingHospitals: number;
    totalPages: number;
}

interface ActivityLog {
    id: number;
    action_type: string;
    description: string;
    actor_name: string;
    created_at: string;
}

export default function SuperAdminDashboard() {
    const [stats, setStats] = useState<Stats>({ totalUsers: 0, totalHospitals: 0, pendingHospitals: 0, totalPages: 5 });
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const headers = { 'Authorization': `Bearer ${token}` };

            // Fetch stats
            const [statsRes, activityRes] = await Promise.all([
                fetch(`${API_BASE}/api/admin/stats`, { headers }),
                fetch(`${API_BASE}/api/admin/activity-logs?limit=5`, { headers })
            ]);

            if (statsRes.ok) {
                const data = await statsRes.json();
                setStats({
                    totalUsers: data.totalUsers || 0,
                    totalHospitals: data.totalHospitals || 0,
                    pendingHospitals: data.pendingApprovals || 0,
                    totalPages: 5 // CMS pages are fixed
                });
            }

            if (activityRes.ok) {
                const data = await activityRes.json();
                setActivities(data.logs || []);
            }
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `${mins}m ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours}h ago`;
        return date.toLocaleDateString();
    };

    const getActivityColor = (action: string) => {
        if (action?.includes('approved')) return 'bg-emerald-500';
        if (action?.includes('rejected')) return 'bg-red-500';
        if (action?.includes('created')) return 'bg-blue-500';
        if (action?.includes('updated')) return 'bg-amber-500';
        return 'bg-indigo-500';
    };

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
                    { label: 'Total Users', value: loading ? '...' : stats.totalUsers, icon: Users, gradient: 'from-indigo-500 to-purple-600', href: '/dashboard/superadmin/users' },
                    { label: 'Hospitals', value: loading ? '...' : stats.totalHospitals, icon: Building2, gradient: 'from-emerald-500 to-teal-600', href: '/dashboard/superadmin/hospitals' },
                    { label: 'Pending Approval', value: loading ? '...' : stats.pendingHospitals, icon: LayoutDashboard, gradient: 'from-amber-500 to-orange-600', href: '/dashboard/superadmin/hospitals' },
                    { label: 'CMS Pages', value: stats.totalPages, icon: FileEdit, gradient: 'from-rose-500 to-pink-600', href: '/dashboard/superadmin/page-builder' },
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
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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

                    <Link href="/dashboard/superadmin/users" className="group p-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900">Users</p>
                                <p className="text-xs text-slate-500">Manage all users</p>
                            </div>
                        </div>
                    </Link>

                    <Link href="/dashboard/superadmin/hospitals" className="group p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900">Hospitals</p>
                                <p className="text-xs text-slate-500">Approve & manage</p>
                            </div>
                        </div>
                    </Link>

                    <Link href="/dashboard/superadmin/settings" className="group p-4 rounded-xl border-2 border-slate-200 hover:border-violet-500 hover:bg-violet-50 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                                <Settings className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900">Settings</p>
                                <p className="text-xs text-slate-500">Platform config</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                    <Link href="/dashboard/superadmin/activity" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                        View all
                    </Link>
                </div>
                <div className="space-y-3">
                    {loading ? (
                        <div className="text-center py-6">
                            <div className="w-6 h-6 border-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
                        </div>
                    ) : activities.length === 0 ? (
                        <div className="text-center py-6">
                            <Activity className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                            <p className="text-slate-500 text-sm">No recent activity</p>
                        </div>
                    ) : (
                        activities.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
                                <div className={`w-2 h-2 rounded-full mt-2 ${getActivityColor(activity.action_type)}`}></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-900">
                                        {activity.description || activity.action_type}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-slate-500">{activity.actor_name || 'System'}</span>
                                        <span className="text-xs text-slate-400">•</span>
                                        <span className="text-xs text-slate-500">{formatTime(activity.created_at)}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
