import APIService from "../Services/APIService";
import type IMemoriesData from "../Interface/DataInterface/IMemoriesData";

const useMemoriesAction = () => {
    const apiInstance = new APIService();

    const fetchMemoriesLeft  = async (userId: string) : Promise<number | null> => {
        const response = await apiInstance.getRequest("/user/count-memories-left",{
            userId
        });
        return response?.data as number ?? null;
    }

    const createNewMemory = async (userId:string , name : string) : Promise<boolean | null> => {
        const response = await apiInstance.postRequest("/memories/create",{
            userId,
            name
        });
        return response.success ? response?.data as boolean : null;
    }

    const fetchMemories = async (userId: string) : Promise<IMemoriesData[] | null> => {
        const response = await apiInstance.getRequest("/memories/fetch",{
            userId
        });
        return response?.data as IMemoriesData[] ?? null;
    }

    const inviteUser = async (userName: string, workId: string ,base62 : string) : Promise<boolean | null> => {
        const response = await apiInstance.postRequest("/memories/invite",{
            workId,
            userName,
            base62
        });
        return response.success ? response?.data as boolean : null;
    }

    const checkInviteIsValidOrNot = async (base62:string) : Promise<any | null> => {
        const response = await apiInstance.getRequest("/memories/details/invite",{
            base62
        });
        return response.success ? response?.data : null;
    }

    const addToMemories = async (userId : string, base62: string) : Promise<boolean | null> => {
        const response = await apiInstance.postRequest("/memories/addToMemory",{
            userId,
            base62
        });
        return response.success ? response?.data as boolean : null;
    }

    return { fetchMemoriesLeft , createNewMemory , fetchMemories , inviteUser , checkInviteIsValidOrNot , addToMemories };
};

export default useMemoriesAction;