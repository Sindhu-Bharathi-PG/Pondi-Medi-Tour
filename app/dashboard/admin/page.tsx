"use client";

import { Activity, ArrowUpRight, Building2, CheckCircle, Clock, TrendingUp, UserCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalHospitals: 0,
        pendingApprovals: 0,
        activeSessions: 0
    });

    useEffect(() => {
        // Animate stats on mount
        const animateCount = (key: keyof typeof stats, target: number) => {
            let current = 0;
            const increment = target / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                setStats(prev => ({ ...prev, [key]: Math.floor(current) }));
            }, 30);
        };

        animateCount('totalUsers', 1247);
        animateCount('totalHospitals', 89);
        animateCount('pendingApprovals', 12);
        animateCount('activeSessions', 456);
    }, []);

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

    const recentActivity = [
        { type: "user", action: "New user registration", user: "John Doe", time: "2 min ago", icon: UserCheck, color: "text-emerald-600" },
        { type: "hospital", action: "Hospital submission pending", user: "Apollo Hospital", time: "15 min ago", icon: Building2, color: "text-amber-600" },
        { type: "user", action: "User verified email", user: "Sarah Smith", time: "1 hour ago", icon: CheckCircle, color: "text-blue-600" },
        { type: "hospital", action: "Hospital approved", user: "City Medical Center", time: "2 hours ago", icon: CheckCircle, color: "text-emerald-600" }
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
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

            {/* Recent Activity & Quick Actions */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                        <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
                        <p className="text-sm text-slate-600 mt-1">Latest actions across the platform</p>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {recentActivity.map((activity, index) => (
                            <div
                                key={index}
                                className="p-4 hover:bg-slate-50 transition-colors group cursor-pointer"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-10 h-10 rounded-xl ${activity.color.replace('text-', 'bg-').replace('600', '100')} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                        <activity.icon className={`w-5 h-5 ${activity.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-slate-900">{activity.action}</p>
                                        <p className="text-sm text-slate-600 mt-0.5">{activity.user}</p>
                                    </div>
                                    <span className="text-xs text-slate-400 whitespace-nowrap">{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-slate-100 bg-slate-50">
                        <button className="text-sm font-medium text-violet-600 hover:text-violet-700 flex items-center gap-1">
                            View All Activity
                            <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                    <div className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl shadow-violet-500/25">
                        <h3 className="font-bold text-lg mb-2">Quick Actions</h3>
                        <p className="text-violet-100 text-sm mb-6">Manage your platform efficiently</p>
                        <div className="space-y-3">
                            <button className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl font-medium hover:bg-white/30 transition text-left flex items-center justify-between group">
                                <span>Approve Hospitals</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                            <button className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl font-medium hover:bg-white/30 transition text-left flex items-center justify-between group">
                                <span>Manage Users</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                            <button className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl font-medium hover:bg-white/30 transition text-left flex items-center justify-between group">
                                <span>View Analytics</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                        <h3 className="font-bold text-slate-900 mb-4">System Status</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">API Status</span>
                                <span className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    Operational
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Database</span>
                                <span className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    Healthy
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Server Load</span>
                                <span className="text-sm font-medium text-slate-900">23%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
