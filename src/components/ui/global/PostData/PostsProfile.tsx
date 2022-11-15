import { FC } from 'react';
import { useAppSelector } from '@/store/hook';
import Post from '@/uiGlobal/PostData/Post';


import { IPost } from 'interfaces/IPosts';
import style from '@componentsStyle/ProfileStyles/Posts.module.scss';

const PostsProfile:FC = () => {
    const posts:IPost[] = useAppSelector(state =>state.updatePost.list);
    
    return (
        <div>
            <ul id="posts-list"
                className={style.posts}    
            >       
                {posts && posts.slice(0).reverse().map((post: IPost) =>  
                    <li key={post.id}>
                        <Post 
                            post={post}
                        />    
                    </li>
                )}
            </ul>
        </div>
    )
};

export { PostsProfile };