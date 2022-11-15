import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { IUser } from 'interfaces/IAuthService';
import style from '@/pagesStyle/Profile.module.scss';

type StatisticsProps = {user: IUser };

const UserStatistics:FC <StatisticsProps>= ({ 
    user, 
}) => {
    const idUser:string = user.id;
    const nickUser:string = user.nick;
    const subscribers:number = user.subscribersCount;
    const subscriptions:number = user.subscriptionsCount;
      
    const postsCountClick = () => {
        const postsNode = document.getElementById('posts-list');
        postsNode?.scrollIntoView({behavior: 'smooth'});
    }
 
    return (
        <div className={style.panel}>
            <div className={style.panel__item}
                onClick={postsCountClick}
            >
                <p className={style.panel__heading}>
                    {user.postsCount}
                </p>
                <p className={style.panel__designation}>
                    Публикаций
                </p>
            </div>
            <Link 
                href={{
                    pathname: '/users/subscribers', 
                    query: {
                        id: idUser, 
                        nick: nickUser
                    }}} 
                    passHref
                >
                <div className={style.panel__item}>
                    <p className={style.panel__heading}>
                        {user.subscribersCount}
                    </p>
                    <p className={style.panel__designation}>
                        Подписчиков
                    </p>
                </div>
            </Link>  
            <Link 
                href={{
                    pathname: '/users/subscriptions', 
                    query: {
                        id: idUser,
                        nick: user.nick
                    }}} 
                    passHref
                >
                <div className={style.panel__item}>
                    <p className={style.panel__heading}>
                        {subscriptions}
                    </p>
                    <p className={style.panel__designation}>
                        Подписок
                    </p>
                </div>
            </Link>
        </div>
    )
};

export { UserStatistics };