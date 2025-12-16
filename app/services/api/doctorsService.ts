export interface Doctor {
    id: number;
    name: string;
    specialty: string;
    qualification: string;
    experienceYears?: number;
    bio?: string;
    imageUrl?: string;
    isActive: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const doctorsService = {
    async getAllDoctors(token: string) {
        const response = await fetch(`${API_URL}/api/hospitals/me/doctors`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch doctors');
        return response.json();
    },

    async createDoctor(token: string, data: Omit<Doctor, 'id' | 'isActive'>) {
        const response = await fetch(`${API_URL}/api/hospitals/me/doctors`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create doctor');
        return response.json();
    },

    async updateDoctor(token: string, id: number, data: Partial<Doctor>) {
        const response = await fetch(`${API_URL}/api/hospitals/me/doctors/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update doctor');
        return response.json();
    },

    async deleteDoctor(token: string, id: number) {
        const response = await fetch(`${API_URL}/api/hospitals/me/doctors/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Failed to delete doctor');
        return true;
    }
};
