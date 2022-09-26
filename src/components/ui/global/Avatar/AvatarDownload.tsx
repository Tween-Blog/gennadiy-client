// 1. Imports
import { FC, useRef } from 'react';

import UsersServices from '@/services/UsersServices';
import { useAppDispatch } from '@/store/hook';
import { login } from '@/store/slices/authSlice';
import { loader } from '@/store/slices/loaderSlice';

import styles from '@/componentsStyle/avatarStyles/Avatar.module.scss';

// 2. Type
type LinkProps = {
    id: string;  
};

// 2. Component
const AvatarDownload:FC <LinkProps> = ({id}) => { 
    const dispatch = useAppDispatch();

    const inputFileRef = useRef(null);

    const handleChangeFile = async (event: any) => {
        dispatch(loader());
        try { 
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('_id', id);
            formData.append('avatar', file);

            const response = await UsersServices.userData(formData); 
            if(!response.data.error) { 
                dispatch(login(response.data));
            }   

        } catch (err) {
            console.warn(err);
        } finally {
            dispatch(loader());
        }

    } 

    return (       
        <div className={styles.avatar__overlay}>

            <a 
                href="#" 
                className={styles.avatar__download}
                onClick={() => inputFileRef.current.click()}
            ></a>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />

        </div>      
    )
}

// 3. Export
export default AvatarDownload;