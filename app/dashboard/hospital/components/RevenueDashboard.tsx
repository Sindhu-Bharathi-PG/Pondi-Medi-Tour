"use client";

import { AlertCircle, Calendar, CreditCard, DollarSign, TrendingDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Sample data - replace with real API data
const monthlyRevenue = [
    { month: 'Jan', revenue: 125000, treatments: 45, packages: 12 },
    { month: 'Feb', revenue: 145000, treatments: 52, packages: 15 },
    { month: 'Mar', revenue: 132000, treatments: 48, packages: 13 },
    { month: 'Apr', revenue: 168000, treatments: 61, packages: 18 },
    { month: 'May', revenue: 155000, treatments: 55, packages: 16 },
    { month: 'Jun', revenue: 178000, treatments: 65, packages: 20 },
];

const revenueByTreatment = [
    { name: 'Orthopedic', value: 35000, count: 15 },
    { name: 'Cardiology', value: 28000, count: 12 },
    { name: 'IVF', value: 42000, count: 8 },
    { name: 'Dental', value: 15000, count: 25 },
    { name: 'Cosmetic', value: 22000, count: 10 },
];

const paymentStatus = [
    { name: 'Completed', value: 385000, color: '#10b981' },
    { name: 'Pending', value: 45000, color: '#f59e0b' },
    { name: 'Overdue', value: 12000, color: '#ef4444' },
];

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899'];

export default function RevenueDashboard() {
    const [dateRange, setDateRange] = useState('6m');

    const stats = [
        {
            title: 'Total Revenue',
            value: '₹9,03,000',
            change: '+15.2%',
            trend: 'up',
            icon: DollarSign,
            color: 'from-emerald-500 to-teal-600',
        },
        {
            title: 'This Month',
            value: '₹1,78,000',
            change: '+8.5%',
            trend: 'up',
            icon: Calendar,
            color: 'from-blue-500 to-indigo-600',
        },
        {
            title: 'Pending Payments',
            value: '₹45,000',
            change: '-12.3%',
            trend: 'down',
            icon: CreditCard,
            color: 'from-amber-500 to-orange-600',
        },
        {
            title: 'Avg Transaction',
            value: '₹2,850',
            change: '+5.1%',
            trend: 'up',
            icon: TrendingUp,
            color: 'from-violet-500 to-purple-600',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Revenue Dashboard</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Track financial performance and payments</p>
                </div>
                <div className="flex items-center gap-2">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="1m">Last Month</option>
                        <option value="3m">Last 3 Months</option>
                        <option value="6m">Last 6 Months</option>
                        <option value="1y">Last Year</option>
                    </select>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                                }`}>
                                {stat.trend === 'up' ? (
                                    <TrendingUp className="w-4 h-4" />
                                ) : (
                                    <TrendingDown className="w-4 h-4" />
                                )}
                                {stat.change}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Trend */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Revenue Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyRevenue}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                            <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Payment Status */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Payment Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={paymentStatus}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {paymentStatus.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Revenue by Treatment */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Revenue by Treatment Type</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueByTreatment}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '12px' }} />
                            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Treatments */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Top Revenue Generators</h3>
                    <div className="space-y-4">
                        {revenueByTreatment
                            .sort((a, b) => b.value - a.value)
                            .map((treatment, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                            <span className="text-blue-600 dark:text-blue-400 font-bold">{index + 1}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 dark:text-white">{treatment.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{treatment.count} procedures</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900 dark:text-white">₹{(treatment.value / 1000).toFixed(0)}k</p>
                                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: `${(treatment.value / Math.max(...revenueByTreatment.map((t) => t.value))) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Outstanding Payments Alert */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-lg">
                        <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Outstanding Payments</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            You have <strong>₹45,000</strong> in pending payments and <strong>₹12,000</strong> overdue.
                            Review and follow up with patients to ensure timely collections.
                        </p>
                        <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors">
                            View Payment Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
