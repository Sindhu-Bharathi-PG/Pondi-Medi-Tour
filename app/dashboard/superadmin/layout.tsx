"use client";

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'unauthenticated') {
            redirect('/login/admin');
        }
        if (status === 'authenticated' && session?.user?.userType !== 'superadmin') {
            redirect('/dashboard/admin');
        }
    }, [status, session]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading...</p>
                </div>
            </div>
        );
    }

    return <div className="min-h-screen bg-slate-50 p-4 lg:p-8">{children}</div>;
}
