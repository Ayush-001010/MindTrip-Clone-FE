import React from "react";
import type IShowPlaceName from "./IShowPlaceName";
import { IoLocationOutline } from "react-icons/io5";

const ShowPlaceName: React.FC<IShowPlaceName> = ({ placeName, longitude, latitude }) => {
    return (
        <section className="flex w-full items-center gap-2">
            <p className="truncate text-2xl font-bold text-[#f8f9fa]">{placeName.toUpperCase()}</p>
            <IoLocationOutline
                className="shrink-0 cursor-pointer text-xl text-gray-400 transition-colors hover:text-[#f8f9fa]"
                onClick={()=>console.log(`Longitude: ${longitude}, Latitude: ${latitude}`)}
            />
        </section>
    );
};

export default ShowPlaceName;