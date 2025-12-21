// Admin API utility for making authenticated requests
import { getSession } from 'next-auth/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class AdminAPI {
    private async getAuthHeaders() {
        const session = await getSession();
        return {
            'Content-Type': 'application/json',
            'Authorization': session?.accessToken ? `Bearer ${session.accessToken}` : '',
        };
    }

    async get(endpoint: string) {
        const headers = await this.getAuthHeaders();
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }

    async post(endpoint: string, data: any) {
        const headers = await this.getAuthHeaders();
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }

    async put(endpoint: string, data: any) {
        const headers = await this.getAuthHeaders();
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }

    async patch(endpoint: string, data?: any) {
        const headers = await this.getAuthHeaders();
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PATCH',
            headers,
            body: data ? JSON.stringify(data) : undefined,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }

    async delete(endpoint: string) {
        const headers = await this.getAuthHeaders();
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }

    // Analytics endpoints
    async getAnalyticsStats(timeRange: string = '30d') {
        return this.get(`/api/admin/analytics/stats?timeRange=${timeRange}`);
    }

    async getTopHospitals() {
        return this.get('/api/admin/analytics/top-hospitals');
    }

    async getActivityFeed(limit: number = 20) {
        return this.get(`/api/admin/analytics/activity?limit=${limit}`);
    }

    // Settings endpoints
    async getSettings() {
        return this.get('/api/admin/settings');
    }

    async updateSettings(settings: any) {
        return this.put('/api/admin/settings', settings);
    }

    // Users endpoints
    async getUsers(params?: { search?: string; role?: string; status?: string }) {
        const query = new URLSearchParams(params as any).toString();
        return this.get(`/api/admin/users${query ? `?${query}` : ''}`);
    }

    async updateUserRole(userId: string, role: string) {
        return this.patch(`/api/admin/users/${userId}/role`, { role });
    }

    async toggleUserStatus(userId: string) {
        return this.patch(`/api/admin/users/${userId}/status`);
    }

    async deleteUser(userId: string) {
        return this.delete(`/api/admin/users/${userId}`);
    }

    // Hospitals endpoints
    async getHospitals(params?: { search?: string; status?: string }) {
        const query = new URLSearchParams(params as any).toString();
        return this.get(`/api/admin/hospitals${query ? `?${query}` : ''}`);
    }

    async approveHospital(hospitalId: string) {
        return this.patch(`/api/admin/hospitals/${hospitalId}/approve`);
    }

    async rejectHospital(hospitalId: string, reason: string) {
        return this.patch(`/api/admin/hospitals/${hospitalId}/reject`, { reason });
    }

    // Inquiries endpoints
    async getInquiries(params?: { search?: string; status?: string }) {
        const query = new URLSearchParams(params as any).toString();
        return this.get(`/api/inquiries${query ? `?${query}` : ''}`);
    }

    async markInquiryResponded(inquiryId: number) {
        return this.put(`/api/inquiries/${inquiryId}`, { status: 'responded' });
    }
}

export const adminAPI = new AdminAPI();
