import { forwardRef } from 'react';

import { optionsTField } from '@/uiForm/optionsTField';
import { IFieldProps } from 'interfaces/IUi';

import styles from '@/componentsStyle/formStyles/TextField.module.scss';

const TextField = forwardRef<HTMLInputElement, IFieldProps>(
    ({  
        variety = 'text',
        otherClass = '',
        ...inputProps 
    }, ref) => (    
        <input 
            {...optionsTField[variety]}
            {...inputProps}
            className={`${styles.textfield} ${otherClass}`}
            ref={ref}
            required
        />
    )
);

TextField.displayName = 'TextField';
export { TextField };