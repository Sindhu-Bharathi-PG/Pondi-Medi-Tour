"use client";

import { ToastContainer, useToast } from "@/app/components/admin/Toast";
import { Building2, CheckCircle, Clock, Eye, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface PendingItem {
    id: string;
    type: 'hospital' | 'doctor' | 'treatment';
    name: string;
    submittedBy: string;
    submittedDate: string;
    status: 'pending';
}

export default function ApprovalsPage() {
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [pendingItems, setPendingItems] = useState<PendingItem[]>([]);
    const toast = useToast();

    useEffect(() => {
        fetchPendingItems();
    }, [filter]);

    const fetchPendingItems = async () => {
        setLoading(true);
        try {
            console.log(`fetching pending items for filter: ${filter}`);
            // Currently backend only supports hospital approvals. 
            // In future we can add endpoints for doctors/treatments.
            if (filter === 'all' || filter === 'hospital') {
                const response = await fetch('/api/admin/hospitals?status=pending');
                console.log('pending items response:', response.status);

                if (response.ok) {
                    const data = await response.json();
                    console.log('pending items data:', data);

                    const hospitals: PendingItem[] = (data.hospitals || []).map((h: any) => ({
                        id: h.id,
                        type: 'hospital',
                        name: h.name,
                        submittedBy: h.email || 'Hospital Admin',
                        submittedDate: h.submittedDate,
                        status: 'pending'
                    }));
                    setPendingItems(hospitals);
                }
            } else {
                setPendingItems([]); // Clear list for unsupported types for now
            }
        } catch (error) {
            console.error('Error fetching pending items:', error);
            toast.error('Failed to load pending items');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string, type: string) => {
        if (type !== 'hospital') return;
        try {
            const response = await fetch(`/api/admin/hospitals/${id}/approve`, { method: 'PATCH' });
            if (response.ok) {
                // Remove from list
                setPendingItems(prev => prev.filter(item => item.id !== id));
                toast.success('Hospital approved successfully');
                // Refresh list to be sure
                fetchPendingItems();
            } else {
                toast.error('Failed to approve hospital');
            }
        } catch (error) {
            console.error('Error approving item:', error);
            toast.error('Error approving hospital');
        }
    };

    const handleReject = async (id: string, type: string) => {
        if (type !== 'hospital') return;
        // For simple rejection without reason modal (based on current UI, 
        // ideally we should reuse the modal from hospitals page but let's keep it simple first)
        const reason = prompt("Enter rejection reason:");
        if (!reason) return;

        try {
            const response = await fetch(`/api/admin/hospitals/${id}/reject`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reason })
            });
            if (response.ok) {
                setPendingItems(prev => prev.filter(item => item.id !== id));
                toast.success('Hospital rejected successfully');
                // Refresh list
                fetchPendingItems();
            } else {
                toast.error('Failed to reject hospital');
            }
        } catch (error) {
            console.error('Error rejecting item:', error);
            toast.error('Error rejecting hospital');
        }
    };

    const getTypeIcon = (type: string) => {
        return type === 'hospital' ? Building2 : type === 'doctor' ? CheckCircle : Clock;
    };

    const getTypeColor = (type: string) => {
        return type === 'hospital'
            ? 'from-cyan-500 to-blue-600'
            : type === 'doctor'
                ? 'from-emerald-500 to-teal-600'
                : 'from-violet-500 to-purple-600';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="relative inline-block mb-4">
                        <div className="absolute inset-0 w-16 h-16 border-4 border-amber-300/30 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                        <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-600 rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-2 shadow-lg">
                                <Clock className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>
                    <p className="text-slate-600 font-medium">Loading approvals...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg shadow-amber-500/25">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        Pending Approvals
                    </h1>
                    <p className="text-slate-600 mt-1">Review and approve pending submissions</p>
                </div>
                <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    {['all', 'hospital', 'doctor', 'treatment'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${filter === f
                                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                                : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Total Pending', value: pendingItems.length, color: 'from-amber-500 to-orange-600' },
                    { label: 'Hospitals', value: pendingItems.filter(i => i.type === 'hospital').length, color: 'from-cyan-500 to-blue-600' },
                    { label: 'Others', value: pendingItems.filter(i => i.type !== 'hospital').length, color: 'from-violet-500 to-purple-600' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        <p className="text-sm text-slate-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Pending Items List */}
            <div className="space-y-4">
                {pendingItems
                    .filter(item => filter === 'all' || item.type === filter)
                    .map((item) => {
                        const Icon = getTypeIcon(item.type);
                        return (
                            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all p-6">
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTypeColor(item.type)} flex items-center justify-center shadow-lg flex-shrink-0`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                                                <p className="text-sm text-slate-500 mt-0.5">
                                                    Submitted by {item.submittedBy} • {new Date(item.submittedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </p>
                                            </div>
                                            <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium border border-amber-200 uppercase flex-shrink-0">
                                                Pending
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-4">
                                            <button
                                                onClick={() => handleApprove(item.id, item.type)}
                                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all text-sm">
                                                <CheckCircle className="w-4 h-4" />
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleReject(item.id, item.type)}
                                                className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl font-medium hover:bg-rose-100 transition text-sm border border-rose-200">
                                                <XCircle className="w-4 h-4" />
                                                Reject
                                            </button>
                                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition text-sm">
                                                <Eye className="w-4 h-4" />
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                {pendingItems.filter(item => filter === 'all' || item.type === filter).length === 0 && (
                    <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                        <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <CheckCircle className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">All caught up!</h3>
                        <p className="text-slate-500">No pending approvals for {filter === 'all' ? 'any category' : filter}s</p>
                    </div>
                )}
            </div>
        </div>
    );
}
