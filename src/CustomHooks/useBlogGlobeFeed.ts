import APIService from "../Services/APIService";
import type IBlogUniquePlace from "../Interface/DataInterface/IBlogUniquePlace";

const useBlogGlobeFeed = () => {
    const getUniquePlaces = async () => {
        const apiServiceInstance = new APIService();
        const res = await apiServiceInstance.getRequest<IBlogUniquePlace[]>("/blog-globe-feed/unique-places");
        if (!res.success || !res.data) return null;

        // The unique-places endpoint currently returns latitude and longitude under reversed keys.
        return res.data.map(({ latitude, longitude, ...place }) => ({
            ...place,
            latitude: longitude,
            longitude: latitude,
        }));
    }

    return { getUniquePlaces };
};

export default useBlogGlobeFeed;