"use client";

import { ToastContainer, useToast } from "@/app/components/admin/Toast";
import { Activity, ArrowUpRight, Building2, Clock, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface Stats {
    totalUsers: number;
    totalHospitals: number;
    pendingApprovals: number;
    activeSessions: number;
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<Stats>({
        totalUsers: 0,
        totalHospitals: 0,
        pendingApprovals: 0,
        activeSessions: 0
    });
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        // Use mock data instead of API call
        setTimeout(() => {
            const mockStats = {
                totalUsers: 1247,
                totalHospitals: 45,
                pendingApprovals: 8,
                activeSessions: 156
            };
            setStats(mockStats);
            animateStats(mockStats);
            setLoading(false);
        }, 500);
    }, []);

    const animateStats = (targetStats: Stats) => {
        let current = { ...stats };
        const steps = 30;
        const interval = 30;

        const timer = setInterval(() => {
            let isDone = true;
            const newStats = { ...current };

            Object.keys(targetStats).forEach((key) => {
                const k = key as keyof Stats;
                const increment = Math.ceil((targetStats[k] - current[k]) / 10);

                if (current[k] < targetStats[k]) {
                    newStats[k] = Math.min(current[k] + increment, targetStats[k]);
                    isDone = false;
                }
            });

            current = newStats;
            setStats(newStats);

            if (isDone) clearInterval(timer);
        }, interval);
    };

    const statsCards = [
        {
            title: "Total Users",
            value: stats.totalUsers,
            change: "+12.5%",
            icon: Users,
            gradient: "from-violet-500 to-purple-600",
            bgGradient: "from-violet-50 to-purple-50"
        },
        {
            title: "Total Hospitals",
            value: stats.totalHospitals,
            change: "+8.2%",
            icon: Building2,
            gradient: "from-cyan-500 to-blue-600",
            bgGradient: "from-cyan-50 to-blue-50"
        },
        {
            title: "Pending Approvals",
            value: stats.pendingApprovals,
            change: "-3 today",
            icon: Clock,
            gradient: "from-amber-500 to-orange-600",
            bgGradient: "from-amber-50 to-orange-50"
        },
        {
            title: "Active Sessions",
            value: stats.activeSessions,
            change: "+156 today",
            icon: Activity,
            gradient: "from-emerald-500 to-teal-600",
            bgGradient: "from-emerald-50 to-teal-50"
        }
    ];

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="relative inline-block mb-6">
                        {/* Outer pulsing rings */}
                        <div className="absolute inset-0 w-20 h-20 border-4 border-violet-300/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                        <div className="absolute inset-2 w-16 h-16 border-4 border-purple-300/30 rounded-full animate-ping" style={{ animationDuration: '1.5s', animationDelay: '0.5s' }} />

                        {/* Main spinning ring */}
                        <div className="w-20 h-20 border-4 border-transparent border-t-violet-600 border-r-purple-600 rounded-full animate-spin" />

                        {/* Center icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 rounded-xl p-3 shadow-xl shadow-violet-500/30">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 mb-1">Loading Dashboard</h3>
                    <p className="text-slate-500 text-sm">Preparing admin panel...</p>

                    {/* Loading bar */}
                    <div className="mt-6 w-48 h-1 bg-slate-200 rounded-full mx-auto overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-violet-500 via-purple-500 to-violet-500 rounded-full animate-pulse"
                            style={{ animation: 'loading-bar 1.5s ease-in-out infinite' }} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
                    <p className="text-slate-600">Welcome back! Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition">
                        Export Report
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] transition-all">
                        View All Reports
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => (
                    <div
                        key={stat.title}
                        className={`group relative bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Background decoration */}
                        <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>

                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                                    <TrendingUp className="w-4 h-4" />
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                            <p className="text-3xl font-bold text-slate-900">{stat.value.toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
                <a
                    href="/dashboard/admin/users"
                    className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">Manage Users</h3>
                    <p className="text-sm text-slate-600">View and manage all platform users</p>
                </a>

                <a
                    href="/dashboard/admin/hospitals"
                    className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">Approve Hospitals</h3>
                    <p className="text-sm text-slate-600">Review pending hospital submissions</p>
                </a>

                <a
                    href="/dashboard/admin/analytics"
                    className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">View Analytics</h3>
                    <p className="text-sm text-slate-600">Platform insights and metrics</p>
                </a>
            </div>
        </div>
    );
}
