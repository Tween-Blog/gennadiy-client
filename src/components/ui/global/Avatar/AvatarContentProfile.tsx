import { FC, useState, useRef } from 'react';
import Swal from 'sweetalert2';
import { useOutsideClick } from '@/helpers/hookAvatar/useOutsideClick';
import { useAppDispatch } from '@/store/hook';
import UsersServices from '@/services/UsersServices';
import { login } from '@/store/slices/authSlice';

import { ContentProps } from 'interfaces/IAvatar';
import styles from '@/componentsStyle/avatarStyles/AvatarContent.module.scss';

const AvatarContentProfile:FC<ContentProps> = ({ id, nick, description }) => {
    const dispatch = useAppDispatch();
    const nickRef = useRef<HTMLDivElement>(null),
    descriptionRef = useRef<HTMLDivElement>(null),
    editDescriptionRef = useRef<HTMLDivElement>(null),
    editNickRef = useRef<HTMLDivElement>(null);

    const [openedNick, setOpenedNick] = useState<boolean>(false),
          [openedDesc, setOpenedDesc] = useState<boolean>(false);

    const [editNick, setEditNick] = useState<string>(nick),
          [editDescription, setEditDescription] = useState<string>(description);
        
    const resetEdit = ( resValue:string ) => {
        if (resValue === 'typeNick') {
            editNickRef.current.textContent = editNick;
            setEditNick(nick);
            setOpenedNick(false);
        } else if (resValue === 'typeDesc') {
            editDescriptionRef.current.textContent = editDescription;
            setEditDescription(description);
            setOpenedDesc(false);
        }
    };

    useOutsideClick (nickRef, editNickRef, openedNick, resetEdit);
    useOutsideClick (descriptionRef, editDescriptionRef, openedDesc, resetEdit);
     
    const handleChangeText = async (e: { target: any; }) => {
        const nickClick:boolean = nickRef.current.contains(e.target),
              descClick:boolean = descriptionRef.current.contains(e.target);

        const textNick:string = editNickRef.current.textContent,
              textDesc:string = editDescriptionRef.current.textContent;
   
        if (!descClick) setOpenedNick(!openedNick);
        if (!nickClick) setOpenedDesc(!openedDesc);

        if (nickClick && openedNick) {
            if (textNick.length < 3) {
                editNickRef.current.textContent = nick;  
                Swal.fire({
                    title: 'Имя должно состоять из 3 или более символов!',
                    heightAuto: false
                })
                return;
            }
            try {
                const formData = new FormData();
                formData.append('_id', id);
                formData.append('nick', textNick);
                const response = await UsersServices.userData(formData);
                if (!response.data.error) dispatch(login(response.data));
            } catch {
                // Error request for the test
            } 
        } else if (descClick && openedDesc) {
            try {
                const formData = new FormData();
                formData.append('_id', id);
                formData.append('description', textDesc);
                const response = await UsersServices.userData(formData);
                if(!response.data.error) dispatch(login(response.data));
            } catch {
                // Error request for the test
            }
        }
    };

    return (
        <div className={styles.avatar__content}>
            <div className={styles.nick}>    
                <h2 ref={editNickRef}
                    data-type={'typeNick'}
                    className={styles.nick__value}
                    contentEditable={openedNick? true : false}
                    suppressContentEditableWarning={true}
                >
                    {editNick}    
                </h2>     
                <div ref={nickRef}
                    onClick={handleChangeText}  
                    className={!openedNick ? styles.edit : styles.edit_active}
                />     
            </div>

            <div className={styles.description}>    
                <h2 ref={editDescriptionRef}
                    data-type={'typeDesc'}
                    className={styles.description__value}
                    contentEditable={openedDesc? true : false}
                    suppressContentEditableWarning={true}
                >
                    {editDescription}   
                </h2>    
                <div ref={descriptionRef}
                     onClick={handleChangeText}  
                     className={!openedDesc ? styles.edit : styles.edit_active}
                />
            </div>
        </div>           
    )
};

export default AvatarContentProfile;