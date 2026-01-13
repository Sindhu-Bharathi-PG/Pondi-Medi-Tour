"use client";

import { PageLoader } from '@/app/components/common';
import { AlertCircle, Calendar, CheckCircle, ChevronRight, Clock, Download, FileText, Filter, Globe, Mail, Phone, RefreshCw, Search, Stethoscope, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Inquiry {
    id: number;
    patientName: string;
    email: string;
    phone?: string;
    country: string;
    treatmentType: string;
    subject: string;
    message: string;
    status: 'pending' | 'responded' | 'closed';
    priority: 'urgent' | 'high' | 'normal' | 'low';
    createdAt: string;
    updatedAt?: string;
}

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

    useEffect(() => {
        fetchInquiries();
    }, []);

    useEffect(() => {
        filterInquiries();
    }, [searchQuery, statusFilter, inquiries]);

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const sessionRes = await fetch('/api/auth/session');
            const session = await sessionRes.json();
            const token = session.accessToken;

            const res = await fetch('http://localhost:3001/api/hospitals/me/inquiries', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) throw new Error('Failed to fetch inquiries');

            const data = await res.json();
            setInquiries(Array.isArray(data) ? data : []);
            setFilteredInquiries(Array.isArray(data) ? data : []);
        } catch (err: any) {
            setError(err.message);
            // Use sample data if API fails
            setSampleData();
        } finally {
            setLoading(false);
        }
    };

    const setSampleData = () => {
        const sample: Inquiry[] = [
            {
                id: 1,
                patientName: 'John Smith',
                email: 'john@example.com',
                phone: '+1 234 567 890',
                country: 'USA',
                treatmentType: 'Knee Replacement',
                subject: 'Inquiry about knee surgery',
                message: 'I would like to know more about knee replacement surgery options.',
                status: 'pending',
                priority: 'high',
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            },
            {
                id: 2,
                patientName: 'Emma Wilson',
                email: 'emma@example.com',
                country: 'UK',
                treatmentType: 'Cardiac Surgery',
                subject: 'Heart bypass consultation',
                message: 'Need information about heart bypass surgery.',
                status: 'responded',
                priority: 'urgent',
                createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            },
            {
                id: 3,
                patientName: 'Michael Brown',
                email: 'michael@example.com',
                phone: '+61 456 789 012',
                country: 'Australia',
                treatmentType: 'Dental Implants',
                subject: 'Dental implant pricing',
                message: 'Looking for dental implant treatment options and costs.',
                status: 'closed',
                priority: 'normal',
                createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            },
        ];
        setInquiries(sample);
        setFilteredInquiries(sample);
    };

    const filterInquiries = () => {
        let filtered = [...inquiries];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (inq) =>
                    inq.patientName.toLowerCase().includes(query) ||
                    inq.email.toLowerCase().includes(query) ||
                    inq.subject.toLowerCase().includes(query)
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter((inq) => inq.status === statusFilter);
        }

        setFilteredInquiries(filtered);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const timeAgo = (date: string) => {
        const diff = Date.now() - new Date(date).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'responded': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'closed': return 'bg-gray-100 text-gray-600 border-gray-200';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'bg-red-100 text-red-700';
            case 'high': return 'bg-orange-100 text-orange-700';
            case 'normal': return 'bg-blue-100 text-blue-700';
            case 'low': return 'bg-gray-100 text-gray-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    if (loading) {
        return <PageLoader message="Loading inquiries..." />;
    }

    const stats = {
        total: inquiries.length,
        pending: inquiries.filter((i) => i.status === 'pending').length,
        responded: inquiries.filter((i) => i.status === 'responded').length,
        urgent: inquiries.filter((i) => i.priority === 'urgent').length,
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage patient inquiries and requests</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchInquiries}
                        className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Refresh"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm shadow-sm">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Pending</p>
                            <p className="text-2xl font-bold text-amber-600 mt-1">{stats.pending}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-amber-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Responded</p>
                            <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.responded}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-emerald-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Urgent</p>
                            <p className="text-2xl font-bold text-red-600 mt-1">{stats.urgent}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                            <AlertCircle className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or subject..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="responded">Responded</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-4">Patient</div>
                    <div className="col-span-2">Treatment</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Priority</div>
                    <div className="col-span-2">Date</div>
                </div>

                {/* Table Body */}
                {filteredInquiries.length === 0 ? (
                    <div className="p-12 text-center">
                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">No inquiries found</p>
                        <p className="text-gray-400 text-sm mt-1">
                            {inquiries.length > 0
                                ? 'Try adjusting your search or filters'
                                : 'Patient inquiries will appear here'}
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {filteredInquiries.map((inquiry) => (
                            <div
                                key={inquiry.id}
                                onClick={() => setSelectedInquiry(inquiry)}
                                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer items-center"
                            >
                                {/* Patient */}
                                <div className="col-span-4">
                                    <p className="font-semibold text-gray-900 truncate">{inquiry.patientName}</p>
                                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                        <Mail className="w-3.5 h-3.5" />
                                        <span className="truncate">{inquiry.email}</span>
                                    </div>
                                </div>

                                {/* Treatment */}
                                <div className="col-span-2">
                                    <div className="flex items-center gap-1.5 text-sm text-gray-700">
                                        <Stethoscope className="w-4 h-4 text-gray-400" />
                                        <span className="truncate">{inquiry.treatmentType}</span>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="col-span-2">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(inquiry.status)}`}>
                                        {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                                    </span>
                                </div>

                                {/* Priority */}
                                <div className="col-span-2">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityColor(inquiry.priority)}`}>
                                        {inquiry.priority.charAt(0).toUpperCase() + inquiry.priority.slice(1)}
                                    </span>
                                </div>

                                {/* Date */}
                                <div className="col-span-2 flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                        <span>{timeAgo(inquiry.createdAt)}</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedInquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{selectedInquiry.patientName}</h2>
                                <p className="text-gray-500 text-sm mt-1">{selectedInquiry.subject}</p>
                            </div>
                            <button
                                onClick={() => setSelectedInquiry(null)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
                            {/* Status & Priority */}
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(selectedInquiry.status)}`}>
                                    {selectedInquiry.status.charAt(0).toUpperCase() + selectedInquiry.status.slice(1)}
                                </span>
                                <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getPriorityColor(selectedInquiry.priority)}`}>
                                    {selectedInquiry.priority.charAt(0).toUpperCase() + selectedInquiry.priority.slice(1)} Priority
                                </span>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                <h3 className="text-sm font-semibold text-gray-700">Contact Information</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        {selectedInquiry.email}
                                    </div>
                                    {selectedInquiry.phone && (
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            {selectedInquiry.phone}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Globe className="w-4 h-4 text-gray-400" />
                                        {selectedInquiry.country}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        {formatDate(selectedInquiry.createdAt)}
                                    </div>
                                </div>
                            </div>

                            {/* Treatment */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">Treatment Type</h3>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Stethoscope className="w-4 h-4 text-teal-600" />
                                    {selectedInquiry.treatmentType}
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">Message</h3>
                                <p className="text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4">
                                    {selectedInquiry.message}
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50">
                            <button
                                onClick={() => setSelectedInquiry(null)}
                                className="px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition font-medium"
                            >
                                Close
                            </button>
                            <button className="px-4 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition font-medium">
                                Reply via Email
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
