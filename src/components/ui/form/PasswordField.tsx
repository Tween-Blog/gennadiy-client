// 1. Imports 
import React from 'react';
import Image from 'next/image';
import { useState} from 'react';
// import { EyeTF } from './EyeTF';


import styles from 'styles/module/components/formStyles/TextField.module.scss';

// 2. Types
interface FieldProps extends React.ComponentPropsWithoutRef<'input'> {}
  
// 3. Component
const PasswordField = React.forwardRef<HTMLInputElement, FieldProps>(
    ({...inputProps }, ref) => { 
        const [visible, setVisiblity] = useState<boolean>(false);
        const inputType = visible ? 'text' : 'password';
        // Return
        return (
            <div className={styles.inputWrapper}>
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
                        src={visible ? '/textField/eyeOpen.svg' : '/textField/eyeClosed.svg'}
                        onClick={() => setVisiblity(!visible)}
                        alt="eye"
                    />
                </div>
            </div>   
        )
    }
);

// 4. Export
PasswordField.displayName = 'PasswordField';

export { PasswordField };