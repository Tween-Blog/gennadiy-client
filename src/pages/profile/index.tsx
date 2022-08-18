// 1. Imports
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAppSelector } from 'core/hook';
import UserService from '@/services/UsersServices';

import { Avatar } from '@/uiGlobal';
import { MainButton } from '@/uiGlobal';

// 2. Component
const Profile = () => {
  // Variables
  const router = useRouter();

  const isAuth = useAppSelector(state => state.auth.isAuth),
        user = useAppSelector(state =>state.auth.user);
        // console.log(user)

  useEffect(()  => {
    !isAuth ? router.push('/') : null
  }, [isAuth, router])

  const handleSubmit = async () => {
     console.log('users');
    // const apiUrl = 'https://tween-api.herokuapp.com/api';
   
    // fetch(apiUrl + '/users', {
    // headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
    // },
    // method: 'GET',
    // }).then(response => response.json())
    // .then(json => console.log(json));
  }
  // Return
  return (
    <div>
      <Avatar
        nick={user['nick']}
      />
      <MainButton
        type="submit"
        text={'Users'}
        onClick={() => handleSubmit()}
      />
    </div>
  );
}

// 3. Export
export default Profile;