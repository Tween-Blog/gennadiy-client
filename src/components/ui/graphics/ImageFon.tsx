// 1. Imports
import { FC } from 'react';
import Image from 'next/image';

import styles from '@/componentsStyle/ImageFon.module.scss';

//2. Types
interface ImageFonProps {
    varietyStar?: string;
    srcImage?: string;
}

// 3. Component
const ImageFon: FC<ImageFonProps> = ({ 
    varietyStar = 'homeStar', 
    srcImage = 'star.png' 
}) => {
    return (
        <div className={styles[varietyStar]}>
            <Image 
                src={'/section/' + srcImage}
                alt="icon"
                layout="fill"
                priority
            />
        </div>
    )
}

// 4. Export
export { ImageFon };