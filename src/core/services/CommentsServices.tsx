import { AxiosResponse } from 'axios';
import { apiGeneral } from 'core/http';
// import { IDeletePost, IPost } from '../../interfaces/IPosts';

export default class CommentsServices {  
    static async allComments() {   
        return apiGeneral.get('/comments');
    }

    static async postCommentsAll(postId: string) {   
        return apiGeneral.get(`/post-comments/${postId}`);
    }
    
    static async commentNew(data: FormData) {   
        return apiGeneral.post('/comments', data);
    }
}  