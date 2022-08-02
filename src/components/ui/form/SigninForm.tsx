// 1. Imports
import React , { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import { useAppDispatch, useAppSelector } from 'core/hook';
import { login } from 'core/slices/authSlice';
import validateForm from 'core/helpers/validateForm';
import AuthService from 'core/services/AuthServices';

import { MainButton } from 'components/ui/common';
import { TextField } from './TextField';
import { PasswordField } from './PasswordField';

// 2. Component
const SigninForm: React.FC = ( {} ) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const us = useAppSelector(state => state.auth)

    const  [passwordValue, setPasswordValue] = useState<string>(''),
           [emailValue, setEmailValue] = useState<string>('');

    const inputPasswordRef = useRef<HTMLInputElement>(null),
          inputEmailRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {      
        try {
            const validateResult = validateForm([inputEmailRef, inputPasswordRef], {
                validatePassword: true
            });

            if(validateResult) {
                const response = await AuthService.login({
                    email: emailValue,
                    password: passwordValue,
                });   
                if(response.data.error) {
                    Swal.fire(response.data.message);
                    return;
                }  
                localStorage.accessToken = response.data.accessToken;
                dispatch(login(response.data.user));
                router.push('/profile'); 
            }
        } catch (e) {
            console.error(e.response.data);
        }    
    }
    // Return
    return (
        <form
            onSubmit={(e) => e.preventDefault()} 
            noValidate
        >
            <TextField
                varietyTField="email"
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                ref={inputEmailRef}
            />
            <PasswordField 
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                ref={inputPasswordRef}
            />
            <MainButton
                text={'Войти'}
                onClick={() => handleSubmit()}
            /> 
        </form>
    )
}

// 3. Export
export { SigninForm };