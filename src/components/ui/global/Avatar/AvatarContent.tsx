import { FC   } from 'react';
import AvatarLink from '@/uiGlobal/Avatar/AvatarLink';
import { ContentProps } from 'interfaces/IAvatar';
import style from '@/componentsStyle/avatarStyles/AvatarContent.module.scss';

const AvatarContentProfile:FC<ContentProps> = ({ id, nick, description, isLink }) => {
    
    return (
        <div className={style.avatar__content}>
            <div className={style.nick}>    
                <h2 className={`${style.nick__value} ${style.nick__value_width}`}>
                    {nick}    
                </h2>         
            </div>

            <div className={style.description}>    
                <h2 className={`${style.description__value} ${style.description__value_width}`}>
                    {description}   
                </h2> 
            </div>
            
            {isLink ? <AvatarLink id={id} /> : null}
        </div>           
    )
};

export default AvatarContentProfile;