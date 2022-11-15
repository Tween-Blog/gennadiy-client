import LikeServices from '@/services/LikeServices';

export const useCreateLike = async (
    postId: string,
    userId: string,
) => {
    const formData = new FormData();
    formData.append('postId', postId);
    formData.append('userId', userId);
    try {
        const response = await LikeServices.like(formData);
        return response
    } catch (err) {
        const response = await LikeServices.dislike(formData);
        return response
    }    
}    