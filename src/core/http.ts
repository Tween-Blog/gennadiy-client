// Imports
import axios from 'axios';
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
    baseURL: apiUrlGeneral
});

// Interceptors on requests api general
apiGeneral.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    console.log('Перехват запроса общий')
    return config;
});

// Interceptors on response api general
apiGeneral.interceptors.response.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    console.log('Перехват ответа отработал')
    return config;
}, async error => { 
    
    // console.log(localStorage.accessToken);
    // if(error.response.status == 401) {


    //     const response = await AuthService.refresh();
    //      console.log(response.data.accessToken);
    //     localStorage.setItem('accessToken', response.data.accessToken);
    //     localStorage.accessToken = response.data.accessToken;
    //     console.log(localStorage.accessToken);
        
    //     // console.log(error);
    // }
    const originalRequest = error.config;

    if(error.response.status == 401 && error.response.status == 500 && error.config && !originalRequest.isRetry) {

      
        // const response = await AuthService.refresh();

        try {
            originalRequest.isRetry = true;

            const response = await AuthService.refresh();  
            localStorage.setItem('accessToken', response.data.accessToken);
            console.log('Рефреш выполнен'); 
            return apiGeneral.request(originalRequest);
        } catch (e) {
            alert('Пожалуйста авторизуйтесь');
        };
    };

    throw error;
});

export  { api, apiGeneral };