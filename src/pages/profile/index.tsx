// 1. Imports
import { useAppSelector } from '@/store/hook';

import { Avatar, UserStatistics, DownloadingPublications } from '@/uiGlobal';
import { IUser } from 'interfaces/IAuthService';

import style from '@/pagesStyle/Profile.module.scss';

// 2. Component
const Profile = () => {
  // Variables

  const user:IUser = useAppSelector(state =>state.auth.user);
    
// Return
  return (
    <div>

      <div className={style.profile__section}>
        <Avatar
          user={user}
          isDownload
          editContent
        />

        <UserStatistics 
          user={user}
        />
      </div>

      <DownloadingPublications />
      
    </div>
  );
}

// 3. Export
export default Profile;