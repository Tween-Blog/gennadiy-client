// 1. Imports
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'core/hook';
import { login } from 'core/slices/authSlice';
import AuthService from 'core/services/AuthServices';

import { UniTag, MainButton } from 'components/ui/common';
import { ImageFon } from 'components/ui/graphics';
import styles from 'styles/module/pages/Home.module.scss';

// 2. Component
const Home: NextPage = () => {
  // Variables
  const router = useRouter();
  const dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkAuth = async () => {    
    if(localStorage.accessToken) {
      try {
        const response = await AuthService.refresh();  
        localStorage.accessToken = response.data.accessToken;
        dispatch(login(response.data.user)); 
        router.push('/profile')
      } 
      catch (e) {
          console.error(e.response.data);
      }   
    } 
  }
  
  useEffect(()  => {
    checkAuth();
  }, [checkAuth])

  // Return
  return (
    <div>
      <div className={styles.offer}>
        <UniTag text={'Начни свой блог с Tween!'} />
        <p>
          В нашем приложении ты cможешь поделиться информацией
          о себе, и своей жизни, вместе с другими пользователями в 
          режиме реального времени. Быстро, просто и легко!
        </p>
        <MainButton
          text={'Начать с Tween'}
          onClick={() => localStorage.checkRegistration ? router.push('/signin') : router.push('/signup')}
        /> 
      </div>
      <ImageFon />
    </div>
  );
}

// 3. Export
export default Home;