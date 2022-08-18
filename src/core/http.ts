// Imports
import axios from 'axios';
import config from 'config';

const apiUrl = config.NEXT_API_URL;

const api = axios.create({
    withCredentials: true,
    baseURL: apiUrl
})


 // Interceptor on request
api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
})


export default api;