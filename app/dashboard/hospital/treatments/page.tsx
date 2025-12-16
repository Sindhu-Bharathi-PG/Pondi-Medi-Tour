"use client";

import { Activity, ArrowLeft, Clock, DollarSign, Plus, Sparkles, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TreatmentsPage() {
    const [viewMode, setViewMode] = useState('treatments'); // treatments | packages

    const treatments = [
        {
            id: 1,
            name: "Total Knee Replacement",
            category: "Orthopedics",
            price: "$4,500 - $6,000",
            duration: "3-5 Days Stay",
            popular: true,
            description: "Complete surgical replacement of the knee joint with artificial material."
        },
        {
            id: 2,
            name: "Angioplasty",
            category: "Cardiology",
            price: "$3,200 - $4,500",
            duration: "2-3 Days Stay",
            popular: false,
            description: "Procedure to restore blood flow through the artery."
        },
        {
            id: 3,
            name: "Dental Implants (Full Mouth)",
            category: "Dental",
            price: "$8,000 - $12,000",
            duration: "2 Visits (7 Days)",
            popular: true,
            description: "Comprehensive dental restoration using titanium implants."
        }
    ];

    return (
        <div className="min-h-full bg-gray-50/50">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-teal-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <Link
                            href="/dashboard/hospital"
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-teal-600 mb-2 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Treatments & Packages</h1>
                        <p className="text-gray-500 mt-1">Showcase your medical services and wellness packages.</p>
                    </div>

                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-medium shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all">
                        <Plus className="w-4 h-4" />
                        Add New Service
                    </button>
                </div>

                {/* View Switcher */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 inline-flex">
                        <button
                            onClick={() => setViewMode('treatments')}
                            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${viewMode === 'treatments'
                                    ? 'bg-teal-50 text-teal-700'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <Activity className="w-4 h-4" />
                            Treatments
                        </button>
                        <button
                            onClick={() => setViewMode('packages')}
                            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${viewMode === 'packages'
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <Sparkles className="w-4 h-4" />
                            Wellness Packages
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {treatments.map((treatment, index) => (
                        <div
                            key={treatment.id}
                            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Decorative Top Border */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-3 py-1 rounded-lg bg-gray-50 text-gray-600 text-xs font-bold uppercase tracking-wide">
                                        {treatment.category}
                                    </span>
                                    {treatment.popular && (
                                        <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                                            <Sparkles className="w-3 h-3" />
                                            Popular
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                                    {treatment.name}
                                </h3>
                                <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                                    {treatment.description}
                                </p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <DollarSign className="w-4 h-4 text-gray-400" />
                                        <span className="font-semibold">{treatment.price}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span>{treatment.duration}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
                                    <button className="flex-1 py-2 rounded-lg border border-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-gray-200 transition">
                                        Edit Details
                                    </button>
                                    <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add New Card */}
                    <button className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-gray-200 hover:border-teal-400 hover:bg-teal-50/10 transition-all group min-h-[280px]">
                        <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-teal-100 transition-all text-teal-600">
                            <Plus className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Add Treatment</h3>
                        <p className="text-sm text-gray-500">List a new medical procedure</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
