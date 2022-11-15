import { AxiosResponse } from 'axios';
import { apiGeneral } from 'core/http';
// import { IDeletePost, IPost } from '../../interfaces/IPosts';

export default class LikeServices {    
    static async like(data: FormData) {   
        return apiGeneral.post('/like', data);
    }

    static async dislike(data: FormData) {   
        return apiGeneral.post('/dislike', data);
    }

    static async checkLike(data: FormData) {   
        return apiGeneral.post('/check-like', data);
    }
}  