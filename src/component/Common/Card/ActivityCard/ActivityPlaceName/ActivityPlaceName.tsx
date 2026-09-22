import React, { useEffect, useState } from "react";
import type IActivityPlaceName from "./IActivityPlaceName";
import { useGetBlogContext } from "../../../../Pages/Blogs/Blog/Blog";
import AddPlaceName from "./AddPlaceName/AddPlaceName";
import ShowPlaceName from "./ShowPlaceName/ShowPlaceName";
import axios from "axios";

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

    useEffect(() => {
        const timeObj = setTimeout(async () => {
            if(!placeName) return;
            console.log("Place name changed:", placeName);
            const response = await axios.get(`https://api.maptiler.com/geocoding/${placeName}.json?key=gvBWK8FAy2ynzJcqqJV7&limit=5`);
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
        </section>
    );
};

export default ActivityPlaceName;