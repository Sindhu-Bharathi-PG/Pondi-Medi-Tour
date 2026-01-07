"use client";

import {
    Activity,
    ArrowDown,
    ArrowUp,
    Building2,
    Calendar,
    Eye,
    Mail,
    MessageSquare,
    TrendingUp,
    Users
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AnalyticsPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [timeRange, setTimeRange] = useState('30d'); // 7d, 30d, 90d
    const [metrics, setMetrics] = useState({
        totalUsers: { value: 0, change: 0, trend: 'up' as const },
        totalHospitals: { value: 0, change: 0, trend: 'up' as const },
        totalInquiries: { value: 0, change: 0, trend: 'up' as const },
        pageViews: { value: 0, change: 0, trend: 'up' as const },
    });
    const [topHospitals, setTopHospitals] = useState<any[]>([]);
    const [recentActivity, setRecentActivity] = useState<any[]>([]);

    useEffect(() => {
        fetchAnalyticsData();
    }, [timeRange]);

    const fetchAnalyticsData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch stats
            const statsResponse = await fetch(`/api/admin/analytics/stats?timeRange=${timeRange}`);
            if (statsResponse.ok) {
                const statsData = await statsResponse.json();
                if (statsData.success && statsData.data) {
                    setMetrics(statsData.data);
                }
            }

            // Fetch top hospitals
            const hospitalsResponse = await fetch('/api/admin/analytics/top-hospitals');
            if (hospitalsResponse.ok) {
                const hospitalsData = await hospitalsResponse.json();
                if (hospitalsData.success && hospitalsData.data) {
                    setTopHospitals(hospitalsData.data);
                }
            }

            // Fetch activity feed
            const activityResponse = await fetch('/api/admin/analytics/activity?limit=5');
            if (activityResponse.ok) {
                const activityData = await activityResponse.json();
                if (activityData.success && activityData.data) {
                    // Map backend data to component format
                    const mappedActivity = activityData.data.map((item: any) => ({
                        type: item.targetType || 'user',
                        action: item.description || item.actionType,
                        user: item.metadata?.targetName || 'Unknown',
                        time: formatTimeAgo(item.createdAt),
                        icon: getIconForType(item.targetType)
                    }));
                    setRecentActivity(mappedActivity);
                } else {
                    // Use default mock data if API returns empty
                    setRecentActivity(getDefaultActivity());
                }
            } else {
                // Fallback to mock data
                setRecentActivity(getDefaultActivity());
            }
        } catch (err) {
            console.error('Error fetching analytics:', err);
            setError('Failed to load analytics data');
            // Use mock data as fallback
            setRecentActivity(getDefaultActivity());
        } finally {
            setLoading(false);
        }
    };

    const formatTimeAgo = (date: string) => {
        const now = new Date();
        const past = new Date(date);
        const diffMs = now.getTime() - past.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);

        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        return `${Math.floor(diffHours / 24)} day${Math.floor(diffHours / 24) > 1 ? 's' : ''} ago`;
    };

    const getIconForType = (type: string) => {
        switch (type) {
            case 'user': return Users;
            case 'hospital': return Building2;
            case 'inquiry': return MessageSquare;
            default: return Eye;
        }
    };

    const getDefaultActivity = () => [
        { type: 'user', action: 'New user registered', user: 'john@example.com', time: '5 min ago', icon: Users },
        { type: 'hospital', action: 'Hospital approved', user: 'Apollo Hospital', time: '15 min ago', icon: Building2 },
        { type: 'inquiry', action: 'New inquiry received', user: 'Sarah Johnson', time: '1 hour ago', icon: MessageSquare },
        { type: 'view', action: 'High traffic on packages page', user: '234 views', time: '2 hours ago', icon: Eye },
        { type: 'email', action: 'Bulk email sent', user: '500 recipients', time: '3 hours ago', icon: Mail },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="relative inline-block mb-4">
                        <div className="absolute inset-0 w-16 h-16 border-4 border-violet-300/30 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                        <div className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-600 rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl p-2 shadow-lg">
                                <Activity className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>
                    <p className="text-slate-600 font-medium">Loading analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg shadow-violet-500/25">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        Analytics Dashboard
                    </h1>
                    <p className="text-slate-600 mt-1">Platform insights and performance metrics</p>
                </div>
                <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    {['7d', '30d', '90d'].map(range => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${timeRange === range
                                ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg'
                                : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            Last {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Users', data: metrics.totalUsers, icon: Users, gradient: 'from-violet-500 to-purple-600' },
                    { label: 'Hospitals', data: metrics.totalHospitals, icon: Building2, gradient: 'from-cyan-500 to-blue-600' },
                    { label: 'Inquiries', data: metrics.totalInquiries, icon: MessageSquare, gradient: 'from-pink-500 to-rose-600' },
                    { label: 'Page Views', data: metrics.pageViews, icon: Eye, gradient: 'from-emerald-500 to-teal-600' },
                ].map((metric, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center shadow-lg`}>
                                <metric.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${metric.data.trend === 'up'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-rose-50 text-rose-700'
                                }`}>
                                {metric.data.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                {Math.abs(metric.data.change)}%
                            </div>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-900">{metric.data.value.toLocaleString()}</p>
                            <p className="text-sm text-slate-500 mt-1">{metric.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Top Hospitals */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Top Performing Hospitals</h3>
                        <TrendingUp className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="space-y-4">
                        {topHospitals.map((hospital, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center text-violet-700 font-bold text-sm">
                                    {i + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-slate-900">{hospital.name}</p>
                                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                                        <span>{hospital.inquiries} inquiries</span>
                                        <span>•</span>
                                        <span>⭐ {hospital.rating}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                                    <ArrowUp className="w-3 h-3" />
                                    {hospital.growth}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
                        <Calendar className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="space-y-4">
                        {recentActivity.map((activity, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                                    <activity.icon className="w-4 h-4 text-slate-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                                    <p className="text-xs text-slate-500 truncate">{activity.user}</p>
                                </div>
                                <span className="text-xs text-slate-400 whitespace-nowrap">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Traffic Overview Chart - CSS Based */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900">Traffic Overview</h3>
                    <span className="text-sm text-slate-500">Last 7 days</span>
                </div>
                <div className="h-64 flex items-end justify-between gap-2 px-4">
                    {[
                        { day: 'Mon', value: 65, label: '650' },
                        { day: 'Tue', value: 80, label: '800' },
                        { day: 'Wed', value: 45, label: '450' },
                        { day: 'Thu', value: 90, label: '900' },
                        { day: 'Fri', value: 75, label: '750' },
                        { day: 'Sat', value: 55, label: '550' },
                        { day: 'Sun', value: 40, label: '400' },
                    ].map((item, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                            <span className="text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.label}
                            </span>
                            <div
                                className="w-full bg-gradient-to-t from-violet-500 to-purple-400 rounded-t-lg transition-all duration-700 hover:from-violet-600 hover:to-purple-500 cursor-pointer relative group"
                                style={{
                                    height: `${item.value}%`,
                                    animation: `grow-bar 1s ease-out ${i * 0.1}s both`
                                }}
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {item.label} views
                                </div>
                            </div>
                            <span className="text-xs font-medium text-slate-600">{item.day}</span>
                        </div>
                    ))}
                </div>
                <style jsx>{`
                    @keyframes grow-bar {
                        from { height: 0%; opacity: 0; }
                        to { opacity: 1; }
                    }
                `}</style>
            </div>
        </div>
    );
}
