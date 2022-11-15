import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useAppSelector } from '@/store/hook';

import { IUser } from 'interfaces/IAuthService';
import UserService from '@/services/UsersServices';

import { IComment } from 'interfaces/IPosts';
import style from '@/componentsStyle/ProfileStyles/Comments.module.scss';

const CommentItem:FC<any> = ( {comment} ) => {
    const isAuth = useAppSelector(state => state.auth.isAuth);
    const [user, setUser] = useState<IUser>({});
    
    const getUser = async () => {     
        try {
            if (isAuth) {
                const response =  await UserService.user(comment.userId);
                setUser(response.data);
            }    
        } catch {
            return;
        } 
    };
    
    useEffect(()  => {
        getUser();    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 


    return (
        <div className={style.comments__block}>
            <div className={style.comments__card}>
                <div className={style.comments__avatar}>
                    <Image 
                        src={'https://tween-api.herokuapp.com/avatars/' + user.avatar}
                        blurDataURL={'https://tween-api.herokuapp.com/avatars/' + user.avatar}
                        placeholder="empty"
                        alt="avatar"
                        width={40}
                        height={40}
                        className={style.comments__imgAvatar}
                    />
                </div>
                <div className={style.comments__textInfo}>
                    <div className={style.comments__text}>
                        {user.nick}
                    </div>
                    <div className={style.comments__left}>
                        Оставил(-а) комментарий
                    </div>
                    
                </div>
            </div>
            <div className={style.comments__text}>
                {comment.text}
            </div>         
        </div>
    )
};

export default CommentItem;