"use client";

import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
    type: ToastType;
    message: string;
    onClose: () => void;
    duration?: number;
}

export default function Toast({ type, message, onClose, duration = 5000 }: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for animation to complete
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const config = {
        success: {
            icon: CheckCircle,
            bg: "bg-emerald-50",
            border: "border-emerald-200",
            text: "text-emerald-800",
            iconColor: "text-emerald-600"
        },
        error: {
            icon: XCircle,
            bg: "bg-rose-50",
            border: "border-rose-200",
            text: "text-rose-800",
            iconColor: "text-rose-600"
        },
        warning: {
            icon: AlertTriangle,
            bg: "bg-amber-50",
            border: "border-amber-200",
            text: "text-amber-800",
            iconColor: "text-amber-600"
        },
        info: {
            icon: Info,
            bg: "bg-blue-50",
            border: "border-blue-200",
            text: "text-blue-800",
            iconColor: "text-blue-600"
        }
    };

    const { icon: Icon, bg, border, text, iconColor } = config[type];

    return (
        <div
            className={`${bg} ${border} ${text} border rounded-lg p-4 shadow-lg min-w-[320px] max-w-md transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
        >
            <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
                <p className="flex-1 text-sm font-medium">{message}</p>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(onClose, 300);
                    }}
                    className={`${iconColor} hover:opacity-70 transition flex-shrink-0`}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

// Toast Container Component
interface ToastContainerProps {
    toasts: Array<{ id: string; type: ToastType; message: string }>;
    onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    type={toast.type}
                    message={toast.message}
                    onClose={() => onRemove(toast.id)}
                />
            ))}
        </div>
    );
}

// Hook for managing toasts
export function useToast() {
    const [toasts, setToasts] = useState<Array<{ id: string; type: ToastType; message: string }>>([]);

    const showToast = (type: ToastType, message: string) => {
        const id = Math.random().toString(36).substring(7);
        setToasts((prev) => [...prev, { id, type, message }]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return {
        toasts,
        showToast,
        removeToast,
        success: (message: string) => showToast("success", message),
        error: (message: string) => showToast("error", message),
        warning: (message: string) => showToast("warning", message),
        info: (message: string) => showToast("info", message)
    };
}
