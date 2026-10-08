import { useState, useEffect, useCallback } from "react";
import FavoritesCollections from "../component/Common/FavoritesCollections/FavoritesCollections";
import { useGetAppContext } from "../App";
import type { IFavouritesActivity } from "../Interface/DataInterface/IFavouritesActivity";
import APIService from "../Services/APIService";
import type { IFavouritesHotel } from "../Interface/DataInterface/IFavouritesHotel";
import type { IFavouritesBlog } from "../Interface/DataInterface/IFavouritesBlog";

const useFavorites = (open: boolean, uiType: "create-collection" | "show-collection-for-add-purpose", data?: IFavouritesActivity | IFavouritesHotel | IFavouritesBlog, mode?: "activity" | "hotel" | "blog" ) => {
    const [favoritesOpen, setFavoritesOpen] = useState(open);
    const [type, setType] = useState<"create-collection" | "show-collection-for-add-purpose">();

    const { changeFavoritesConfig } = useGetAppContext();


    const closeFavorites = () => {
        setFavoritesOpen(false);
        setType(undefined);
        changeFavoritesConfig({
            openFavorites: false,
            uiType: undefined
        });
    }

    const addFavoritesItem = useCallback(async (collectionId: number) => { 
        const apiInstance = new APIService();
        const response = await apiInstance.postRequest("/faviourites/addFavourites",{
            type:mode,
            data: data,
            collectionId: collectionId,
        });
    },[data, mode])

    useEffect(() => {
        setFavoritesOpen(open);
        setType(uiType);
    }, [open, uiType]);

    return <FavoritesCollections open={favoritesOpen} onClose={closeFavorites} uiType={type} addFavoritesItem={addFavoritesItem} />;
}

export default useFavorites;