import PostServices from '@/services/PostServices';

export const useUpdatePost = async (
    idPost: string,
    title: string | null,
    text: string | null,
    image: any,
) => {
    try {
        const formData = new FormData();
        formData.append('_id', idPost);
        console.log(image);
        if (title !== null) formData.append('title', title);
        if (text !== null) formData.append('description', text);
        if (image !== null) formData.append('picture', image);

        const response = await PostServices.postUpdate(formData);
        return response
    } catch {
        // Error request for the test
    }    
}    