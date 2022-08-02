// 1. Imports 
import React from 'react';
import { optionsTField } from 'components/ui/form/optionsTField';

import styles from 'styles/module/components/formStyles/TextField.module.scss';

// 2. Types
interface FieldProps extends React.ComponentPropsWithoutRef<'input'> {
    varietyTField?: string;
}

const TextField = React.forwardRef<HTMLInputElement, FieldProps>(
    ({  varietyTField = 'text', ...inputProps }, ref) => ( 
        <input 
            {...optionsTField[varietyTField]}
            {...inputProps}
            className={styles.textfield}
            ref={ref}
            required
        />
    )
);

// 3. Export
TextField.displayName = 'TextField';

export { TextField };