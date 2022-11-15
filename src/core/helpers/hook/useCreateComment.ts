import CommentsServices from '@/services/CommentsServices';

export const useCreateComment = async (
    postId: string,
    userId: string,
    text: string,
) => {
    try {
        const formData = new FormData();
        formData.append('postId', postId);
        formData.append('userId', userId);
        formData.append('text', text);

        const response = await CommentsServices.commentNew(formData);
        return response
    } catch {
        // Error request for the test
    }    
}    