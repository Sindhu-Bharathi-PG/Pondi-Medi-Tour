"use client";

import { API_BASE, apiCall, useApi } from "@/app/hooks/useApi";
import { ArrowLeft, DollarSign, Pill, Plus, Search, Sparkles, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { EmptyState, ErrorState, LoadingSpinner } from "../components/LoadingStates";
import TreatmentModal from "./components/TreatmentModal";

export default function TreatmentsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTreatment, setSelectedTreatment] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Use optimized API hook
    const { data: treatments, loading, error, refetch } = useApi<any[]>({
        url: `${API_BASE}/api/hospitals/me/treatments`,
        initialData: []
    });

    const handleSave = async (data: any) => {
        try {
            if (selectedTreatment) {
                await apiCall(`/api/hospitals/me/treatments/${selectedTreatment.id}`, 'PUT', data);
            } else {
                await apiCall('/api/hospitals/me/treatments', 'POST', data);
            }
            await refetch();
            setIsModalOpen(false);
            setSelectedTreatment(null);
        } catch (err: any) {
            alert(err.message || 'Failed to save treatment');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this treatment?')) return;
        try {
            await apiCall(`/api/hospitals/me/treatments/${id}`, 'DELETE');
            await refetch();
        } catch (err: any) {
            alert(err.message || 'Failed to delete treatment');
        }
    };

    const handleEdit = (treatment: any) => {
        setSelectedTreatment(treatment);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setSelectedTreatment(null);
        setIsModalOpen(true);
    };

    if (loading) {
        return <LoadingSpinner message="Loading treatments..." />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={refetch} showLogin />;
    }

    if (!treatments?.length && !loading) {
        return (
            <div className="min-h-full bg-gray-50/50 p-8">
                <Link href="/dashboard/hospital" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-emerald-600 mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
                <EmptyState
                    title="No Treatments Yet"
                    description="Add your first treatment to showcase your medical services."
                    icon={<Pill className="w-8 h-8 text-emerald-500" />}
                    action={{ label: "Add First Treatment", onClick: handleAddNew }}
                />
                <TreatmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} treatment={null} onSave={handleSave} />
            </div>
        );
    }

    return (
        <div className="min-h-full bg-gray-50/50">
            <TreatmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                treatment={selectedTreatment}
                onSave={handleSave}
            />

            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-1/4 -left-1/4 w-1/3 h-1/3 bg-gradient-to-br from-emerald-400/10 to-teal-400/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-1/4 -right-1/4 w-1/3 h-1/3 bg-gradient-to-tl from-teal-400/10 to-cyan-400/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <Link
                            href="/dashboard/hospital"
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-emerald-600 mb-3 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </Link>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Medical Treatments</h1>
                            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                                {(treatments || []).length}
                            </div>
                        </div>
                        <p className="text-gray-600 flex items-center gap-2">
                            <Pill className="w-4 h-4" />
                            Manage your medical procedures and pricing
                        </p>
                    </div>

                    <button onClick={handleAddNew} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all">
                        <Plus className="w-5 h-5" />
                        Add New Treatment
                    </button>
                </div>

                {/* Search Bar */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-5 mb-8 relative z-50">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search treatments by name, category, or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400"
                        />
                    </div>
                    {searchQuery && (
                        <p className="text-sm text-gray-500 mt-2">
                            Showing {(treatments || []).filter((t: any) =>
                                t.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                t.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                t.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase())
                            ).length} of {treatments?.length || 0} treatments
                        </p>
                    )}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(treatments || []).filter((t: any) =>
                        t.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((treatment: any, index: number) => (
                        <div
                            key={treatment.id}
                            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-3 py-1 rounded-lg bg-gray-50 text-gray-600 text-xs font-bold uppercase tracking-wide">
                                        {treatment.category}
                                    </span>
                                    {treatment.isPopular && (
                                        <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                                            <Sparkles className="w-3 h-3" />
                                            Popular
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                    {treatment.name}
                                </h3>

                                {/* Key Stats Grid */}
                                <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
                                    <div>
                                        <span className="block text-gray-400">Success Rate</span>
                                        <span className="font-bold text-emerald-700">{treatment.successRate}%</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-400">Hospital Stay</span>
                                        <span className="font-bold">{treatment.hospitalStay}</span>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-500 mb-6 line-clamp-2 min-h-[40px]">
                                    {treatment.shortDescription}
                                </p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <DollarSign className="w-4 h-4 text-gray-400" />
                                        <span className="font-semibold">₹{treatment.minPrice?.toLocaleString('en-IN')} - ₹{treatment.maxPrice?.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {(treatment.technology || []).slice(0, 2).map((tech: string, i: number) => (
                                            <span key={i} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
                                    <button onClick={() => handleEdit(treatment)} className="flex-1 py-2 rounded-lg border border-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-gray-200 transition">
                                        Edit Details
                                    </button>
                                    <button onClick={() => handleDelete(treatment.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add New Card Button */}
                    <button onClick={handleAddNew} className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-gray-300 hover:border-emerald-500 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 group min-h-[350px] bg-white/50">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:from-emerald-500 group-hover:to-teal-600 transition-all duration-300 shadow-lg">
                            <Plus className="w-10 h-10 text-emerald-500 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">Add New Treatment</h3>
                        <p className="text-sm text-gray-500 text-center max-w-[220px]">List a new medical procedure to expand your services</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
