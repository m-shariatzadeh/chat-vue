import axios from 'axios';
import { API_FULL_URL } from './config.js';

// const getAuthToken = () => {
//     return 'Bearer ' + localStorage.getItem('token');
// };

export const api = axios.create({
    baseURL: API_FULL_URL,
    timeout: 0,
    responseType: 'json',
    responseEncoding: 'utf8',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// افزودن interceptor برای درخواست‌ها
// api.interceptors.request.use(
//     (config) => {
//         const token = getAuthToken();
//         if (token) {
//             config.headers['Authorization'] = token;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// افزودن interceptor برای پاسخ‌ها
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { status } = error.response || {};

        // اگر 401 خطای اعتبارسنجی (منقضی شدن توکن) بود
        if (status === 401) {
            const refresh_Token = localStorage.getItem('refreshToken');
        } else if (error.response) {
            // در صورتی که خطای دیگری بود
            console.log(error.response);
        }

        return Promise.reject(error);
    }
);

export function apiSuccessOutput({ data }) {
    return data;
}