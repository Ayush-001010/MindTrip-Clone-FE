import React from "react";
import type ITripHotelList from "./ITripHotelList";
import TripHotelCard from "../../Card/TripHotelCard/TripHotelCard";

const TripHotelList: React.FC<ITripHotelList> = ({ hotels }) => {
    return (
        <ul className="flex max-h-[60vh] flex-col gap-3 overflow-y-auto overscroll-contain scrollbar-thin pr-1">
            {hotels.map((hotel) => (
                <li key={hotel.id ?? hotel.base62}>
                    <TripHotelCard hotel={hotel} />
                </li>
            ))}
        </ul>
    );
};

export default TripHotelList;
