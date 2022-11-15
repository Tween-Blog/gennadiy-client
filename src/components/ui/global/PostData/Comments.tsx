import { FC, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/store/hook';

import { useCreateComment } from '@/helpers/hook/useCreateComment';
import CommentsServices from '@/services/CommentsServices';
import CommentItem from '@/uiGlobal/PostData/CommentItem';
import BlockLike from '@/uiGlobal/PostData/BlockLike';

import { IUser } from 'interfaces/IAuthService';
import { IComment } from 'interfaces/IPosts';
import { ICommentProps } from 'interfaces/IPosts';
import style from '../../../../styles/module/components/profileStyles/Comments.module.scss';

const Comments:FC<ICommentProps> = ({post}) => {
    const isAuth = useAppSelector(state => state.auth.isAuth);
    const user: IUser = useAppSelector(state => state.auth.user);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const [modeSend, setModeSend] = useState<boolean>(false);
    const [comments, setComments] = useState<IComment[]>([]);
    const [comment, setComment] = useState<string>('');

    const getComments = async () => {     
        try {
            if (isAuth) {
                const response = await CommentsServices.postCommentsAll(post.id);
                setComments(response.data.reverse())
            }
        } catch {
            // Error Request test
        } 
    };
    
    useEffect(()  => {
        getComments();   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    const sendComments = async () => {
        setComment('');
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const response = await useCreateComment( post.id, user.id, comment);
        setComments([response.data, ...comments]);
    }

    return (
        <div className={style.comments}>
            <ul className={style.comments__item}>       
                {
                    comments?.map((comment) =>  
                        <li key={comment.id}>
                            <CommentItem 
                                comment={comment}
                            />
                        </li> 
                    ) 
                } 
            </ul>
            <div className={style.comments__blockInfo}>
                <BlockLike
                    date={post.date}
                    like={post.likesCount} 
                    postId={post.id}
                    userId={user.id}
                />
                <div className={style.comments__edit}>
                    <textarea ref={inputRef}
                        value={comment}
                        className={style.comments__input}
                        placeholder="Добавить комментарий..."
                        rows={1}  
                        maxLength={111}
                        onInput={(e) => {   
                            let text = (e.target as HTMLTextAreaElement).value;  
                            setComment(text);
                            inputRef.current.style.height = 'auto';
                            const scrollHeight = (e.target as HTMLTextAreaElement).scrollHeight;
                            inputRef.current.style.height = `${scrollHeight}px`;  

                            if (comment.length >= 5) {
                                setModeSend(true);
                            } else {
                                setModeSend(false);
                            }
                        }}
                    />
                    <span className={
                        !modeSend ? style.comments__btn : `${style.comments__btn} ${style.comments__btn_edit}`}
                        onClick={modeSend ? sendComments : null} 
                    >
                        Отправить
                    </span>
                </div>
            </div>
        </div>
    )
};

export default Comments;