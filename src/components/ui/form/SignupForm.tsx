// 1. Imports
import React , { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import validateForm from 'core/helpers/validateForm';
import AuthService from 'core/services/AuthServices';

import { MainButton } from 'components/ui/common';
import { TextField } from './TextField';

import styles from 'styles/module/components/formStyles/SignupForm.module.scss';

// 2. Component
const SignupForm: React.FC = ( {} ) => {
    // Сonstants
    const router = useRouter();

    const  [nickValue, setNickValue] = useState<string>(''),
           [passwordValue, setPasswordValue] = useState<string>(''),
           [emailValue, setEmailValue] = useState<string>('');

    const inputNickRef = useRef<HTMLInputElement>(null),
          inputPasswordRef = useRef<HTMLInputElement>(null),
          inputEmailRef = useRef<HTMLInputElement>(null);
    
    const handleSubmit = async () => {      
        try {
            const validateResult = validateForm([inputNickRef, inputEmailRef, inputPasswordRef], {
                validatePassword: true
            });

            if(validateResult) {
                const response = await AuthService.registration({
                    nick: nickValue,
                    email: emailValue,
                    password: passwordValue,
                }); 
                localStorage.checkRegistration = 'true';
                router.push('/signin');      
                // console.log(response);
            }
        } catch (e) {
            console.error(e.response.data);
        }    
    }
    // Return
    return (
        <form
            className={styles.signup}
            onSubmit={(e) => e.preventDefault()} 
            noValidate
        >
            <TextField
                className={styles.nickInput}
                value={nickValue}
                onChange={e => setNickValue(e.target.value)}
                ref={inputNickRef}
            />
            <TextField
                varietyTField="password"
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                ref={inputPasswordRef}
            />
            <TextField
                varietyTField="email"
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                ref={inputEmailRef}
            />
            <p className={styles.infovalidation}>
                Ваш пароль должен включать минимум: 6 символов, маленькую и заглавную буквы, 
                цифру и один специальный символ
            </p> 
            <MainButton
                text={'Зарегистрироваться'}
                onClick={() => handleSubmit()}
            /> 
        </form>
    )
}

// 3. Export
export { SignupForm };