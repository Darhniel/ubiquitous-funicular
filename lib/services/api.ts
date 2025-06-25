// "use server"
import Cookies from 'js-cookie';
import { FormDataType } from '../types';

const API_BASE = 'https://saturndigitalbackend.onrender.com/api/users';
const REQUEST_TIMEOUT = 10000;

export const ApiService = {
    async register(data: Partial<FormDataType>) {
        // const controller = new AbortController();
        // const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

        try {
            const response = await fetch(`${API_BASE}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            // clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.data?.authToken) {
                Cookies.set('authToken', result.data.authToken);
            }
            return result;

        } catch (error) {
            this.handleError(error);
        }
    },

    async login(data: { email: string; password: string }) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

        try {
            const response = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error is ", errorData)
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Result: ",result);
            return result;
        } catch (error) {
            return this.handleError(error);
        }
    },

    async submitInvestment(data: Partial<FormDataType>) {
        return this.authFetch(`${API_BASE}/investments`, 'POST', data);
    },

    async submitBankDetails(data: Partial<FormDataType>) {
        return this.authFetch(`${API_BASE}/bank-details`, 'POST', data);
    },

    async submitKYC(data: Partial<FormDataType>) {
        return this.authFetch(`${API_BASE}/kyc`, 'POST', data);
    },

    async forgotPassword(data: { email: string }) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

        try {
            const response = await fetch(`${API_BASE}/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            return this.handleError(error);
        }
    },

    async verifyOtp(data: { email: string; otp: string[] }) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

        try {
            const response = await fetch(`${API_BASE}/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            return this.handleError(error);
        }
    },

    async resetPassword(data: { email: string; newPassword: string; otp: string[] }) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

        try {
            const response = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            return this.handleError(error);
        }
    },

    async authFetch(url: string, method: string, data: Partial<FormDataType>) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
        const token = Cookies.get('authToken');
        if (!token) {
            throw new Error('Missing authentication token');
        };

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            return await response.json();

        } catch (error) {
            this.handleError(error);
        }
    },

    handleError(error: unknown): never {
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timed out. Please check your connection and try again.');
            }
            throw error;
        }
        throw new Error('An unexpected error occurred');
    }
};