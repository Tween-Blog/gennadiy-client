import { AxiosResponse } from 'axios';
import { apiGeneral } from 'core/http';
import { IDeletePost, IPost } from 'interfaces/IPosts';


export default class PostServices {        
    static async postNew(data: FormData) {   
        return apiGeneral.post('/posts', data);
    }

    static async postUpdate (data: FormData) {   
        return apiGeneral.put('/posts', data);
    }

    static async allPosts():Promise<AxiosResponse<IPost[]>> {   
        return apiGeneral.get('/posts');
    }

    static async userPosts(userId: string):Promise<AxiosResponse<IPost[]>> {   
        return apiGeneral.get(`/user-posts/${userId}`);
    }

    static async userPost(id: string):Promise<AxiosResponse<IPost>> {   
        return apiGeneral.get(`/posts/${id}`);
    }

    static async deletePost(data:IDeletePost):Promise<AxiosResponse<IPost>> {   
        return apiGeneral.delete('/posts',
        {   headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            data
        } 
        );
    }
}  