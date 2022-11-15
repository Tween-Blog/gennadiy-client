import { FC, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';

import UsersServices from '@/services/UsersServices';
import { login } from '@/store/slices/authSlice';
import { makeEditNick, makeEditDescription } from '@/store/slices/editContentSlice';
import { EditProps } from 'interfaces/IAvatar';
import styles from '@/componentsStyle/avatarStyles/AvatarContent.module.scss';

const EditContent:FC <EditProps> = ({
    id,
    activeNick,
    activeDesc, 
    editNick,
    editDescription,
    modeEdit,
}) => {
    const dispatch = useAppDispatch();
    const editContentRef = useRef<HTMLDivElement>(null);
    
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
    };
    
 
    return (
        <div 
            ref={editContentRef}
            className={ !modeEdit ? styles.edit__overlay : styles.edit__overlay_active}
            onClick={activeNick ? 
                () => handleChangeFile(editNick) : activeDesc ? 
                () => handleChangeFile(editDescription) : null
            }
        />  
    )
};

export default EditContent;