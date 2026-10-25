import React from "react";
import type ITripHotelCard from "./ITripHotelCard";
import BookedHotelCard from "../BookedHotelCard/BookedHotelCard";
import UnbookedHotelCard from "../UnbookedHotelCard/UnbookedHotelCard";

const TripHotelCard: React.FC<ITripHotelCard> = ({ hotel, onClose }) => {
    return hotel.isBooked ? <BookedHotelCard hotel={hotel} onClose={onClose} /> : <UnbookedHotelCard hotel={hotel} onClose={onClose} />;
};

export default TripHotelCard;
