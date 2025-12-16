"use client";

import { ArrowLeft, CheckCircle2, Clock, Mail, MessageCircle, Search, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function InquiriesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState('all'); // all | pending | responded

    const inquiries = [
        {
            id: 1,
            patient: "John Doe",
            email: "john@example.com",
            subject: "Knee Replacement Inquiry",
            message: "I am looking for information regarding total knee replacement surgery cost and recovery time.",
            date: "2 hours ago",
            status: "pending",
            priority: "high"
        },
        {
            id: 2,
            patient: "Alice Smith",
            email: "alice@example.com",
            subject: "Cardiology Consultation",
            message: "Do you have availability for Dr. Sarah Johnson next week?",
            date: "1 day ago",
            status: "responded",
            priority: "medium"
        },
        {
            id: 3,
            patient: "Robert Brown",
            email: "robert@example.com",
            subject: "Insurance Question",
            message: "Do you accept international insurance for dental procedures?",
            date: "2 days ago",
            status: "pending",
            priority: "low"
        }
    ];

    return (
        <div className="min-h-full bg-gray-50/50">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/dashboard/hospital"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-purple-600 mb-2 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Patient Inquiries</h1>
                    <p className="text-gray-500 mt-1">Manage and respond to patient questions and consultations.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by patient name or subject..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none shadow-sm"
                        />
                    </div>
                    <div className="flex gap-2 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'all' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'pending' ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setFilter('responded')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'responded' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            Responded
                        </button>
                    </div>
                </div>

                {/* Inquiries List */}
                <div className="space-y-4">
                    {inquiries.map((inquiry, index) => (
                        <div
                            key={inquiry.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all duration-300 group"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Icon/Avatar */}
                                <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${inquiry.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                                    }`}>
                                    {inquiry.status === 'pending' ? <Clock className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                            {inquiry.subject}
                                        </h3>
                                        <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                                            {inquiry.date}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                        <span className="flex items-center gap-1">
                                            <User className="w-4 h-4" />
                                            {inquiry.patient}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Mail className="w-4 h-4" />
                                            {inquiry.email}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 leading-relaxed mb-4 p-4 bg-gray-50 rounded-xl text-sm border border-gray-100">
                                        "{inquiry.message}"
                                    </p>

                                    <div className="flex items-center gap-3">
                                        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition hover:-translate-y-0.5">
                                            <MessageCircle className="w-4 h-4" />
                                            Reply
                                        </button>
                                        <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition border border-gray-200">
                                            Mark as Completed
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
