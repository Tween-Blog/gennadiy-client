// 1. Imports
import { FC, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { useAppDispatch } from 'core/store/hook';
import { loader } from 'core/store/slices/loaderSlice';

import validateForm from '@/helpers/validateForm';
import AuthService from '@/services/AuthServices';

import { MainButton } from '@/uiGlobal';
import { TextField } from './TextField';
import { PasswordField } from './PasswordField';

import styles from '@/componentsStyle/formStyles/SignupForm.module.scss';

// 2. Component
const SignupForm: FC = ( {} ) => {
    // Сonstants
    const router = useRouter();
    const dispatch = useAppDispatch();

    const  [nickValue, setNickValue] = useState<string>(''),
           [passwordValue, setPasswordValue] = useState<string>(''),
           [emailValue, setEmailValue] = useState<string>('');

    const inputNickRef = useRef<HTMLInputElement>(null),
          inputPasswordRef = useRef<HTMLInputElement>(null),
          inputEmailRef = useRef<HTMLInputElement>(null);
    
    const handleSubmit = async () => {      
        try {
            dispatch(loader());

            const validateResult = validateForm([inputNickRef, inputEmailRef, inputPasswordRef], {
                validatePassword: true,
            });

            if(validateResult) {
                const response = await AuthService.registration({
                    nick: nickValue,
                    email: emailValue,
                    password: passwordValue,
                });
                if(!response.data.error) {
                    localStorage.checkRegistration = 'true';
                    router.push('/signin');
                } else {
                    Swal.fire({
                        title: response.data.message,
                        heightAuto: false
                    })
                };
            };
        } 
        catch (e) {
            console.error(e.response.data);
        }
        finally {
            dispatch(loader());
        };    
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
                otherClass="formInput"
                onChange={e => setNickValue(e.target.value)}
                ref={inputNickRef}
            />
            <PasswordField 
                value={passwordValue}
                otherClass="formInput inputPass"
                onChange={e => setPasswordValue(e.target.value)}
                ref={inputPasswordRef}
            />
            <TextField
                variety="email"
                value={emailValue}
                otherClass="formInput inputMail"
                onChange={e => setEmailValue(e.target.value)}
                ref={inputEmailRef}
            />
            <p className={styles.infovalidation}>
                Ваш пароль должен включать минимум: 6 символов, маленькую и заглавную буквы, 
                цифру и один специальный символ
            </p> 
            <MainButton
                type="submit"
                text={'Зарегистрироваться'}
                otherClass="signupBtn"
                onClick={() => handleSubmit()}
            /> 
        </form>
    )
}

// 3. Export
export default SignupForm;