import { FC, useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';

import { useAppDispatch } from '@/store/hook';
import { addPost } from '@/store/slices/updatePostSlice';
import { useCreatePost } from '@/helpers/hook/useCreatePost';
import { loader } from '@/store/slices/loaderSlice';
import { MainButton } from '@/uiCommon';
import style from '@/componentsStyle/formStyles/DownloadForm.module.scss';
import { setPostsCount } from '@/store/slices/authSlice';

const DownloadForm: FC<{idUser: string}> = ({idUser}) => {
    const dispatch = useAppDispatch();

    const  [selectedImage, setSelectedImage] = useState<any>(null);
    const  [selectedUrlImg, setSelectedUrlImg] = useState<string>('');
    const  [publicationValue, setPublicationValue] = useState<string>(''),
           [publicationTextValue, setPublicationTextValue] = useState<string>('');
      
    const publicationRef = useRef<HTMLTextAreaElement>(null);
    const publicationTextRef = useRef<HTMLTextAreaElement>(null);
    const publicationImageRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => { 
        if (publicationValue.length > 2 && publicationTextValue.length > 3 && selectedImage !== null) {
            dispatch(loader());
            setPublicationValue('');
            setPublicationTextValue('');
            setSelectedImage(false);
            publicationTextRef.current.style.height = '52px';
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const response = await useCreatePost(idUser, publicationValue, publicationTextValue, selectedImage); 
            dispatch(addPost(response.data));  
            dispatch(setPostsCount(1));
            dispatch(loader());
        } else {
            document.body.style.overflow = 'visible'
            Swal.fire({
                title: 'Пожалуйста заполните пост, для дальнейшей публикации!',
            })
            return;
        }
    };

    const handleChangeFile = async (e: { target: HTMLInputElement; currentTarget: { value: any; }; }) => {
        let file = (e.target as HTMLInputElement).files[0];
        let fileLength = ((e.target as HTMLInputElement).files.length); 
        e.currentTarget.value = null;
        if(fileLength > 0) setSelectedUrlImg(URL.createObjectURL(file));
        setSelectedImage(file);
    }
    
    return (
        <form onSubmit={(e) => e.preventDefault()} noValidate >
            <div className={style.download}>
                {!selectedImage  ?
                    <div className={style.download__image}
                        onClick={() => publicationImageRef.current.click()}
                    >
                        <div className={style.download__imageIcon}/>
                    </div>
                    :
                    <div className={`${style.download__image} ${style.download__image_select}`}>
                        <Image src={selectedUrlImg}
                            className={style.download__img}
                            alt="postImage"
                            layout="fill"
                            priority
                        />
                        <div className={style.download__overlay}>
                            <div 
                                className={`${style.download__imageIcon} ${style.download__imageIcon_select}`}
                                onClick={() => publicationImageRef.current.click()}
                            />
                        </div>           
                    </div>
                }
                <input ref={publicationImageRef} 
                    type="file"
                    accept="image/*,.png,.jpg,.web"
                    onChange={handleChangeFile}
                    hidden
                />
            
                <div className={style.download__content}>   
                     <textarea ref={publicationRef}
                        placeholder="Название публикации"
                        className="downloadInput downloadInput_title downloadInput_standart"
                        value={publicationValue}
                        onChange={e => setPublicationValue(e.target.value)}
                        rows={1}
                        maxLength={51}
                    /> 
                    <textarea ref={publicationTextRef}
                        className="downloadInput downloadInput_standart"
                        placeholder="О чем расскажите нам сегодня?"
                        value={publicationTextValue}
                        onChange={e => setPublicationTextValue(e.target.value)}
                        rows={1}
                        onInput={(e) => {
                            publicationTextRef.current.style.height = 'auto';
                            const scrollHeight = (e.target as HTMLTextAreaElement).scrollHeight;
                            publicationTextRef.current.style.height = `${scrollHeight}px`;
                        }}
                    /> 
                </div>
            </div>
            <div>
                <MainButton
                    type="submit"
                    text={'Опубликовать'}
                    otherClass="profileBtn profileBtn_right"
                    onClick={handleSubmit}
                /> 
            </div>
        </form>
    )
};

export default DownloadForm;