import React, { useEffect, useState } from "react";
import type ICollectionDetails from "./ICollectionDetails";
import Header from "./Header/Header";
import useFavouritesAction from "../../../../../customHooks/useFavouritesAction";
import type { IFavouritesActivity } from "../../../../../Interface/DataInterface/IFavouritesActivity";
import type { IFavouritesHotel } from "../../../../../Interface/DataInterface/IFavouritesHotel";
import type { IFavouritesBlog } from "../../../../../Interface/DataInterface/IFavouritesBlog";
import FavouritesCard from "../../FavouritesCard/FavouritesCard";

const CollectionDetails: React.FC<ICollectionDetails> = ({ id }) => {
    const [activeTab, setActiveTab] = useState<"Activity" | "Hotel" | "Blog">("Activity");
    const [collectionDetails, setCollectionDetails] = useState<IFavouritesActivity[] | IFavouritesHotel[] | IFavouritesBlog[]>([]);
    const { fetchCollectionDetails } = useFavouritesAction();

    const clickHandler = (str: "Activity" | "Hotel" | "Blog") => {
        setActiveTab(str);
    };
    useEffect(()=>{
        const timeOutID = setTimeout(() => {
            if(id){
            fetchCollectionDetails(id, activeTab).then(response => {
                if(response.success){
                    setCollectionDetails(response.data as IFavouritesActivity[] | IFavouritesHotel[] | IFavouritesBlog[]);
                }
            });
        }
        }, 300);
        return () => clearTimeout(timeOutID);
    },[id, activeTab]);

    return (
        <section className="w-full">
            <Header onClickHandler={clickHandler} activeTab={activeTab} />
            <div className="flex flex-col gap-5 pb-6">
            {collectionDetails.map((item : IFavouritesActivity | IFavouritesHotel | IFavouritesBlog, index: number) => {
                const key = `${activeTab}-${item.id ?? index}`;
                switch(activeTab){
                    case "Activity" : {
                        const data = item as IFavouritesActivity;
                        return <FavouritesCard key={key} title={data.activityName} imageUrl={data.activityImage} description={data.activityDescription} address={data.activityAddress} />;
                    }
                    case "Hotel" : {
                        const data = item as IFavouritesHotel;
                        return <FavouritesCard key={key} title={data.hotelName} imageUrl={data.hotelImage} description={data.hotelDescription} price={data.price} />;
                    }
                    case "Blog" : {
                        const data = item as IFavouritesBlog;
                        return <FavouritesCard key={key} title={data.blogTitle} description={data.blogDescription} imageUrl={data.blogImage} />;
                    }
                    default:
                        return null;
                }
            })}
            </div>
        </section>
    );
};

export default CollectionDetails;