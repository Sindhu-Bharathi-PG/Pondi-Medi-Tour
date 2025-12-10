"use client";

import React, { useState } from 'react';
import { User, Calendar, FileText, MessageSquare, Settings, LogOut, Bell, Heart, Clock, MapPin, Download, ChevronRight, Home, Stethoscope, CheckCircle, AlertCircle } from 'lucide-react';
import { Header, Footer } from '../components/common';
import { useScrolled } from '../hooks';

const DashboardPage = () => {
      const scrolled = useScrolled(50);
      const [activeTab, setActiveTab] = useState('overview');

      const upcomingAppointments = [
            { id: 1, doctor: 'Dr. V. Veerappan', specialty: 'Orthopedics', date: 'Dec 15, 2024', time: '10:00 AM', type: 'Video', status: 'confirmed' },
            { id: 2, doctor: 'Dr. Ramya R', specialty: 'IVF Consultation', date: 'Dec 18, 2024', time: '2:30 PM', type: 'In-Person', status: 'pending' },
      ];

      const recentDocuments = [
            { name: 'Blood Test Report', date: 'Dec 5, 2024', type: 'Lab Report' },
            { name: 'X-Ray Scan', date: 'Dec 3, 2024', type: 'Imaging' },
            { name: 'Treatment Plan', date: 'Dec 1, 2024', type: 'Plan' },
      ];

      const sidebar = [
            { id: 'overview', icon: Home, label: 'Overview' },
            { id: 'appointments', icon: Calendar, label: 'Appointments' },
            { id: 'documents', icon: FileText, label: 'Documents' },
            { id: 'messages', icon: MessageSquare, label: 'Messages' },
            { id: 'settings', icon: Settings, label: 'Settings' },
      ];

      return (
            <div className="min-h-screen bg-gray-100">
                  <Header />

                  <div className="pt-28 pb-16">
                        <div className="container mx-auto px-4">
                              <div className="flex gap-8">
                                    {/* Sidebar */}
                                    <div className="w-64 shrink-0 hidden lg:block">
                                          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-28">
                                                <div className="text-center mb-6">
                                                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">JD</div>
                                                      <h3 className="font-bold text-gray-800">John Doe</h3>
                                                      <p className="text-gray-500 text-sm">Patient ID: PMJ-2024-1234</p>
                                                </div>
                                                <nav className="space-y-2">
                                                      {sidebar.map((item) => (
                                                            <button key={item.id} onClick={() => setActiveTab(item.id)}
                                                                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                                                                  <item.icon className="w-5 h-5" /><span className="font-medium">{item.label}</span>
                                                            </button>
                                                      ))}
                                                </nav>
                                                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 mt-6">
                                                      <LogOut className="w-5 h-5" /><span className="font-medium">Logout</span>
                                                </button>
                                          </div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex-1">
                                          <div className="flex items-center justify-between mb-8">
                                                <div><h1 className="text-3xl font-bold text-gray-800">Welcome back, John!</h1><p className="text-gray-500">Here&apos;s your health journey overview</p></div>
                                                <button className="relative p-3 bg-white rounded-xl shadow hover:shadow-md">
                                                      <Bell className="w-6 h-6 text-gray-600" />
                                                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                                                </button>
                                          </div>

                                          {/* Stats */}
                                          <div className="grid md:grid-cols-4 gap-6 mb-8">
                                                {[{ icon: Calendar, value: '2', label: 'Upcoming', color: 'bg-blue-500' },
                                                { icon: CheckCircle, value: '8', label: 'Completed', color: 'bg-green-500' },
                                                { icon: FileText, value: '12', label: 'Documents', color: 'bg-purple-500' },
                                                { icon: MessageSquare, value: '3', label: 'Unread', color: 'bg-orange-500' }
                                                ].map((stat, i) => (
                                                      <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                                                            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                                                                  <stat.icon className="w-6 h-6 text-white" />
                                                            </div>
                                                            <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                                                            <div className="text-gray-500">{stat.label}</div>
                                                      </div>
                                                ))}
                                          </div>

                                          {/* Appointments */}
                                          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                                                <div className="flex items-center justify-between mb-6">
                                                      <h2 className="text-xl font-bold text-gray-800">Upcoming Appointments</h2>
                                                      <button className="text-emerald-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">View All<ChevronRight className="w-4 h-4" /></button>
                                                </div>
                                                <div className="space-y-4">
                                                      {upcomingAppointments.map((apt) => (
                                                            <div key={apt.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                                                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                                                                        <Stethoscope className="w-7 h-7 text-white" />
                                                                  </div>
                                                                  <div className="flex-1">
                                                                        <h3 className="font-bold text-gray-800">{apt.doctor}</h3>
                                                                        <p className="text-gray-500 text-sm">{apt.specialty}</p>
                                                                        <div className="flex items-center gap-4 mt-1 text-sm">
                                                                              <span className="flex items-center gap-1 text-gray-500"><Calendar className="w-4 h-4" />{apt.date}</span>
                                                                              <span className="flex items-center gap-1 text-gray-500"><Clock className="w-4 h-4" />{apt.time}</span>
                                                                        </div>
                                                                  </div>
                                                                  <div className="text-right">
                                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                                              {apt.status === 'confirmed' ? <CheckCircle className="w-3 h-3 inline mr-1" /> : <AlertCircle className="w-3 h-3 inline mr-1" />}
                                                                              {apt.status}
                                                                        </span>
                                                                        <div className="mt-2"><span className="text-emerald-600 text-sm font-medium">{apt.type}</span></div>
                                                                  </div>
                                                            </div>
                                                      ))}
                                                </div>
                                          </div>

                                          {/* Documents */}
                                          <div className="bg-white rounded-2xl shadow-lg p-6">
                                                <div className="flex items-center justify-between mb-6">
                                                      <h2 className="text-xl font-bold text-gray-800">Recent Documents</h2>
                                                      <button className="text-emerald-600 font-medium flex items-center gap-1">View All<ChevronRight className="w-4 h-4" /></button>
                                                </div>
                                                <div className="space-y-3">
                                                      {recentDocuments.map((doc, i) => (
                                                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                                                  <div className="flex items-center gap-4">
                                                                        <FileText className="w-10 h-10 text-emerald-600" />
                                                                        <div><h4 className="font-medium text-gray-800">{doc.name}</h4><p className="text-gray-500 text-sm">{doc.type} • {doc.date}</p></div>
                                                                  </div>
                                                                  <button className="p-2 text-gray-400 hover:text-emerald-600"><Download className="w-5 h-5" /></button>
                                                            </div>
                                                      ))}
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <Footer />
            </div>
      );
};

export default DashboardPage;
