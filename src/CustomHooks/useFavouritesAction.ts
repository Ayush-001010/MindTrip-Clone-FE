import { useSelector } from "react-redux";
import type IUserDetails from "../Interface/DataInterface/IUserDetails";
import type IFaviouritesCollection from "../Interface/DataInterface/IFavouritesCollection";
import APIService from "../Services/APIService";

const useFavouritesAction = () => {
    const { userEmail } = useSelector((state:any) => state.userDetails as IUserDetails);

    const fetchCollection = async () => {
        const apiInstance = new APIService();
        const response = await apiInstance.getRequest<IFaviouritesCollection[]>(`/faviourites/collections?userEmail=${userEmail}`);
        return response;
    };

    const createCollection = async (collectionName: string) => {
        const apiInstance = new APIService();
        const response = await apiInstance.postRequest<IFaviouritesCollection>("/faviourites/createCollections", {
            userEmail: userEmail,
            name:collectionName
        });
        return response;
    };

    const fetchCollectionDetails = async (collectionId: number , type : "Activity" | "Hotel" | "Blog") => {
        const apiInstance = new APIService();
        const response = await apiInstance.postRequest("/faviourites/collectionDetails", {
            collectionId,
            type
        });
        return response;
    };
    
    const removeFavourite = async (
        collectionId: number,
        favouriteId: number,
        type: "Activity" | "Hotel"
    ) => {
        const apiInstance = new APIService();
    
        return await apiInstance.postRequest<boolean>(
            "/faviourites/removeFavourite",
            {
                collectionId,
                favouriteId,
                type,
                userEmail
            }
        );
    };
    return {
        fetchCollection,
        createCollection,
        fetchCollectionDetails,
        removeFavourite
    };
};

export default useFavouritesAction;