import SubscribeServices from '@/services/SubscribeServices';

export const useCheckSubsribe = async (
    executorUserId: string,
    targetUserId: string,
) => {
    try {
        const formData = new FormData();
        formData.append('executorUserId', executorUserId);
        formData.append('targetUserId', targetUserId); 
        const response = await SubscribeServices.checkSubscribe(formData);
        return response
    } catch {
        // Error request for the test
    }    
}    