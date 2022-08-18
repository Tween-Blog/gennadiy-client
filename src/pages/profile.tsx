// 1. Imports
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAppSelector } from 'core/hook';

// 2. Component
const Profile = () => {
  // Variables
  const router = useRouter();
  const isAuth = useAppSelector(state => state.auth.isAuth);

  useEffect(()  => {
    !isAuth ? router.push('/') : null
  }, [isAuth, router])

  // Return
  return (
    <div>
        Profile
    </div>
  );
}

// 3. Export
export default Profile;