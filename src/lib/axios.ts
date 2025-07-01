import axios from 'axios';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

const BASE_URL = 'https://api-notetools-node-j3kp.vercel.app/';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const cookies = parseCookies(null); // Get all cookies
        const token = cookies['nt.authtoken'];

        if (token) {
            const isTokenValid = true;

            if (isTokenValid) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                destroyCookie(null, 'nt.authtoken');
                console.warn(
                    'Expired or invalid token detected. User might need to re-authenticate.'
                );
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor (optional, but good for handling expired tokens from API)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Example: If your API returns a 401 status for an expired token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent infinite loops
            // Here you would typically try to refresh the token if you have a refresh token mechanism.
            // For simplicity, we'll just log and clear the token for now.
            console.warn(
                'API returned 401 (Unauthorized). Token might be expired or invalid.'
            );
            destroyCookie(null, 'nt.authtoken');
            // Redirect to login or initiate a refresh token flow
            // window.location.href = '/login'; // Example redirect
        }
        return Promise.reject(error);
    }
);
