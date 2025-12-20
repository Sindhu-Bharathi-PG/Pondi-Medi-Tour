"use client";

import { HomePageConfig } from "@/app/types/homeConfig.types";
import { Monitor, Save, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { ToastContainer, useToast } from "../admin/Toast";
import DragDropList from "./DragDropList";
import PagePreview from "./PagePreview";
import SectionEditor from "./SectionEditor";

interface PageBuilderProps {
    pageType: "medical" | "wellness";
}

export default function PageBuilder({ pageType }: PageBuilderProps) {
    const [config, setConfig] = useState<HomePageConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
    const toast = useToast();

    useEffect(() => {
        fetchConfig();
    }, [pageType]);

    const fetchConfig = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/cms/pages/${pageType}?status=draft`);
            if (!response.ok) throw new Error("Failed to load configuration");
            const data = await response.json();
            setConfig(data.config);
        } catch (error) {
            console.error("Error loading config:", error);
            toast.error("Failed to load page configuration");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (publish = false) => {
        if (!config) return;

        try {
            setSaving(true);

            // Save draft
            const saveResponse = await fetch(`/api/cms/pages/${pageType}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ config, notes: "Auto-save from editor" })
            });

            if (!saveResponse.ok) throw new Error("Failed to save draft");

            if (publish) {
                const publishResponse = await fetch(`/api/cms/pages/${pageType}/publish`, {
                    method: "POST"
                });
                if (!publishResponse.ok) throw new Error("Failed to publish");
                toast.success("Page published successfully!");
            } else {
                toast.success("Draft saved successfully");
            }
        } catch (error) {
            console.error("Error saving:", error);
            toast.error(publish ? "Failed to publish page" : "Failed to save draft");
        } finally {
            setSaving(false);
        }
    };

    const handleSectionsReorder = (newOrder: string[]) => {
        if (!config) return;

        // Sort sections based on new ID order
        const reorderedSections = [...config.sections].sort((a, b) => {
            return newOrder.indexOf(a.id) - newOrder.indexOf(b.id);
        });

        // Update order property
        const updatedSections = reorderedSections.map((section, index) => ({
            ...section,
            order: index + 1
        }));

        setConfig({ ...config, sections: updatedSections });
    };

    const handeSectionUpdate = (updatedSection: any) => {
        if (!config) return;

        const updatedSections = config.sections.map(s =>
            s.id === updatedSection.id ? updatedSection : s
        );

        setConfig({ ...config, sections: updatedSections });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="animate-spin text-violet-600 rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
            </div>
        );
    }

    if (!config) return <div>Failed to load configuration</div>;

    const sectionIds = config.sections.map(s => s.id);

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col">
            <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

            {/* Toolbar */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab("editor")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === "editor" ? "bg-white shadow-sm text-slate-900" : "text-slate-600 hover:text-slate-900"
                                }`}
                        >
                            Editor
                        </button>
                        <button
                            onClick={() => setActiveTab("preview")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === "preview" ? "bg-white shadow-sm text-slate-900" : "text-slate-600 hover:text-slate-900"
                                }`}
                        >
                            Preview
                        </button>
                    </div>
                    <span className="text-sm text-slate-500">
                        Last saved: {new Date().toLocaleTimeString()}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleSave(false)}
                        disabled={saving}
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? "Saving..." : "Save Draft"}
                    </button>
                    <button
                        onClick={() => handleSave(true)}
                        disabled={saving}
                        className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition flex items-center gap-2"
                    >
                        <Upload className="w-4 h-4" />
                        Publish Live
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden flex">
                {/* Editor Panel */}
                <div className={`w-full max-w-2xl border-r border-slate-200 bg-slate-50 overflow-y-auto p-6 ${activeTab === 'preview' ? 'hidden md:block' : ''}`}>
                    <div className="max-w-xl mx-auto space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900">Sections</h3>
                            <button className="text-sm text-violet-600 font-medium hover:text-violet-700">
                                + Add Section
                            </button>
                        </div>

                        <DragDropList
                            items={sectionIds}
                            onDragEnd={handleSectionsReorder}
                        >
                            {(id) => {
                                const section = config.sections.find(s => s.id === id);
                                if (!section) return null;
                                return (
                                    <SectionEditor
                                        section={section}
                                        onChange={handeSectionUpdate}
                                        onRemove={() => { }}
                                    />
                                );
                            }}
                        </DragDropList>
                    </div>
                </div>

                {/* Live Preview Panel */}
                <div className={`flex-1 bg-slate-100 flex flex-col ${activeTab === 'editor' ? 'hidden md:flex' : ''}`}>
                    <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-2">
                            <Monitor className="w-3 h-3" />
                            Live Preview
                        </span>
                        <div className="flex gap-2">
                            {/* Viewport controls could go here */}
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden relative">
                        <PagePreview pageType={pageType} config={config} />
                    </div>
                </div>
            </div>
        </div>
    );
}
