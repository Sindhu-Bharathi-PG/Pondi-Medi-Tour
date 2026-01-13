"use client";

import Modal from "@/app/components/admin/Modal";
import { ToastContainer, useToast } from "@/app/components/admin/Toast";
import {
    Bed,
    Building2,
    CheckCircle,
    Clock,
    Eye,
    LayoutGrid,
    List,
    Mail,
    MapPin,
    Phone,
    Search,
    Stethoscope,
    Users,
    XCircle
} from "lucide-react";
import { useEffect, useState } from "react";

interface HospitalData {
    id: string;
    name: string;
    type: string;
    location: string;
    city: string;
    beds: number;
    status: "active" | "pending" | "rejected";
    submittedDate: string;
    email?: string;
    phone?: string;
    doctors?: number;
    specialties?: string[];
}

// Skeleton loader for hospital cards
const HospitalCardSkeleton = () => (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
        <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200" />
        <div className="p-6 space-y-4">
            <div className="h-5 bg-slate-200 rounded-lg w-3/4" />
            <div className="h-4 bg-slate-100 rounded w-1/2" />
            <div className="flex gap-4">
                <div className="h-4 bg-slate-100 rounded w-20" />
                <div className="h-4 bg-slate-100 rounded w-24" />
            </div>
            <div className="flex gap-2 pt-2">
                <div className="h-9 bg-slate-100 rounded-lg flex-1" />
                <div className="h-9 bg-slate-100 rounded-lg flex-1" />
            </div>
        </div>
    </div>
);

// Enhanced loader component
const AdminLoader = () => (
    <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
            {/* Outer pulsing ring */}
            <div className="absolute inset-0 w-16 h-16 border-4 border-violet-300/30 rounded-full animate-ping"
                style={{ animationDuration: '2s' }} />
            {/* Spinning ring */}
            <div className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-600 rounded-full animate-spin" />
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg p-2 shadow-lg">
                    <Building2 className="w-5 h-5 text-white" />
                </div>
            </div>
        </div>
        <p className="mt-5 text-slate-600 font-medium animate-pulse">Loading hospitals...</p>
    </div>
);

export default function HospitalsManagementPage() {
    const [hospitals, setHospitals] = useState<HospitalData[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedHospital, setSelectedHospital] = useState<HospitalData | null>(null);
    const [isRejectOpen, setIsRejectOpen] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const toast = useToast();

    useEffect(() => {
        fetchHospitals();
    }, [search, statusFilter]);

    const fetchHospitals = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (search) params.append("search", search);
            if (statusFilter !== "all") params.append("status", statusFilter);

            const response = await fetch(`/api/admin/hospitals?${params}`);
            if (!response.ok) throw new Error("Failed to fetch hospitals");

            const data = await response.json();
            setHospitals(data.hospitals || []);
        } catch (error) {
            console.error("Error fetching hospitals:", error);
            toast.error("Failed to load hospitals");
            setHospitals([]);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/hospitals/${id}/approve`, {
                method: "PATCH"
            });

            if (!response.ok) throw new Error("Failed to approve hospital");

            setHospitals(hospitals.map(h =>
                h.id === id ? { ...h, status: "active" } : h
            ));
            toast.success("Hospital approved successfully");
        } catch (error) {
            toast.error("Failed to approve hospital");
        }
    };

    const handleReject = async () => {
        if (!selectedHospital) return;
        try {
            const response = await fetch(`/api/admin/hospitals/${selectedHospital.id}/reject`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reason: rejectionReason })
            });

            if (!response.ok) throw new Error("Failed to reject hospital");

            setHospitals(hospitals.map(h =>
                h.id === selectedHospital.id ? { ...h, status: "rejected" } : h
            ));
            toast.success("Hospital rejected successfully");
            setIsRejectOpen(false);
            setRejectionReason("");
        } catch (error) {
            toast.error("Failed to reject hospital");
        }
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const normalizedStatus = status?.toLowerCase() || 'pending';

        const styles = {
            active: "bg-emerald-50 text-emerald-700 border-emerald-200",
            pending: "bg-amber-50 text-amber-700 border-amber-200",
            rejected: "bg-rose-50 text-rose-700 border-rose-200",
            default: "bg-slate-50 text-slate-700 border-slate-200"
        };

        const icons = {
            active: CheckCircle,
            pending: Clock,
            rejected: XCircle,
            default: Building2
        };

        const Icon = icons[normalizedStatus as keyof typeof icons] || icons.default;
        const style = styles[normalizedStatus as keyof typeof styles] || styles.default;

        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${style}`}>
                <Icon className="w-3.5 h-3.5" />
                {status ? (status.charAt(0).toUpperCase() + status.slice(1)) : 'Unknown'}
            </span>
        );
    };

    // Calculate stats
    const stats = {
        total: hospitals.length,
        active: hospitals.filter(h => h.status === 'active').length,
        pending: hospitals.filter(h => h.status === 'pending').length,
        rejected: hospitals.filter(h => h.status === 'rejected').length
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg shadow-violet-500/25">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        Hospital Management
                    </h1>
                    <p className="text-slate-600 mt-1">Review and manage all hospital profiles on the platform</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2.5 rounded-lg transition-all ${viewMode === "grid"
                            ? "bg-white shadow-sm text-violet-600"
                            : "text-slate-500 hover:text-slate-900"}`}
                    >
                        <LayoutGrid className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`p-2.5 rounded-lg transition-all ${viewMode === "list"
                            ? "bg-white shadow-sm text-violet-600"
                            : "text-slate-500 hover:text-slate-900"}`}
                    >
                        <List className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Hospitals', value: stats.total, icon: Building2, gradient: 'from-violet-500 to-purple-600' },
                    { label: 'Active', value: stats.active, icon: CheckCircle, gradient: 'from-emerald-500 to-teal-600' },
                    { label: 'Pending Approval', value: stats.pending, icon: Clock, gradient: 'from-amber-500 to-orange-600' },
                    { label: 'Rejected', value: stats.rejected, icon: XCircle, gradient: 'from-rose-500 to-red-600' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                <p className="text-xs text-slate-500">{stat.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search hospitals by name, location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none text-slate-900 placeholder:text-slate-400"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none text-slate-600 font-medium min-w-[160px]"
                >
                    <option value="all">All Status</option>
                    <option value="pending">🕐 Pending Approval</option>
                    <option value="active">✅ Approved</option>
                    <option value="rejected">❌ Rejected</option>
                </select>
            </div>

            {/* Content */}
            {loading ? (
                viewMode === "grid" ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => <HospitalCardSkeleton key={i} />)}
                    </div>
                ) : (
                    <AdminLoader />
                )
            ) : hospitals.length === 0 ? (
                <div className="py-20 text-center bg-white rounded-2xl border border-slate-200">
                    <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <Building2 className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No hospitals found</h3>
                    <p className="text-slate-500 max-w-md mx-auto">
                        {search || statusFilter !== 'all'
                            ? "Try adjusting your search or filters to find hospitals"
                            : "When hospitals register on the platform, they will appear here for review"}
                    </p>
                </div>
            ) : (
                <>
                    {viewMode === "grid" ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {hospitals.map((hospital) => (
                                <div key={hospital.id} className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                    {/* Image placeholder with gradient */}
                                    <div className="h-40 bg-gradient-to-br from-violet-100 via-purple-50 to-slate-100 relative overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Building2 className="w-16 h-16 text-violet-200" />
                                        </div>
                                        {/* Decorative elements */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-400/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />

                                        <div className="absolute top-3 right-3">
                                            <StatusBadge status={hospital.status} />
                                        </div>
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-violet-600 rounded-lg text-xs font-semibold shadow-sm">
                                                {hospital.type}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-violet-600 transition-colors line-clamp-1">
                                            {hospital.name}
                                        </h3>
                                        <p className="text-slate-500 text-sm mb-4 flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {hospital.location || hospital.city}
                                        </p>

                                        {/* Quick stats */}
                                        <div className="flex flex-wrap gap-3 text-sm text-slate-600 mb-5">
                                            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg">
                                                <Bed className="w-4 h-4 text-violet-500" />
                                                <span className="font-medium">{hospital.beds || 0}</span>
                                                <span className="text-slate-400">Beds</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg">
                                                <Stethoscope className="w-4 h-4 text-emerald-500" />
                                                <span className="font-medium">{hospital.doctors || 0}</span>
                                                <span className="text-slate-400">Doctors</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            {hospital.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(hospital.id)}
                                                        className="flex-1 px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all text-sm flex items-center justify-center gap-1.5"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedHospital(hospital);
                                                            setIsRejectOpen(true);
                                                        }}
                                                        className="flex-1 px-3 py-2 bg-rose-50 text-rose-600 rounded-xl font-medium hover:bg-rose-100 transition text-sm flex items-center justify-center gap-1.5 border border-rose-200"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => {
                                                    setSelectedHospital(hospital);
                                                    setIsDetailsOpen(true);
                                                }}
                                                className={`${hospital.status === 'pending' ? 'px-3' : 'flex-1 px-4'} py-2 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition text-sm flex items-center justify-center gap-1.5`}
                                            >
                                                <Eye className="w-4 h-4" />
                                                {hospital.status === 'pending' ? '' : 'View Details'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Hospital</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Beds</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {hospitals.map((hospital) => (
                                            <tr key={hospital.id} className="hover:bg-violet-50/30 transition">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
                                                            <Building2 className="w-5 h-5 text-violet-600" />
                                                        </div>
                                                        <span className="font-medium text-slate-900">{hospital.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600">{hospital.location || hospital.city}</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                                                        {hospital.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600">{hospital.beds || 0}</td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={hospital.status} />
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {hospital.status === 'pending' && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleApprove(hospital.id)}
                                                                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                                                                    title="Approve"
                                                                >
                                                                    <CheckCircle className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedHospital(hospital);
                                                                        setIsRejectOpen(true);
                                                                    }}
                                                                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                                                    title="Reject"
                                                                >
                                                                    <XCircle className="w-4 h-4" />
                                                                </button>
                                                            </>
                                                        )}
                                                        <button
                                                            onClick={() => {
                                                                setSelectedHospital(hospital);
                                                                setIsDetailsOpen(true);
                                                            }}
                                                            className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition"
                                                            title="View Details"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Reject Modal */}
            <Modal
                isOpen={isRejectOpen}
                onClose={() => setIsRejectOpen(false)}
                title="Reject Hospital Application"
                size="sm"
            >
                <div>
                    <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-xl mb-4">
                        <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
                            <XCircle className="w-5 h-5 text-rose-600" />
                        </div>
                        <div>
                            <p className="font-medium text-slate-900">{selectedHospital?.name}</p>
                            <p className="text-sm text-slate-500">{selectedHospital?.location}</p>
                        </div>
                    </div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Reason for rejection <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none mb-4 text-slate-900 placeholder:text-slate-400"
                        rows={4}
                        placeholder="Please provide a clear reason for rejecting this hospital application..."
                    />
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setIsRejectOpen(false)}
                            className="px-4 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleReject}
                            disabled={!rejectionReason.trim()}
                            className="px-4 py-2.5 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <XCircle className="w-4 h-4" />
                            Confirm Rejection
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Enhanced Details Modal */}
            <Modal
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                title="Hospital Details"
                size="lg"
            >
                {selectedHospital && (
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                                <Building2 className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">{selectedHospital.name}</h3>
                                        <p className="text-slate-500 flex items-center gap-1.5 mt-1">
                                            <MapPin className="w-4 h-4" />
                                            {selectedHospital.location || selectedHospital.city}
                                        </p>
                                    </div>
                                    <StatusBadge status={selectedHospital.status} />
                                </div>
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                                    <Building2 className="w-4 h-4" />
                                    Type
                                </div>
                                <p className="text-slate-900 font-medium">{selectedHospital.type}</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                                    <Bed className="w-4 h-4" />
                                    Total Beds
                                </div>
                                <p className="text-slate-900 font-medium">{selectedHospital.beds || 'Not specified'}</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                                    <Clock className="w-4 h-4" />
                                    Submitted Date
                                </div>
                                <p className="text-slate-900 font-medium">
                                    {selectedHospital.submittedDate
                                        ? new Date(selectedHospital.submittedDate).toLocaleDateString('en-IN', {
                                            day: 'numeric', month: 'short', year: 'numeric'
                                        })
                                        : 'Unknown'}
                                </p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                                    <Users className="w-4 h-4" />
                                    Doctors
                                </div>
                                <p className="text-slate-900 font-medium">{selectedHospital.doctors || 0} registered</p>
                            </div>
                        </div>

                        {/* Contact Info */}
                        {(selectedHospital.email || selectedHospital.phone) && (
                            <div className="p-4 bg-slate-50 rounded-xl space-y-3">
                                <h4 className="font-medium text-slate-900">Contact Information</h4>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {selectedHospital.email && (
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Mail className="w-4 h-4 text-violet-500" />
                                            {selectedHospital.email}
                                        </div>
                                    )}
                                    {selectedHospital.phone && (
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Phone className="w-4 h-4 text-violet-500" />
                                            {selectedHospital.phone}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                            {selectedHospital.status === 'pending' && (
                                <>
                                    <button
                                        onClick={() => {
                                            setIsDetailsOpen(false);
                                            setIsRejectOpen(true);
                                        }}
                                        className="px-4 py-2.5 bg-rose-50 text-rose-600 rounded-xl font-medium hover:bg-rose-100 transition flex items-center gap-2"
                                    >
                                        <XCircle className="w-4 h-4" />
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleApprove(selectedHospital.id);
                                            setIsDetailsOpen(false);
                                        }}
                                        className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition flex items-center gap-2"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Approve Hospital
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => setIsDetailsOpen(false)}
                                className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
