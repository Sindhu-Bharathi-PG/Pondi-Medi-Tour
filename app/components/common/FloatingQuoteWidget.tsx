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
    Eye,
    Heart,
    Mail, Phone,
    Send,
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

    // Sync with context
    useEffect(() => {
        if (contextIsOpen) {
            setIsOpen(true);
            // Pre-fill from context
            if (quoteData.hospitalId) {
                setSelectedHospital(quoteData.hospitalId);
                setStep(Math.max(step, 3)); // Skip to hospital step or beyond
            }
            if (quoteData.treatmentType) {
                const proc = procedures.find(p => p.name.toLowerCase().includes(quoteData.treatmentType?.toLowerCase() || ''));
                if (proc) {
                    setSelectedProcedure(proc.id);
                    setStep(Math.max(step, 2)); // Skip to country step
                }
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
        const procedureName = procedures.find(p => p.id === selectedProcedure)?.name || selectedProcedure;
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
                    packageName: quoteData.packageName,
                    source: quoteData.source || 'floating-widget',
                    status: 'pending',
                    priority: 'normal'
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
                                    {[1, 2, 3, 4].map(s => (
                                        <div key={s} className={`flex-1 h-1 rounded-full ${step >= s ? 'bg-white' : 'bg-white/30'}`} />
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
                                            <button onClick={() => setStep(1)} className="text-emerald-600 text-sm mb-3 hover:underline">← Back</button>
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
                                            <h3 className="font-bold text-gray-800 mb-3">Preferred Hospital (Optional)</h3>

                                            {/* Custom Dropdown */}
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
                                                    placeholder="Additional details (optional)"
                                                    rows={3}
                                                    value={formData.message}
                                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                                                />
                                            </div>

                                            {/* Summary */}
                                            <div className="bg-gray-50 rounded-xl p-3 mt-4 text-sm">
                                                <div className="flex justify-between text-gray-600">
                                                    <span>Treatment:</span>
                                                    <span className="font-medium text-gray-800">{procedures.find(p => p.id === selectedProcedure)?.name}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-600 mt-1">
                                                    <span>From:</span>
                                                    <span className="font-medium text-gray-800">{countries.find(c => c.id === selectedCountry)?.name}</span>
                                                </div>
                                                {selectedHospital && (
                                                    <div className="flex justify-between text-gray-600 mt-1">
                                                        <span>Hospital:</span>
                                                        <span className="font-medium text-gray-800">{hospitals.find(h => h.id === selectedHospital)?.name}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold mt-4 flex items-center justify-center gap-2 disabled:opacity-70"
                                            >
                                                {submitting ? 'Sending...' : <><Send className="w-5 h-5" /> Get My Quote</>}
                                            </button>
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
