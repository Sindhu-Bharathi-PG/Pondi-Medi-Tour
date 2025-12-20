"use client";

import PageBuilder from "@/app/components/cms/PageBuilder";
import { Sparkles, Stethoscope } from "lucide-react";
import { useState } from "react";

export default function PageBuilderPage() {
    const [activeTab, setActiveTab] = useState<"medical" | "wellness">("medical");

    return (
        <div className="h-screen flex flex-col bg-white overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0 z-10">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Landing Page Builder</h1>
                    <p className="text-sm text-slate-600">Customize your landing pages with drag-and-drop</p>
                </div>

                {/* Tab Switcher */}
                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab("medical")}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === "medical"
                                ? "bg-white text-violet-700 shadow-sm"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                    >
                        <Stethoscope className="w-4 h-4" />
                        Medical Tourism
                    </button>
                    <button
                        onClick={() => setActiveTab("wellness")}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === "wellness"
                                ? "bg-white text-emerald-700 shadow-sm"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                    >
                        <Sparkles className="w-4 h-4" />
                        Wellness & Ayurveda
                    </button>
                </div>
            </div>

            {/* Builder Content */}
            <div className="flex-1 overflow-hidden relative">
                <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 'medical' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                    <PageBuilder key="medical" pageType="medical" />
                </div>
                <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 'wellness' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                    <PageBuilder key="wellness" pageType="wellness" />
                </div>
            </div>
        </div>
    );
}
