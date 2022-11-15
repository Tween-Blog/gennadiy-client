import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAppDispatch } from 'core/store/hook';
import { login } from 'core/store/slices/authSlice';
import { loader } from 'core/store/slices/loaderSlice';
import AuthService from '@/services/AuthServices';

import { UniTag, MainButton } from '@/uiCommon';
import { BackImage } from '@/uiGraphics';
import styles from '@/pagesStyle/Home.module.scss';

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkAuth = async () => {   
    if(localStorage.accessToken) {
      try {
        dispatch(loader());
        const response = await AuthService.refresh();  
        dispatch(login(response.data.user));
        localStorage.accessToken = response.data.accessToken;
        router.push('/profile')
      } finally {
        dispatch(loader());
      }  
    } 
  };
  
  useEffect(()  => {
    checkAuth();
  }, [checkAuth])

  return (
    <div>
      <div className={styles.offer}>
        <UniTag text={'Начни свой блог с Tween!'} />
        <p className={styles.offerTitle}>
          В нашем приложении ты cможешь поделиться информацией
          о себе, и своей жизни, вместе с другими пользователями в 
          режиме реального времени. Быстро, просто и легко!
        </p>
        <MainButton
          type="button"
          text={'Начать с Tween'}
          onClick={() => localStorage.checkRegistration ? router.push('/signin') : router.push('/signup')}
        /> 
      </div>

      <BackImage />
    </div>
  );
};

export default Home;