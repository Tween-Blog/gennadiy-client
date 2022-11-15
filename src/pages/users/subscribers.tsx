import { useEffect, useState } from 'react';
import { useAppDispatch } from 'core/store/hook';
import { useRouter } from 'next/router'

import { IUser } from 'interfaces/IAuthService';
import SubscribeServices from '@/services/SubscribeServices';
import { loader } from 'core/store/slices/loaderSlice';

import { Avatar } from '@/uiGlobal/Post';
import styles from '@/pagesStyle/Users.module.scss';

const Subscribers = () => { 
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [users, setUsers] = useState<IUser[]>([]); 

    const userId:any = router.query.id,
          userNick:any = router.query.nick;

    const getUsers = async () => {   
        try {
            dispatch(loader());
            const users = await SubscribeServices.subscribers(userId);
            setUsers(users.data); 
        } finally {
            dispatch(loader());
        } 
    };

    useEffect(()  => {
        getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

  return (
    <div>
        <h1>
            Подписчики пользователя:
            <span className={styles.nick}>
                {` ${userNick}`}
            </span>
        </h1>
        <ul className={styles.users}>
                {users && users.map(user => (
                <li key={user.id} className={styles.user}>
                    <Avatar user={user} isLink />
                </li>
            ))} 
        </ul>
    </div>
  );
};

export default Subscribers;