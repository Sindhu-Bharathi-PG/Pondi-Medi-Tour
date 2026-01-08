"use client";

import { API_BASE, apiCall } from "@/app/hooks/useApi";
import { Bell, Check, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Notification {
    id: number;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    link_url: string | null;
    is_read: boolean;
    created_at: string;
}

export default function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fetch notifications
    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('authToken');
            if (!token) return;

            const response = await fetch(`${API_BASE}/api/notifications`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setNotifications(data.notifications || []);
                setUnreadCount(data.unreadCount || 0);
            }
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    // Mark as read
    const markAsRead = async (id: number) => {
        try {
            await apiCall(`/api/notifications/${id}/read`, 'PATCH');
            setNotifications(prev =>
                prev.map(n => n.id === id ? { ...n, is_read: true } : n)
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    // Mark all as read
    const markAllAsRead = async () => {
        try {
            await apiCall('/api/notifications/mark-all-read', 'POST');
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error('Failed to mark all as read:', error);
        }
    };

    // Load on mount
    useEffect(() => {
        fetchNotifications();
        // Poll every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'success': return 'bg-emerald-50 border-emerald-200 text-emerald-700';
            case 'warning': return 'bg-amber-50 border-amber-200 text-amber-700';
            case 'error': return 'bg-red-50 border-red-200 text-red-700';
            default: return 'bg-blue-50 border-blue-200 text-blue-700';
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

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Notifications"
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                        <h3 className="font-bold text-gray-900">Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                            >
                                <Check className="w-3 h-3" />
                                Mark all read
                            </button>
                        )}
                    </div>

                    {/* List */}
                    <div className="max-h-80 overflow-y-auto">
                        {loading && notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-400">
                                <div className="animate-spin w-6 h-6 border-2 border-gray-300 border-t-indigo-600 rounded-full mx-auto" />
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="p-8 text-center">
                                <Bell className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">No notifications yet</p>
                            </div>
                        ) : (
                            notifications.slice(0, 10).map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${!notif.is_read ? 'bg-indigo-50/50' : ''
                                        }`}
                                    onClick={() => !notif.is_read && markAsRead(notif.id)}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!notif.is_read ? 'bg-indigo-500' : 'bg-gray-300'
                                            }`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 text-sm truncate">{notif.title}</p>
                                            <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">{notif.message}</p>
                                            <p className="text-gray-400 text-xs mt-1">{formatTime(notif.created_at)}</p>
                                        </div>
                                        {notif.link_url && (
                                            <a href={notif.link_url} className="text-gray-400 hover:text-indigo-600">
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                            <button className="w-full text-center text-xs text-indigo-600 hover:text-indigo-700 font-medium py-1">
                                View all notifications
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
