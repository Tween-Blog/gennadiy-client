import { FC, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import { useAppDispatch } from '@/store/hook';
import { login } from '@/store/slices/authSlice';
import { loader } from '@/store/slices/loaderSlice';
import validateForm from '@/helpers/validateForm';
import AuthService from '@/services/AuthServices';

import { MainButton } from '@/uiCommon';
import { TextField } from '@/uiForm/TextField';
import { PasswordField } from '@/uiForm/PasswordField';

const SigninForm: FC = () => {
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
        } finally {
            dispatch(loader());
        }    
    };
    
    return (
        <form onSubmit={(e) => e.preventDefault()} noValidate >
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
};

export default SigninForm;