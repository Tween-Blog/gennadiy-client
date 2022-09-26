// 1. Imports
import { FC } from 'react';
import Link from 'next/link';

import styles from '@/componentsStyle/avatarStyles/AvatarLink.module.scss';

// 2. Type
type LinkProps = {
    id: string;  
};

// 3. Component
const AvatarLink:FC <LinkProps> = ({ id }) => {

// Return         
    return (       
        <div className={styles.link}>
            <Link href={`/users/${id}`}>
                <a className={styles.linkUser}>
                    Перейти в профиль 
                </a>
            </Link>  
        </div>
              
    )
}

// 4. Export
export default AvatarLink;