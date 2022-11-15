import { FC } from 'react';
import Image from 'next/image';

import { IUser } from 'interfaces/IAuthService';
import AvatarDownload from '@/uiGlobal/Avatar/AvatarDownload';
import AvatarContentProfile from '@/uiGlobal/Avatar/AvatarContentProfile';
import AvatarContent from '@/uiGlobal/Avatar/AvatarContent';

import style from '../../../../styles/module/components/avatarStyles/Avatar.module.scss';

type AvatarProps = {
    user: IUser;
    isLink?: boolean;
    isDownload?: boolean;
    editContent?: boolean;
};

const Avatar:FC <AvatarProps>= ({ 
    user, 
    isLink = false,
    isDownload = false,
    editContent = false,
}) => {
    const id:string = user.id,
          avatar:string = user.avatar,
          nick:string = user.nick,
          description:string = user.description;
       
    return (
        <div className={style.avatar}>
            <div className={style.avatar__blockImg}>
                <Image 
                    src={'https://tween-api.herokuapp.com/avatars/' + avatar}
                    blurDataURL={'https://tween-api.herokuapp.com/avatars/' + avatar}
                    placeholder="empty"
                    alt="avatar"
                    layout="fill"
                    objectFit="cover"
                    className={style.avatar__img}
                />
                {isDownload ? <AvatarDownload id={id}/> : null}   
            </div>
            {editContent ? 
                <AvatarContentProfile
                    id={id}
                    nick={nick}
                    description={description}  
                    editContent={editContent}
                /> :          
                <AvatarContent
                    id={id}
                    nick={nick}
                    description={description}  
                    isLink={isLink} 
                />
            }    
        </div>
    )
};

export { Avatar };