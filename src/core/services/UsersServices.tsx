// import {  AxiosResponse } from 'axios';
import api from '../http';

// import { IRegistration, IAuthorization, AuthResponse } from 'interfaces/IAuthService';

export default class UserService {   
    static async users() {    
        return api.get('/users')
    }

    // static async login(data: IAuthorization): Promise<AxiosResponse<AuthResponse>> {
    //     return api.post('/login', data)
    // }

    // static async logout(): Promise<void> {
    //     return api.get('/logout')
    // }

    // static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    //     return api.get('/refresh')
    // }
}  