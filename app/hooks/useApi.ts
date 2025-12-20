"use client";

import { useCallback, useEffect, useState } from 'react';

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface UseApiOptions<T> {
    url: string;
    initialData?: T;
    fetchOnMount?: boolean;
}

interface UseApiResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    mutate: (method: 'POST' | 'PUT' | 'DELETE', body?: any, id?: number | string) => Promise<T>;
}

// Get auth token from session
async function getAuthToken(): Promise<string | null> {
    try {
        const res = await fetch('/api/auth/session');
        const session = await res.json();
        return session?.accessToken || null;
    } catch {
        return null;
    }
}

// Simplified fetch with auth
export async function fetchApi<T = any>(url: string, options: RequestInit = {}): Promise<T> {
    const token = await getAuthToken();

    if (!token) {
        throw new Error('Please login to continue');
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options.headers
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || errorData.message || `Error ${response.status}`);
        }

        return response.json();
    } catch (error: any) {
        console.error('Fetch error details:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Trying to fetch URL:', url);

        // Handle network errors
        if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
            throw new Error('Cannot connect to server. Please ensure the backend is running on port 3001.');
        }
        throw error;
    }
}

// Hook for fetching data with loading/error states
export function useApi<T = any>(options: UseApiOptions<T>): UseApiResult<T> {
    const { url, initialData = null, fetchOnMount = true } = options;

    const [data, setData] = useState<T | null>(initialData as T | null);
    const [loading, setLoading] = useState(fetchOnMount);
    const [error, setError] = useState<string | null>(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchApi<T>(url);
            setData(result);
        } catch (err: any) {
            setError(err.message || 'Failed to load data');
        } finally {
            setLoading(false);
        }
    }, [url]);

    const mutate = useCallback(async (
        method: 'POST' | 'PUT' | 'DELETE',
        body?: any,
        id?: number | string
    ): Promise<T> => {
        const mutateUrl = id ? `${url}/${id}` : url;
        const result = await fetchApi<T>(mutateUrl, {
            method,
            body: body ? JSON.stringify(body) : undefined
        });
        // Refetch after mutation
        await refetch();
        return result;
    }, [url, refetch]);

    useEffect(() => {
        if (fetchOnMount) {
            refetch();
        }
    }, [fetchOnMount, refetch]);

    return { data, loading, error, refetch, mutate };
}

// Simplified helper for quick API calls
export async function apiCall<T = any>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
): Promise<T> {
    return fetchApi<T>(`${API_BASE}${endpoint}`, {
        method,
        body: body ? JSON.stringify(body) : undefined
    });
}
