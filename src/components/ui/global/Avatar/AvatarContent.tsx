// 1. Imports
import { FC, useState, useRef, RefAttributes } from 'react';
import {useAppDispatch, useAppSelector } from '@/store/hook';

import AvatarLink from '@/uiGlobal/Avatar/AvatarLink';
import EditContent from '@/uiGlobal/Avatar/EditContent';

import styles from '@/componentsStyle/avatarStyles/AvatarContent.module.scss';

// 2. Type
type ContentProps = {
    id?: string;
    nick: string;
    description?: string;  
    isLink?: boolean; 
    editContent?: boolean; 
};

// 3. Component
const AvatarContent:FC <ContentProps>= ({ id, nick, description, isLink, editContent }) => {

    const [isHoveringNick, setIsHoveringNick] = useState<boolean>(false),
          [isHoveringDesc, setIsHoveringDesc] = useState<boolean>(false);

    const [editNick, setEditNick] = useState<string>(nick),
          [editDescription, setEditDescription] = useState<string>(description);

    const isEditNick = useAppSelector(state => state.editContent.isEditNick),
          isEditDescription = useAppSelector(state => state.editContent.isEditDescription);
       
// Return         
    return (
        <div className={styles.avatar__content}>
            <div 
                className={styles.nick}
                onMouseOver={() => setIsHoveringNick(true)} 
                onMouseOut={ isEditNick ? () => setIsHoveringDesc(false) : () => setIsHoveringNick(false)} 
                onClick={() => setIsHoveringDesc(false)}
            >
               
                <h2 
                    className={styles.nick__value}
                    contentEditable={isEditNick? true : false}
                    suppressContentEditableWarning={true}
                    onInput={ (e) => {
                        nick = (e.target as HTMLElement ).innerText
                        setEditNick(nick)
                    }}
                >
                    {nick}   
                </h2> 

                {isHoveringNick && (
                    editContent ? 
                        <EditContent id={id} activeNick editNick={editNick}  modeEdit={isEditNick} 
                        /> : null
                )}

            </div>

            <div 
                className={styles.description}
                onMouseOver={() => setIsHoveringDesc(true)} 
                onMouseOut={ isEditDescription ? () => setIsHoveringNick(false) : () => setIsHoveringDesc(false) } 
                onClick={() => setIsHoveringNick(false)}
            >
                
                <h2 
                    className={styles.description__value}
                    contentEditable={isEditDescription? true : false}
                    suppressContentEditableWarning={true}
                    onInput={ (e) => {
                        description = (e.target as HTMLElement ).innerText
                        setEditDescription(description)
                    }}
                >
                    {description}
                </h2> 

                {isHoveringDesc && (
                    editContent ? 
                        <EditContent id={id} activeDesc editDescription={editDescription} 
                         modeEdit={isEditDescription} /> 
                        : null
                )}

            </div>
            
            {isLink ? <AvatarLink id={id} /> : null}
        </div>           
    )
}

// 4. Export
export default AvatarContent;