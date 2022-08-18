// 1. Imports
import { FC } from 'react';

import { useAppSelector } from 'core/hook';
import { IUser } from 'interfaces/IAuthService';

// import { IButton } from 'interfaces/IUi';
// import styles from '@/componentsStyle/MainButton.module.scss'

type AvatarProps = {
    nick?: string;
};

// 2. Component
const Avatar:FC <AvatarProps>= ({nick}) => {
    return (
        <div>
            {nick}
        </div>
    )
}

// 3. Export
export { Avatar };