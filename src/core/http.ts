import axios, { AxiosRequestConfig } from 'axios';
import config from 'config';
import AuthService from './services/AuthServices';

const apiUrl = config.NEXT_API_URL;
const apiUrlGeneral = 'https://tween-api.herokuapp.com/api';

// Api for authorization
const api = axios.create({
    withCredentials: true,
    baseURL: apiUrl
});

 // Interceptor on request authorization
api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
});

// Api general
const apiGeneral = axios.create({
    // withCredentials: true,
    baseURL: apiUrlGeneral
});

// Interceptors on requests api general
apiGeneral.interceptors.request.use((config) => {    
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
});

// Interceptors on response api general
apiGeneral.interceptors.response.use((config) => {
    return config;
    },async (error) => {
        const originalRequest = error.config;
        if(error.response.status == 401 && error.config && !originalRequest.isRetry) {
            originalRequest.isRetry = true;
            try {
                const response = await AuthService.refresh(); 
                localStorage.setItem('accessToken', response.data.accessToken);
                return apiGeneral.request(originalRequest);
            } catch  {
                // Error request for the test
            }
        }
        throw error;
    })

export  { api, apiGeneral };