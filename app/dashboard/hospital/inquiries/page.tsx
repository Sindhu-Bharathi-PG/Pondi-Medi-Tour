"use client";

import { PageLoader } from '@/app/components/common';
import { AlertCircle, Building2, Calendar, CheckCircle, ChevronRight, Clock, Download, ExternalLink, FileText, Filter, Globe, Mail, MessageSquare, Package, Phone, RefreshCw, Search, Send, Stethoscope, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Inquiry {
    id: number;
    patientName: string;
    email: string;
    phone?: string;
    country?: string;
    treatmentType?: string;
    packageName?: string;
    packageId?: number;
    hospitalId?: number;
    inquiryType?: string;
    subject: string;
    message: string;
    status: 'pending' | 'responded' | 'closed';
    priority: 'urgent' | 'high' | 'normal' | 'low';
    source?: string;
    sourcePage?: string;
    responseNotes?: string;
    respondedAt?: string;
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
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [showResponseForm, setShowResponseForm] = useState(false);
    const [responseText, setResponseText] = useState('');
    const [newStatus, setNewStatus] = useState<'pending' | 'responded' | 'closed'>('responded');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchInquiries();
    }, []);

    useEffect(() => {
        filterInquiries();
    }, [searchQuery, statusFilter, priorityFilter, inquiries]);

    const fetchInquiries = async () => {
        setLoading(true);
        setError(null);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const res = await fetch('/api/hospitals/me/inquiries', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                if (res.status === 401) throw new Error('Please log in to view inquiries');
                if (res.status === 403) throw new Error('You do not have access to this hospital\'s inquiries');
                if (res.status === 503) throw new Error('Backend server is not running');
                const details = errorData.details ? ` (${errorData.details})` : '';
                throw new Error((errorData.error || 'Failed to fetch inquiries') + details);
            }

            const rawData = await res.json();
            const inquiriesArray = (Array.isArray(rawData) ? rawData : []).map((item: any) => ({
                id: item.id,
                patientName: item.patient_name || item.patientName,
                email: item.email,
                phone: item.phone,
                country: item.country,
                treatmentType: item.treatment_type || item.treatmentType,
                packageName: item.package_name || item.packageName,
                packageId: item.package_id || item.packageId,
                hospitalId: item.hospital_id || item.hospitalId,
                inquiryType: item.inquiry_type || item.inquiryType,
                subject: item.subject,
                message: item.message,
                status: item.status,
                priority: item.priority,
                source: item.source,
                sourcePage: item.source_page || item.sourcePage,
                responseNotes: item.response_notes || item.responseNotes,
                respondedAt: item.responded_at || item.respondedAt,
                createdAt: item.created_at || item.createdAt,
                updatedAt: item.updated_at || item.updatedAt
            }));

            setInquiries(inquiriesArray);
            setFilteredInquiries(inquiriesArray);
        } catch (err: any) {
            if (err.name === 'AbortError') {
                setError('Request timed out. Backend might be slow or unreachable.');
            } else {
                setError(err.message || 'Failed to load inquiries');
            }
            setInquiries([]);
            setFilteredInquiries([]);
        } finally {
            setLoading(false);
        }
    };

    const filterInquiries = () => {
        let filtered = [...inquiries];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (inq) =>
                    inq.patientName.toLowerCase().includes(query) ||
                    inq.email.toLowerCase().includes(query) ||
                    inq.subject.toLowerCase().includes(query) ||
                    (inq.packageName?.toLowerCase().includes(query))
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter((inq) => inq.status === statusFilter);
        }

        if (priorityFilter !== 'all') {
            filtered = filtered.filter((inq) => inq.priority === priorityFilter);
        }

        setFilteredInquiries(filtered);
    };

    const handleRespond = async () => {
        if (!selectedInquiry || !responseText.trim()) return;

        setSubmitting(true);
        try {
            const res = await fetch(`/api/hospitals/me/inquiries/${selectedInquiry.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    status: newStatus,
                    responseNotes: responseText,
                    respondedAt: new Date().toISOString()
                })
            });

            if (res.ok) {
                // Update local state
                const updated = inquiries.map(inq =>
                    inq.id === selectedInquiry.id
                        ? { ...inq, status: newStatus, responseNotes: responseText, respondedAt: new Date().toISOString() }
                        : inq
                );
                setInquiries(updated);
                setSelectedInquiry({ ...selectedInquiry, status: newStatus, responseNotes: responseText });
                setShowResponseForm(false);
                setResponseText('');
            } else {
                alert('Failed to update inquiry. Please try again.');
            }
        } catch (err) {
            console.error('Error updating inquiry:', err);
            alert('Failed to update inquiry. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const timeAgo = (date: string) => {
        const diff = Date.now() - new Date(date).getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days}d ago`;
        return formatDate(date);
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
            case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
            case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'normal': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'low': return 'bg-gray-100 text-gray-600 border-gray-200';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getInquiryTypeIcon = (inquiry: Inquiry) => {
        if (inquiry.packageId || inquiry.packageName) return <Package className="w-4 h-4 text-purple-500" />;
        if (inquiry.inquiryType === 'hospital') return <Building2 className="w-4 h-4 text-blue-500" />;
        return <Stethoscope className="w-4 h-4 text-teal-500" />;
    };

    if (loading) {
        return <PageLoader message="Loading inquiries..." />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Error Loading Inquiries</h2>
                <p className="text-gray-600 text-center max-w-md">{error}</p>
                <button
                    onClick={fetchInquiries}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                </button>
            </div>
        );
    }

    const stats = {
        total: inquiries.length,
        pending: inquiries.filter((i) => i.status === 'pending').length,
        responded: inquiries.filter((i) => i.status === 'responded').length,
        closed: inquiries.filter((i) => i.status === 'closed').length,
        urgent: inquiries.filter((i) => i.priority === 'urgent' || i.priority === 'high').length,
        packages: inquiries.filter((i) => i.packageId || i.packageName).length,
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Patient Inquiries</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage and respond to patient inquiries and quote requests</p>
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
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Pending</p>
                            <p className="text-2xl font-bold text-amber-600 mt-1">{stats.pending}</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-amber-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Responded</p>
                            <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.responded}</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Closed</p>
                            <p className="text-2xl font-bold text-gray-600 mt-1">{stats.closed}</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-gray-500" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">High Priority</p>
                            <p className="text-2xl font-bold text-red-600 mt-1">{stats.urgent}</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Packages</p>
                            <p className="text-2xl font-bold text-purple-600 mt-1">{stats.packages}</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                            <Package className="w-5 h-5 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, subject, or package..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="responded">Responded</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="all">All Priority</option>
                            <option value="urgent">Urgent</option>
                            <option value="high">High</option>
                            <option value="normal">Normal</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Inquiries List */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-4">Patient / Inquiry</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Priority</div>
                    <div className="col-span-2">Received</div>
                </div>

                {filteredInquiries.length === 0 ? (
                    <div className="p-12 text-center">
                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">No inquiries found</p>
                        <p className="text-gray-400 text-sm mt-1">
                            {inquiries.length > 0 ? 'Try adjusting your search or filters' : 'Patient inquiries will appear here'}
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {filteredInquiries.map((inquiry) => (
                            <div
                                key={inquiry.id}
                                onClick={() => { setSelectedInquiry(inquiry); setShowResponseForm(false); }}
                                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer items-center"
                            >
                                {/* Patient & Subject */}
                                <div className="col-span-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                                            {inquiry.patientName.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-gray-900 truncate">{inquiry.patientName}</p>
                                            <p className="text-sm text-gray-500 truncate">{inquiry.subject}</p>
                                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                                <Mail className="w-3 h-3" />
                                                <span className="truncate">{inquiry.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Type */}
                                <div className="col-span-2">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-1.5 text-sm text-gray-700">
                                            {getInquiryTypeIcon(inquiry)}
                                            <span className="truncate">{inquiry.treatmentType || 'General'}</span>
                                        </div>
                                        {inquiry.packageName && (
                                            <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full w-fit truncate max-w-[150px]">
                                                📦 {inquiry.packageName}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="col-span-2">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(inquiry.status)}`}>
                                        {inquiry.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                                        {inquiry.status === 'responded' && <CheckCircle className="w-3 h-3 mr-1" />}
                                        {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                                    </span>
                                </div>

                                {/* Priority */}
                                <div className="col-span-2">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityColor(inquiry.priority)}`}>
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedInquiry(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="flex items-start justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-emerald-50">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
                                    {selectedInquiry.patientName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{selectedInquiry.patientName}</h2>
                                    <p className="text-gray-600 mt-1">{selectedInquiry.subject}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedInquiry.status)}`}>
                                            {selectedInquiry.status.charAt(0).toUpperCase() + selectedInquiry.status.slice(1)}
                                        </span>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedInquiry.priority)}`}>
                                            {selectedInquiry.priority.charAt(0).toUpperCase() + selectedInquiry.priority.slice(1)} Priority
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedInquiry(null)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6 overflow-y-auto max-h-[50vh]">
                            {/* Contact & Details Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Contact Info */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <User className="w-4 h-4" /> Contact Information
                                    </h3>
                                    <div className="space-y-2.5 text-sm">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            <a href={`mailto:${selectedInquiry.email}`} className="text-teal-600 hover:underline">{selectedInquiry.email}</a>
                                        </div>
                                        {selectedInquiry.phone && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                <a href={`tel:${selectedInquiry.phone}`} className="text-teal-600 hover:underline">{selectedInquiry.phone}</a>
                                            </div>
                                        )}
                                        {selectedInquiry.country && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Globe className="w-4 h-4 text-gray-400" />
                                                {selectedInquiry.country}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Inquiry Details */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <FileText className="w-4 h-4" /> Inquiry Details
                                    </h3>
                                    <div className="space-y-2.5 text-sm">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            Received: {formatDate(selectedInquiry.createdAt)}
                                        </div>
                                        {selectedInquiry.treatmentType && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Stethoscope className="w-4 h-4 text-gray-400" />
                                                Treatment: {selectedInquiry.treatmentType}
                                            </div>
                                        )}
                                        {selectedInquiry.source && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <ExternalLink className="w-4 h-4 text-gray-400" />
                                                Source: {selectedInquiry.source}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Package Info */}
                            {selectedInquiry.packageName && (
                                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                                    <h3 className="text-sm font-semibold text-purple-700 mb-2 flex items-center gap-2">
                                        <Package className="w-4 h-4" /> Package Quote Request
                                    </h3>
                                    <p className="text-purple-800 font-medium text-lg">{selectedInquiry.packageName}</p>
                                    {selectedInquiry.packageId && (
                                        <p className="text-purple-600 text-xs mt-1">Package ID: #{selectedInquiry.packageId}</p>
                                    )}
                                </div>
                            )}

                            {/* Patient Message */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" /> Patient Message
                                </h3>
                                <div className="bg-gray-50 rounded-xl p-4 text-gray-600 leading-relaxed whitespace-pre-wrap">
                                    {selectedInquiry.message}
                                </div>
                            </div>

                            {/* Previous Response */}
                            {selectedInquiry.responseNotes && (
                                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                                    <h3 className="text-sm font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" /> Your Response
                                        {selectedInquiry.respondedAt && (
                                            <span className="font-normal text-emerald-600 text-xs">
                                                ({formatDate(selectedInquiry.respondedAt)})
                                            </span>
                                        )}
                                    </h3>
                                    <p className="text-emerald-800 whitespace-pre-wrap">{selectedInquiry.responseNotes}</p>
                                </div>
                            )}

                            {/* Response Form */}
                            {showResponseForm && (
                                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                                    <h3 className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2">
                                        <Send className="w-4 h-4" /> Add Response Notes
                                    </h3>
                                    <textarea
                                        value={responseText}
                                        onChange={(e) => setResponseText(e.target.value)}
                                        placeholder="Enter your response notes, follow-up actions, or any internal comments..."
                                        rows={4}
                                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
                                    />
                                    <div className="flex items-center gap-4 mt-3">
                                        <div className="flex items-center gap-2">
                                            <label className="text-sm text-gray-600">Update Status:</label>
                                            <select
                                                value={newStatus}
                                                onChange={(e) => setNewStatus(e.target.value as any)}
                                                className="px-3 py-1.5 border border-blue-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="responded">Responded</option>
                                                <option value="pending">Keep Pending</option>
                                                <option value="closed">Close Inquiry</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-between gap-3 p-6 border-t border-gray-100 bg-gray-50">
                            <div className="flex items-center gap-2">
                                <a
                                    href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}`}
                                    className="flex items-center gap-2 px-4 py-2.5 text-teal-700 bg-teal-50 border border-teal-200 rounded-xl hover:bg-teal-100 transition font-medium text-sm"
                                >
                                    <Mail className="w-4 h-4" />
                                    Email Patient
                                </a>
                                {selectedInquiry.phone && (
                                    <a
                                        href={`tel:${selectedInquiry.phone}`}
                                        className="flex items-center gap-2 px-4 py-2.5 text-blue-700 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition font-medium text-sm"
                                    >
                                        <Phone className="w-4 h-4" />
                                        Call
                                    </a>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                {!showResponseForm ? (
                                    <>
                                        <button
                                            onClick={() => setSelectedInquiry(null)}
                                            className="px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition font-medium"
                                        >
                                            Close
                                        </button>
                                        <button
                                            onClick={() => setShowResponseForm(true)}
                                            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition font-medium"
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                            Respond
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => { setShowResponseForm(false); setResponseText(''); }}
                                            className="px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition font-medium"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleRespond}
                                            disabled={submitting || !responseText.trim()}
                                            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Send className="w-4 h-4" />
                                            {submitting ? 'Saving...' : 'Save Response'}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
