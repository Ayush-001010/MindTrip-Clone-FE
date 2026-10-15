import React from "react";
import type ITripHotelCard from "./ITripHotelCard";
import BookedHotelCard from "../BookedHotelCard/BookedHotelCard";
import UnbookedHotelCard from "../UnbookedHotelCard/UnbookedHotelCard";

const TripHotelCard: React.FC<ITripHotelCard> = ({ hotel }) => {
    return hotel.isBooked ? <BookedHotelCard hotel={hotel} /> : <UnbookedHotelCard hotel={hotel} />;
};

export default TripHotelCard;
