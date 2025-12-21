"use client";

import { API_BASE, apiCall, useApi } from "@/app/hooks/useApi";
import { Edit2, Package, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ErrorState, LoadingSpinner } from "../components/LoadingStates";
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

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorState message={error} onRetry={refetch} />;

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <Package className="w-6 h-6 text-emerald-600" />
                        </div>
                        Packages
                    </h1>
                    <p className="text-gray-500 mt-1">Manage your health packages and offers.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => { setEditingPackage(null); setIsModalOpen(true); }}
                        className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-emerald-500/40 text-white rounded-xl font-medium flex items-center gap-2 transition shadow-lg shadow-emerald-200"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Package
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search packages..."
                    className="flex-1 outline-none text-gray-700"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Create Card */}
                <button
                    onClick={() => { setEditingPackage(null); setIsModalOpen(true); }}
                    className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all min-h-[400px]"
                >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-100 transition-all">
                        <Plus className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Add Package</h3>
                </button>

                {filteredPackages.map((pkg) => (
                    <div key={pkg.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                        {/* Image */}
                        <div className="h-48 relative bg-gray-100">
                            {pkg.imageUrl ? (
                                <Image src={pkg.imageUrl} alt={pkg.name} fill className="object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    <Package className="w-12 h-12 opacity-50" />
                                </div>
                            )}
                            <div className="absolute top-4 right-4 flex gap-2">
                                <span className="bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                                    ₹{pkg.price}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <div className="mb-3">
                                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                                    {pkg.category}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1" title={pkg.name}>{pkg.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                <span className="line-through">₹{pkg.discountedPrice || pkg.price * 1.2}</span>
                                <span className="text-green-600 font-medium">{Math.round(((pkg.price * 0.2) / (pkg.price * 1.2)) * 100)}% OFF</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4 bg-gray-50 p-2 rounded-lg">
                                <div>⏳ {pkg.durationDays} Days</div>
                                <div>🛏 {pkg.inclusions?.accommodation || 'No Hotel'}</div>
                                <div>🚗 {pkg.inclusions?.transport || 'No Transport'}</div>
                            </div>

                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50">
                                <button
                                    onClick={() => { setEditingPackage(pkg); setIsModalOpen(true); }}
                                    className="flex-1 py-2 rounded-lg bg-gray-50 text-gray-700 font-medium hover:bg-gray-100 transition text-sm flex items-center justify-center gap-2"
                                >
                                    <Edit2 className="w-4 h-4" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDeletePackage(pkg.id)}
                                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <PackageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={editingPackage ? handleUpdatePackage : handleAddPackage}
                initialData={editingPackage || undefined}
                title={editingPackage ? "Edit Package" : "Add New Package"}
            />
        </div>
    );
}
