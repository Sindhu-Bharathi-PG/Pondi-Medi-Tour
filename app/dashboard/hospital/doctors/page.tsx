"use client";

import { API_BASE, apiCall, useApi } from "@/app/hooks/useApi";
import { ArrowLeft, Edit2, FileText, Filter, MoreVertical, Plus, Search, Stethoscope, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { EmptyState, ErrorState, LoadingSpinner } from "../components/LoadingStates";
import DoctorModal from "./components/DoctorModal";

export default function DoctorsManagementPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState<any>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        specialty: "all",
        availability: "all",
        featured: "all"
    });

    // Use the optimized API hook
    const { data: doctors, loading, error, refetch } = useApi<any[]>({
        url: `${API_BASE}/api/hospitals/me/doctors`,
        initialData: []
    });

    const handleAddDoctor = async (data: any) => {
        try {
            await apiCall('/api/hospitals/me/doctors', 'POST', data);
            await refetch();
            setIsModalOpen(false);
        } catch (err: any) {
            alert(err.message || 'Failed to add doctor');
        }
    };

    const handleUpdateDoctor = async (data: any) => {
        if (!editingDoctor) return;
        try {
            await apiCall(`/api/hospitals/me/doctors/${editingDoctor.id}`, 'PUT', data);
            await refetch();
            setIsModalOpen(false);
            setEditingDoctor(null);
        } catch (err: any) {
            alert(err.message || 'Failed to update doctor');
        }
    };

    const handleDeleteDoctor = async (id: number) => {
        if (!confirm('Are you sure you want to delete this doctor?')) return;
        try {
            await apiCall(`/api/hospitals/me/doctors/${id}`, 'DELETE');
            await refetch();
        } catch (err: any) {
            alert(err.message || 'Failed to delete doctor');
        }
    };

    // Filter and search doctors
    const filteredDoctors = (doctors || []).filter((d: any) => {
        // Search filter
        const matchesSearch = d.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.specialty?.toLowerCase().includes(searchQuery.toLowerCase());

        // Specialty filter
        const matchesSpecialty = filters.specialty === "all" || d.specialty === filters.specialty;

        // Availability filter
        const matchesAvailability = filters.availability === "all" ||
            (filters.availability === "available" && d.isAvailable) ||
            (filters.availability === "unavailable" && !d.isAvailable);

        // Featured filter
        const matchesFeatured = filters.featured === "all" ||
            (filters.featured === "featured" && d.isFeatured) ||
            (filters.featured === "regular" && !d.isFeatured);

        return matchesSearch && matchesSpecialty && matchesAvailability && matchesFeatured;
    });

    // Get unique specialties for filter dropdown
    const specialties = Array.from(new Set((doctors || []).map((d: any) => d.specialty).filter(Boolean)));

    if (loading) {
        return <LoadingSpinner message="Loading doctors..." />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={refetch} showLogin />;
    }

    if (!doctors?.length && !loading) {
        return (
            <div className="min-h-full bg-gray-50/50 p-8">
                <Link href="/dashboard/hospital" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
                <EmptyState
                    title="No Doctors Yet"
                    description="Add your first doctor to start building your medical team."
                    icon={<Stethoscope className="w-8 h-8 text-blue-500" />}
                    action={{ label: "Add First Doctor", onClick: () => setIsModalOpen(true) }}
                />
                <DoctorModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddDoctor}
                    initialData={null}
                    title="Add New Doctor"
                />
            </div>
        );
    }

    return (
        <div className="min-h-full bg-gray-50/50">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-emerald-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <Link
                            href="/dashboard/hospital"
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 mb-2 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Doctors Team</h1>
                        <p className="text-gray-500 mt-1">Manage your medical staff and their schedules.</p>
                    </div>

                    <button
                        onClick={() => { setEditingDoctor(null); setIsModalOpen(true); }}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all group"
                    >
                        <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:rotate-90 transition-transform">
                            <Plus className="w-4 h-4" />
                        </div>
                        Add New Doctor
                    </button>
                </div>

                {/* Filters & Search */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative flex-1 w-full md:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search doctors by name or specialty..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium"
                            >
                                <Filter className="w-4 h-4" />
                                Filter
                                {(filters.specialty !== "all" || filters.availability !== "all" || filters.featured !== "all") && (
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                )}
                            </button>

                            {/* Filter Dropdown */}
                            {showFilters && (
                                <div className="absolute top-full mt-2 right-0 md:left-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-gray-900">Filter Doctors</h3>
                                        <button
                                            onClick={() => setFilters({ specialty: "all", availability: "all", featured: "all" })}
                                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            Clear All
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Specialty Filter */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                                            <select
                                                value={filters.specialty}
                                                onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                            >
                                                <option value="all">All Specialties</option>
                                                {specialties.map(spec => (
                                                    <option key={spec} value={spec}>{spec}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Availability Filter */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                                            <select
                                                value={filters.availability}
                                                onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                            >
                                                <option value="all">All Doctors</option>
                                                <option value="available">Available</option>
                                                <option value="unavailable">Unavailable</option>
                                            </select>
                                        </div>

                                        {/* Featured Filter */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                            <select
                                                value={filters.featured}
                                                onChange={(e) => setFilters({ ...filters, featured: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                            >
                                                <option value="all">All Types</option>
                                                <option value="featured">Featured Only</option>
                                                <option value="regular">Regular Only</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setShowFilters(false)}
                                        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
                        <span className="text-sm text-gray-500 hidden md:block">
                            Showing <span className="font-bold text-gray-900">{filteredDoctors.length}</span> doctors
                        </span>
                    </div>
                </div>

                {/* Doctors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDoctors.map((doctor, index) => (
                        <div
                            key={doctor.id}
                            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                            style={{ animationDelay: `${index * 100} ms` }}
                        >
                            <div className="p-6 relative">
                                <div className="absolute top-4 right-4">
                                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                                        <span className="text-2xl font-bold">{doctor.name.charAt(4)}</span>
                                    </div>
                                    <div className="pt-1">
                                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{doctor.name}</h3>
                                        <p className="text-blue-600 font-medium text-sm mb-1">{doctor.specialty}</p>
                                        <div className="flex items-center gap-1.5 text-xs font-medium mt-1">
                                            <span className={`w-2 h-2 rounded-full ${doctor.isAvailable ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-red-500'}`}></span>
                                            <span className={doctor.isAvailable ? 'text-emerald-700' : 'text-red-600'}>
                                                {doctor.isAvailable ? 'Available' : 'Unavailable'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-50">
                                    <div className="text-center p-2 rounded-xl bg-gray-50 group-hover:bg-blue-50 transition-colors">
                                        <p className="text-xs text-gray-500 mb-1">Consultations</p>
                                        <p className="font-bold text-gray-900">{doctor.surgeriesCount || 0}+</p>
                                    </div>
                                    <div className="text-center p-2 rounded-xl bg-gray-50 group-hover:bg-amber-50 transition-colors">
                                        <p className="text-xs text-gray-500 mb-1">Experience</p>
                                        <p className="font-bold text-gray-900">{doctor.experience}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-6 gap-3">
                                    <button
                                        onClick={() => { setEditingDoctor(doctor); setIsModalOpen(true); }}
                                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition flex items-center justify-center gap-2 text-sm"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <Link
                                        href="/dashboard/hospital/inquiries"
                                        className="px-4 py-2.5 rounded-xl bg-blue-50 text-blue-600 border border-transparent hover:bg-blue-100 transition flex items-center justify-center gap-2 text-sm font-medium"
                                    >
                                        <FileText className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteDoctor(doctor.id)}
                                        className="px-4 py-2.5 rounded-xl bg-red-50 text-red-600 border border-transparent hover:bg-red-100 transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add New Card (Empty State) */}
                    <button
                        onClick={() => { setEditingDoctor(null); setIsModalOpen(true); }}
                        className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 min-h-[300px]"
                    >
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-100 transition-all">
                            <Plus className="w-8 h-8 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Add Another Doctor</h3>
                        <p className="text-sm text-gray-500 text-center max-w-[200px]">Expand your medical team by adding a new profile.</p>
                    </button>
                </div>

                {/* Doctor Modal */}
                <DoctorModal
                    isOpen={isModalOpen}
                    onClose={() => { setIsModalOpen(false); setEditingDoctor(null); }}
                    onSubmit={editingDoctor ? handleUpdateDoctor : handleAddDoctor}
                    initialData={editingDoctor || undefined}
                    title={editingDoctor ? "Edit Doctor" : "Add New Doctor"}
                />
            </div>
        </div>
    );
}

