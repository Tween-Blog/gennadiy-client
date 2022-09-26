import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'core/store/hook';

import { IUser } from 'interfaces/IAuthService';
import UserService from '@/services/UsersServices';
import { loader } from 'core/store/slices/loaderSlice';

import { UniTag } from 'components/ui/common';
import { Avatar } from '@/uiGlobal';

import styles from '@/pagesStyle/Users.module.scss';

// 2. Component
const Users = () => { 
     // Variables
    const [users, setUsers] = useState<IUser[]>([]);

    const userCurr: IUser = useAppSelector(state =>state.auth.user);

    const dispatch = useAppDispatch();
   
    const getUsers = async () => {   
        try {
            dispatch(loader());
            const users = await UserService.users();
            setUsers(users.data); 
        }
        catch (e) {
            console.error(e.response);
        } 
        finally {
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
                <li 
                    key={user.id}
                    className={styles.user}
                >
                    <Avatar
                        user={user}
                        isLink={true}
                    />
                </li>
            ))} 
      </ul>
    </div>
  );
};

export default Users;