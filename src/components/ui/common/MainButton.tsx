// 1. Imports
import { FC } from 'react';

import { IButton } from 'interfaces/IUi';
import styles from '@/componentsStyle/MainButton.module.scss'

// 2. Component
const MainButton: FC<IButton> = ( { 
    type = 'submit', 
    text, 
    otherClass='mainBtn', 
    ...buttonProps 
} ) => {
    return (
        <button 
            type={type}
            className={`${styles.mainButton} ${otherClass}`}
            {...buttonProps}
        >
            {text}
        </button>
    )
}

// 3. Export
export { MainButton };