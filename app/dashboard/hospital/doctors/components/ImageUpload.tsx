"use client";

import { Image as ImageIcon, Upload, X } from "lucide-react";
import { useState } from "react";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUpload({ value, onChange, label = "Profile Photo" }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(value);
    const [dragActive, setDragActive] = useState(false);

    const handleFileUpload = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'doctor_profiles'); // You'll need to create this in Cloudinary

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (response.ok) {
                const data = await response.json();
                setPreview(data.secure_url);
                onChange(data.secure_url);
            } else {
                alert('Failed to upload image');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            <div className="flex gap-4 items-start">
                {/* Preview */}
                {preview && (
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => { setPreview(''); onChange(''); }}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                )}

                {/* Upload Area */}
                <div
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    className={`flex-1 border-2 border-dashed rounded-xl p-6 transition-all ${dragActive
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                        }`}
                >
                    <div className="flex flex-col items-center justify-center text-center">
                        {uploading ? (
                            <>
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
                                <p className="text-sm text-gray-600">Uploading...</p>
                            </>
                        ) : (
                            <>
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                                    <ImageIcon className="w-6 h-6 text-blue-600" />
                                </div>
                                <p className="text-sm font-medium text-gray-900 mb-1">
                                    Drop image here or click to browse
                                </p>
                                <p className="text-xs text-gray-500 mb-3">
                                    PNG, JPG up to 5MB
                                </p>
                                <label className="cursor-pointer">
                                    <span className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 inline-flex items-center gap-2 transition">
                                        <Upload className="w-4 h-4" />
                                        Choose File
                                    </span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleChange}
                                    />
                                </label>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Fallback URL Input */}
            <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Or enter image URL directly:</p>
                <input
                    type="url"
                    value={preview}
                    onChange={(e) => { setPreview(e.target.value); onChange(e.target.value); }}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
            </div>
        </div>
    );
}
