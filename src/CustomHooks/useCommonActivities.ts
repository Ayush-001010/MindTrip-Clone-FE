import APIService from "../Services/APIService";

const useCommonActivities = () => {
    const getActivitiesImage = async (activitesName : string) => {
        const basePathURL = `/common/activites?activityName=${activitesName}`;

        const apiServiceInstance = new APIService();
        const response = await apiServiceInstance.getRequest<{ imageURL: string ,}>(basePathURL);
        if (response.success && response.data) {
            return response.data.imageURL;
        } else {
            console.error("Error fetching activity image:", response.error);
            return null;
        }
    }

    const getEmptyChatBoxImage = async () => {
        const basePathURL = `/common/someRandomImages?type=emptyChatBox`;
        
        const apiServiceInstance = new APIService();
        const response = await apiServiceInstance.getRequest<string>(basePathURL);
        if (response.success && response.data) {
            return response.data;
        } else {
            console.error("Error fetching empty chat box image:", response.error);
            return null;
        }
    }
    return { getActivitiesImage, getEmptyChatBoxImage }
};

export default useCommonActivities;