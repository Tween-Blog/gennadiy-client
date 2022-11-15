import PostServices from '@/services/PostServices';

export const useCreatePost = async (
    idUser: string,
    publication: string,
    publicationText: string,
    image: any,
) => {
    try {
        const formData = new FormData();
        formData.append('title', publication);
        formData.append('description', publicationText);
        formData.append('userId', idUser);
        formData.append('picture', image);
        const response = await PostServices.postNew(formData);
        return response
    } catch {
        // Error request for the test
    }    
}    