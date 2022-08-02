// 1. Imports
import { MutableRefObject } from 'react';

import Swal from 'sweetalert2';

// 2. Types
type ValidateOptionsType = {
    validateEmptyFields?: boolean,
    validateEmail?: boolean,
    validatePassword?: boolean
}

// 3. Functions
const validateForm = (inputs: MutableRefObject<HTMLInputElement>[], validateOptions?: ValidateOptionsType) => {
    // Default options values
    // let isValidateEmptyFields: boolean = true,
        let isValidateEmail: boolean = true, 
        isValidatePassword: boolean = false;

    const swalOptions = {
        icon: 'error',
        heightAuto: false
    }
    
    // Check on validate options in arguments
    if(validateOptions) {
        // const validateEmptyFields = validateOptions.validateEmptyFields;
        // if(validateEmptyFields !== undefined) isValidateEmptyFields = validateEmptyFields;

        const validateEmail = validateOptions.validateEmail;
        if(validateEmail !== undefined) isValidateEmail = validateEmail;

        const validatePassword = validateOptions.validatePassword;
        if(validatePassword !== undefined) isValidatePassword = validatePassword;
    }

    // Regex
    const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordRegex: RegExp = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,}$/g;

    // Remove Wrong Class for all inputs
    inputs.forEach((input: MutableRefObject<HTMLInputElement>) => input.current.classList.remove('wrong'));

    // Validate Result
    let validateResult: boolean = true;
    
    // Validate
    for(let i = 0; i < inputs.length; i++) {
        // Input Data
        const input: HTMLInputElement = inputs[i].current;
        const inputValue:string = input.value;
        const inputType: string = input.getAttribute('type');
        const isRequired: boolean = input.getAttribute('required') !== null;

        // Voids
        const passwordIncorrect = (): void => {
            input.classList.add('wrong');
            Swal.fire({
                title: 'Пароль некорректный!',
                text: 'Попробуйте ещё раз, нажав на кнопку OK.',
                icon: 'error',
                heightAuto: false
            });
            validateResult = false;
        }
         
        // Validate empty fields
        if( isRequired && inputValue === '') {
            input.classList.add('wrong');
            Swal.fire({
                title: 'Заполните все поля ввода!',
                text: 'Попробуйте ещё раз, нажав на кнопку OK.',
                icon: 'error',
                heightAuto: false
            });
            validateResult = false;
            break;
        }

        // Validate email
        if(isValidateEmail && inputType === 'email' && !emailRegex.test(inputValue)) {
            input.classList.add('wrong');
            Swal.fire({
                title: 'E-Mail некорректный!',
                text: 'Попробуйте ещё раз, нажав на кнопку OK.',
                icon: 'error',
                heightAuto: false
            });
            validateResult = false;
            break;
        }

        // Validate password
        if(isValidatePassword && inputType === 'password' && !passwordRegex.test(inputValue)) {
            passwordIncorrect();
            break;
        }

        if(isValidatePassword && inputType === 'password-show' && !passwordRegex.test(inputValue)) {
            passwordIncorrect();
            break;
        }
    }

    return validateResult;
};

// 4. Export
export default validateForm;