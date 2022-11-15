import { FC } from 'react';
import Image from 'next/image';

import { IBackImage } from 'interfaces/IUi';
import styles from '@componentsStyle/BackImage.module.scss';

const BackImage: FC<IBackImage> = ({ 
    variety = 'homeStar', 
    path = 'star.png' 
}) => {
    return (
        <div className={styles[variety]}>
            <Image src={'/section/' + path}
                blurDataURL={'/section/' + path}
                alt="icon"
                layout="fill"
                priority
            />
        </div>
    )
}

export { BackImage };