import React, { useEffect, useState } from "react";
import type IActivityPlaceName from "./IActivityPlaceName";
import { useGetBlogContext } from "../../../../Pages/Blog/Blog";
import AddPlaceName from "./AddPlaceName/AddPlaceName";
import ShowPlaceName from "./ShowPlaceName/ShowPlaceName";
import axios from "axios";
import { useGetActivityCardData } from "../ActivityCard";

export interface IPlaceOption {
    place_name: string;
    longitude: number;
    latitude: number;
}

const ActivityPlaceName: React.FC<IActivityPlaceName> = () => {
    const [placeName, setPlaceName] = useState("");
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const {mode} = useGetBlogContext();
    const [placeOptions, setPlaceOptions] = useState<IPlaceOption[]>([]);
    const { blogActivity } = useGetActivityCardData();

    useEffect(() => {
        if (blogActivity && blogActivity.placeName && blogActivity.coordinates.longitude && blogActivity.coordinates.latitude) {
            setPlaceName(blogActivity.placeName || "");
            setLongitude(blogActivity.coordinates.longitude || 0);
            setLatitude(blogActivity.coordinates.latitude || 0);
        }
    }, [blogActivity]);

    useEffect(() => {
        const timeObj = setTimeout(async () => {
            if(!placeName) return;
            console.log("Place name changed:", placeName);
            const response = await axios.get(`https://api.maptiler.com/geocoding/${placeName}.json?key=gvBWK8FAy2ynzJcqqJV7&limit=10`);
            console.log("Geocoding response:", response.data);
            const {features} = response.data;
            const options: IPlaceOption[] = [];

            features.forEach((feature: any) => {
                options.push({
                    place_name: feature.place_name,
                    longitude: feature.geometry.coordinates[0],
                    latitude: feature.geometry.coordinates[1],
                });
            });
            setPlaceOptions(options);
        }, 500);
        return () => clearTimeout(timeObj);
    },[placeName]);
    return (
        <section className="flex w-full items-center">
            {mode === "create" && (
                <>
                    { (longitude === 0 && latitude === 0) && <AddPlaceName setPlaceName={setPlaceName} placeName={placeName} placeOptions={placeOptions} setLongitude={setLongitude} setLatitude={setLatitude}/> }
                    { (longitude > 0 && latitude > 0) && <ShowPlaceName placeName={placeName} longitude={longitude} latitude={latitude} /> }
                </> 
            )}
            {mode === "preview" && (longitude > 0 && latitude > 0) && <ShowPlaceName placeName={placeName} longitude={longitude} latitude={latitude} />}
        </section>
    );
};

export default ActivityPlaceName;