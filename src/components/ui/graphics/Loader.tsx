import { FC } from 'react';
import { useAppSelector } from '@/store/hook';
import styles from '../../../styles/module/components/Loader.module.scss';

const Loader: FC = () => {
    const isLoading = useAppSelector(state => state.loader.isLoading);
    const loading = useAppSelector(state => state.updatePost.loading);

    return (
        <div>
            <div className={
                `${styles.overlay} ${isLoading || loading  ? styles.showLoader : ''}`
            } 
        />
            <div className={
                    `${styles.wrapper} ${isLoading || loading  ? styles.showLoader : ''}`
                }
            >
                <div className={styles.roller}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export { Loader };