import SubscribeServices from '@/services/SubscribeServices';

export const useCreateUnsubscribe = async (
    executorUserId: string,
    targerUserId: string,
) => {
    try {
        const formData = new FormData();
        formData.append('executorUserId', executorUserId);
        formData.append('targetUserId', targerUserId);

        const response = await SubscribeServices.unsubscribe(formData);
        return response
    } catch {
        // Error request for the test
    }    
}    