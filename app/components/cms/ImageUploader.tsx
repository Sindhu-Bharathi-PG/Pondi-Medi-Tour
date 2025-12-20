"use client";

import { Image as ImageIcon, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { useToast } from "../admin/Toast";

interface ImageUploaderProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUploader({ value, onChange, label = "Image" }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const toast = useToast();

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }

        // Validate size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/cms/upload/image", {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error("Upload failed");

            const data = await response.json();
            onChange(data.url);
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload image");
        } finally {
            setUploading(false);
            // Reset input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">{label}</label>

            {value ? (
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-slate-200 group">
                    <img src={value} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition"
                            title="Change Image"
                        >
                            <Upload className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => onChange("")}
                            className="p-2 bg-rose-500/80 hover:bg-rose-600/80 text-white rounded-lg backdrop-blur-sm transition"
                            title="Remove Image"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-video w-full rounded-lg border-2 border-dashed border-slate-300 hover:border-violet-500 hover:bg-violet-50 transition flex flex-col items-center justify-center cursor-pointer group"
                >
                    <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-violet-100 flex items-center justify-center mb-2 transition-colors">
                        {uploading ? (
                            <div className="w-6 h-6 border-2 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <ImageIcon className="w-6 h-6 text-slate-400 group-hover:text-violet-600" />
                        )}
                    </div>
                    <p className="text-sm font-medium text-slate-600 group-hover:text-violet-700">
                        {uploading ? "Uploading..." : "Click to upload image"}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Max 5MB</p>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
            />
        </div>
    );
}
