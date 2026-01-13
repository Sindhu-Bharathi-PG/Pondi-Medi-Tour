"use client";

import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Clock, Mail, Phone, User, X } from 'lucide-react';
import { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { locale: enUS }),
    getDay,
    locales,
});

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

interface CalendarEvent extends Event {
    resource: Appointment;
}

interface AppointmentCalendarProps {
    appointments: Appointment[];
    onAppointmentClick?: (appointment: Appointment) => void;
    onReschedule?: (appointmentId: number, newDate: Date) => void;
}

export default function AppointmentCalendar({
    appointments,
    onAppointmentClick,
    onReschedule
}: AppointmentCalendarProps) {
    const [view, setView] = useState<'month' | 'week' | 'day'>('month');
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [showModal, setShowModal] = useState(false);

    // Convert appointments to calendar events
    const events: CalendarEvent[] = appointments.map(apt => ({
        title: apt.patientName,
        start: new Date(apt.appointmentDate),
        end: new Date(new Date(apt.appointmentDate).getTime() + 60 * 60 * 1000), // 1 hour duration
        resource: apt,
    }));

    // Status colors
    const getEventStyle = (event: CalendarEvent) => {
        const colors = {
            pending: { backgroundColor: '#f59e0b', borderColor: '#d97706' },
            confirmed: { backgroundColor: '#10b981', borderColor: '#059669' },
            completed: { backgroundColor: '#6b7280', borderColor: '#4b5563' },
            cancelled: { backgroundColor: '#ef4444', borderColor: '#dc2626' },
        };
        return {
            style: colors[event.resource.status] || colors.pending,
        };
    };

    const handleSelectEvent = (event: CalendarEvent) => {
        setSelectedAppointment(event.resource);
        setShowModal(true);
        onAppointmentClick?.(event.resource);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedAppointment(null);
    };

    return (
        <div className="space-y-4">
            {/* Calendar Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Appointments Calendar</h2>
                    </div>

                    {/* View Switcher */}
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                        {['month', 'week', 'day'].map((v) => (
                            <button
                                key={v}
                                onClick={() => setView(v as any)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${view === v
                                        ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                    }`}
                            >
                                {v.charAt(0).toUpperCase() + v.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-amber-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-emerald-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Confirmed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-red-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Cancelled</span>
                    </div>
                </div>
            </div>

            {/* Calendar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 calendar-container">
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    view={view}
                    onView={setView}
                    onSelectEvent={handleSelectEvent}
                    eventPropGetter={getEventStyle}
                    style={{ height: 600 }}
                    className="hospital-calendar"
                />
            </div>

            {/* Appointment Detail Modal */}
            <AnimatePresence>
                {showModal && selectedAppointment && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                        Appointment Details
                                    </h3>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${selectedAppointment.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' :
                                            selectedAppointment.status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' :
                                                selectedAppointment.status === 'completed' ? 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300' :
                                                    'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                        }`}>
                                        {selectedAppointment.status.toUpperCase()}
                                    </span>
                                </div>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                        <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Patient Name</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">{selectedAppointment.patientName}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">{selectedAppointment.patientPhone}</p>
                                    </div>
                                </div>

                                {selectedAppointment.patientEmail && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900 rounded-lg flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                                            <p className="font-semibold text-gray-900 dark:text-white text-sm">{selectedAppointment.patientEmail}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Date & Time</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {format(new Date(selectedAppointment.appointmentDate), 'PPpp')}
                                        </p>
                                    </div>
                                </div>

                                {selectedAppointment.doctorName && (
                                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Assigned Doctor</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">{selectedAppointment.doctorName}</p>
                                    </div>
                                )}

                                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Reason for Visit</p>
                                    <p className="text-gray-900 dark:text-white">{selectedAppointment.reason}</p>
                                </div>

                                {selectedAppointment.notes && (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Notes</p>
                                        <p className="text-gray-900 dark:text-white text-sm">{selectedAppointment.notes}</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                    Confirm
                                </button>
                                <button className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium">
                                    Reschedule
                                </button>
                                <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
        .hospital-calendar {
          font-family: inherit;
        }
        
        .dark .rbc-calendar {
          color: #e5e7eb;
        }
        
        .dark .rbc-header {
          background: #374151;
          color: #e5e7eb;
          border-color: #4b5563;
        }
        
        .dark .rbc-month-view,
        .dark .rbc-time-view {
          background: #1f2937;
          border-color: #4b5563;
        }
        
        .dark .rbc-day-bg {
          background: #111827;
          border-color: #374151;
        }
        
        .dark .rbc-off-range-bg {
          background: #0f172a;
        }
        
        .dark .rbc-today {
          background: #1e3a5f;
        }
        
        .dark .rbc-event {
          color: white;
        }
        
        .dark .rbc-toolbar button {
          color: #e5e7eb;
          border-color: #4b5563;
        }
        
        .dark .rbc-toolbar button:hover {
          background: #374151;
        }
        
        .dark .rbc-toolbar button.rbc-active {
          background: #3b82f6;
          color: white;
        }
        
        .rbc-event {
          border-radius: 4px;
          padding: 2px 5px;
          font-size: 0.875rem;
        }
      `}</style>
        </div>
    );
}
