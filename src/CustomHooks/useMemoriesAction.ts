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
        return response?.data as boolean ?? null;
    }

    const fetchMemories = async (userId: string) : Promise<IMemoriesData[] | null> => {
        const response = await apiInstance.getRequest("/memories/fetch",{
            userId
        });
        return response?.data as IMemoriesData[] ?? null;
    }

    return { fetchMemoriesLeft , createNewMemory , fetchMemories };
};

export default useMemoriesAction;