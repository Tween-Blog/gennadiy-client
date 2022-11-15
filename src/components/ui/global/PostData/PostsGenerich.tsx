import { FC } from 'react';
import PostItem from '@/uiGlobal/PostData/PostItem';

import { IPost } from 'interfaces/IPosts';
import style from '../../../../styles/module/components/profileStyles/Posts.module.scss';

const PostsGenerich:FC <any> = ({posts}) => {  
    return (
        <div>  
            <ul id="posts-list"
                className={style.posts}
            >       
                {posts && posts.slice(0).reverse().map((post: IPost) =>  
                    <li key={post.id}>
                        <PostItem 
                            post={post}
                        />    
                    </li>
                )}
            </ul>
        </div>
    )
};

export { PostsGenerich };