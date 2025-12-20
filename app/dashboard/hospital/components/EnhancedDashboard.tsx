"use client";

import { Activity, ArrowRight, Bell, Building2, FileText, Search, Star, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function EnhancedDashboard({ userName = "Partner" }: { userName?: string | null }) {
    const [stats, setStats] = useState({
        doctors: 0,
        inquiries: 0,
        profileComplete: 0
    });
    const [animateStats, setAnimateStats] = useState(false);

    useEffect(() => {
        // Trigger animation after mount with mock data
        setTimeout(() => {
            setAnimateStats(true);
            animateCount('doctors', 12);
            animateCount('inquiries', 8);
            animateCount('profileComplete', 85);
        }, 100);
    }, []);

    const animateCount = (key: string, target: number) => {
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

    const quickActions = [
        {
            title: 'Hospital Profile',
            description: 'Update your facility details, amenities, and gallery.',
            icon: Building2,
            link: '/dashboard/hospital/profile',
            gradient: 'from-emerald-500 to-teal-600',
            bg: 'bg-emerald-50',
            textColor: 'text-emerald-700'
        },
        {
            title: 'Manage Doctors',
            description: 'Add or edit doctor profiles and schedules.',
            icon: Users,
            link: '/dashboard/hospital/doctors',
            gradient: 'from-blue-500 to-indigo-600',
            bg: 'bg-blue-50',
            textColor: 'text-blue-700'
        },
        {
            title: 'Patient Inquiries',
            description: 'Respond to new consultation requests.',
            icon: FileText,
            link: '/dashboard/hospital/inquiries',
            gradient: 'from-violet-500 to-purple-600',
            bg: 'bg-violet-50',
            textColor: 'text-violet-700'
        },

    ];

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8 shadow-2xl text-white">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Welcome back, {userName}! 👋</h2>
                        <p className="text-gray-300">Here's what's happening at your facility today.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl transition text-sm font-medium border border-white/10">
                            <Bell className="w-4 h-4" />
                            Notifications
                            <span className="flex h-2 w-2 rounded-full bg-red-500"></span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl transition text-sm font-medium shadow-lg shadow-emerald-500/30">
                            <Search className="w-4 h-4" />
                            Search Records
                        </button>
                    </div>
                </div>

                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <StatCard
                    title="Active Doctors"
                    value={stats.doctors}
                    trend="2 new joined"
                    icon={Users}
                    color="text-blue-500"
                    gradient="from-blue-500/10 to-blue-500/5"
                    borderColor="border-blue-100"
                    animate={animateStats}
                    delay={100}
                />
                <StatCard
                    title="New Inquiries"
                    value={stats.inquiries}
                    trend="5 pending action"
                    icon={FileText}
                    color="text-violet-500"
                    gradient="from-violet-500/10 to-violet-500/5"
                    borderColor="border-violet-100"
                    animate={animateStats}
                    delay={200}
                />
                <StatCard
                    title="Profile Score"
                    value={`${stats.profileComplete}%`}
                    trend="Almost optimized!"
                    icon={Star}
                    color="text-amber-500"
                    gradient="from-amber-500/10 to-amber-500/5"
                    borderColor="border-amber-100"
                    animate={animateStats}
                    delay={300}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quick Actions Panel */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-emerald-600" />
                            Quick Actions
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {quickActions.map((action, index) => (
                            <ActionCard key={action.title} action={action} index={index} />
                        ))}
                    </div>

                    {/* Weekly Performance Mock Chart Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-800">Weekly Performance</h3>
                            <select className="text-sm border-gray-200 rounded-lg text-gray-500 bg-gray-50 px-3 py-1">
                                <option>This Week</option>
                                <option>Last Week</option>
                            </select>
                        </div>
                        <div className="h-48 flex items-end gap-4 justify-between px-2">
                            {/* Mock Bars */}
                            {[40, 65, 45, 80, 55, 70, 60].map((height, i) => (
                                <div key={i} className="w-full bg-gray-50 rounded-t-lg relative group">
                                    <div
                                        className="absolute bottom-0 w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg transition-all duration-1000 group-hover:from-emerald-600 group-hover:to-emerald-500"
                                        style={{ height: `${animateStats ? height : 0}%` }}
                                    ></div>
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-opacity">
                                        {height} visits
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-400">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Recent Activity */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-2">

                            <ActivityItem
                                title="New Inquiry"
                                subtitle="Knee Replacement"
                                time="2 hours ago"
                                icon={FileText}
                                color="bg-violet-100 text-violet-600"
                            />
                            <ActivityItem
                                title="Doctor Added"
                                subtitle="Dr. James • Neuro"
                                time="1 day ago"
                                icon={Users}
                                color="bg-blue-100 text-blue-600"
                            />
                            <ActivityItem
                                title="Profile Updated"
                                subtitle="Facilities section"
                                time="2 days ago"
                                icon={Building2}
                                color="bg-emerald-100 text-emerald-600"
                            />
                        </div>
                        <div className="p-4 border-t border-gray-50 bg-gray-50 text-center">
                            <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition">View All Activity</button>
                        </div>
                    </div>

                    {/* Promotion / Tip Card */}
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                        <h4 className="font-bold text-lg mb-2">Grow your reach 🚀</h4>
                        <p className="text-indigo-100 text-sm mb-4">Complete your profile to 100% to get featured on the home page.</p>
                        <button className="w-full py-2 bg-white text-indigo-600 font-bold rounded-xl text-sm hover:bg-indigo-50 transition shadow-md">
                            Complete Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, trend, icon: Icon, color, gradient, borderColor, animate, delay }: any) {
    return (
        <div
            className={`relative overflow-hidden bg-white rounded-2xl p-6 border ${borderColor} shadow-sm transition-all duration-700 hover:shadow-lg hover:-translate-y-1 group`}
            style={{
                opacity: animate ? 1 : 0,
                transform: animate ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${delay}ms`
            }}
        >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`}></div>

            <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-gray-800">{value}</span>
                    <span className="text-xs font-medium text-emerald-500 mb-1.5 flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" />
                        {trend}
                    </span>
                </div>
            </div>
        </div>
    );
}

function ActionCard({ action, index }: any) {
    const Icon = action.icon;

    return (
        <Link
            href={action.link}
            className={`group relative overflow-hidden bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300`}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <Icon className={`w-6 h-6 ${action.textColor}`} />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                    <ArrowRight className="w-4 h-4" />
                </div>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">
                {action.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
                {action.description}
            </p>
        </Link>
    );
}

function ActivityItem({ title, subtitle, time, icon: Icon, color }: any) {
    return (
        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-gray-800 truncate">{title}</h4>
                <p className="text-xs text-gray-500 truncate">{subtitle}</p>
            </div>
            <span className="text-xs font-medium text-gray-400 whitespace-nowrap">{time}</span>
        </div>
    );
}
