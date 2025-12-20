import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface TreatmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    treatment?: any;
    onSave: (data: any) => Promise<void>;
}

export default function TreatmentModal({ isOpen, onClose, treatment, onSave }: TreatmentModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        subCategory: '',
        minPrice: '',
        maxPrice: '',
        hospitalStay: '',
        recoveryTime: '',
        successRate: '',
        shortDescription: '',
        fullDescription: '',
        technology: [] as string[],
        preRequisites: [] as string[],
        procedureSteps: [] as { title: string; description: string }[],
        isPopular: false,
        insuranceCovered: true
    });

    const [loading, setLoading] = useState(false);
    const [newTech, setNewTech] = useState('');
    const [newStep, setNewStep] = useState({ title: '', description: '' });

    useEffect(() => {
        if (treatment) {
            setFormData({
                ...treatment,
                technology: treatment.technology || [],
                preRequisites: treatment.preRequisites || [],
                procedureSteps: treatment.procedureSteps || []
            });
        } else {
            // Reset form for new entry
            setFormData({
                name: '', category: '', subCategory: '',
                minPrice: '', maxPrice: '',
                hospitalStay: '', recoveryTime: '', successRate: '',
                shortDescription: '', fullDescription: '',
                technology: [], preRequisites: [], procedureSteps: [],
                isPopular: false, insuranceCovered: true
            });
        }
    }, [treatment, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to save treatment");
        } finally {
            setLoading(false);
        }
    };

    const addTechnology = () => {
        if (!newTech.trim()) return;
        setFormData(prev => ({ ...prev, technology: [...prev.technology, newTech] }));
        setNewTech('');
    };

    const addStep = () => {
        if (!newStep.title || !newStep.description) return;
        setFormData(prev => ({ ...prev, procedureSteps: [...prev.procedureSteps, newStep] }));
        setNewStep({ title: '', description: '' });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-900">
                        {treatment ? 'Edit Treatment' : 'Add New Treatment'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* 1. Basic Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-teal-700 border-b pb-2">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Name</label>
                                <input required type="text" className="w-full rounded-lg border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Total Knee Replacement" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select className="w-full rounded-lg border-gray-300"
                                    value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                    <option value="">Select Category</option>
                                    <option value="Orthopedics">Orthopedics</option>
                                    <option value="Cardiology">Cardiology</option>
                                    <option value="Dental">Dental</option>
                                    <option value="Cosmetic">Cosmetic</option>
                                    <option value="Fertility">Fertility</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description (Summary)</label>
                            <textarea className="w-full rounded-lg border-gray-300 h-20"
                                value={formData.shortDescription} onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                                placeholder="Brief overview for the card display..." />
                        </div>
                    </div>

                    {/* 2. Medical Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-teal-700 border-b pb-2">Medical Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Success Rate (%)</label>
                                <input type="number" className="w-full rounded-lg border-gray-300"
                                    value={formData.successRate} onChange={e => setFormData({ ...formData, successRate: e.target.value })}
                                    placeholder="98" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Stay</label>
                                <input type="text" className="w-full rounded-lg border-gray-300"
                                    value={formData.hospitalStay} onChange={e => setFormData({ ...formData, hospitalStay: e.target.value })}
                                    placeholder="e.g. 3-5 Days" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Recovery Time</label>
                                <input type="text" className="w-full rounded-lg border-gray-300"
                                    value={formData.recoveryTime} onChange={e => setFormData({ ...formData, recoveryTime: e.target.value })}
                                    placeholder="e.g. 2 Weeks" />
                            </div>
                        </div>

                        {/* Technology Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Advanced Technology Used</label>
                            <div className="flex gap-2 mb-2 flex-wrap">
                                {formData.technology.map((tech, i) => (
                                    <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm flex items-center gap-1">
                                        {tech} <button onClick={() => setFormData(prev => ({ ...prev, technology: prev.technology.filter((_, idx) => idx !== i) }))}><X className="w-3 h-3" /></button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input type="text" className="flex-1 rounded-lg border-gray-300" placeholder="Add technology (e.g. Robotic Arm)"
                                    value={newTech} onChange={e => setNewTech(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTechnology())} />
                                <button type="button" onClick={addTechnology} className="bg-gray-100 px-4 rounded-lg hover:bg-gray-200">Add</button>
                            </div>
                        </div>
                    </div>

                    {/* 3. Pricing */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-teal-700 border-b pb-2">Pricing (USD)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Price</label>
                                <input type="number" className="w-full rounded-lg border-gray-300"
                                    value={formData.minPrice} onChange={e => setFormData({ ...formData, minPrice: e.target.value })}
                                    placeholder="3000" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Price</label>
                                <input type="number" className="w-full rounded-lg border-gray-300"
                                    value={formData.maxPrice} onChange={e => setFormData({ ...formData, maxPrice: e.target.value })}
                                    placeholder="5000" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="insurance" className="rounded text-teal-600 focus:ring-teal-500"
                                checked={formData.insuranceCovered} onChange={e => setFormData({ ...formData, insuranceCovered: e.target.checked })} />
                            <label htmlFor="insurance" className="text-sm text-gray-700">Covered by International Insurance?</label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button type="button" onClick={onClose} className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-lg">Cancel</button>
                        <button type="submit" disabled={loading} className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 disabled:opacity-50">
                            {loading ? 'Saving...' : 'Save Treatment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
