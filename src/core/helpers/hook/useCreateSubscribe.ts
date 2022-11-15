import SubscribeServices from '@/services/SubscribeServices';

export const useCreateSubscribe = async (
    executorUserId: string,
    targerUserId: string,
) => {
    try {
        const formData = new FormData();
        formData.append('executorUserId', executorUserId);
        formData.append('targetUserId', targerUserId);

        const response = await SubscribeServices.subscribe(formData);
        return response
    } catch {
        // Error request for the test
    }    
}    