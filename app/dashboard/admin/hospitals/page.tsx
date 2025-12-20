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
    MoreVertical,
    Search,
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
}

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
            setHospitals(data.hospitals);
        } catch (error) {
            console.error("Error fetching hospitals:", error);
            toast.error("Failed to load hospitals");
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
        const styles = {
            active: "bg-emerald-50 text-emerald-700 border-emerald-200",
            pending: "bg-amber-50 text-amber-700 border-amber-200",
            rejected: "bg-rose-50 text-rose-700 border-rose-200"
        };

        const icons = {
            active: CheckCircle,
            pending: Clock,
            rejected: XCircle
        };

        const Icon = icons[status as keyof typeof icons];
        const style = styles[status as keyof typeof styles];

        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${style}`}>
                <Icon className="w-3.5 h-3.5" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Hospital Management</h1>
                    <p className="text-slate-600">Review and manage hospital profiles</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-md transition ${viewMode === "grid" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-900"}`}
                    >
                        <LayoutGrid className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-md transition ${viewMode === "list" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-900"}`}
                    >
                        <List className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search hospitals..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none text-slate-600 font-medium"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending Approval</option>
                    <option value="active">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {loading ? (
                <div className="p-12 text-center text-slate-500">Loading hospitals...</div>
            ) : hospitals.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Building2 className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">No hospitals found</h3>
                    <p className="text-slate-500">Try adjusting your filters</p>
                </div>
            ) : (
                <>
                    {viewMode === "grid" ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {hospitals.map((hospital) => (
                                <div key={hospital.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden">
                                    <div className="h-48 bg-slate-100 relative">
                                        {/* Placeholder image since we don't have real images yet */}
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                            <Building2 className="w-16 h-16" />
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <StatusBadge status={hospital.status} />
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-slate-900 mb-1">{hospital.name}</h3>
                                        <p className="text-slate-500 text-sm mb-4">{hospital.location}</p>

                                        <div className="flex items-center gap-4 text-sm text-slate-600 mb-6">
                                            <div className="flex items-center gap-1.5">
                                                <Bed className="w-4 h-4" />
                                                {hospital.beds} Beds
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Building2 className="w-4 h-4" />
                                                {hospital.type}
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {hospital.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(hospital.id)}
                                                        className="flex-1 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium hover:bg-emerald-100 transition text-sm flex items-center justify-center gap-1.5"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedHospital(hospital);
                                                            setIsRejectOpen(true);
                                                        }}
                                                        className="flex-1 px-3 py-2 bg-rose-50 text-rose-700 rounded-lg font-medium hover:bg-rose-100 transition text-sm flex items-center justify-center gap-1.5"
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
                                                className="flex-1 px-3 py-2 bg-slate-50 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition text-sm flex items-center justify-center gap-1.5"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Hospital</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {hospitals.map((hospital) => (
                                            <tr key={hospital.id} className="hover:bg-slate-50 transition">
                                                <td className="px-6 py-4 font-medium text-slate-900">{hospital.name}</td>
                                                <td className="px-6 py-4 text-slate-600">{hospital.location}</td>
                                                <td className="px-6 py-4 text-slate-600">{hospital.type}</td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={hospital.status} />
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedHospital(hospital);
                                                            setIsDetailsOpen(true);
                                                        }}
                                                        className="p-2 text-slate-400 hover:text-violet-600 rounded-lg transition"
                                                    >
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
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
                title="Reject Hospital"
                size="sm"
            >
                <div>
                    <p className="text-slate-600 mb-4">
                        Please provide a reason for rejecting <strong>{selectedHospital?.name}</strong>. This will be sent to the hospital administrator.
                    </p>
                    <textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none mb-4"
                        rows={4}
                        placeholder="Enter reason for rejection..."
                    />
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setIsRejectOpen(false)}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleReject}
                            disabled={!rejectionReason.trim()}
                            className="px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Confirm Rejection
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Details Modal */}
            <Modal
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                title="Hospital Details"
                size="lg"
            >
                {selectedHospital && (
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-sm font-medium text-slate-500 mb-1">Hospital Name</h4>
                                <p className="text-slate-900 font-medium">{selectedHospital.name}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-slate-500 mb-1">Status</h4>
                                <StatusBadge status={selectedHospital.status} />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-slate-500 mb-1">Location</h4>
                                <p className="text-slate-900">{selectedHospital.location}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-slate-500 mb-1">Submitted Date</h4>
                                <p className="text-slate-900">{new Date(selectedHospital.submittedDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                        {/* Add more details here as needed */}
                        <div className="flex justify-end pt-4 border-t border-slate-100">
                            <button
                                onClick={() => setIsDetailsOpen(false)}
                                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition"
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
