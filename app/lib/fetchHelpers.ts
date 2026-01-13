/**
 * Optimized fetch helpers with built-in caching and error handling
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Request deduplication map
const pendingRequests = new Map<string, Promise<any>>();

interface FetchOptions {
    cache?: RequestCache;
    revalidate?: number | false;
    tags?: string[];
    retries?: number;
}

/**
 * Enhanced fetch with retry logic and deduplication
 */
async function enhancedFetch<T>(
    url: string,
    options: FetchOptions & RequestInit = {}
): Promise<T> {
    const { retries = 2, cache, revalidate, tags, ...fetchOptions } = options;

    // Create cache key for deduplication
    const cacheKey = `${url}-${JSON.stringify(fetchOptions)}`;

    // Return pending request if exists (deduplication)
    if (pendingRequests.has(cacheKey)) {
        return pendingRequests.get(cacheKey)!;
    }

    const fetchPromise = (async () => {
        let lastError: Error | null = null;

        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                const response = await fetch(url, {
                    ...fetchOptions,
                    next: {
                        revalidate: revalidate,
                        tags: tags,
                    },
                    cache: cache,
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                return data as T;
            } catch (error) {
                lastError = error as Error;

                // Don't retry on 4xx errors
                if (error instanceof Error && error.message.includes('HTTP 4')) {
                    throw error;
                }

                // Wait before retry (exponential backoff)
                if (attempt < retries) {
                    await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
                }
            }
        }

        throw lastError || new Error('Request failed');
    })();

    // Store pending request
    pendingRequests.set(cacheKey, fetchPromise);

    // Clean up after completion
    fetchPromise.finally(() => {
        pendingRequests.delete(cacheKey);
    });

    return fetchPromise;
}

/**
 * Fetch all hospitals with caching
 */
export async function fetchHospitals(params?: {
    status?: string;
    limit?: number;
    offset?: number;
}) {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set('status', params.status);
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.offset) searchParams.set('offset', params.offset.toString());

    const url = `${API_BASE}/api/hospitals${searchParams.toString() ? `?${searchParams}` : ''}`;

    return enhancedFetch<any[]>(url, {
        revalidate: 300, // 5 minutes
        tags: ['hospitals'],
        cache: 'force-cache',
    });
}

/**
 * Fetch single hospital by ID or slug
 */
export async function fetchHospitalById(id: string | number) {
    const url = `${API_BASE}/api/hospitals/${id}`;

    return enhancedFetch<any>(url, {
        revalidate: 3600, // 1 hour
        tags: ['hospitals', `hospital-${id}`],
        cache: 'force-cache',
    });
}

/**
 * Fetch all packages with caching
 */
export async function fetchPackages(params?: {
    hospitalId?: number;
    featured?: boolean;
    limit?: number;
}) {
    const searchParams = new URLSearchParams();
    if (params?.hospitalId) searchParams.set('hospitalId', params.hospitalId.toString());
    if (params?.featured) searchParams.set('featured', 'true');
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    const url = `${API_BASE}/api/packages${searchParams.toString() ? `?${searchParams}` : ''}`;

    return enhancedFetch<any[]>(url, {
        revalidate: 3600, // 1 hour
        tags: ['packages'],
        cache: 'force-cache',
    });
}

/**
 * Fetch doctors for a hospital
 */
export async function fetchDoctors(hospitalId?: number) {
    const url = hospitalId
        ? `${API_BASE}/api/hospitals/${hospitalId}/doctors`
        : `${API_BASE}/api/hospitals/doctors`;

    return enhancedFetch<any[]>(url, {
        revalidate: 1800, // 30 minutes
        tags: hospitalId ? ['doctors', `hospital-${hospitalId}-doctors`] : ['doctors'],
        cache: 'force-cache',
    });
}

/**
 * Fetch treatments/services
 */
export async function fetchTreatments(params?: {
    category?: string;
    featured?: boolean;
}) {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.featured) searchParams.set('featured', 'true');

    const url = `${API_BASE}/api/treatments${searchParams.toString() ? `?${searchParams}` : ''}`;

    return enhancedFetch<any[]>(url, {
        revalidate: 3600, // 1 hour
        tags: ['treatments'],
        cache: 'force-cache',
    });
}

/**
 * Prefetch multiple resources in parallel
 */
export async function prefetchHomeData() {
    return Promise.allSettled([
        fetchHospitals({ limit: 6, status: 'active' }),
        fetchPackages({ featured: true, limit: 3 }),
        fetchTreatments({ featured: true }),
    ]);
}

/**
 * Client-side fetch (for client components)
 */
export async function clientFetch<T>(
    url: string,
    options?: RequestInit & { retries?: number }
): Promise<T> {
    const { retries = 2, ...fetchOptions } = options || {};

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, {
                ...fetchOptions,
                headers: {
                    'Content-Type': 'application/json',
                    ...fetchOptions.headers,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            lastError = error as Error;

            if (attempt < retries) {
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 500));
            }
        }
    }

    throw lastError || new Error('Request failed');
}
