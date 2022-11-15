import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'core/store/hook';

import { IUser } from 'interfaces/IAuthService';
import UserService from '@/services/UsersServices';
import { loader } from 'core/store/slices/loaderSlice';

import { UniTag } from 'components/ui/common';
import { Avatar } from '@/uiGlobal/Post';
import styles from '@/pagesStyle/Users.module.scss';

const Users = () => { 
    const [users, setUsers] = useState<IUser[]>([]);

    const dispatch = useAppDispatch();
    const userCurr: IUser = useAppSelector(state =>state.auth.user);

    const getUsers = async () => {   
        try {
            dispatch(loader());
            const users = await UserService.users();
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
        <UniTag text={'Пользователи Tween'} />
        <ul className={styles.users}>
                {users && users.filter(user => user.id !== userCurr.id).map(user => (
                <li key={user.id} className={styles.user}>
                    <Avatar user={user} isLink />
                </li>
            ))} 
        </ul>
    </div>
  );
};

export default Users;