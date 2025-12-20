"use client";

import { API_BASE, apiCall, useApi } from "@/app/hooks/useApi";
import { AlertCircle, ArrowLeft, CheckCircle2, Clock, Flag, Inbox, Mail, MapPin, MessageCircle, Phone, Search, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { EmptyState, ErrorState, LoadingSpinner } from "../components/LoadingStates";

interface Inquiry {
    id: number;
    patientName: string;
    email: string;
    phone?: string;
    country?: string;
    treatmentType?: string;
    subject: string;
    message: string;
    status: 'pending' | 'responded' | 'closed' | 'spam';
    priority?: 'low' | 'normal' | 'high' | 'urgent';
    respondedAt?: string;
    createdAt: string;
    source?: string;
}

export default function InquiriesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');

    // Use optimized API hook
    const { data: inquiries, loading, error, refetch } = useApi<Inquiry[]>({
        url: `${API_BASE}/api/hospitals/me/inquiries`,
        initialData: []
    });

    const handleUpdateStatus = async (id: number, status: string) => {
        try {
            const body: any = { status };
            if (status === 'responded') {
                body.respondedAt = new Date().toISOString();
            }
            await apiCall(`/api/hospitals/me/inquiries/${id}`, 'PUT', body);
            await refetch();
        } catch (error: any) {
            console.error("Failed to update inquiry status", error);
            alert(error.message || "Failed to update status. Please try again.");
        }
    };

    const handleUpdatePriority = async (id: number, priority: string) => {
        try {
            await apiCall(`/api/hospitals/me/inquiries/${id}`, 'PUT', { priority });
            await refetch();
        } catch (error: any) {
            console.error("Failed to update priority", error);
            alert(error.message || "Failed to update priority. Please try again.");
        }
    };

    const getPriorityBadge = (priority?: string) => {
        switch (priority) {
            case 'urgent':
                return <span className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 rounded-lg text-xs font-semibold">
                    <AlertCircle className="w-3 h-3" />
                    Urgent
                </span>;
            case 'high':
                return <span className="flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-700 rounded-lg text-xs font-semibold">
                    <Flag className="w-3 h-3" />
                    High
                </span>;
            case 'normal':
                return <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">Normal</span>;
            case 'low':
                return <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium">Low</span>;
            default:
                return null;
        }
    };

    const filteredInquiries = (inquiries || []).filter(inquiry => {
        const matchesSearch =
            (inquiry.patientName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (inquiry.subject?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (inquiry.country?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (inquiry.treatmentType?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        const matchesStatus = filter === 'all' || inquiry.status === filter;
        const matchesPriority = priorityFilter === 'all' || inquiry.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
    });

    // Sort by priority and date
    const sortedInquiries = [...filteredInquiries].sort((a, b) => {
        // Priority order: urgent > high > normal > low
        const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
        const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] ?? 2;
        const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] ?? 2;

        if (aPriority !== bPriority) return aPriority - bPriority;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Safe array for stats (handles null)
    const safeInquiries = inquiries || [];

    if (loading) {
        return <LoadingSpinner message="Loading inquiries..." />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={refetch} showLogin />;
    }

    if (safeInquiries.length === 0) {
        return (
            <div className="min-h-full bg-gray-50/50 p-8">
                <Link href="/dashboard/hospital" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-purple-600 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
                <EmptyState
                    title="No Inquiries Yet"
                    description="When patients submit inquiries, they will appear here."
                    icon={<Inbox className="w-8 h-8 text-purple-500" />}
                />
            </div>
        );
    }

    return (
        <div className="min-h-full bg-gray-50/50">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/dashboard/hospital"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-purple-600 mb-2 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Patient Inquiries</h1>
                    <p className="text-gray-500 mt-1">Manage and respond to patient questions and consultations.</p>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <div className="text-2xl font-bold text-gray-900">{safeInquiries.filter(i => i.status === 'pending').length}</div>
                        <div className="text-sm text-gray-500">Pending</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <div className="text-2xl font-bold text-emerald-600">{safeInquiries.filter(i => i.status === 'responded').length}</div>
                        <div className="text-sm text-gray-500">Responded</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <div className="text-2xl font-bold text-red-600">{safeInquiries.filter(i => i.priority === 'urgent').length}</div>
                        <div className="text-sm text-gray-500">Urgent</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <div className="text-2xl font-bold text-gray-900">{safeInquiries.length}</div>
                        <div className="text-sm text-gray-500">Total</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by patient name, subject, country or treatment..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none shadow-sm"
                        />
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {/* Status Filter */}
                        <div className="flex gap-2 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'all' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('pending')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'pending' ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => setFilter('responded')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'responded' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                Responded
                            </button>
                            <button
                                onClick={() => setFilter('closed')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'closed' ? 'bg-gray-50 text-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                Closed
                            </button>
                        </div>

                        {/* Priority Filter */}
                        <div className="flex gap-2 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
                            <button
                                onClick={() => setPriorityFilter('all')}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${priorityFilter === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                All Priority
                            </button>
                            <button
                                onClick={() => setPriorityFilter('urgent')}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${priorityFilter === 'urgent' ? 'bg-red-50 text-red-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                Urgent
                            </button>
                            <button
                                onClick={() => setPriorityFilter('high')}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${priorityFilter === 'high' ? 'bg-orange-50 text-orange-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                High
                            </button>
                        </div>
                    </div>
                </div>

                {/* Inquiries List */}
                {loading ? (
                    <div className="text-center py-12">Loading...</div>
                ) : sortedInquiries.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">No inquiries found.</div>
                ) : (
                    <div className="space-y-4">
                        {sortedInquiries.map((inquiry, index) => (
                            <div
                                key={inquiry.id}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all duration-300 group"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Icon/Avatar */}
                                    <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${inquiry.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                                        inquiry.status === 'responded' ? 'bg-emerald-50 text-emerald-600' :
                                            'bg-gray-50 text-gray-600'
                                        }`}>
                                        {inquiry.status === 'pending' ? <Clock className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                                    {inquiry.subject}
                                                </h3>
                                                {inquiry.priority && getPriorityBadge(inquiry.priority)}
                                                {inquiry.treatmentType && (
                                                    <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">
                                                        {inquiry.treatmentType}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                                                {new Date(inquiry.createdAt).toLocaleString()}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3 flex-wrap">
                                            <span className="flex items-center gap-1">
                                                <User className="w-4 h-4" />
                                                {inquiry.patientName || 'Unknown'}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Mail className="w-4 h-4" />
                                                {inquiry.email || 'No email'}
                                            </span>
                                            {inquiry.phone && (
                                                <a href={`tel:${inquiry.phone}`} className="flex items-center gap-1 hover:text-purple-600 transition">
                                                    <Phone className="w-4 h-4" />
                                                    {inquiry.phone}
                                                </a>
                                            )}
                                            {inquiry.country && (
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {inquiry.country}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-gray-600 leading-relaxed mb-4 p-4 bg-gray-50 rounded-xl text-sm border border-gray-100 whitespace-pre-wrap">
                                            {inquiry.message}
                                        </p>

                                        {inquiry.respondedAt && (
                                            <div className="text-xs text-emerald-600 mb-3 flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" />
                                                Responded on {new Date(inquiry.respondedAt).toLocaleString()}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-3 flex-wrap">
                                            {inquiry.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleUpdateStatus(inquiry.id, 'responded')}
                                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition shadow-sm"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                        Mark as Responded
                                                    </button>
                                                    <a
                                                        href={`mailto:${inquiry.email}`}
                                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition hover:-translate-y-0.5"
                                                    >
                                                        <MessageCircle className="w-4 h-4" />
                                                        Reply
                                                    </a>
                                                </>
                                            )}

                                            {inquiry.status === 'responded' && (
                                                <button
                                                    onClick={() => handleUpdateStatus(inquiry.id, 'closed')}
                                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition"
                                                >
                                                    Close Inquiry
                                                </button>
                                            )}

                                            {/* Priority Dropdown */}
                                            <select
                                                value={inquiry.priority || 'normal'}
                                                onChange={(e) => handleUpdatePriority(inquiry.id, e.target.value)}
                                                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition cursor-pointer"
                                            >
                                                <option value="low">Low Priority</option>
                                                <option value="normal">Normal Priority</option>
                                                <option value="high">High Priority</option>
                                                <option value="urgent">Urgent</option>
                                            </select>
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
