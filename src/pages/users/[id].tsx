import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from 'core/store/hook';
import UserService from '@/services/UsersServices';
import PostServices from '@/services/PostServices';

import { useCheckSubsribe } from '@/helpers/hook/useCheckSubscribe';
import { useCreateSubscribe } from '@/helpers/hook/useCreateSubscribe';
import { useCreateUnsubscribe } from '@/helpers/hook/useCreateUnsubscribe';
import { Avatar,  PostsGenerich,  UserStatistics } from '@/uiGlobal/Post';
import { MainButton } from '@/uiCommon';

import { IUser } from 'interfaces/IAuthService';
import { IPost } from 'interfaces/IPosts';
import style from '@/pagesStyle/Profile.module.scss';

const User = () => {
  const [subscribe, setSubscribe] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({});
  const [posts, setPosts] = useState<IPost[]>([]);

  const router = useRouter();
  const id:string = router.asPath.slice(7).split('?')[0];
  const currUser: IUser = useAppSelector(state => state.auth.user);

  const getUser = async () => {   
    try {
        const user = await UserService.user(id);
        setUser(user.data); 
    } catch (e) {
        console.error(e.response);
    } 
  };

  const getPosts = async () => {   
    try {
        const response = await PostServices.userPosts(id);
        setPosts(response.data);
    } catch (e) {
        console.error(e.response);
    } 
  };

  const checkSubscribe = async () => {   
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const response = await useCheckSubsribe(currUser.id, id);
      setSubscribe(response.data.isSubscribe)
    } catch (e) {
        console.error(e.response);
    } 
  };

  useEffect(()  => {
      getUser();
      getPosts();
      checkSubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleSubscribe = async () => {
    if(!subscribe){
      user.subscribersCount += 1;
      setSubscribe(!subscribe);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const response = await useCreateSubscribe(currUser.id, id);
    } else if (subscribe) {
      user.subscribersCount -= 1;
      setSubscribe(!subscribe);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const response = await useCreateUnsubscribe(currUser.id, id);
    }
  }

  return (
    <div>
      <div className={style.profile__block}>
        <div className={style.profile__section}>
          <Avatar user={user} />
          <UserStatistics user={user} />
        </div>
        <MainButton
            type="submit"
            text={subscribe ? 'Отписаться' : 'Подписаться'}
            otherClass="profileBtn"
            onClick={handleSubscribe}
        />
      </div>
      <div className={style.profile__posts}>
        <PostsGenerich posts={posts} />
      </div>
    </div>
  );
};

export default User;