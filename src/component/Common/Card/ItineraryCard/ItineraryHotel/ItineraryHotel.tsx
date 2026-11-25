
import React from "react";
import type IItineraryHotel from "./IItineraryHotel";
import { FaHotel, FaPlane } from "react-icons/fa";
import ShowHotelModel from "../../../Model/ShowHotelModel/ShowHotelModel";
import ShowBookedFlightsModel from "../../../Model/ShowBookedFlightsModel/ShowBookedFlightsModel";

const ItineraryHotel: React.FC<IItineraryHotel> = () => {
    const [isHotelOpen, setIsHotelOpen] = React.useState(false);
    const [isFlightOpen, setIsFlightOpen] = React.useState(false);

    return (
        <section className="flex items-center gap-3">
            {/* Hotel */}
            <p
                title="My Hotels"
                className="cursor-pointer text-3xl transition-all duration-500 ease-in-out hover:text-[#9fa0ff]"
                onClick={() => setIsHotelOpen(true)}
            >
                <FaHotel />
            </p>

            {/* Flights */}
            <p
                title="My Flights"
                className="cursor-pointer text-3xl transition-all duration-500 ease-in-out hover:text-[#9fa0ff]"
                onClick={() => setIsFlightOpen(true)}
            >
                <FaPlane />
            </p>

            <ShowHotelModel
                open={isHotelOpen}
                onClose={() => setIsHotelOpen(false)}
            />

            <ShowBookedFlightsModel
                open={isFlightOpen}
                onClose={() => setIsFlightOpen(false)}
            />
        </section>
    );
};

export default ItineraryHotel;
