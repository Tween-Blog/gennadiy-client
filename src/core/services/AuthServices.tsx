import {  AxiosResponse } from 'axios';
import { api } from 'core/http';

import { IRegistration, IAuthorization, AuthResponse } from 'interfaces/IAuthService';

export default class AuthService {   
    static async registration(data: IRegistration): Promise<AxiosResponse> {    
        return api.post('/registration', data)
    }

    static async login(data: IAuthorization): Promise<AxiosResponse<AuthResponse>> {
        return api.post('/login', data)
    }

    static async logout(): Promise<void> {
        return api.get('/logout')
    }

    static async refresh(): Promise<AxiosResponse<AuthResponse>> {
        return api.get('/refresh')
    }
}  