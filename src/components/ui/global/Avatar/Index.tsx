// 1. Imports
import { FC } from 'react';
import Image from 'next/image';

import { IUser } from 'interfaces/IAuthService';
import AvatarDownload from '@/uiGlobal/Avatar/AvatarDownload';
import AvatarContent from '@/uiGlobal/Avatar/AvatarContent';

import styles from '@/componentsStyle/avatarStyles/Avatar.module.scss';

// 2. Type
type AvatarProps = {
    user: IUser;
    isLink?: boolean;
    isDownload?: boolean;
    editContent?: boolean;
};

// 3. Component
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

// Return         
    return (
        <div className={styles.avatar}>
            <div className={styles.avatar__blockImg}>
                <Image 
                    src={'https://tween-api.herokuapp.com/avatars/' + avatar}
                    alt="avatar"
                    layout="fill"
                    objectFit="cover"
                    className={styles.avatar__img}
                />
                {isDownload ? <AvatarDownload id={id}/> : null}   
            </div>
            
            <AvatarContent
                id={id}
                nick={nick}
                description={description}  
                isLink={isLink} 
                editContent={editContent}
            />
        </div>
    )
}

// 4. Export
export { Avatar };