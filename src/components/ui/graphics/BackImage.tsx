// 1. Imports
import { FC } from 'react';
import Image from 'next/image';

import { IBackImage } from 'interfaces/IUi';
import styles from 'styles/module/components/BackImage.module.scss';

// 2. Component
const BackImage: FC<IBackImage> = ({ 
    variety = 'homeStar', 
    path = 'star.png' 
}) => {
    return (
        <div className={styles[variety]}>
            <Image 
                src={'/section/' + path}
                alt="icon"
                layout="fill"
                priority
            />
        </div>
    )
}

// 3. Export
export { BackImage };