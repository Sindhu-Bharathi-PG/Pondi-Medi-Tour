"use client";

import HospitalLoader from "./HospitalLoader";

import {
    Activity,
    AlertCircle,
    ArrowRight,
    Building2,
    Calendar,
    CheckCircle2,
    Clock,
    FileText,
    Globe,
    Package,
    Stethoscope,
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
            // Get the session with access token
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

            // Fetch dashboard data from backend
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
        return (
            <div className="min-h-[40vh] flex items-center justify-center">
                <HospitalLoader message="Loading dashboard..." size="md" />
            </div>
        );
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
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Classic Header Banner */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                                {hospital?.logoUrl ? (
                                    <img src={hospital.logoUrl} alt={hospital.name} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                                ) : (
                                    <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-slate-700" />
                                )}
                            </div>
                            <div>
                                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white line-clamp-1">{hospital?.name || 'Hospital Dashboard'}</h1>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
                                        ${hospital?.status === 'verified' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                                        <CheckCircle2 className="w-3 h-3" />
                                        {hospital?.status || 'Pending'}
                                    </span>
                                    <span className="text-slate-400 text-xs sm:text-sm hidden sm:inline">{hospital?.type || 'Private Hospital'}</span>
                                </div>
                            </div>
                        </div>
                        <Link
                            href="/dashboard/hospital/profile"
                            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs sm:text-sm font-medium transition border border-white/10 whitespace-nowrap"
                        >
                            Edit Profile
                        </Link>
                    </div>
                </div>

                {/* Profile Completion Bar */}
                <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-slate-50 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600">Profile Completion</span>
                        <span className="text-sm font-bold text-slate-800">{stats?.profileCompletion || 0}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                            style={{ width: `${stats?.profileCompletion || 0}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Stats Grid - Classic Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                <StatCard
                    title="Active Doctors"
                    value={stats?.doctorsCount || 0}
                    icon={Users}
                    color="blue"
                    link="/dashboard/hospital/doctors"
                />
                <StatCard
                    title="Treatments"
                    value={stats?.treatmentsCount || 0}
                    icon={Stethoscope}
                    color="emerald"
                    link="/dashboard/hospital/treatments"
                />
                <StatCard
                    title="Packages"
                    value={stats?.packagesCount || 0}
                    icon={Package}
                    color="violet"
                    link="/dashboard/hospital/packages"
                />
                <StatCard
                    title="Pending Inquiries"
                    value={stats?.pendingInquiries || 0}
                    icon={FileText}
                    color="amber"
                    link="/dashboard/hospital/inquiries"
                    badge={stats?.pendingInquiries && stats.pendingInquiries > 0 ? "Action Required" : undefined}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Inquiries */}
                <div className="lg:col-span-2">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-violet-500" />
                                Recent Inquiries
                            </h3>
                            <Link href="/dashboard/hospital/inquiries" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                                View All →
                            </Link>
                        </div>

                        {data?.recentInquiries && data.recentInquiries.length > 0 ? (
                            <div className="divide-y divide-gray-50">
                                {data.recentInquiries.map((inquiry) => (
                                    <InquiryRow key={inquiry.id} inquiry={inquiry} />
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-gray-500">
                                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p>No inquiries yet</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions & Appointments */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-emerald-500" />
                                Quick Actions
                            </h3>
                        </div>
                        <div className="p-4 space-y-2">
                            <QuickActionButton
                                title="Add New Doctor"
                                icon={Users}
                                href="/dashboard/hospital/doctors/new"
                            />
                            <QuickActionButton
                                title="Add Treatment"
                                icon={Stethoscope}
                                href="/dashboard/hospital/treatments/new"
                            />
                            <QuickActionButton
                                title="Create Package"
                                icon={Package}
                                href="/dashboard/hospital/packages/new"
                            />
                            <QuickActionButton
                                title="Update Profile"
                                icon={Building2}
                                href="/dashboard/hospital/profile"
                            />
                        </div>
                    </div>

                    {/* Upcoming Appointments */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
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
                            <div className="p-6 text-center text-gray-500">
                                <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                <p className="text-sm">No upcoming appointments</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Stat Card Component
function StatCard({ title, value, icon: Icon, color, link, badge }: {
    title: string;
    value: number;
    icon: any;
    color: 'blue' | 'emerald' | 'violet' | 'amber';
    link: string;
    badge?: string;
}) {
    const colors = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        violet: 'bg-violet-50 text-violet-600 border-violet-100',
        amber: 'bg-amber-50 text-amber-600 border-amber-100'
    };

    const iconColors = {
        blue: 'bg-blue-100 text-blue-600',
        emerald: 'bg-emerald-100 text-emerald-600',
        violet: 'bg-violet-100 text-violet-600',
        amber: 'bg-amber-100 text-amber-600'
    };

    return (
        <Link href={link}>
            <div className={`bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer relative overflow-hidden group`}>
                {badge && (
                    <span className="absolute top-2 right-2 sm:top-3 sm:right-3 px-1.5 py-0.5 sm:px-2 bg-red-500 text-white text-[10px] sm:text-xs font-medium rounded-full">
                        {badge}
                    </span>
                )}
                <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl ${iconColors[color]} flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </div>
                <p className="text-gray-500 text-xs sm:text-sm font-medium truncate">{title}</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mt-0.5 sm:mt-1">{value}</p>
                <div className="hidden sm:flex items-center gap-1 mt-2 text-emerald-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                </div>
            </div>
        </Link>
    );
}

// Inquiry Row Component
function InquiryRow({ inquiry }: { inquiry: Inquiry }) {
    const priorityColors: Record<string, string> = {
        urgent: 'bg-red-100 text-red-700',
        high: 'bg-orange-100 text-orange-700',
        normal: 'bg-blue-100 text-blue-700',
        low: 'bg-gray-100 text-gray-700'
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
        <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-800 truncate">{inquiry.patientName}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[inquiry.priority] || priorityColors.normal}`}>
                            {inquiry.priority}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{inquiry.subject}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {inquiry.country || 'Unknown'}
                        </span>
                        <span className="flex items-center gap-1">
                            <Stethoscope className="w-3 h-3" />
                            {inquiry.treatmentType || 'General'}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {timeAgo(inquiry.createdAt)}
                        </span>
                    </div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[inquiry.status] || statusColors.pending}`}>
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
        <div className="px-6 py-3 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-medium text-gray-800">{appointment.patientName}</p>
                    <p className="text-xs text-gray-500">{appointment.reason || 'Consultation'}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium text-emerald-600">{formatDate(appointment.appointmentDate)}</p>
                    <p className="text-xs text-gray-500">{formatTime(appointment.appointmentDate)}</p>
                </div>
            </div>
        </div>
    );
}

// Quick Action Button Component
function QuickActionButton({ title, icon: Icon, href }: { title: string; icon: any; href: string }) {
    return (
        <Link href={href}>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <Icon className="w-5 h-5 text-gray-600 group-hover:text-emerald-600 transition-colors" />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-emerald-700 transition-colors">{title}</span>
                <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
            </div>
        </Link>
    );
}
