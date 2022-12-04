import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import Comments from '@/uiGlobal/PostData/Comments';

import { IPostProps } from 'interfaces/IPosts';
import style from '../../../../styles/module/components/profileStyles/Posts.module.scss'
import { useCheckLike } from '@/helpers/hook/useCheckLike';
import { useAppSelector } from '@/store/hook';
import { IUser } from 'interfaces/IAuthService';

import config from '@/config*';

const PostItem:FC<IPostProps> = ({post}) => {
    const isAuth = useAppSelector(state => state.auth.isAuth);
    const user: IUser = useAppSelector(state => state.auth.user);
    const image:string = config.POSTS_URL + post.picture;

    const [isLike, setIsLike] = useState<boolean>(false);
    const postHeightTitle = post.title.split(/\r\n|\r|\n/).length;
    const postHeightDesc = post.description.split(/\r\n|\r|\n/).length;
     
    const checkLike = async () => {
        try {
            if (isAuth) {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const check =  await useCheckLike(user.id, post.id);
                const isLikeStatus:boolean = check.data.isLike;
                setIsLike(isLikeStatus);
            }
        } catch {
            // Error request for the test
        } 
    }

    useEffect(()  => {
        checkLike();   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    return (
        <div className={style.postContent}>
            <div className={style.postContent__img}>
                <Image 
                    src={image}
                    alt="post"
                    layout="fill"
                    objectFit="cover"
                    className={style.post__img}
                /> 
            </div>  

            <div className={style.postContent__description}>
                <textarea 
                    value={post.title}
                    rows={postHeightTitle}
                    className={style.postContent__title}
                    readOnly={true}
                />             
                <textarea 
                    value={post.description}
                    rows={postHeightDesc <=3  ? 3 : postHeightDesc}
                    className={style.postContent__text}
                    readOnly={true}
                />  
            </div>
            <Comments post={post} isLike={isLike}/>
        </div>
    )
};

export default PostItem;