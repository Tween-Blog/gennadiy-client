// 1. Imports
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
import { ImageFon } from '@/uiGraphics';

import styles from 'styles/module/pages/404.module.scss';

// 2. Component
const Error: React.FC = () => {
    // const router = useRouter();

    // useEffect(() => {
    //     setTimeout(() => {
    //         router.push('/')
    //     }, 5000)
    // }, [router])

    // Return
    return (
        <div>
            <div className={styles.errorPage}>
                <span className={styles.title}>
                    404
                </span>
                <p className={styles.text}>
                    Ууупс, что-то пошло не так... 
                </p>     
            </div>
            <ImageFon
                varietyStar={'errorStar'} 
            />
            <ImageFon
                srcImage={'gear.svg'}
                varietyStar={'errorGear'} 
            />
        </div>
    )
}; 

// 3. Export
export default Error;