import React from "react";
import type IShowPlaceName from "./IShowPlaceName";
import { IoLocationOutline } from "react-icons/io5";

const ShowPlaceName: React.FC<IShowPlaceName> = ({ placeName, longitude, latitude }) => {
    return (
        <section className="flex w-full flex-col gap-0.5">
            <p className="truncate text-sm font-semibold text-gray-900">{placeName}</p>
            <p className="flex items-center text-xs text-gray-500">
                <IoLocationOutline className="mr-1 inline-block"  onClick={()=>console.log(`Longitude: ${longitude}, Latitude: ${latitude}`)}/>
            </p>
        </section>
    );
};

export default ShowPlaceName;