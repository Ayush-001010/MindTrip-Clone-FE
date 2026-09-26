import APIService from "../Services/APIService";

const useBlogAction = () => {
    const getMetaData = async () => {
        const apiInstance = new APIService();
        const response = await apiInstance.getRequest("/common/getMetaDataForBlog");
        return response;
    }

    return { getMetaData};
}

export default useBlogAction;