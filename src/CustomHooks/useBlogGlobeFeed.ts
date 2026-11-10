import APIService from "../Services/APIService";

const useBlogGlobeFeed = () => {
    const getUniquePlaces = async () => {
        const apiServiceInstance = new APIService();
        const res = await apiServiceInstance.getRequest("/blog-globe-feed/unique-places");
        return res.success ? res.data : null;
    }

    return { getUniquePlaces };
};

export default useBlogGlobeFeed;