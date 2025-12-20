"use client";

import { AlertCircle } from "lucide-react";

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "warning" | "info";
}

export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "warning"
}: ConfirmDialogProps) {
    if (!isOpen) return null;

    const variantStyles = {
        danger: {
            icon: "text-rose-600",
            bg: "bg-rose-50",
            button: "bg-rose-600 hover:bg-rose-700"
        },
        warning: {
            icon: "text-amber-600",
            bg: "bg-amber-50",
            button: "bg-amber-600 hover:bg-amber-700"
        },
        info: {
            icon: "text-blue-600",
            bg: "bg-blue-50",
            button: "bg-blue-600 hover:bg-blue-700"
        }
    };

    const styles = variantStyles[variant];

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div
                    className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6">
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-full ${styles.bg} flex items-center justify-center mb-4`}>
                            <AlertCircle className={`w-6 h-6 ${styles.icon}`} />
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>

                        {/* Message */}
                        <p className="text-slate-600 mb-6">{message}</p>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className={`flex-1 px-4 py-2 text-white rounded-lg font-medium transition ${styles.button}`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
