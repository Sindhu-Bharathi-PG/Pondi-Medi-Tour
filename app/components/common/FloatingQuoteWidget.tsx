"use client";

import { useQuote } from '@/app/context/QuoteContext';
import { API_BASE } from '@/app/hooks/useApi';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Baby,
    Bone,
    Brain,
    Building2,
    Calculator,
    Check, ChevronRight,
    Clock,
    Eye,
    FileText,
    Heart,
    Info,
    Mail, Package, Phone,
    Send,
    Shield,
    Smile,
    Sparkles, Stethoscope,
    User,
    X
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Hospital {
    id: number;
    name: string;
    city?: string;
}

const procedures = [
    { id: 'knee', name: 'Knee Replacement', icon: Bone },
    { id: 'hip', name: 'Hip Replacement', icon: Bone },
    { id: 'spine', name: 'Spinal Surgery', icon: Bone },
    { id: 'heart', name: 'Heart Surgery', icon: Heart },
    { id: 'angioplasty', name: 'Angioplasty', icon: Heart },
    { id: 'ivf', name: 'IVF Treatment', icon: Baby },
    { id: 'cataract', name: 'Cataract Surgery', icon: Eye },
    { id: 'lasik', name: 'LASIK', icon: Eye },
    { id: 'dental', name: 'Dental Implants', icon: Smile },
    { id: 'cosmetic', name: 'Cosmetic Surgery', icon: Sparkles },
    { id: 'bariatric', name: 'Weight Loss Surgery', icon: Brain },
    { id: 'other', name: 'Other Treatment', icon: Stethoscope },
];

const countries = [
    { id: 'usa', name: 'United States', flag: '🇺🇸' },
    { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
    { id: 'australia', name: 'Australia', flag: '🇦🇺' },
    { id: 'canada', name: 'Canada', flag: '🇨🇦' },
    { id: 'uae', name: 'UAE', flag: '🇦🇪' },
    { id: 'other', name: 'Other', flag: '🌍' },
];

export default function FloatingQuoteWidget() {
    const { isOpen: contextIsOpen, quoteData, closeQuoteWidget, resetQuoteData } = useQuote();
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [showInfoStep, setShowInfoStep] = useState(false);
    const [selectedProcedure, setSelectedProcedure] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedHospital, setSelectedHospital] = useState<number | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Check if opened with context data (from treatment/package page)
    const hasContextData = !!(quoteData.treatmentType || quoteData.packageName || quoteData.hospitalName);

    // Sync with context
    useEffect(() => {
        if (contextIsOpen) {
            setIsOpen(true);
            // If opened from treatment/package page, show info step first
            if (quoteData.treatmentType || quoteData.packageName) {
                setShowInfoStep(true);
                setStep(0); // Info step

                // Pre-fill procedure
                const proc = procedures.find(p =>
                    p.name.toLowerCase().includes(quoteData.treatmentType?.toLowerCase() || '')
                );
                if (proc) {
                    setSelectedProcedure(proc.id);
                }
            }

            if (quoteData.hospitalId) {
                setSelectedHospital(quoteData.hospitalId);
            }
        }
    }, [contextIsOpen, quoteData]);

    // Fetch hospitals when opened
    useEffect(() => {
        if (isOpen && hospitals.length === 0) {
            fetch(`${API_BASE}/api/hospitals`)
                .then(res => res.json())
                .then(data => setHospitals(Array.isArray(data) ? data : []))
                .catch(() => setHospitals([]));
        }
    }, [isOpen, hospitals.length]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        // Build subject with package name if available
        const procedureName = quoteData.treatmentType || procedures.find(p => p.id === selectedProcedure)?.name || selectedProcedure;
        const packageInfo = quoteData.packageName ? ` - Package: ${quoteData.packageName}` : '';
        const subject = `Quote Request - ${procedureName}${packageInfo}`;

        // Build message with package details
        let message = formData.message || 'Quote request from floating widget';
        if (quoteData.packageName) {
            message = `Package Requested: ${quoteData.packageName}\n\n${message}`;
        }

        try {
            await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    patientName: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    country: countries.find(c => c.id === selectedCountry)?.name || selectedCountry,
                    treatmentType: procedureName,
                    subject: subject,
                    message: message,
                    hospitalId: selectedHospital || quoteData.hospitalId,
                    packageId: quoteData.packageId,
                    packageName: quoteData.packageName,
                    source: quoteData.source || 'floating-widget',
                    status: 'pending',
                    priority: quoteData.packageId ? 'high' : 'normal'
                }),
            });
            setSubmitted(true);
        } catch (error) {
            console.error('Error:', error);
            setSubmitted(true);
        }
        setSubmitting(false);
    };

    const resetForm = () => {
        setStep(1);
        setShowInfoStep(false);
        setSelectedProcedure('');
        setSelectedCountry('');
        setSelectedHospital(null);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setSubmitted(false);
    };

    const closeWidget = () => {
        setIsOpen(false);
        closeQuoteWidget();
        resetQuoteData();
        setTimeout(resetForm, 300);
    };

    const getTotalSteps = () => showInfoStep ? 5 : 4;
    const getCurrentStepNumber = () => showInfoStep ? step + 1 : step;

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0 }}
                animate={{ scale: isOpen ? 0 : 1 }}
            >
                <Calculator className="w-6 h-6" />
            </motion.button>

            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeWidget}
                    />
                )}
            </AnimatePresence>

            {/* Slide-out Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Calculator className="w-6 h-6" />
                                    <div>
                                        <h2 className="font-bold text-lg">Get Free Quote</h2>
                                        <p className="text-emerald-100 text-xs">No obligation • 24hr response</p>
                                    </div>
                                </div>
                                <button onClick={closeWidget} className="p-2 hover:bg-white/20 rounded-full transition">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            {/* Progress */}
                            {!submitted && (
                                <div className="mt-4 flex gap-1">
                                    {Array.from({ length: getTotalSteps() }).map((_, i) => (
                                        <div key={i} className={`flex-1 h-1 rounded-full ${getCurrentStepNumber() >= i + 1 ? 'bg-white' : 'bg-white/30'}`} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-5">
                            {submitted ? (
                                /* Success */
                                <div className="text-center py-10">
                                    <motion.div
                                        className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                    >
                                        <Check className="w-8 h-8 text-emerald-600" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Request Sent!</h3>
                                    <p className="text-gray-500 text-sm mb-6">We'll respond within 24 hours</p>
                                    <button
                                        onClick={closeWidget}
                                        className="bg-emerald-600 text-white px-6 py-2 rounded-full font-medium"
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* Step 0: Treatment/Package Info (when opened from treatment page) */}
                                    {step === 0 && showInfoStep && (
                                        <div>
                                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                <Info className="w-5 h-5 text-emerald-600" />
                                                Review Your Request
                                            </h3>

                                            {/* Treatment/Package Summary Card */}
                                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100 mb-4">
                                                {quoteData.packageName ? (
                                                    <div className="flex items-start gap-3 mb-4">
                                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                                                            <Package className="w-6 h-6 text-purple-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-purple-600 font-semibold uppercase tracking-wider">Package Request</p>
                                                            <h4 className="font-bold text-gray-900 text-lg">{quoteData.packageName}</h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-start gap-3 mb-4">
                                                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                                                            <Stethoscope className="w-6 h-6 text-emerald-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">Treatment Quote</p>
                                                            <h4 className="font-bold text-gray-900 text-lg">{quoteData.treatmentType}</h4>
                                                        </div>
                                                    </div>
                                                )}

                                                {quoteData.hospitalName && (
                                                    <div className="flex items-center gap-2 text-gray-600 text-sm bg-white rounded-lg px-3 py-2">
                                                        <Building2 className="w-4 h-4 text-gray-400" />
                                                        <span>Hospital: <strong>{quoteData.hospitalName}</strong></span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* What We Need From You */}
                                            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                                    <FileText className="w-4 h-4 text-teal-600" />
                                                    To Provide Your Quote, We Need:
                                                </h4>
                                                <div className="space-y-2">
                                                    <div className="flex items-start gap-3 text-sm">
                                                        <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                                            <span className="text-emerald-600 font-bold text-xs">1</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-800">Your Location</p>
                                                            <p className="text-gray-500 text-xs">To calculate travel arrangements</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3 text-sm">
                                                        <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                                            <span className="text-emerald-600 font-bold text-xs">2</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-800">Contact Information</p>
                                                            <p className="text-gray-500 text-xs">Name, email, and phone number</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3 text-sm">
                                                        <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                                            <span className="text-emerald-600 font-bold text-xs">3</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-800">Medical Details (Optional)</p>
                                                            <p className="text-gray-500 text-xs">Any specific requirements or conditions</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Trust Indicators */}
                                            <div className="grid grid-cols-2 gap-2 mb-5">
                                                <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                                                    <Shield className="w-4 h-4 text-emerald-600" />
                                                    <span>100% Confidential</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                                                    <Clock className="w-4 h-4 text-emerald-600" />
                                                    <span>24hr Response</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setStep(2)} // Skip to country step since treatment is pre-selected
                                                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition"
                                            >
                                                Continue <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}

                                    {/* Step 1: Treatment */}
                                    {step === 1 && (
                                        <div>
                                            <h3 className="font-bold text-gray-800 mb-3">What treatment do you need?</h3>
                                            <div className="space-y-2">
                                                {procedures.map(proc => (
                                                    <button
                                                        key={proc.id}
                                                        onClick={() => { setSelectedProcedure(proc.id); setStep(2); }}
                                                        className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition ${selectedProcedure === proc.id
                                                            ? 'border-emerald-500 bg-emerald-50'
                                                            : 'border-gray-100 hover:border-emerald-200'
                                                            }`}
                                                    >
                                                        <proc.icon className="w-5 h-5 text-emerald-600" />
                                                        <span className="text-gray-700 font-medium text-sm">{proc.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 2: Country */}
                                    {step === 2 && (
                                        <div>
                                            <button onClick={() => setStep(showInfoStep ? 0 : 1)} className="text-emerald-600 text-sm mb-3 hover:underline">← Back</button>
                                            <h3 className="font-bold text-gray-800 mb-3">Where are you from?</h3>
                                            <div className="grid grid-cols-2 gap-2">
                                                {countries.map(country => (
                                                    <button
                                                        key={country.id}
                                                        onClick={() => { setSelectedCountry(country.id); setStep(3); }}
                                                        className={`flex items-center gap-2 p-3 rounded-xl border-2 transition ${selectedCountry === country.id
                                                            ? 'border-emerald-500 bg-emerald-50'
                                                            : 'border-gray-100 hover:border-emerald-200'
                                                            }`}
                                                    >
                                                        <span className="text-xl">{country.flag}</span>
                                                        <span className="text-gray-700 text-sm">{country.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3: Hospital */}
                                    {step === 3 && (
                                        <div>
                                            <button onClick={() => setStep(2)} className="text-emerald-600 text-sm mb-3 hover:underline">← Back</button>
                                            <h3 className="font-bold text-gray-800 mb-3">
                                                {quoteData.hospitalName ? 'Confirm Hospital' : 'Preferred Hospital (Optional)'}
                                            </h3>

                                            {/* Show pre-selected hospital info */}
                                            {quoteData.hospitalName && (
                                                <div className="bg-emerald-50 rounded-xl p-4 mb-4 border border-emerald-200">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                                            <Building2 className="w-5 h-5 text-emerald-600" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800">{quoteData.hospitalName}</p>
                                                            <p className="text-xs text-emerald-600">Pre-selected from treatment page</p>
                                                        </div>
                                                        <Check className="w-5 h-5 text-emerald-600 ml-auto" />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Custom Dropdown */}
                                            {!quoteData.hospitalName && (
                                                <div className="relative mb-4">
                                                    <div className="relative">
                                                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const nextState = !isDropdownOpen;
                                                                setIsDropdownOpen(nextState);
                                                            }}
                                                            className={`w-full text-left pl-10 pr-10 py-3 border rounded-xl outline-none transition shadow-sm bg-white relative ${isDropdownOpen ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-gray-200 hover:border-emerald-300'
                                                                }`}
                                                        >
                                                            <span className={`block truncate ${selectedHospital ? 'text-gray-900' : 'text-gray-500'}`}>
                                                                {selectedHospital
                                                                    ? hospitals.find(h => h.id === selectedHospital)?.name
                                                                    : 'Select a hospital...'}
                                                            </span>
                                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                                <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? '-rotate-90' : 'rotate-90'}`} />
                                                            </div>
                                                        </button>
                                                    </div>

                                                    <AnimatePresence>
                                                        {isDropdownOpen && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: 5 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto custom-scrollbar"
                                                            >
                                                                <div className="p-1">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setSelectedHospital(null);
                                                                            setIsDropdownOpen(false);
                                                                        }}
                                                                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-600 text-sm transition font-medium border-b border-gray-50"
                                                                    >
                                                                        Any hospital
                                                                    </button>
                                                                    {hospitals.map(h => (
                                                                        <button
                                                                            key={h.id}
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setSelectedHospital(h.id);
                                                                                setIsDropdownOpen(false);
                                                                            }}
                                                                            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-start gap-3 ${selectedHospital === h.id ? 'bg-emerald-50 text-emerald-900' : 'text-gray-700 hover:bg-gray-50'
                                                                                }`}
                                                                        >
                                                                            <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${selectedHospital === h.id ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'
                                                                                }`}>
                                                                                <Building2 className="w-4 h-4" />
                                                                            </div>
                                                                            <div>
                                                                                <span className="block font-medium text-sm">{h.name}</span>
                                                                                {h.city && <span className="text-gray-400 text-xs">{h.city}</span>}
                                                                            </div>
                                                                            {selectedHospital === h.id && (
                                                                                <Check className="w-4 h-4 text-emerald-600 ml-auto mt-1" />
                                                                            )}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            )}

                                            <button
                                                onClick={() => setStep(4)}
                                                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-emerald-700 transition shadow-md hover:shadow-lg transform active:scale-[0.98]"
                                            >
                                                Continue <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}

                                    {/* Step 4: Contact */}
                                    {step === 4 && (
                                        <form onSubmit={handleSubmit}>
                                            <button type="button" onClick={() => setStep(3)} className="text-emerald-600 text-sm mb-3 hover:underline">← Back</button>
                                            <h3 className="font-bold text-gray-800 mb-3">Your Contact Details</h3>
                                            <div className="space-y-3">
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        placeholder="Full Name *"
                                                        required
                                                        value={formData.name}
                                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                    <input
                                                        type="email"
                                                        placeholder="Email *"
                                                        required
                                                        value={formData.email}
                                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                    <input
                                                        type="tel"
                                                        placeholder="Phone *"
                                                        required
                                                        value={formData.phone}
                                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                                                    />
                                                </div>
                                                <textarea
                                                    placeholder="Tell us about your medical condition or any specific requirements (optional)"
                                                    rows={3}
                                                    value={formData.message}
                                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                                                />
                                            </div>

                                            {/* Summary */}
                                            <div className="bg-gray-50 rounded-xl p-4 mt-4">
                                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Request Summary</h4>
                                                <div className="space-y-1.5 text-sm">
                                                    <div className="flex justify-between text-gray-600">
                                                        <span>Treatment:</span>
                                                        <span className="font-medium text-gray-800">
                                                            {quoteData.treatmentType || procedures.find(p => p.id === selectedProcedure)?.name}
                                                        </span>
                                                    </div>
                                                    {quoteData.packageName && (
                                                        <div className="flex justify-between text-gray-600">
                                                            <span>Package:</span>
                                                            <span className="font-medium text-purple-700">{quoteData.packageName}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex justify-between text-gray-600">
                                                        <span>From:</span>
                                                        <span className="font-medium text-gray-800">{countries.find(c => c.id === selectedCountry)?.name}</span>
                                                    </div>
                                                    {(selectedHospital || quoteData.hospitalName) && (
                                                        <div className="flex justify-between text-gray-600">
                                                            <span>Hospital:</span>
                                                            <span className="font-medium text-gray-800">
                                                                {quoteData.hospitalName || hospitals.find(h => h.id === selectedHospital)?.name}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold mt-4 flex items-center justify-center gap-2 disabled:opacity-70 hover:shadow-lg transition"
                                            >
                                                {submitting ? 'Sending...' : <><Send className="w-5 h-5" /> Submit Request</>}
                                            </button>

                                            <p className="text-center text-xs text-gray-400 mt-3">
                                                By submitting, you agree to our privacy policy
                                            </p>
                                        </form>
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
