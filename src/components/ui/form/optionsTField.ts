// OptionsTField
type FieldType = {
    [key: string]: {
        type: string;
        placeholder: string; 
        name: string;
    }
}

export const optionsTField: FieldType = {
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
    },
    publicationTitle: {
        type: 'text',
        placeholder: 'Название публикации', 
        name: 'publication',
    }
};

