import { FC, useRef, useState } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { modeEditPost, cancelEdit, removePost, updatePost } from '@/store/slices/updatePostSlice';
import { setPostsCount } from '@/store/slices/authSlice';
import { loader } from '@/store/slices/loaderSlice';
import PostServices from '@/services/PostServices';
import { useUpdatePost } from '@/helpers/hook/useUpdatePost';
import Comments from '@/uiGlobal/PostData/Comments';

import { IPostProps } from 'interfaces/IPosts';
import style from '../../../../styles/module/components/profileStyles/Posts.module.scss'
import Swal from 'sweetalert2';

const Post:FC<IPostProps> = ({post}) => {
    const dispatch = useAppDispatch();
    const modeEdit = useAppSelector(state =>state.updatePost.modeEdit);
    const postHeightTitle = post.title.split(/\r\n|\r|\n/).length;
    const postHeightDesc = post.description.split(/\r\n|\r|\n/).length;
  
    let edit:boolean = false;
    if (modeEdit == post.id) edit = true;

    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState<string>('https://tween-api.herokuapp.com/posts/' + post.picture),
          [publicTitle, setPublicTitle] = useState<string>(post.title),
          [publicDesc, setPublicDesc] = useState<string>(post.description);

    const publicRef = useRef<HTMLTextAreaElement>(null),
          publicTextRef = useRef<HTMLTextAreaElement>(null),
          inputFileRef = useRef<HTMLInputElement>(null);       
   
    const deletePost = async (id: string) => {
        try {
            dispatch(loader());
            dispatch(setPostsCount(-1));
            const response = await PostServices.deletePost({ _id: id })
            if(!response.data.error) dispatch(removePost(response.data));
        } catch {
            // Error request for the test
        } finally {
            dispatch(loader());
        }   
    };

    const handleEdit = () => {
        // console.log(publicRef.current)
        // setSelectedImage('https://tween-api.herokuapp.com/posts/' + post.picture);
        // setPublicTitle(post.title);
        // setPublicDesc(post.description);
        dispatch(modeEditPost(post.id))
    }

    const handleCancelEdit = () => {
        setSelectedImage('https://tween-api.herokuapp.com/posts/' + post.picture);
        setPublicTitle(post.title);
        setPublicDesc(post.description);
        dispatch(cancelEdit());  
    }
    
    const handleChangeFile = async (e: { target: HTMLInputElement; currentTarget: { value: any; }; }) => {       
        const file = (e.target as HTMLInputElement).files[0];
        const newURL = URL.createObjectURL(file);
        if (file) {
            setSelectedImage(newURL);
            setSelectedFile(file); 
        }
        e.currentTarget.value = null;  
    }
    
    const sendPost = async () => {
        if (publicTitle.length > 3 && publicDesc.length > 3){
            let titleProps: string | null = null,
                descProps: string | null = null;

            dispatch(loader()); 
            dispatch(cancelEdit());    
            if (publicTitle !== post.title) {
                setPublicTitle(publicTitle);
                titleProps = publicTitle;
            } 
            
            if (publicDesc !== post.description) {
                setPublicDesc(publicDesc);
                descProps = publicDesc;
            } 
        // eslint-disable-next-line react-hooks/rules-of-hooks
            const response = await useUpdatePost(post.id, titleProps, descProps, selectedFile);
            dispatch(updatePost(response.data));
            dispatch(loader());
        }  else {
            document.body.style.overflow = 'visible'
            Swal.fire({
                title: 'Пожалуйста заполните пост, для дальнейшей публикации!',
            })
            return;
        }
    }
    
    return (
        <div className={style.postContent}>
            <div className={style.postContent__img}>
                <Image 
                    src={selectedImage}
                    alt="post"
                    layout="fill"
                    objectFit="cover"
                    className={style.post__img}
                /> 
                {edit && 
                    <div>
                        <div className={style.postImg__overlay}>
                            <a className={style.postImg__download}
                               onClick={() => inputFileRef.current.click()}
                            />
                        </div>
                        <input ref={inputFileRef} 
                            className="hidden"
                            type="file" 
                            accept="image/*,.png,.jpg,.web" 
                            onChange={handleChangeFile} 
                        />
                    </div>    
                }
            </div>  

            <div className={style.postContent__description}>
                <textarea ref={publicRef}
                    value={publicTitle}
                    rows={postHeightTitle}
                    className={style.postContent__title}
                    readOnly={edit ? false : true}
                    maxLength={51}
                    onInput={(e) => {
                        setPublicTitle((e.target as HTMLTextAreaElement).value);
                        publicRef.current.style.height = 'auto';
                        const scrollHeight = (e.target as HTMLTextAreaElement).scrollHeight;
                        publicRef.current.style.height = `${scrollHeight}px`;
                        if (scrollHeight > 76) publicRef.current.style.height = '76px'
                    }}
                />             
                <textarea ref={publicTextRef}
                    className={style.postContent__text}
                    value={publicDesc}
                    rows={postHeightDesc <=3  ? 3 : postHeightDesc}
                    readOnly={edit ? false : true}
                    onInput={(e) => {
                        setPublicDesc((e.target as HTMLTextAreaElement).value);
                        publicTextRef.current.style.height = 'auto';
                        const scrollHeight = (e.target as HTMLElement ).scrollHeight;
                        publicTextRef.current.style.height = `${scrollHeight}px`
                    }}
                />  
                <div className={style.postContent__edit}>
                    <div className={style.edit}
                         onClick={ edit ? handleCancelEdit : handleEdit}
                    >
                        <div className={
                            !edit ? `${style.editPost__imgEdit} ${style.editPost__imgEdit_edit}` :
                                   `${style.editPost__imgEdit} ${style.editPost__imgEdit_cancel}`
                            }
                        /> 
                        <span className={
                            edit? `${style.editPost__text} ${style.editPost__text_red}` :
                                  `${style.editPost__text} ${style.editPost__text_edit}`  
                        }>
                            {edit ? 'Отменить' : 'Редактировать'}
                        </span>
                    </div>
                   
                    <div className={style.delete}
                        onClick={edit ? sendPost : () => deletePost(post.id)}  
                    >
                        <div className={
                            edit ? `${style.editPost} ${style.editPost_success}`:
                                   `${style.editPost} ${style.editPost_delete}`
                            }
                        /> 
                        <span className={
                            edit ? `${style.editPost__text} ${style.editPost__text_green}`:
                                   `${style.editPost__text} ${style.editPost__text_red}`
                            }
                        >
                            {edit ? 'Обновить пост' : 'Удалить'}
                        </span>
                    </div>
                </div>
            </div>
            <Comments post={post} />
        </div>
    )
};

export default Post;