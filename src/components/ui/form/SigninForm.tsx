// 1. Imports
import { FC, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import { useAppDispatch } from 'core/store/hook';
import { login } from 'core/store/slices/authSlice';
import { loader } from 'core/store/slices/loaderSlice';
import validateForm from '@/helpers/validateForm';
import AuthService from '@/services/AuthServices';

import { MainButton }  from '@/uiGlobal/global';
import { TextField } from '@/uiForm/TextField';
import { PasswordField } from '@/uiForm/PasswordField';

// 2. Component
const SigninForm: FC = ( {} ) => {
    // Variebles
    const router = useRouter();
    const dispatch = useAppDispatch();
   
    const  [passwordValue, setPasswordValue] = useState<string>(''),
           [emailValue, setEmailValue] = useState<string>('');

    const inputPasswordRef = useRef<HTMLInputElement>(null),
          inputEmailRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {      
        try {
            dispatch(loader());
            
            const validateResult = validateForm([inputEmailRef, inputPasswordRef], {
                validatePassword: false,
            });

            if(validateResult) {
                const response = await AuthService.login({
                    email: emailValue,
                    password: passwordValue,
                });   
                if(!response.data.error) {
                    localStorage.accessToken = response.data.accessToken;
                    dispatch(login(response.data.user));
                    router.push('/profile'); 
                } else {
                    Swal.fire(response.data.message);
                    return;
                };
            };
        } 
        catch (e) {
            console.error(e.response.data);
        }
        finally {
            dispatch(loader());
        }    
    }
    
    // Return
    return (
        <form
            onSubmit={(e) => e.preventDefault()} 
            noValidate
        >
            <TextField
                variety="email"
                value={emailValue}
                otherClass="formInput"
                onChange={e => setEmailValue(e.target.value)}
                ref={inputEmailRef}
            />
            <PasswordField 
                value={passwordValue}
                otherClass="formInput"
                onChange={e => setPasswordValue(e.target.value)}
                ref={inputPasswordRef}
            />
            <MainButton
                type="submit"
                text={'Войти'}
                otherClass="signinBtn"
                onClick={() => handleSubmit()}
            /> 
        </form>
    )
}

// 3. Export
export default SigninForm;