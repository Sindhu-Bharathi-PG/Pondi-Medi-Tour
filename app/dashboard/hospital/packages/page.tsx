"use client";

import { API_BASE, apiCall, useApi } from "@/app/hooks/useApi";
import { ArrowLeft, Edit2, Package, Plus, Search, Sparkles, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <LoadingSpinner message="Loading packages..." />;
    if (error) return <ErrorState message={error} onRetry={refetch} showLogin />;

    if (!packages?.length && !loading) {
        return (
            <div className="min-h-full bg-gray-50/50 p-8">
                <Link href="/dashboard/hospital" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-emerald-600 mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
                <EmptyState
                    title="No Packages Yet"
                    description="Create your first health package to attract more patients."
                    icon={<Package className="w-8 h-8 text-emerald-500" />}
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
        <div className="min-h-full bg-gray-50/50">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-1/4 -left-1/4 w-1/3 h-1/3 bg-gradient-to-br from-emerald-400/10 to-teal-400/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-1/4 -right-1/4 w-1/3 h-1/3 bg-gradient-to-tl from-teal-400/10 to-cyan-400/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Enhanced Header */}
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
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                                Health Packages
                            </h1>
                            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                                {totalPackages}
                            </div>
                        </div>
                        <p className="text-gray-600 flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Create and manage comprehensive health packages for patients
                        </p>
                    </div>

                    <button
                        onClick={() => { setEditingPackage(null); setIsModalOpen(true); }}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Package
                    </button>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm">
                        <div className="text-2xl font-bold text-gray-900">{totalPackages}</div>
                        <div className="text-sm text-gray-500">Total Packages</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm">
                        <div className="text-2xl font-bold text-emerald-600">{activePackages}</div>
                        <div className="text-sm text-gray-500">Active</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm">
                        <div className="text-2xl font-bold text-gray-900">{totalPackages - activePackages}</div>
                        <div className="text-sm text-gray-500">Inactive</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">{filteredPackages.length}</div>
                        <div className="text-sm text-gray-500">Showing</div>
                    </div>
                </div>

                {/* Enhanced Search Bar */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-5 mb-8 relative z-50">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search packages by name or category..."
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {searchQuery && (
                        <p className="text-sm text-gray-500 mt-2">
                            Showing {filteredPackages.length} of {totalPackages} packages
                        </p>
                    )}
                </div>

                {/* Enhanced Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPackages.map((pkg, index) => (
                        <div
                            key={pkg.id}
                            className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* Gradient Border Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            {/* Image */}
                            <div className="h-48 relative bg-gradient-to-br from-emerald-100 to-teal-100">
                                {pkg.imageUrl ? (
                                    <Image src={pkg.imageUrl} alt={pkg.name} fill className="object-cover" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Package className="w-16 h-16 text-emerald-400 opacity-50" />
                                    </div>
                                )}

                                {/* Popular Badge */}
                                {pkg.isPopular && (
                                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-xs font-bold shadow-lg">
                                        <Sparkles className="w-3 h-3 fill-current" />
                                        Popular
                                    </div>
                                )}

                                <div className="absolute top-4 right-4 flex gap-2">
                                    <span className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg text-emerald-600">
                                        ₹{pkg.price?.toLocaleString('en-IN')}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 relative">
                                <div className="mb-3">
                                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 ring-1 ring-blue-100">
                                        {pkg.category}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors" title={pkg.name}>
                                    {pkg.name}
                                </h3>

                                {/* Pricing */}
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                    {pkg.discountedPrice && pkg.discountedPrice < pkg.price && (
                                        <>
                                            <span className="line-through">₹{pkg.price?.toLocaleString('en-IN')}</span>
                                            <span className="text-green-600 font-semibold">
                                                {Math.round(((pkg.price - pkg.discountedPrice) / pkg.price) * 100)}% OFF
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-2 gap-3 py-4 border-t border-b border-gray-100">
                                    <div className="text-center p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                                        <p className="text-xs text-gray-600 mb-1">Duration</p>
                                        <p className="font-bold text-sm text-gray-900">{pkg.durationDays} Days</p>
                                    </div>
                                    <div className="text-center p-2 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50">
                                        <p className="text-xs text-gray-600 mb-1">Status</p>
                                        <p className={`font-bold text-sm ${pkg.isActive ? 'text-emerald-600' : 'text-gray-400'}`}>
                                            {pkg.isActive ? 'Active' : 'Inactive'}
                                        </p>
                                    </div>
                                </div>

                                {/* Inclusions Preview */}
                                {pkg.inclusions && (
                                    <div className="mt-4 space-y-1 text-xs text-gray-600">
                                        {pkg.inclusions.accommodation && (
                                            <div className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                                <span>{pkg.inclusions.accommodation}</span>
                                            </div>
                                        )}
                                        {pkg.inclusions.transport && (
                                            <div className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                                <span>{pkg.inclusions.transport}</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center gap-2 mt-6">
                                    <button
                                        onClick={() => { setEditingPackage(pkg); setIsModalOpen(true); }}
                                        className="flex-1 px-4 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-600 transition-all flex items-center justify-center gap-2 text-sm active:scale-95"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeletePackage(pkg.id)}
                                        className="px-4 py-2.5 rounded-xl bg-red-50 text-red-600 border-2 border-transparent hover:bg-red-100 hover:border-red-200 transition-all active:scale-95"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Enhanced Add New Card */}
                    <button
                        onClick={() => { setEditingPackage(null); setIsModalOpen(true); }}
                        className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-gray-300 hover:border-emerald-500 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 min-h-[380px] bg-white/50"
                    >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:from-emerald-500 group-hover:to-teal-600 transition-all duration-300 shadow-lg">
                            <Plus className="w-10 h-10 text-emerald-500 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">Add New Package</h3>
                        <p className="text-sm text-gray-500 text-center max-w-[220px]">Create a comprehensive health package to attract patients</p>
                    </button>
                </div>
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
