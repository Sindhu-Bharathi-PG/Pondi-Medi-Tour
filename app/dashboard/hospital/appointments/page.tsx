"use client";

import { PageLoader } from '@/app/components/common';
import { Calendar as CalendarIcon, List } from 'lucide-react';
import { useEffect, useState } from 'react';
import AppointmentCalendar from '../components/AppointmentCalendar';

interface Appointment {
    id: number;
    patientName: string;
    patientPhone: string;
    patientEmail?: string;
    appointmentDate: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    reason: string;
    doctorId?: number;
    doctorName?: string;
    notes?: string;
}

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const sessionRes = await fetch('/api/auth/session');
            const session = await sessionRes.json();
            const token = session.accessToken;

            const res = await fetch('http://localhost:3001/api/hospitals/me/appointments', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (res.ok) {
                const data = await res.json();
                setAppointments(data);
            } else {
                // Use sample data for demo
                setSampleData();
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setSampleData();
        } finally {
            setLoading(false);
        }
    };

    const setSampleData = () => {
        const now = new Date();
        const sampleAppointments: Appointment[] = [
            {
                id: 1,
                patientName: 'John Doe',
                patientPhone: '+1234567890',
                patientEmail: 'john@example.com',
                appointmentDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'confirmed',
                reason: 'Knee Replacement Consultation',
                doctorName: 'Dr. Smith',
            },
            {
                id: 2,
                patientName: 'Jane Smith',
                patientPhone: '+0987654321',
                appointmentDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'pending',
                reason: 'Cardiac Check-up',
                doctorName: 'Dr. Johnson',
            },
            {
                id: 3,
                patientName: 'Mike Wilson',
                patientPhone: '+1122334455',
                appointmentDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'confirmed',
                reason: 'IVF Counseling',
                doctorName: 'Dr. Brown',
            },
            {
                id: 4,
                patientName: 'Sarah Davis',
                patientPhone: '+5544332211',
                appointmentDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'completed',
                reason: 'Post-Surgery Follow-up',
                doctorName: 'Dr. Wilson',
            },
        ];
        setAppointments(sampleAppointments);
    };

    if (loading) {
        return <PageLoader message="Loading appointments..." />;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Appointments</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Manage and view all patient appointments
                    </p>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
                    <button
                        onClick={() => setViewMode('calendar')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'calendar'
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                    >
                        <CalendarIcon className="w-4 h-4" />
                        Calendar
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'list'
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                    >
                        <List className="w-4 h-4" />
                        List
                    </button>
                </div>
            </div>

            {/* Content */}
            {viewMode === 'calendar' ? (
                <AppointmentCalendar appointments={appointments} />
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {appointments.map((apt) => (
                            <div key={apt.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{apt.patientName}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 mt-1">{apt.reason}</p>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span>{new Date(apt.appointmentDate).toLocaleString()}</span>
                                            {apt.doctorName && <span>• {apt.doctorName}</span>}
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${apt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
                                            apt.status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
                                                apt.status === 'completed' ? 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300' :
                                                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                        }`}>
                                        {apt.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
