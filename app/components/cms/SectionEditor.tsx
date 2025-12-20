"use client";

import { ChevronDown, ChevronUp, Eye, EyeOff, Trash2 } from "lucide-react";
import { useState } from "react";
import ImageUploader from "./ImageUploader";

interface Section {
    id: string;
    type: string;
    enabled: boolean;
    content: any;
    items?: any[];
}

interface SectionEditorProps {
    section: Section;
    onChange: (updatedSection: Section) => void;
    onRemove: () => void;
}

export default function SectionEditor({ section, onChange, onRemove }: SectionEditorProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const updateContent = (key: string, value: any) => {
        onChange({
            ...section,
            content: {
                ...section.content,
                [key]: value
            }
        });
    };

    const renderFields = () => {
        switch (section.type) {
            case "hero":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Title Line 1</label>
                            <input
                                type="text"
                                value={section.content.title?.line1 || ""}
                                onChange={(e) => updateContent("title", { ...section.content.title, line1: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Title Line 2</label>
                            <input
                                type="text"
                                value={section.content.title?.line2 || ""}
                                onChange={(e) => updateContent("title", { ...section.content.title, line2: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
                            <textarea
                                value={section.content.subtitle || ""}
                                onChange={(e) => updateContent("subtitle", e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none"
                            />
                        </div>
                        <ImageUploader
                            label="Background Image"
                            value={section.content.backgroundImage}
                            onChange={(url) => updateContent("backgroundImage", url)}
                        />
                    </div>
                );

            case "treatments":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Section Title</label>
                            <input
                                type="text"
                                value={section.content.title || ""}
                                onChange={(e) => updateContent("title", e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
                            <textarea
                                value={section.content.subtitle || ""}
                                onChange={(e) => updateContent("subtitle", e.target.value)}
                                rows={2}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none"
                            />
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <p className="text-sm text-slate-600 mb-2">Manage Treatments</p>
                            <p className="text-xs text-slate-500">
                                You can drag and drop items in the main list. To edit individual treatments, click on "Edit Items" below.
                            </p>
                            {/* TODO: Add items editor */}
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center text-slate-500">
                        Editor for {section.type} is coming soon.
                    </div>
                );
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1 hover:bg-slate-200 rounded transition"
                    >
                        {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-500" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                        )}
                    </button>
                    <span className="font-medium text-slate-900 capitalize">
                        {section.id.replace("-medical", "").replace("-wellness", "").replace("-", " ")}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-200 text-slate-600 text-xs rounded-full uppercase tracking-wider">
                        {section.type}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onChange({ ...section, enabled: !section.enabled })}
                        className={`p-2 rounded-lg transition ${section.enabled
                                ? "text-emerald-600 hover:bg-emerald-50"
                                : "text-slate-400 hover:bg-slate-100"
                            }`}
                        title={section.enabled ? "Disable Section" : "Enable Section"}
                    >
                        {section.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={onRemove}
                        className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Remove Section"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Editor Body */}
            {isExpanded && <div className="p-4 border-t border-slate-200">{renderFields()}</div>}
        </div>
    );
}
