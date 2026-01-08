"use client";

import PageBuilder from "@/app/components/cms/PageBuilder";
import { ArrowLeft, Monitor, Smartphone, Tablet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PageBuilderPage() {
    // Current valid page options matching backend validation
    const pageOptions = [
        { id: 'medical', name: 'Home (Medical)' },
        { id: 'wellness', name: 'Home (Wellness)' },
        { id: 'about', name: 'About Us' },
        { id: 'services', name: 'Services' },
        { id: 'contact', name: 'Contact' }
    ];

    const [selectedPage, setSelectedPage] = useState("medical");
    const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Top Bar */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm flex-none">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/superadmin" className="p-2 hover:bg-slate-100 rounded-lg transition">
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">Page Builder</h1>
                            <p className="text-sm text-slate-500">Super Admin Content Management</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Page Selector */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-600">Editing:</span>
                            <select
                                value={selectedPage}
                                onChange={(e) => setSelectedPage(e.target.value)}
                                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {pageOptions.map(opt => (
                                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="h-6 w-px bg-slate-200 mx-2"></div>

                        {/* Viewport Controls */}
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            <button
                                onClick={() => setViewMode("desktop")}
                                className={`p-2 rounded-md transition ${viewMode === "desktop" ? "bg-white shadow text-indigo-600" : "text-slate-500 hover:text-slate-900"}`}
                                title="Desktop View"
                            >
                                <Monitor className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("tablet")}
                                className={`p-2 rounded-md transition ${viewMode === "tablet" ? "bg-white shadow text-indigo-600" : "text-slate-500 hover:text-slate-900"}`}
                                title="Tablet View"
                            >
                                <Tablet className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("mobile")}
                                className={`p-2 rounded-md transition ${viewMode === "mobile" ? "bg-white shadow text-indigo-600" : "text-slate-500 hover:text-slate-900"}`}
                                title="Mobile View"
                            >
                                <Smartphone className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Builder Area */}
            <div className={`flex-1 overflow-hidden relative ${viewMode === 'mobile' ? 'max-w-sm mx-auto border-x-2 border-slate-300' :
                    viewMode === 'tablet' ? 'max-w-3xl mx-auto border-x-2 border-slate-300' :
                        'w-full'
                } transition-all duration-300 bg-white`}>
                <PageBuilder pageType={selectedPage as any} />
            </div>
        </div>
    );
}
