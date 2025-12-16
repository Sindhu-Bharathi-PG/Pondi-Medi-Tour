"use client";

import { ArrowLeft, Check, Clock, FileText, Plus, Search, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AppointmentsPage() {
    const [activeTab, setActiveTab] = useState('upcoming');

    const appointments = [
        {
            id: 1,
            patientName: "Michael Scott",
            doctorName: "Dr. James Wilson",
            date: "Today, Oct 24",
            time: "09:00 AM - 10:00 AM",
            type: "Neurology Consultation",
            status: "scheduled",
            avatar: "MS"
        },
        {
            id: 2,
            patientName: "Pam Beesly",
            doctorName: "Dr. Sarah Johnson",
            date: "Today, Oct 24",
            time: "11:30 AM - 12:00 PM",
            type: "Follow-up",
            status: "confirmed",
            avatar: "PB"
        },
        {
            id: 3,
            patientName: "Jim Halpert",
            doctorName: "Dr. Sarah Johnson",
            date: "Tomorrow, Oct 25",
            time: "02:00 PM - 03:00 PM",
            type: "General Checkup",
            status: "pending",
            avatar: "JH"
        }
    ];

    return (
        <div className="min-h-full bg-gray-50/50">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-500/5 rounded-full blur-3xl" />
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
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Appointments</h1>
                        <p className="text-gray-500 mt-1">Manage scheduled visits and patient consultations.</p>
                    </div>

                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all">
                        <Plus className="w-4 h-4" />
                        New Appointment
                    </button>
                </div>

                {/* Tabs & Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
                    <div className="flex p-1 bg-white border border-gray-100 rounded-xl shadow-sm w-full md:w-auto">
                        {['upcoming', 'completed', 'cancelled'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab
                                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:max-w-xs">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Find appointment..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Date Group */}
                <div className="mb-6">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Today, Oct 24</h2>
                    <div className="space-y-4">
                        {appointments.slice(0, 2).map((apt, index) => (
                            <div
                                key={apt.id}
                                className="group bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-center"
                            >
                                {/* Time Column */}
                                <div className="min-w-[140px] flex flex-col items-center md:items-start border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-6">
                                    <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
                                        <Clock className="w-5 h-5" />
                                        {apt.time.split(' - ')[0]}
                                    </div>
                                    <p className="text-gray-400 text-sm mt-1">{apt.time.split(' - ')[1]} End</p>
                                </div>

                                {/* Main Info */}
                                <div className="flex-1 w-full">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{apt.type}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${apt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                                            }`}>
                                            {apt.status}
                                        </span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                                {apt.avatar}
                                            </div>
                                            {apt.patientName}
                                        </div>
                                        <div className="hidden sm:block w-px h-4 bg-gray-200"></div>
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-gray-400" />
                                            {apt.doctorName}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                                    <button className="flex-1 md:flex-none py-2 px-4 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-medium hover:bg-emerald-100 transition flex items-center justify-center gap-2">
                                        <Check className="w-4 h-4" />
                                        <span className="md:hidden">Accept</span>
                                    </button>
                                    <button className="flex-1 md:flex-none py-2 px-4 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition flex items-center justify-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        <span className="md:hidden">Details</span>
                                    </button>
                                    <button className="flex-1 md:flex-none py-2 px-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition flex items-center justify-center gap-2">
                                        <X className="w-4 h-4" />
                                        <span className="md:hidden">Cancel</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Next Days */}
                <div className="mb-6">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Tomorrow, Oct 25</h2>
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
                        <p className="text-gray-500">You have 1 appointment scheduled.</p>
                        <button className="text-blue-600 font-medium mt-2 hover:underline">View Schedule</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
