import {  AxiosResponse } from 'axios';
import { apiGeneral } from 'core/http';

import { IUser } from 'interfaces/IAuthService';

export default class UserService {        
    static async users():Promise<AxiosResponse<IUser[]>> {   
        return apiGeneral.get('/users');
    }

    static async user(id: string):Promise<AxiosResponse<IUser>> {   
        return apiGeneral.get(`/users/${id}`);
    }

    static async userData(data: FormData) {   
        return apiGeneral.put('/users', data);
    }
}  