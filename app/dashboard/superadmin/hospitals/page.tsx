"use client";

import { API_BASE } from "@/app/hooks/useApi";
import { Building2, Check, MapPin, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Hospital {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: string;
    type: string;
    location: any;
    createdAt: string;
}

export default function HospitalsPage() {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchHospitals = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const res = await fetch(`${API_BASE}/api/admin/hospitals`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setHospitals(data.hospitals || []);
            }
        } catch (error) {
            console.error('Failed to fetch hospitals:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: number) => {
        try {
            const token = localStorage.getItem('authToken');
            await fetch(`${API_BASE}/api/admin/hospitals/${id}/approve`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchHospitals();
        } catch (error) {
            console.error('Failed to approve:', error);
        }
    };

    const handleReject = async (id: number) => {
        try {
            const token = localStorage.getItem('authToken');
            await fetch(`${API_BASE}/api/admin/hospitals/${id}/reject`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchHospitals();
        } catch (error) {
            console.error('Failed to reject:', error);
        }
    };

    useEffect(() => {
        fetchHospitals();
    }, []);

    const filteredHospitals = hospitals.filter(h => {
        const matchesSearch = h.name?.toLowerCase().includes(search.toLowerCase()) ||
            h.email?.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || h.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            approved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
            pending: 'bg-amber-100 text-amber-700 border-amber-200',
            rejected: 'bg-red-100 text-red-700 border-red-200',
        };
        return styles[status] || styles.pending;
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Hospital Management</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage and approve hospitals</p>
                </div>
                <div className="flex gap-3 text-sm">
                    <span className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full font-medium">
                        {hospitals.filter(h => h.status === 'pending').length} Pending
                    </span>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search hospitals..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* Hospitals Grid */}
            {loading ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                    <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
                    <p className="text-slate-500 mt-4">Loading hospitals...</p>
                </div>
            ) : filteredHospitals.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                    <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">No hospitals found</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHospitals.map((hospital) => (
                        <div key={hospital.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                                <Building2 className="w-16 h-16 text-white/50" />
                            </div>
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="font-bold text-slate-900 line-clamp-1">{hospital.name}</h3>
                                        <p className="text-sm text-slate-500">{hospital.email}</p>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(hospital.status)}`}>
                                        {hospital.status}
                                    </span>
                                </div>

                                {hospital.location?.city && (
                                    <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-4">
                                        <MapPin className="w-4 h-4" />
                                        {hospital.location.city}
                                    </div>
                                )}

                                {hospital.status === 'pending' && (
                                    <div className="flex gap-2 pt-3 border-t border-slate-100">
                                        <button
                                            onClick={() => handleApprove(hospital.id)}
                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
                                        >
                                            <Check className="w-4 h-4" />
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(hospital.id)}
                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
                                        >
                                            <X className="w-4 h-4" />
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
