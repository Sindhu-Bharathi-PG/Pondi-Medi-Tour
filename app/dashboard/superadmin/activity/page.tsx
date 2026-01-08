"use client";

import { API_BASE } from "@/app/hooks/useApi";
import { Activity, Calendar, Filter, User } from "lucide-react";
import { useEffect, useState } from "react";

interface ActivityLog {
    id: number;
    action_type: string;
    target_type: string;
    target_id: string;
    description: string;
    actor_name: string;
    actor_email: string;
    created_at: string;
}

export default function ActivityPage() {
    const [logs, setLogs] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    const fetchLogs = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const res = await fetch(`${API_BASE}/api/admin/activity-logs`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setLogs(data.logs || []);
            }
        } catch (error) {
            console.error('Failed to fetch logs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const getActionColor = (action: string) => {
        if (action.includes('approved')) return 'bg-emerald-500';
        if (action.includes('rejected')) return 'bg-red-500';
        if (action.includes('created')) return 'bg-blue-500';
        if (action.includes('updated')) return 'bg-amber-500';
        if (action.includes('deleted')) return 'bg-rose-500';
        return 'bg-slate-500';
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `${mins}m ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Activity Logs</h1>
                    <p className="text-slate-500 text-sm mt-1">Track all administrative actions</p>
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    >
                        <option value="all">All Actions</option>
                        <option value="approved">Approvals</option>
                        <option value="rejected">Rejections</option>
                        <option value="created">Created</option>
                        <option value="updated">Updated</option>
                    </select>
                </div>
            </div>

            {/* Activity List */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
                        <p className="text-slate-500 mt-4">Loading activity...</p>
                    </div>
                ) : logs.length === 0 ? (
                    <div className="p-12 text-center">
                        <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No activity logs yet</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {logs.map((log) => (
                            <div key={log.id} className="p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${getActionColor(log.action_type)}`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-slate-900 font-medium">
                                            {log.description || `${log.action_type} on ${log.target_type}`}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500">
                                            <span className="flex items-center gap-1.5">
                                                <User className="w-4 h-4" />
                                                {log.actor_name || log.actor_email || 'System'}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" />
                                                {formatTime(log.created_at)}
                                            </span>
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-mono">
                                                {log.action_type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
