"use client";

import { API_BASE, apiCall, useApi } from "@/app/hooks/useApi";
import { ArrowLeft, Award, CheckCircle2, Edit2, Eye, FileText, Filter, Globe, MoreVertical, Plus, Search, Star, Stethoscope, Trash2, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { EmptyState, ErrorState, LoadingSpinner } from "../components/LoadingStates";
import DoctorModal from "./components/DoctorModal";

export default function DoctorsManagementPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState<any>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
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

    // Handle click outside to close dropdown
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
            setActiveDropdown(null);
        } catch (err: any) {
            alert(err.message || 'Failed to delete doctor');
        }
    };

    const handleToggleAvailability = async (doctor: any) => {
        try {
            // Extract only the fields needed for the update
            const updateData = {
                name: doctor.name,
                specialty: doctor.specialty,
                subSpecialty: doctor.subSpecialty || '',
                credentials: doctor.credentials || '',
                experience: doctor.experience || '',
                imageUrl: doctor.imageUrl || '',
                bio: doctor.bio || '',
                surgeriesCount: doctor.surgeriesCount || 0,
                publicationsCount: doctor.publicationsCount || 0,
                languages: doctor.languages || [],
                consultationTimings: doctor.consultationTimings || '',
                isAvailable: !doctor.isAvailable, // Toggle this
                isFeatured: doctor.isFeatured || false,
                education: doctor.education || [],
                expertise: doctor.expertise || [],
                internationalTraining: doctor.internationalTraining || [],
                awards: doctor.awards || [],
                serviceSlug: doctor.serviceSlug || ''
            };
            await apiCall(`/api/hospitals/me/doctors/${doctor.id}`, 'PUT', updateData);
            await refetch();
            setActiveDropdown(null);
        } catch (err: any) {
            alert(err.message || 'Failed to update availability');
        }
    };

    const handleToggleFeatured = async (doctor: any) => {
        try {
            // Extract only the fields needed for the update
            const updateData = {
                name: doctor.name,
                specialty: doctor.specialty,
                subSpecialty: doctor.subSpecialty || '',
                credentials: doctor.credentials || '',
                experience: doctor.experience || '',
                imageUrl: doctor.imageUrl || '',
                bio: doctor.bio || '',
                surgeriesCount: doctor.surgeriesCount || 0,
                publicationsCount: doctor.publicationsCount || 0,
                languages: doctor.languages || [],
                consultationTimings: doctor.consultationTimings || '',
                isAvailable: doctor.isAvailable || false,
                isFeatured: !doctor.isFeatured, // Toggle this
                education: doctor.education || [],
                expertise: doctor.expertise || [],
                internationalTraining: doctor.internationalTraining || [],
                awards: doctor.awards || [],
                serviceSlug: doctor.serviceSlug || ''
            };
            await apiCall(`/api/hospitals/me/doctors/${doctor.id}`, 'PUT', updateData);
            await refetch();
            setActiveDropdown(null);
        } catch (err: any) {
            alert(err.message || 'Failed to update featured status');
        }
    };

    // Filter and search doctors
    const filteredDoctors = (doctors || []).filter((d: any) => {
        const matchesSearch = d.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.specialty?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSpecialty = filters.specialty === "all" || d.specialty === filters.specialty;
        const matchesAvailability = filters.availability === "all" ||
            (filters.availability === "available" && d.isAvailable) ||
            (filters.availability === "unavailable" && !d.isAvailable);
        const matchesFeatured = filters.featured === "all" ||
            (filters.featured === "featured" && d.isFeatured) ||
            (filters.featured === "regular" && !d.isFeatured);
        return matchesSearch && matchesSpecialty && matchesAvailability && matchesFeatured;
    });

    // Get unique specialties for filter dropdown
    const specialties = Array.from(new Set((doctors || []).map((d: any) => d.specialty).filter(Boolean)));

    // Helper to get specialty color
    const getSpecialtyColor = (specialty: string) => {
        const colors: Record<string, string> = {
            'Cardiology': 'from-red-500 to-pink-600',
            'Neurology': 'from-purple-500 to-indigo-600',
            'Orthopedics': 'from-orange-500 to-amber-600',
            'Pediatrics': 'from-blue-400 to-cyan-500',
            'Dermatology': 'from-green-500 to-emerald-600',
            'Oncology': 'from-violet-500 to-purple-600',
            'Psychiatry': 'from-indigo-500 to-blue-600',
            'General Surgery': 'from-gray-600 to-slate-700',
        };
        return colors[specialty] || 'from-blue-500 to-indigo-600';
    };

    if (loading) {
        return <LoadingSpinner message="Loading doctors..." />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={refetch} showLogin />;
    }

    if (!doctors?.length && !loading) {
        return (
            <div className="min-h-full bg-gray-50/50 p-8">
                <Link href="/dashboard/hospital" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-emerald-600 mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
                <EmptyState
                    title="No Doctors Yet"
                    description="Add your first doctor to start building your medical team."
                    icon={<Stethoscope className="w-8 h-8 text-emerald-500" />}
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
                                Doctors Team
                            </h1>
                            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                                {filteredDoctors.length}
                            </div>
                        </div>
                        <p className="text-gray-600 flex items-center gap-2">
                            <Stethoscope className="w-4 h-4" />
                            Manage your medical staff and their schedules
                        </p>
                    </div>

                    <button
                        onClick={() => { setEditingDoctor(null); setIsModalOpen(true); }}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Doctor
                    </button>
                </div>

                {/* Enhanced Filters & Search */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-5 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between relative z-50">
                    <div className="relative flex-1 w-full md:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search doctors by name or specialty..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all outline-none text-gray-900 placeholder:text-gray-400"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-5 py-3.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium shadow-sm"
                            >
                                <Filter className="w-4 h-4" />
                                Filter
                                {(filters.specialty !== "all" || filters.availability !== "all" || filters.featured !== "all") && (
                                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                )}
                            </button>

                            {showFilters && (
                                <div className="absolute top-full mt-2 right-0 md:left-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-gray-900">Filter Doctors</h3>
                                        <button
                                            onClick={() => setFilters({ specialty: "all", availability: "all", featured: "all" })}
                                            className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
                                        >
                                            Clear All
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                                            <select
                                                value={filters.specialty}
                                                onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
                                                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                            >
                                                <option value="all">All Specialties</option>
                                                {specialties.map(spec => (
                                                    <option key={spec} value={spec}>{spec}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                                            <select
                                                value={filters.availability}
                                                onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                                                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                            >
                                                <option value="all">All Doctors</option>
                                                <option value="available">Available</option>
                                                <option value="unavailable">Unavailable</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                            <select
                                                value={filters.featured}
                                                onChange={(e) => setFilters({ ...filters, featured: e.target.value })}
                                                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                            >
                                                <option value="all">All Types</option>
                                                <option value="featured">Featured Only</option>
                                                <option value="regular">Regular Only</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setShowFilters(false)}
                                        className="w-full mt-5 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-medium transition-all shadow-md"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="h-8 w-px bg-gray-300 hidden md:block"></div>
                        <span className="text-sm text-gray-600 hidden md:block font-medium">
                            Showing <span className="font-bold text-blue-600">{filteredDoctors.length}</span> of <span className="font-bold text-gray-900">{doctors.length}</span>
                        </span>
                    </div>
                </div>

                {/* Enhanced Doctors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDoctors.map((doctor, index) => (
                        <div
                            key={doctor.id}
                            className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden relative"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* Featured Badge */}
                            {doctor.isFeatured && (
                                <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-xs font-bold shadow-lg">
                                    <Star className="w-3 h-3 fill-current" />
                                    Featured
                                </div>
                            )}

                            {/* Gradient Border Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <div className="p-6 relative">
                                {/* Three Dot Menu */}
                                <div className="absolute top-4 right-4 z-20" ref={dropdownRef}>
                                    <button
                                        onClick={() => setActiveDropdown(activeDropdown === doctor.id ? null : doctor.id)}
                                        className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all active:scale-95"
                                    >
                                        <MoreVertical className="w-5 h-5" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {activeDropdown === doctor.id && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <button
                                                onClick={() => {
                                                    setEditingDoctor(doctor);
                                                    setIsModalOpen(true);
                                                    setActiveDropdown(null);
                                                }}
                                                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-3"
                                            >
                                                <Eye className="w-4 h-4" />
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditingDoctor(doctor);
                                                    setIsModalOpen(true);
                                                    setActiveDropdown(null);
                                                }}
                                                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-3"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                                Edit Doctor
                                            </button>
                                            <button
                                                onClick={() => handleToggleAvailability(doctor)}
                                                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors flex items-center gap-3"
                                            >
                                                {doctor.isAvailable ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                                                {doctor.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                                            </button>
                                            <button
                                                onClick={() => handleToggleFeatured(doctor)}
                                                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors flex items-center gap-3"
                                            >
                                                <Star className="w-4 h-4" />
                                                {doctor.isFeatured ? 'Remove Featured' : 'Make Featured'}
                                            </button>
                                            <div className="my-1 h-px bg-gray-100"></div>
                                            <button
                                                onClick={() => handleDeleteDoctor(doctor.id)}
                                                className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Delete Doctor
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Doctor Info */}
                                <div className="flex items-start gap-4 mb-6">
                                    {doctor.imageUrl ? (
                                        <img
                                            src={doctor.imageUrl}
                                            alt={doctor.name}
                                            className="w-20 h-20 rounded-2xl object-cover shadow-lg group-hover:scale-110 transition-transform duration-300 ring-4 ring-white"
                                        />
                                    ) : (
                                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getSpecialtyColor(doctor.specialty)} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 ring-4 ring-white`}>
                                            <span className="text-2xl font-bold">{doctor.name.charAt(0)}</span>
                                        </div>
                                    )}
                                    <div className="flex-1 pt-1">
                                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                            {doctor.name}
                                        </h3>
                                        <p className="text-blue-600 font-semibold text-sm mb-1.5">{doctor.specialty}</p>
                                        <div className="flex items-center gap-2 text-xs font-medium">
                                            <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${doctor.isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${doctor.isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                                                {doctor.isAvailable ? 'Available' : 'Unavailable'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Qualifications */}
                                {doctor.qualifications && (
                                    <div className="mb-4 flex items-center gap-2 text-xs text-gray-600">
                                        <Award className="w-4 h-4 text-amber-500" />
                                        <span className="font-medium">{doctor.qualifications}</span>
                                    </div>
                                )}

                                {/* Languages */}
                                {doctor.languages && (
                                    <div className="mb-4 flex items-center gap-2 text-xs text-gray-600">
                                        <Globe className="w-4 h-4 text-blue-500" />
                                        <span>{doctor.languages}</span>
                                    </div>
                                )}

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-3 py-4 border-t border-b border-gray-100">
                                    <div className="text-center p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100 transition-all">
                                        <p className="text-xs text-gray-600 mb-1 font-medium">Consultations</p>
                                        <p className="font-bold text-lg text-gray-900">{doctor.surgeriesCount || 0}+</p>
                                    </div>
                                    <div className="text-center p-3 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 group-hover:from-amber-100 group-hover:to-orange-100 transition-all">
                                        <p className="text-xs text-gray-600 mb-1 font-medium">Experience</p>
                                        <p className="font-bold text-lg text-gray-900">{doctor.experience}</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 mt-6">
                                    <button
                                        onClick={() => { setEditingDoctor(doctor); setIsModalOpen(true); }}
                                        className="flex-1 px-4 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all flex items-center justify-center gap-2 text-sm active:scale-95"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <Link
                                        href="/dashboard/hospital/inquiries"
                                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center justify-center shadow-md hover:shadow-lg active:scale-95"
                                    >
                                        <FileText className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteDoctor(doctor.id)}
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
                        onClick={() => { setEditingDoctor(null); setIsModalOpen(true); }}
                        className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 min-h-[380px] bg-white/50"
                    >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:from-blue-500 group-hover:to-indigo-600 transition-all duration-300 shadow-lg">
                            <Plus className="w-10 h-10 text-blue-500 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Add Another Doctor</h3>
                        <p className="text-sm text-gray-500 text-center max-w-[220px]">Expand your medical team by adding a new profile</p>
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

