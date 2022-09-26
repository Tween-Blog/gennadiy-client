// 1. Imports
import { FC } from 'react';

import style from '@/pagesStyle/Profile.module.scss';

// 2. Type
type StatisticsProps = {
    user: object;
};

// 3. Component
const UserStatistics:FC <StatisticsProps>= ({ 
    user, 
}) => {
    const post:number = user['postsCount'],
          subscribers:number = user['subscribersCount'],
          subscriptions:number = user['subscriptionsCount'];

// Return         
    return (
        <div className={style.panel}>

            <div className={style.panel__item}>

                <p className={style.panel__heading}>
                    {post}
                </p>
                <p className={style.panel__designation}>
                    Публикаций
                </p>

            </div>

            <div className={style.panel__item}>

                 <p className={style.panel__heading}>
                    {subscribers}
                </p>
                <p className={style.panel__designation}>
                    Подписчиков
                </p>

            </div>

            <div className={style.panel__item}>

                <p className={style.panel__heading}>
                    {subscriptions}
                </p>
                <p className={style.panel__designation}>
                    Подписок
                </p>

            </div>

        </div>
    )
}

// 4. Export
export { UserStatistics };