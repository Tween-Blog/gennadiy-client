import {  AxiosResponse } from 'axios';
import api from '../http';

import { IRegistration, IAuthorization, AuthResponse } from './IAuthService';

export default class AuthService {   
    static async registration(dataInput: IRegistration): Promise<AxiosResponse> {    
        return api.post('/registration', dataInput)
    }

    static async login(dataInput: IAuthorization): Promise<AxiosResponse<AuthResponse>> {
        return api.post('/login', dataInput)
    }

    static async logout(): Promise<void> {
        return api.get('/logout')
    }

    static async refresh(): Promise<AxiosResponse<AuthResponse>> {
        return api.get('/refresh')
    }
}  