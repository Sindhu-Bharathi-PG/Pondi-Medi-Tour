"use client";

import { PageLoader } from '@/app/components/common';

import {
    Activity,
    AlertCircle,
    ArrowRight,
    Building2,
    Calendar,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock,
    FileText,
    Globe,
    Image as ImageIcon,
    Package,
    Sparkles,
    Stethoscope,
    TrendingUp,
    Users
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface DashboardStats {
    doctorsCount: number;
    treatmentsCount: number;
    packagesCount: number;
    pendingInquiries: number;
    totalInquiries: number;
    profileCompletion: number;
}

interface Hospital {
    id: number;
    name: string;
    status: string;
    type: string;
    logoUrl: string | null;
    coverUrl: string | null;
    gallery: string[];
}

interface Inquiry {
    id: number;
    patientName: string;
    email: string;
    country: string;
    treatmentType: string;
    subject: string;
    status: string;
    priority: string;
    createdAt: string;
}

interface Appointment {
    id: number;
    patientName: string;
    patientPhone: string;
    appointmentDate: string;
    status: string;
    reason: string;
    doctorId: number;
}

interface DashboardData {
    hospital: Hospital;
    stats: DashboardStats;
    recentInquiries: Inquiry[];
    upcomingAppointments: Appointment[];
}

export default function ClassicDashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        setError(null);

        try {
            const sessionRes = await fetch('/api/auth/session');
            const session = await sessionRes.json();

            if (!session?.user) {
                setError('Not authenticated');
                setLoading(false);
                return;
            }

            const token = session.accessToken;

            if (!token) {
                setError('No access token available. Please login again.');
                setLoading(false);
                return;
            }

            const res = await fetch('http://localhost:3001/api/hospitals/me/dashboard', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Failed to fetch dashboard data');
            }

            const dashboardData = await res.json();
            setData(dashboardData);
        } catch (err: any) {
            console.error('Dashboard fetch error:', err);
            setError(err.message || 'Failed to load dashboard');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <PageLoader message="Loading your dashboard..." />;
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center bg-red-50 border border-red-100 rounded-2xl p-8 max-w-md">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Unable to Load Dashboard</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={fetchDashboardData}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const stats = data?.stats;
    const hospital = data?.hospital;

    return (
        <div className="min-h-screen relative">
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-1/4 -left-1/4 w-1/3 h-1/3 bg-gradient-to-br from-teal-400/15 to-emerald-400/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-1/4 -right-1/4 w-1/3 h-1/3 bg-gradient-to-tl from-blue-400/15 to-purple-400/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 space-y-4 lg:space-y-5 p-4 sm:p-5 lg:p-6">
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    {/* Background Image or Gradient */}
                    <div className="absolute inset-0">
                        {hospital?.coverUrl ? (
                            <img src={hospital.coverUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-teal-600 via-emerald-600 to-green-700" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                    </div>

                    <div className="relative px-5 sm:px-6 lg:px-8 py-6 sm:py-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 sm:w-18 sm:h-18 bg-white rounded-xl flex items-center justify-center shadow-xl ring-2 ring-white/20">
                                    {hospital?.logoUrl ? (
                                        <img src={hospital.logoUrl} alt={hospital.name} className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-lg" />
                                    ) : (
                                        <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600" />
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm
                                            ${hospital?.status === 'verified'
                                                ? 'bg-emerald-500/30 text-emerald-100 ring-1 ring-emerald-400/50'
                                                : 'bg-amber-500/30 text-amber-100 ring-1 ring-amber-400/50'}`}>
                                            <CheckCircle2 className="w-3 h-3" />
                                            {hospital?.status === 'verified' ? 'Verified' : 'Pending'}
                                        </span>
                                    </div>
                                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 drop-shadow-lg">
                                        {hospital?.name || 'Hospital Dashboard'}
                                    </h1>
                                    <p className="text-white/80 text-sm flex items-center gap-1.5">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        {hospital?.type || 'Private Hospital'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Link
                                    href="/dashboard/hospital/profile"
                                    className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-all backdrop-blur-sm border border-white/20"
                                >
                                    Edit Profile
                                </Link>
                                <Link
                                    href="/dashboard/hospital/settings"
                                    className="px-4 py-2 bg-white hover:bg-white/90 text-teal-700 rounded-lg text-sm font-medium transition-all shadow-md"
                                >
                                    Settings
                                </Link>
                            </div>
                        </div>

                        {/* Profile Completion */}
                        <div className="mt-5 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-emerald-300" />
                                    <span className="text-white/90 text-sm font-medium">Profile Completion</span>
                                </div>
                                <span className="text-xl font-bold text-white">{stats?.profileCompletion || 0}%</span>
                            </div>
                            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 rounded-full transition-all duration-1000"
                                    style={{ width: `${stats?.profileCompletion || 0}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>



                {/* Carousel + Quick Actions Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Photo Gallery Carousel - Half Width */}
                    <PhotoCarousel
                        images={hospital?.gallery || []}
                        coverUrl={hospital?.coverUrl || null}
                    />

                    {/* Quick Actions - Right Side */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 overflow-hidden h-full flex flex-col">
                        <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50">
                            <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
                                <Activity className="w-4 h-4 text-emerald-500" />
                                Quick Actions
                            </h3>
                        </div>
                        <div className="p-3 space-y-1 flex-1">
                            <QuickActionButton
                                title="Add New Doctor"
                                icon={Users}
                                href="/dashboard/hospital/doctors"
                                color="blue"
                            />
                            <QuickActionButton
                                title="Add Treatment"
                                icon={Stethoscope}
                                href="/dashboard/hospital/treatments"
                                color="emerald"
                            />
                            <QuickActionButton
                                title="Create Package"
                                icon={Package}
                                href="/dashboard/hospital/packages"
                                color="violet"
                            />
                            <QuickActionButton
                                title="Update Profile"
                                icon={Building2}
                                href="/dashboard/hospital/profile"
                                color="amber"
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Grid with Gradient Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Active Doctors"
                        value={stats?.doctorsCount || 0}
                        icon={Users}
                        gradient="from-blue-500 to-indigo-600"
                        shadowColor="blue"
                        link="/dashboard/hospital/doctors"
                    />
                    <StatCard
                        title="Treatments"
                        value={stats?.treatmentsCount || 0}
                        icon={Stethoscope}
                        gradient="from-emerald-500 to-teal-600"
                        shadowColor="emerald"
                        link="/dashboard/hospital/treatments"
                    />
                    <StatCard
                        title="Packages"
                        value={stats?.packagesCount || 0}
                        icon={Package}
                        gradient="from-violet-500 to-purple-600"
                        shadowColor="violet"
                        link="/dashboard/hospital/packages"
                    />
                    <StatCard
                        title="Pending Inquiries"
                        value={stats?.pendingInquiries || 0}
                        icon={FileText}
                        gradient="from-amber-500 to-orange-600"
                        shadowColor="amber"
                        link="/dashboard/hospital/inquiries"
                        badge={stats?.pendingInquiries && stats.pendingInquiries > 0 ? "New" : undefined}
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
                    {/* Recent Inquiries */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-violet-50 to-purple-50 flex items-center justify-between">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
                                    <FileText className="w-5 h-5 text-violet-500" />
                                    Recent Inquiries
                                </h3>
                                <Link href="/dashboard/hospital/inquiries" className="text-sm text-violet-600 hover:text-violet-700 font-semibold flex items-center gap-1 group">
                                    View All
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            {data?.recentInquiries && data.recentInquiries.length > 0 ? (
                                <div className="divide-y divide-gray-50">
                                    {data.recentInquiries.map((inquiry) => (
                                        <InquiryRow key={inquiry.id} inquiry={inquiry} />
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <FileText className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 font-medium">No inquiries yet</p>
                                    <p className="text-gray-400 text-sm mt-1">Inquiries from patients will appear here</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-4">
                        {/* Upcoming Appointments */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
                                    <Calendar className="w-5 h-5 text-blue-500" />
                                    Upcoming Appointments
                                </h3>
                            </div>

                            {data?.upcomingAppointments && data.upcomingAppointments.length > 0 ? (
                                <div className="divide-y divide-gray-50">
                                    {data.upcomingAppointments.map((apt) => (
                                        <AppointmentRow key={apt.id} appointment={apt} />
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                        <Calendar className="w-7 h-7 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 font-medium text-sm">No upcoming appointments</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for shimmer animation */}
            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </div>
    );
}

// Enhanced Stat Card Component
function StatCard({ title, value, icon: Icon, gradient, shadowColor, link, badge }: {
    title: string;
    value: number;
    icon: any;
    gradient: string;
    shadowColor: string;
    link: string;
    badge?: string;
}) {
    const shadows: Record<string, string> = {
        blue: 'shadow-blue-500/20 hover:shadow-blue-500/40',
        emerald: 'shadow-emerald-500/20 hover:shadow-emerald-500/40',
        violet: 'shadow-violet-500/20 hover:shadow-violet-500/40',
        amber: 'shadow-amber-500/20 hover:shadow-amber-500/40'
    };

    return (
        <Link href={link}>
            <div className={`relative bg-gradient-to-br ${gradient} rounded-2xl p-5 lg:p-6 shadow-xl ${shadows[shadowColor]} hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden group`}>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                {badge && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-white text-xs font-bold rounded-full text-red-500 shadow-md animate-pulse">
                        {badge}
                    </span>
                )}

                <div className="relative z-10">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                    </div>
                    <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
                    <p className="text-3xl lg:text-4xl font-bold text-white">{value}</p>
                    <div className="flex items-center gap-1 mt-3 text-white/70 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </Link>
    );
}

// Inquiry Row Component
function InquiryRow({ inquiry }: { inquiry: Inquiry }) {
    const priorityColors: Record<string, string> = {
        urgent: 'bg-red-100 text-red-700 ring-1 ring-red-200',
        high: 'bg-orange-100 text-orange-700 ring-1 ring-orange-200',
        normal: 'bg-blue-100 text-blue-700 ring-1 ring-blue-200',
        low: 'bg-gray-100 text-gray-700 ring-1 ring-gray-200'
    };

    const statusColors: Record<string, string> = {
        pending: 'bg-amber-100 text-amber-700',
        responded: 'bg-emerald-100 text-emerald-700',
        closed: 'bg-gray-100 text-gray-700'
    };

    const timeAgo = (date: string) => {
        const diff = Date.now() - new Date(date).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    return (
        <div className="px-6 py-4 hover:bg-gray-50/50 transition-colors">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-semibold text-gray-800 truncate">{inquiry.patientName}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[inquiry.priority] || priorityColors.normal}`}>
                            {inquiry.priority}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mb-2">{inquiry.subject}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <Globe className="w-3.5 h-3.5" />
                            {inquiry.country || 'Unknown'}
                        </span>
                        <span className="flex items-center gap-1">
                            <Stethoscope className="w-3.5 h-3.5" />
                            {inquiry.treatmentType || 'General'}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {timeAgo(inquiry.createdAt)}
                        </span>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${statusColors[inquiry.status] || statusColors.pending}`}>
                    {inquiry.status}
                </span>
            </div>
        </div>
    );
}

// Appointment Row Component
function AppointmentRow({ appointment }: { appointment: Appointment }) {
    const formatDate = (date: string) => {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    const formatTime = (date: string) => {
        const d = new Date(date);
        return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="px-6 py-4 hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-semibold text-gray-800">{appointment.patientName}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{appointment.reason || 'Consultation'}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-semibold text-emerald-600">{formatDate(appointment.appointmentDate)}</p>
                    <p className="text-xs text-gray-500">{formatTime(appointment.appointmentDate)}</p>
                </div>
            </div>
        </div>
    );
}

// Quick Action Button Component
function QuickActionButton({ title, icon: Icon, href, color }: { title: string; icon: any; href: string; color: string }) {
    const colors: Record<string, string> = {
        blue: 'group-hover:bg-blue-100 group-hover:text-blue-600',
        emerald: 'group-hover:bg-emerald-100 group-hover:text-emerald-600',
        violet: 'group-hover:bg-violet-100 group-hover:text-violet-600',
        amber: 'group-hover:bg-amber-100 group-hover:text-amber-600'
    };

    return (
        <Link href={href}>
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-all group cursor-pointer">
                <div className={`w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center transition-colors ${colors[color]}`}>
                    <Icon className="w-5 h-5 text-gray-500 group-hover:scale-110 transition-transform" />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">{title}</span>
                <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
            </div>
        </Link>
    );
}

// Photo Carousel Component
function PhotoCarousel({ images, coverUrl }: { images: string[]; coverUrl: string | null }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    // Sample fallback images if no gallery
    const sampleImages = [
        'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&q=80',
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80',
        'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&q=80',
    ];

    // Use gallery images, or cover + samples as fallback
    let allImages = images.filter(img => typeof img === 'string' && img.trim() !== '');

    // Add cover to the start if available and not already in gallery
    if (coverUrl && !allImages.includes(coverUrl)) {
        allImages = [coverUrl, ...allImages];
    }

    // If still empty, use sample images
    if (allImages.length === 0) {
        allImages = sampleImages;
    }

    useEffect(() => {
        if (allImages.length <= 1 || isHovered) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % allImages.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [allImages.length, isHovered]);

    const goToSlide = (index: number) => setCurrentIndex(index);
    const goToPrevious = () => setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    const goToNext = () => setCurrentIndex((prev) => (prev + 1) % allImages.length);

    return (
        <div
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 overflow-hidden h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
                    <ImageIcon className="w-4 h-4 text-emerald-500" />
                    Hospital Gallery
                </h3>
                <span className="text-xs text-gray-500 font-medium">{currentIndex + 1} / {allImages.length}</span>
            </div>

            <div className="relative aspect-[4/3] bg-gray-100">
                {/* Images */}
                <div className="absolute inset-0 overflow-hidden">
                    {allImages.map((img, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-all duration-700 ease-out ${index === currentIndex
                                ? 'opacity-100 scale-100'
                                : 'opacity-0 scale-110'
                                }`}
                        >
                            <img
                                src={img}
                                alt={`Hospital photo ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:bg-white hover:scale-110 transition-all z-10"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:bg-white hover:scale-110 transition-all z-10"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                    </>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Dot Indicators */}
                {allImages.length > 1 && (
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                        {allImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-2 rounded-full transition-all ${index === currentIndex
                                    ? 'w-8 bg-white'
                                    : 'w-2 bg-white/50 hover:bg-white/80'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Thumbnail Strip */}
            {allImages.length > 1 && (
                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                        {allImages.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${index === currentIndex
                                    ? 'border-emerald-500 shadow-lg scale-105'
                                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-300'
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
