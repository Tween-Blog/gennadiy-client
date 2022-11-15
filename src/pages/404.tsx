import { BackImage } from '@/uiGraphics';
import styles from 'styles/module/pages/404.module.scss';

const Error: React.FC = () => {
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
            <BackImage variety={'errorStar'} />
            <BackImage variety={'errorGear'} path={'gear.svg'} />
        </div>
    )
}; 

export default Error;