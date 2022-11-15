import LikeServices from '@/services/LikeServices';

export const useCheckLike = async (
    userId: string,
    postId: string,
) => {
    try {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('postId', postId); 
        const response = await LikeServices.checkLike(formData);
        return response
    } catch (err) {
        // Error request for the test
    }    
}    