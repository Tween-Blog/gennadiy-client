// 1. Imports
import AuthService from 'core/services/AuthServices';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'core/hook';

import { MainButton } from 'components/ui/common';
import { logout } from 'core/slices/authSlice';

// 2. Component
const Profile = () => {
  // Variables
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.auth.isAuth);

  useEffect(()  => {
    !isAuth ? router.push('/') : null
  }, [isAuth, router])

  const handleSubmit = async () => {  
    try {
      const response = await AuthService.logout();  
      localStorage.removeItem('accessToken'); 
      dispatch(logout());
      router.push('/');
    } 
    catch (e) {
        console.error(e.response.data);
    }    
  }

  // Return
  return (
    <div>
        Profile
        <MainButton
              text={'Выйти'}
              onClick={() => handleSubmit()}
          /> 
    </div>
  );
}

// 3. Export
export default Profile;