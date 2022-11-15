import { FC, useEffect, useState } from 'react';

import { time2TimeAgo } from '@/helpers/utils/convertData';
import { useCreateLike } from '@/helpers/hook/useCreateLike';
import { useCheckLike } from '@/helpers/hook/useCheckLike';
import { useAppSelector } from '@/store/hook';

import { ILike } from 'interfaces/IPosts';
import style from '@componentsStyle/ProfileStyles/Comments.module.scss';

const BlockLike:FC<ILike> = ({date, like, postId, userId}) => { 
    const [countLike, setCountLike] = useState<number>(like);
    const [isLike, setIsLike] = useState<boolean>(false);

    const isAuth = useAppSelector(state => state.auth.isAuth);
    const checkLike = async () => {
        try {
            if (isAuth) {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const check =  await useCheckLike(userId, postId);
                const isLikeStatus:boolean = check.data.isLike;
                setIsLike(isLikeStatus);
            }
        } catch {
            // Error Request test
        } 
    }
    
    useEffect(()  => {
        checkLike();  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    const handleChangeLike = async() => {
        setIsLike(!isLike); 
        if (isLike) {
            setCountLike(countLike - 1)
        } else {
            setCountLike(countLike + 1)  
        }
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const response = await useCreateLike(postId, userId);
    } 
    
    return (
        <div className={`${style.comments__block} ${style.comments__block_like}`}>
            <div className={style.comments__countLike}>
                <div className={
                    isLike ?
                    `${style.comments__img} ${style.comments__img_like}`:
                    `${style.comments__img}` 
                }
                     onClick={handleChangeLike} 
                />  
                <span>{countLike} отметок “Нравится”</span>
            </div>

            {/* <span>{time2TimeAgo(date)}</span> */}
            <span>{`Дата создани поста: ${date}`}</span>
        </div>
    )
};

export default BlockLike;