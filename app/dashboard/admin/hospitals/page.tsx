"use client";

import { Building2, CheckCircle, Clock, Filter, Grid, List, MapPin, MoreVertical, Search, XCircle } from "lucide-react";
import { useState } from "react";

export default function HospitalsManagementPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [filterStatus, setFilterStatus] = useState("all");

    // Mock data
    const hospitals = [
        {
            id: 1,
            name: "Apollo Hospital",
            type: "Private",
            location: "Chennai",
            status: "approved",
            beds: 500,
            submittedDate: "2024-01-10",
            email: "contact@apollo.com"
        },
        {
            id: 2,
            name: "City Medical Center",
            type: "Government",
            location: "Mumbai",
            status: "pending",
            beds: 300,
            submittedDate: "2024-03-15",
            email: "info@citymedical.com"
        },
        {
            id: 3,
            name: "Health Plus Hospital",
            type: "Private",
            location: "Bangalore",
            status: "approved",
            beds: 250,
            submittedDate: "2024-02-20",
            email: "admin@healthplus.com"
        },
        {
            id: 4,
            name: "District Hospital",
            type: "Government",
            location: "Delhi",
            status: "rejected",
            beds: 150,
            submittedDate: "2024-03-01",
            email: "contact@district.gov"
        }
    ];

    const getStatusBadge = (status: string) => {
        const styles = {
            approved: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200", icon: CheckCircle },
            pending: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200", icon: Clock },
            rejected: { bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-200", icon: XCircle }
        };
        return styles[status as keyof typeof styles] || styles.pending;
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Hospitals Management</h1>
                    <p className="text-slate-600">Review and manage hospital submissions</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setView('grid')}
                        className={`p-2 rounded-lg transition ${view === 'grid' ? 'bg-violet-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                    >
                        <Grid className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setView('list')}
                        className={`p-2 rounded-lg transition ${view === 'list' ? 'bg-violet-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                    >
                        <List className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search hospitals..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none"
                        />
                    </div>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition cursor-pointer"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>

                    <button className="px-4 py-3 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 transition flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        More Filters
                    </button>
                </div>
            </div>

            {/* Grid View */}
            {view === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hospitals.map((hospital) => {
                        const StatusIcon = getStatusBadge(hospital.status).icon;
                        return (
                            <div
                                key={hospital.id}
                                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                                            <Building2 className="w-7 h-7" />
                                        </div>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusBadge(hospital.status).bg} ${getStatusBadge(hospital.status).text} ${getStatusBadge(hospital.status).border}`}>
                                            <StatusIcon className="w-3 h-3" />
                                            {hospital.status.charAt(0).toUpperCase() + hospital.status.slice(1)}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-900 mb-1">{hospital.name}</h3>
                                    <p className="text-sm text-slate-600 mb-4 flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {hospital.location}
                                    </p>

                                    <div className="grid grid-cols-2 gap-3 py-4 border-t border-b border-slate-100">
                                        <div className="text-center px-2 py-2 bg-slate-50 rounded-lg">
                                            <p className="text-xs text-slate-500 mb-1">Type</p>
                                            <p className="font-semibold text-slate-900 text-sm">{hospital.type}</p>
                                        </div>
                                        <div className="text-center px-2 py-2 bg-slate-50 rounded-lg">
                                            <p className="text-xs text-slate-500 mb-1">Beds</p>
                                            <p className="font-semibold text-slate-900 text-sm">{hospital.beds}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-4">
                                        <button className="flex-1 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium hover:bg-emerald-100 transition text-sm flex items-center justify-center gap-1.5">
                                            <CheckCircle className="w-4 h-4" />
                                            Approve
                                        </button>
                                        <button className="flex-1 px-3 py-2 bg-rose-50 text-rose-700 rounded-lg font-medium hover:bg-rose-100 transition text-sm flex items-center justify-center gap-1.5">
                                            <XCircle className="w-4 h-4" />
                                            Reject
                                        </button>
                                        <button className="px-3 py-2 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* List View */}
            {view === 'list' && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Hospital</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Location</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Beds</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {hospitals.map((hospital) => {
                                    const StatusIcon = getStatusBadge(hospital.status).icon;
                                    return (
                                        <tr key={hospital.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
                                                        {hospital.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-900">{hospital.name}</p>
                                                        <p className="text-sm text-slate-500">{hospital.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-700">{hospital.type}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-700 flex items-center gap-1.5">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    {hospital.location}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-700">{hospital.beds}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusBadge(hospital.status).bg} ${getStatusBadge(hospital.status).text} ${getStatusBadge(hospital.status).border}`}>
                                                    <StatusIcon className="w-3 h-3" />
                                                    {hospital.status.charAt(0).toUpperCase() + hospital.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition">
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition">
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
