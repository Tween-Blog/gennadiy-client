// OptionsTField
interface IFieldType {
    [key: string]: {
        type: string;
        placeholder: string; 
        name: string;
    }
}

export const optionsTField:IFieldType = {
    text: {
        type: 'text',
        placeholder: 'Ник', 
        name: 'nick',
    },
    password: {
        type: 'password',
        placeholder: 'Пароль', 
        name: 'password',
    },
    email: {
        type: 'email',
        placeholder: 'Email', 
        name: 'email ',
    }
};

