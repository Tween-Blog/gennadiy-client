import { FC } from 'react';
import Link from 'next/link';
import styles from '../../../../styles/module/components/avatarStyles/AvatarLink.module.scss';

type LinkProps = { id: string };

const AvatarLink:FC <LinkProps> = ({ id }) => {       
    return (       
        <div className={styles.link}>
            <Link href={`/users/${id}`}>
                <a className={styles.linkUser}>
                    Перейти в профиль 
                </a>
            </Link>  
        </div>         
    )
};

export default AvatarLink;