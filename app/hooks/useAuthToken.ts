"use client";

import { useCallback, useEffect, useState } from 'react';

interface Session {
    user: {
        id: string;
        email: string;
        name?: string;
        userType: string;
    };
    accessToken?: string;
}

export function useAuthToken() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSession();
    }, []);

    const fetchSession = async () => {
        try {
            const res = await fetch('/api/auth/session');
            const data = await res.json();

            if (data?.user) {
                setSession(data);
            } else {
                setError('Not authenticated');
            }
        } catch (err) {
            setError('Failed to fetch session');
        } finally {
            setLoading(false);
        }
    };

    const getToken = useCallback(() => {
        return session?.accessToken || null;
    }, [session]);

    const getAuthHeaders = useCallback(() => {
        const token = getToken();
        return token ? {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        } : {
            'Content-Type': 'application/json'
        };
    }, [getToken]);

    return {
        session,
        token: session?.accessToken || null,
        loading,
        error,
        getToken,
        getAuthHeaders,
        isAuthenticated: !!session?.user,
        user: session?.user || null
    };
}

// Helper function for API calls with better error handling
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    try {
        // Get session first
        const sessionRes = await fetch('/api/auth/session');
        const session = await sessionRes.json();

        console.log('Session check:', session?.user ? 'Authenticated' : 'Not authenticated');

        if (!session?.accessToken) {
            console.error('No access token in session');
            throw new Error('Not authenticated - please login again');
        }

        const headers = {
            'Authorization': `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
            ...options.headers
        };

        console.log('Fetching:', url);

        const response = await fetch(url, {
            ...options,
            headers
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            console.error('API Error:', errorData);
            throw new Error(errorData.error || `Request failed with status ${response.status}`);
        }

        return response.json();
    } catch (error: any) {
        // Check if it's a network error (backend not running)
        if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
            throw new Error('Cannot connect to backend server. Is it running?');
        }
        throw error;
    }
}

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
