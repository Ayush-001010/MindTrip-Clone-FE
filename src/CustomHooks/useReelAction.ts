import APIService from "../Services/APIService";
import type IReelData from "../Interface/DataInterface/IReelData";

const useReelAction = () => {
    const apiInstance = new APIService();

    const fetchReel = async (placeName : string):  Promise<{ success: boolean, data?: IReelData[] }> => {
        const response = await apiInstance.getRequest<IReelData[]>(`/reel/fetch?placeName=${placeName}`);
        return response;
    };

    return { fetchReel };
};

export default useReelAction;