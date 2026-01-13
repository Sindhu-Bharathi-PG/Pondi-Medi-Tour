"use client";

import { API_BASE, apiCall, useApi } from "@/app/hooks/useApi";
import { Calendar, CheckCircle, Edit2, Eye, IndianRupee, MessageCircle, Package, Plus, Search, Sparkles, Tag, Trash2, TrendingUp, X, XCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { EmptyState, ErrorState, LoadingSpinner } from "../components/LoadingStates";
import PackageModal from "./components/PackageModal";

export default function PackagesPage() {
    const { data: packages, loading, error, refetch } = useApi<any[]>({
        url: `${API_BASE}/api/hospitals/me/packages`,
        initialData: []
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPackage, setEditingPackage] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Derived state for stats
    const totalPackages = packages?.length || 0;
    const activePackages = packages?.filter(p => p.isActive).length || 0;

    const handleAddPackage = async (data: any) => {
        try {
            await apiCall('/api/hospitals/me/packages', 'POST', data);
            await refetch();
            setIsModalOpen(false);
        } catch (err: any) {
            alert(err.message || "Failed to add package");
        }
    };

    const handleUpdatePackage = async (data: any) => {
        if (!editingPackage) return;
        try {
            await apiCall(`/api/hospitals/me/packages/${editingPackage.id}`, 'PUT', data);
            await refetch();
            setIsModalOpen(false);
            setEditingPackage(null);
        } catch (err: any) {
            alert(err.message || "Failed to update package");
        }
    };

    const handleDeletePackage = async (id: number) => {
        if (!confirm("Delete this package?")) return;
        try {
            await apiCall(`/api/hospitals/me/packages/${id}`, 'DELETE');
            await refetch();
        } catch (err: any) {
            alert(err.message || "Failed to delete package");
        }
    };

    const filteredPackages = (packages || []).filter(p =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <LoadingSpinner message="Loading packages..." />;
    if (error) return <ErrorState message={error} onRetry={refetch} showLogin />;

    if (!packages?.length && !loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Health Packages</h1>
                    <p className="text-gray-500 text-sm mt-1">Create and manage treatment packages</p>
                </div>
                <EmptyState
                    title="No Packages Yet"
                    description="Create your first health package to attract more patients."
                    icon={<Package className="w-8 h-8 text-teal-500" />}
                    action={{ label: "Create First Package", onClick: () => setIsModalOpen(true) }}
                />
                <PackageModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddPackage}
                    initialData={undefined}
                    title="Add New Package"
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Health Packages</h1>
                    <p className="text-gray-500 text-sm mt-1">Create and manage treatment packages</p>
                </div>
                <button
                    onClick={() => { setEditingPackage(null); setIsModalOpen(true); }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    Add Package
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Packages</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{totalPackages}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                            <Package className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Active</p>
                            <p className="text-2xl font-bold text-emerald-600 mt-1">{activePackages}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-emerald-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Inactive</p>
                            <p className="text-2xl font-bold text-gray-600 mt-1">{totalPackages - activePackages}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                            <XCircle className="w-6 h-6 text-gray-500" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Showing</p>
                            <p className="text-2xl font-bold text-teal-600 mt-1">{filteredPackages.length}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                            <Eye className="w-6 h-6 text-teal-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search packages by name or category..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                    <div
                        key={pkg.id}
                        className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
                    >
                        {/* Image Section */}
                        <div className="h-44 relative bg-gradient-to-br from-teal-50 to-emerald-50">
                            {pkg.imageUrl ? (
                                <Image src={pkg.imageUrl} alt={pkg.name} fill className="object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Package className="w-16 h-16 text-teal-300" />
                                </div>
                            )}

                            {/* Popular Badge */}
                            {pkg.isPopular && (
                                <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-amber-500 text-white rounded-full text-xs font-bold shadow-md">
                                    <Sparkles className="w-3 h-3" />
                                    Popular
                                </div>
                            )}

                            {/* Price Badge */}
                            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
                                <div className="flex items-center gap-1 text-lg font-bold text-teal-600">
                                    <IndianRupee className="w-4 h-4" />
                                    {pkg.price?.toLocaleString('en-IN')}
                                </div>
                                {pkg.discountedPrice && pkg.discountedPrice < pkg.price && (
                                    <div className="text-xs text-gray-500 line-through text-center">
                                        ₹{pkg.discountedPrice?.toLocaleString('en-IN')}
                                    </div>
                                )}
                            </div>

                            {/* Status indicator */}
                            <div className="absolute bottom-3 left-3">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${pkg.isActive
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${pkg.isActive ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                                    {pkg.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            {/* Category */}
                            <div className="flex items-center gap-2 mb-3">
                                <Tag className="w-4 h-4 text-blue-500" />
                                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                                    {pkg.category || 'General'}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
                                {pkg.name}
                            </h3>

                            {/* Duration */}
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                <Calendar className="w-4 h-4" />
                                <span>{pkg.durationDays || 0} Days Treatment</span>
                            </div>

                            {/* Stats Row */}
                            <div className="flex items-center gap-4 py-3 border-t border-gray-100">
                                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                    <TrendingUp className="w-4 h-4 text-amber-500" />
                                    <span className="font-medium text-gray-700">{pkg.popularityScore || 0}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                    <Eye className="w-4 h-4 text-blue-500" />
                                    <span className="font-medium text-gray-700">{pkg.viewCount || 0}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                    <MessageCircle className="w-4 h-4 text-green-500" />
                                    <span className="font-medium text-gray-700">{pkg.inquiryCount || 0}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 mt-4">
                                <button
                                    onClick={() => { setEditingPackage(pkg); setIsModalOpen(true); }}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-700 rounded-xl font-medium hover:bg-teal-50 hover:text-teal-700 transition-colors border border-gray-200"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeletePackage(pkg.id)}
                                    className="px-4 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New Card */}
                <button
                    onClick={() => { setEditingPackage(null); setIsModalOpen(true); }}
                    className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-gray-300 hover:border-teal-400 hover:bg-teal-50/50 transition-all min-h-[380px] bg-white group"
                >
                    <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-4 group-hover:bg-teal-200 group-hover:scale-110 transition-all">
                        <Plus className="w-8 h-8 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                        Add New Package
                    </h3>
                    <p className="text-sm text-gray-500 text-center max-w-[200px]">
                        Create a new health package to attract patients
                    </p>
                </button>
            </div>

            <PackageModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingPackage(null); }}
                onSubmit={editingPackage ? handleUpdatePackage : handleAddPackage}
                initialData={editingPackage || undefined}
                title={editingPackage ? "Edit Package" : "Add New Package"}
            />
        </div>
    );
}
