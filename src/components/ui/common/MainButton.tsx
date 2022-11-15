import { FC } from 'react';

import { IButton } from 'interfaces/IUi';
import styles from '../../../styles/module/components/MainButton.module.scss';

const MainButton: FC<IButton> = ( { 
    type = 'submit', 
    text, 
    otherClass='mainBtn', 
    ...buttonProps 
} ) => {
    return (
        <button type={type}
            className={`${styles.mainButton} ${otherClass}`}
            {...buttonProps}
        >
            {text}
        </button>
    )
};

export { MainButton };