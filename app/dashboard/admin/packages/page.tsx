"use client";

import Modal from "@/app/components/admin/Modal";
import { Building2, DollarSign, Package, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface PackageData {
    id: number;
    name: string;
    category: string;
    price: number;
    discountedPrice?: number;
    duration: string;
    hospitalId: number;
    hospitalName?: string;
    isActive: boolean;
    isPopular?: boolean;
    createdAt: string;
    shortDescription?: string;
    inclusions?: string[] | string;
}

export default function AdminPackagesPage() {
    const [packages, setPackages] = useState<PackageData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState('all');

    const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
    const [packageToDelete, setPackageToDelete] = useState<PackageData | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchPackages();
    }, []);

    const handleDelete = async () => {
        if (!packageToDelete || isDeleting) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`/api/admin/packages/${packageToDelete.id}`, {
                method: 'DELETE'
            });

            if (response.ok || response.status === 404) {
                // If success or already deleted (404), remove from UI
                setPackages(packages.filter(p => p.id !== packageToDelete.id));
                setPackageToDelete(null);
            } else {
                console.error("Failed to delete package");
            }
        } catch (error) {
            console.error("Error deleting package:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const fetchPackages = async () => {
        try {
            const response = await fetch('/api/admin/packages');
            if (response.ok) {
                const data = await response.json();
                setPackages(data.packages || []);
            } else {
                useMockData();
            }
        } catch (error) {
            console.error("Failed to fetch packages", error);
            useMockData();
        } finally {
            setLoading(false);
        }
    };

    const useMockData = () => {
        setPackages([
            {
                id: 1,
                name: "Complete Health Checkup",
                category: "Preventive Care",
                price: 15000,
                discountedPrice: 12000,
                duration: "1 Day",
                hospitalId: 1,
                hospitalName: "Apollo Hospital",
                isActive: true,
                isPopular: true,
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                name: "Cardiac Surgery Package",
                category: "Cardiology",
                price: 350000,
                duration: "7 Days",
                hospitalId: 1,
                hospitalName: "Apollo Hospital",
                isActive: true,
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                name: "Knee Replacement Package",
                category: "Orthopedics",
                price: 275000,
                discountedPrice: 250000,
                duration: "5 Days",
                hospitalId: 2,
                hospitalName: "Fortis Hospital",
                isActive: false,
                createdAt: new Date().toISOString()
            }
        ]);
    };

    const filteredPackages = packages.filter(pkg => {
        const matchesSearch = pkg.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pkg.category?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'all' ||
            (filter === 'active' && pkg.isActive) ||
            (filter === 'inactive' && !pkg.isActive);
        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: packages.length,
        active: packages.filter(p => p.isActive).length,
        inactive: packages.filter(p => !p.isActive).length,
        popular: packages.filter(p => p.isPopular).length
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-lg shadow-orange-500/25">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                        Package Management
                    </h1>
                    <p className="text-gray-600 mt-1">View and manage all hospital packages across the platform</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Packages', value: stats.total, color: 'from-violet-500 to-purple-600', icon: Package },
                    { label: 'Active', value: stats.active, color: 'from-emerald-500 to-teal-600', icon: Package },
                    { label: 'Inactive', value: stats.inactive, color: 'from-gray-500 to-slate-600', icon: Package },
                    { label: 'Popular', value: stats.popular, color: 'from-amber-500 to-orange-600', icon: Package },
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-xs text-gray-500">{stat.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search packages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none"
                    />
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none text-gray-600 font-medium"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                </select>
            </div>

            {/* Packages Grid */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="relative">
                        <div className="w-14 h-14 border-4 border-orange-500/30 border-t-orange-600 rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg p-2">
                                <Package className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-600 font-medium">Loading packages...</p>
                </div>
            ) : filteredPackages.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">No packages found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPackages.map((pkg) => (
                        <div key={pkg.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                            {/* Header with gradient */}
                            <div className="h-24 bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Package className="w-12 h-12 text-white/30" />
                                </div>
                                {pkg.isPopular && (
                                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur text-amber-600 rounded-lg text-xs font-bold shadow">
                                        🔥 Popular
                                    </span>
                                )}
                                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold ${pkg.isActive
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {pkg.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>

                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors line-clamp-1">
                                    {pkg.name}
                                </h3>
                                <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                                    <Building2 className="w-4 h-4" />
                                    {pkg.hospitalName || 'Unknown Hospital'}
                                </p>

                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                                        {pkg.category}
                                    </span>
                                    <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
                                        {pkg.duration}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <DollarSign className="w-5 h-5 text-gray-400" />
                                    <span className="text-2xl font-bold text-gray-900">
                                        ₹{(pkg.discountedPrice || pkg.price).toLocaleString('en-IN')}
                                    </span>
                                    {pkg.discountedPrice && (
                                        <span className="text-sm text-gray-400 line-through">
                                            ₹{pkg.price.toLocaleString('en-IN')}
                                        </span>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedPackage(pkg)}
                                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition text-sm"
                                    >
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => setPackageToDelete(pkg)}
                                        className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition"
                                        title="Delete Package"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Modal
                isOpen={!!selectedPackage}
                onClose={() => setSelectedPackage(null)}
                title="Package Details"
                size="lg"
            >
                {selectedPackage && (
                    <div className="space-y-6">
                        {/* Header Info */}
                        <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
                                <Package className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{selectedPackage.name}</h3>
                                        <p className="text-gray-500 flex items-center gap-1.5 mt-1">
                                            <Building2 className="w-4 h-4" />
                                            {selectedPackage.hospitalName || 'Unknown Hospital'}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${selectedPackage.isActive
                                        ? 'bg-emerald-100 text-emerald-700'
                                        : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {selectedPackage.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Price & Duration Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <div className="text-sm text-gray-500 mb-1">Category</div>
                                <div className="font-medium text-gray-900">{selectedPackage.category}</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <div className="text-sm text-gray-500 mb-1">Duration</div>
                                <div className="font-medium text-gray-900">{selectedPackage.duration}</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <div className="text-sm text-gray-500 mb-1">Price</div>
                                <div className="font-bold text-gray-900">
                                    ₹{(selectedPackage.discountedPrice || selectedPackage.price).toLocaleString('en-IN')}
                                    {selectedPackage.discountedPrice && (
                                        <span className="text-sm text-gray-400 font-normal line-through ml-2">
                                            ₹{selectedPackage.price.toLocaleString('en-IN')}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {selectedPackage.shortDescription && (
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                                <p className="text-gray-600 bg-gray-50 p-4 rounded-xl text-sm leading-relaxed">
                                    {selectedPackage.shortDescription}
                                </p>
                            </div>
                        )}

                        {/* Inclusions */}
                        {selectedPackage.inclusions && (
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">Inclusions</h4>
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                        {Array.isArray(selectedPackage.inclusions)
                                            ? selectedPackage.inclusions.map((inc: string, i: number) => (
                                                <li key={i}>{inc}</li>
                                            ))
                                            : typeof selectedPackage.inclusions === 'string'
                                                ? (selectedPackage.inclusions as string).split(',').map((inc: string, i: number) => (
                                                    <li key={i}>{inc.trim()}</li>
                                                ))
                                                : <li>No specific inclusions listed</li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Footer Actions */}
                        <div className="flex justify-end pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setSelectedPackage(null)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!packageToDelete}
                onClose={() => setPackageToDelete(null)}
                title="Confirm Deletion"
                size="sm"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                            <Trash2 className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Delete Package</p>
                            <p className="text-sm text-gray-500">Are you sure you want to delete this?</p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600">
                        This action cannot be undone. <b>{packageToDelete?.name}</b> will be permanently removed.
                    </p>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            onClick={() => setPackageToDelete(null)}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isDeleting ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Trash2 className="w-4 h-4" />
                            )}
                            {isDeleting ? 'Deleting...' : 'Delete Package'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
