import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import PostServices from '@/services/PostServices';
import { userPosts } from '@/store/slices/updatePostSlice';

import { IUser } from 'interfaces/IAuthService';
import { Avatar, PostsProfile, UserStatistics } from '@/uiGlobal/Post';
import DownloadForm from '@/uiForm/DownloadForm';

import { IPost } from 'interfaces/IPosts';
import style from '@/pagesStyle/Profile.module.scss';
import Swal from 'sweetalert2';

const Profile = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.auth.isAuth);
  const user:IUser = useAppSelector(state =>state.auth.user);
  const idUser:string = user.id;

const getPosts = async () => {   
    try {
        const response = await PostServices.userPosts(idUser);
        dispatch(userPosts(response.data));
    } catch {
       // Error request for the test
    } 
};

useEffect(()  => {
    if(isAuth && user && !user.isActivated) {
      Swal.fire({
        title: 'Ваш аккаунт не активирован!',
        icon: 'warning'
      });
    }

    getPosts();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []); 

  return (
    <div>
      <div className={style.profile__section}>
        <Avatar
          user={user}
          isDownload
          editContent
        />
        <UserStatistics user={user} />
      </div>

      <div className={style.profile__download}>
        <DownloadForm idUser={idUser} />
      </div>
      
      <PostsProfile />
    </div>
  );
};

export default Profile;