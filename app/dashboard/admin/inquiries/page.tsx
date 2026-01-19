"use client";

import { CheckCircle2, Clock, Mail, MapPin, MessageSquare, Phone, Search, User } from "lucide-react";
import { useEffect, useState } from "react";

interface Inquiry {
    id: number;
    patientName: string;
    email: string;
    subject: string;
    message: string;
    status: 'pending' | 'responded';
    createdAt: string;
    hospitalId?: number | null;
    hospitalName?: string;
    packageId?: number | null;
    inquiryType?: 'general' | 'hospital' | 'package' | 'treatment';
    treatmentType?: string;
    phone?: string;
    country?: string;
}

export default function AdminInquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState('all'); // all | pending | responded



    const fetchInquiries = async () => {
        setLoading(true);
        try {
            // Use relative path to hit Next.js API route proxy
            const response = await fetch('/api/inquiries');
            if (response.ok) {
                const data = await response.json();
                setInquiries(Array.isArray(data) ? data : []);
            } else {
                console.error("Failed to fetch inquiries:", response.status, response.statusText);
                // Don't fall back to mock data silently, let the user know
                // useMockData(); 
            }
        } catch (error) {
            console.error("Failed to fetch inquiries", error);
            // useMockData();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const useMockData = () => {
        setInquiries([
            {
                id: 1,
                patientName: "John Doe",
                email: "john@example.com",
                subject: "Cardiac Surgery Inquiry",
                message: "I am interested in learning more about cardiac surgery options and pricing.\n\nPhone: +1-555-0123\nCountry: United States",
                status: 'pending',
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 2,
                patientName: "Sarah Johnson",
                email: "sarah.j@example.com",
                subject: "Orthopedic Consultation",
                message: "Need information about knee replacement surgery and recovery time.\n\nPhone: +44-20-7123-4567\nCountry: United Kingdom",
                status: 'responded',
                createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 3,
                patientName: "Ahmed Al-Rashid",
                email: "ahmed@example.com",
                subject: "Wellness Retreat Booking",
                message: "Interested in a 2-week wellness and yoga retreat package.\n\nPhone: +971-4-123-4567\nCountry: UAE",
                status: 'pending',
                createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
            }
        ]);
    };

    const handleMarkAsResponded = async (id: number) => {
        try {
            const response = await fetch(`/api/inquiries/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'responded' })
            });
            if (response.ok) {
                fetchInquiries();
            } else {
                const err = await response.json().catch(() => ({}));
                console.error("Update failed:", response.status, err);
                alert(`Failed to update status: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to update inquiry", error);
            alert("Network error updating status");
        }
    };

    const filteredInquiries = inquiries.filter(inquiry => {
        const matchesSearch =
            (inquiry.patientName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (inquiry.subject?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'all' || inquiry.status === filter;
        const matchesType = !inquiry.inquiryType || inquiry.inquiryType === 'general';
        return matchesSearch && matchesFilter && matchesType;
    });


    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">General Consultation Inquiries</h1>
                    <p className="text-sm text-gray-500">Manage general inquiries and consultation requests.</p>
                </div>
                <button
                    onClick={fetchInquiries}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                    <Clock className="w-4 h-4" />
                    Refresh
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by patient name or subject..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none shadow-sm"
                    />
                </div>
                <div className="flex flex-wrap gap-3">
                    <div className="flex gap-2 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'all' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            All Status
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
                    </div>
                </div>
            </div>

            {/* Inquiries List */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="relative">
                        <div className="absolute inset-0 w-14 h-14 border-4 border-pink-300/30 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                        <div className="w-14 h-14 border-4 border-pink-500/30 border-t-pink-600 rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg p-2">
                                <MessageSquare className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>
                    <p className="mt-4 text-slate-600 font-medium animate-pulse">Loading inquiries...</p>
                </div>
            ) : filteredInquiries.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <MessageSquare className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">No inquiries found</h3>
                    <p className="text-slate-500">
                        {searchQuery ? "Try adjusting your search" : "No general inquiries found"}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredInquiries.map((inquiry, index) => (
                        <div
                            key={inquiry.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all duration-300 group"
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Icon/Avatar */}
                                <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${inquiry.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                                    }`}>
                                    {inquiry.status === 'pending' ? <Clock className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                            {inquiry.subject}
                                        </h3>
                                        <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                                            {new Date(inquiry.createdAt).toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                                        <span className="flex items-center gap-1">
                                            <User className="w-4 h-4" />
                                            {inquiry.patientName || 'Unknown'}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Mail className="w-4 h-4" />
                                            {inquiry.email || 'No email'}
                                        </span>
                                        {inquiry.phone && (
                                            <span className="flex items-center gap-1">
                                                <Phone className="w-4 h-4" />
                                                {inquiry.phone}
                                            </span>
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

                                    {inquiry.status === 'pending' && (
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleMarkAsResponded(inquiry.id)}
                                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium shadow-sm transition"
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                Mark as Responded
                                            </button>
                                            <a
                                                href={`mailto:${inquiry.email}`}
                                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition hover:-translate-y-0.5"
                                            >
                                                <MessageSquare className="w-4 h-4" />
                                                Reply via Email
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
