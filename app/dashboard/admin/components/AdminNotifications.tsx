"use client";

import { Bell, Building2, CheckCircle2, MessageSquare, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Notification {
    id: number;
    title: string;
    message: string;
    type: 'inquiry' | 'approval' | 'system' | 'info';
    isRead: boolean;
    createdAt: string;
    linkUrl?: string;
}

export default function AdminNotifications() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/admin/notifications');
            if (response.ok) {
                const data = await response.json();
                if (data.success && data.data) {
                    setNotifications(data.data);
                }
            } else {
                // Use mock data as fallback
                setNotifications(getMockNotifications());
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
            setNotifications(getMockNotifications());
        } finally {
            setLoading(false);
        }
    };

    const getMockNotifications = (): Notification[] => [
        {
            id: 1,
            title: "New Hospital Registration",
            message: "Apollo Hospital has submitted a registration request",
            type: "approval",
            isRead: false,
            createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            linkUrl: "/dashboard/admin/approvals"
        },
        {
            id: 2,
            title: "New Inquiry Received",
            message: "Patient inquiry about cardiac surgery",
            type: "inquiry",
            isRead: false,
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            linkUrl: "/dashboard/admin/inquiries"
        },
        {
            id: 3,
            title: "Weekly Report Ready",
            message: "Your weekly analytics report is ready to view",
            type: "system",
            isRead: true,
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            linkUrl: "/dashboard/admin/analytics"
        }
    ];

    const markAsRead = async (id: number) => {
        try {
            await fetch(`/api/admin/notifications/${id}/read`, { method: 'PATCH' });
            setNotifications(prev =>
                prev.map(n => n.id === id ? { ...n, isRead: true } : n)
            );
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await fetch('/api/admin/notifications/read-all', { method: 'PATCH' });
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'approval': return Building2;
            case 'inquiry': return MessageSquare;
            case 'system': return CheckCircle2;
            default: return Bell;
        }
    };

    const getIconColor = (type: string) => {
        switch (type) {
            case 'approval': return 'text-amber-600 bg-amber-50';
            case 'inquiry': return 'text-pink-600 bg-pink-50';
            case 'system': return 'text-emerald-600 bg-emerald-50';
            default: return 'text-violet-600 bg-violet-50';
        }
    };

    const formatTime = (date: string) => {
        const now = new Date();
        const past = new Date(date);
        const diffMs = now.getTime() - past.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);

        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${Math.floor(diffHours / 24)}d ago`;
    };

    return (
        <div className="relative">
            {/* Bell Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
                <Bell className="w-5 h-5 text-slate-600" />
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Panel */}
                    <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
                        {/* Header */}
                        <div className="px-4 py-3 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Bell className="w-4 h-4 text-violet-600" />
                                <h3 className="font-bold text-slate-900">Notifications</h3>
                                {unreadCount > 0 && (
                                    <span className="px-2 py-0.5 bg-violet-600 text-white text-xs font-medium rounded-full">
                                        {unreadCount} new
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/50 rounded-lg transition"
                            >
                                <X className="w-4 h-4 text-slate-400" />
                            </button>
                        </div>

                        {/* Notifications List */}
                        <div className="max-h-80 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="py-8 text-center">
                                    <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                    <p className="text-slate-500 text-sm">No notifications yet</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {notifications.map((notification) => {
                                        const Icon = getIcon(notification.type);
                                        return (
                                            <a
                                                key={notification.id}
                                                href={notification.linkUrl || '#'}
                                                onClick={() => markAsRead(notification.id)}
                                                className={`block px-4 py-3 hover:bg-slate-50 transition ${!notification.isRead ? 'bg-violet-50/30' : ''
                                                    }`}
                                            >
                                                <div className="flex gap-3">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconColor(notification.type)}`}>
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <p className={`text-sm font-medium truncate ${!notification.isRead ? 'text-slate-900' : 'text-slate-600'
                                                                }`}>
                                                                {notification.title}
                                                            </p>
                                                            {!notification.isRead && (
                                                                <span className="w-2 h-2 bg-violet-500 rounded-full flex-shrink-0 mt-1.5" />
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-slate-500 truncate mt-0.5">
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-slate-400 mt-1">
                                                            {formatTime(notification.createdAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </a>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {notifications.length > 0 && (
                            <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                <button
                                    onClick={markAllAsRead}
                                    className="text-sm text-violet-600 hover:text-violet-700 font-medium"
                                >
                                    Mark all as read
                                </button>
                                <a
                                    href="/dashboard/admin/notifications"
                                    className="text-sm text-slate-500 hover:text-slate-700"
                                >
                                    View all
                                </a>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
