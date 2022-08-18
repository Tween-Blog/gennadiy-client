import styles from '@/componentsStyle/Loader.module.scss';

const Loader = () => {
    return (
        <div>
            <div className={styles.overlay}></div>
            <div className={styles.wrapper}>
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