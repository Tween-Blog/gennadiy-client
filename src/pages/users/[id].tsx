// 1. Imports
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'core/store/hook';
import UserService from '@/services/UsersServices';
import { IUser } from 'interfaces/IAuthService';

import { Avatar, UserStatistics } from '@/uiGlobal';
import { MainButton } from '@/uiCommon';
import { loader } from '@/store/slices/loaderSlice';

import style from '@/pagesStyle/Profile.module.scss';

// 2. Component
const User = () => {
  // Variables
  const [user, setUser] = useState<IUser>({});

  const router = useRouter();
  const dispatch = useAppDispatch();

  const id:string = router.asPath.slice(7).split('?')[0];

  const getUser = async () => {   
    try {
        dispatch(loader());
        const user = await UserService.user(id);
        setUser(user.data); 
    }
    catch (e) {
        console.error(e.response);
    } 
    finally {
        dispatch(loader());
    } 
  }

  useEffect(()  => {
      getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
   
// Return
  return (
    <div>

      <div className={style.profile__section}>
        <Avatar
          user={user}
        />

        <UserStatistics 
          user={user}
        />
      </div>

      <MainButton
          type="submit"
          text={'Подписаться'}
          otherClass="profileBtn"
          // onClick={() => handleSubmit()}
      />

    </div>
  );
}

// 3. Export
export default User;