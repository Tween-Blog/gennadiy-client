// 1. Imports 
import Image from 'next/image';
import { forwardRef, useState } from 'react';

import { IFieldProps }  from 'interfaces/IUi';

import styles from '@/componentsStyle/formStyles/TextField.module.scss';
  
// 2. Component
const PasswordField = forwardRef<HTMLInputElement, IFieldProps>(
    ({ otherClass, ...inputProps }, ref) => { 
        
        const [isVisible, setIsVisible] = useState<boolean>(false);
        const inputType = isVisible ? 'text' : 'password';

        // Return
        return (
            <div className={`${styles.inputWrapper} ${otherClass}`}>
                <input 
                    type={inputType}
                    {...inputProps}
                    placeholder= "Пароль" 
                    name= "password"
                    className={styles.textfield}
                    ref={ref}
                    required
                />
                <div className={styles.eye}>
                    <Image
                        layout="fill" 
                        src={isVisible ? '/textField/eyeOpen.svg' : '/textField/eyeClosed.svg'}
                        onClick={() => setIsVisible(!isVisible)}
                        alt="eye"
                    />
                </div>
            </div>   
        )
    }
);

// 3. Export
PasswordField.displayName = 'PasswordField';
export { PasswordField };