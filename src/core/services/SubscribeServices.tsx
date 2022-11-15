import { AxiosResponse } from 'axios';
import { apiGeneral } from 'core/http';
// import { IDeletePost, IPost } from '../../interfaces/IPosts';

export default class SubscribeServices {  
    static async subscribe(data: FormData) {   
        return apiGeneral.post('/subscribe', data);
    }

    static async unsubscribe(data: FormData) {   
        return apiGeneral.post('/unsubscribe', data);
    }

    static async subscribers(userId: string) {   
        return apiGeneral.get(`/user-subscribers/${userId}`);
    }

    static async subscriptions(userId: string) {   
        return apiGeneral.get(`/user-subscriptions/${userId}`);
    } 

    static async checkSubscribe(data: FormData) {   
        return apiGeneral.post('/check-subscribe', data);
    }
}  