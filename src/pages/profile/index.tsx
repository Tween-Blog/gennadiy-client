// 1. Imports
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAppSelector } from 'core/store/hook';

import { Avatar } from '@/uiGlobal';


// 2. Component
const Profile = () => {
  // Variables
  const router = useRouter();

  const isAuth = useAppSelector(state => state.auth.isAuth),
        user = useAppSelector(state =>state.auth.user);

  useEffect(()  => {
    !isAuth ? router.push('/') : null
  }, [isAuth, router])

  // Return
  return (
    <div>
      <Avatar
        nick={user['nick']}
      />
    </div>
  );
}

// 3. Export
export default Profile;