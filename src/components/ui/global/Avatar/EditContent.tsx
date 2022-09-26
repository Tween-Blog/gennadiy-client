// 1. Imports
import { FC } from 'react';

import UsersServices from '@/services/UsersServices';
import { login } from '@/store/slices/authSlice';
import { useAppDispatch } from '@/store/hook';
// import { editContentSlice } from '@/store/slices/editContentSlice';
import { makeEditNick, makeEditDescription } from '@/store/slices/editContentSlice';

import styles from '@/componentsStyle/avatarStyles/AvatarContent.module.scss';

// 2. Type
interface EditProps {
    id: string; 
    activeNick?: boolean; 
    activeDesc?: boolean; 
    editNick?: any;
    editDescription?: string | undefined;
    modeEdit?: boolean;
};

const EditContent:FC <EditProps> = ({
    id,
    activeNick,
    activeDesc, 
    editNick,
    editDescription,
    modeEdit,
}) => {

    const dispatch = useAppDispatch();

    const handleChangeFile = async (editData: string) => {
        
        if (activeNick) {
            if (editData.length < 2) {
                alert('Имя должно состоять из 2 или более символов');
                return;
            }
            dispatch(makeEditNick());
            if (modeEdit) {
                try {
                    const formData = new FormData();
                    formData.append('_id', id);
                    formData.append('nick', editData);
                    const response = await UsersServices.userData(formData);

                    if(!response.data.error) { 
                        dispatch(login(response.data));
                    } 
                } catch (err) {
                    console.warn(err);
                }
            }
        } else if (activeDesc) {
            dispatch(makeEditDescription());
            try {
                const formData = new FormData();
                formData.append('_id', id);
                formData.append('description', editData);
                const response = await UsersServices.userData(formData);

                if(!response.data.error) { 
                    dispatch(login(response.data));
                } 
            } catch (err) {
                console.warn(err);
            }
        }
    } 
    
    return (
        <div 
            className={ !modeEdit ? styles.edit__overlay : styles.edit__overlay_active}
            onClick={activeNick ? () => handleChangeFile(editNick) : () => handleChangeFile(editDescription)}
        />  
    )
}

// // 3. Export
export default EditContent;