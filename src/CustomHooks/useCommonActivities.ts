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
    return { getActivitiesImage }
};

export default useCommonActivities;