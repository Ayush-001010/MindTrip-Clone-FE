import { useSelector } from "react-redux";
import type IUserDetails from "../Interface/DataInterface/IUserDetails";
import type IFaviouritesCollection from "../Interface/DataInterface/IFavouritesCollection";
import APIService from "../Services/APIService";

const useFavouritesAction = () => {
    const { } = useSelector((state:any) => state.userDetails as IUserDetails);

    const fetchCollection = async () => {
        const apiInstance = new APIService();
        const response = await apiInstance.getRequest<IFaviouritesCollection[]>(`/faviourites/collections?userEmail=${"testing@gmail.com"}`);
        return response;
    };

    const createCollection = async (collectionName: string) => {
        const apiInstance = new APIService();
        const response = await apiInstance.postRequest<IFaviouritesCollection>("/faviourites/createCollections", {
            userEmail:"testing@gmail.com",
            name:collectionName
        });
        return response;
    };

    return { fetchCollection, createCollection };
};

export default useFavouritesAction;