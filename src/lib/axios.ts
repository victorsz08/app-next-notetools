import axios from 'axios';
import { parseCookies } from 'nookies';

// https://pktwx3-8000.csb.app/
const BASE_URL = 'https://api-notetools-node-j3kp.vercel.app/';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const cookie = parseCookies();
const token = cookie['nt.authtoken'];

api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
