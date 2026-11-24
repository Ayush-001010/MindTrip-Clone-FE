
import React from "react";
import type IItineraryHotel from "./IItineraryHotel";
import { FaHotel, FaPlane } from "react-icons/fa";
import ShowHotelModel from "../../../Model/ShowHotelModel/ShowHotelModel";
import { useChatContext } from "../../../../Pages/Chat/Chat";

const ItineraryHotel: React.FC<IItineraryHotel> = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const {
                sendMessageHandler
    } = useChatContext();

    const openModel = () => setIsOpen(true);
    const closeModel = () => setIsOpen(false);

    const handleFlightClick = () => {
        sendMessageHandler(
            "I want to search for flights for my current trip. Use my existing trip destination and ask me only for the flight details you still need. Do not ask me for my destination again."
        );
    };

    return (
        <section className="flex items-center gap-3">
            <p
                className="text-3xl hover:text-[#9fa0ff] transition-all duration-500 ease-in-out cursor-pointer"
                onClick={openModel}
            >
                <FaHotel />
            </p>

            <p
                title="Search Flights"
                className="text-3xl hover:text-[#9fa0ff] transition-all duration-500 ease-in-out cursor-pointer"
                onClick={handleFlightClick}
            >
                <FaPlane />
            </p>

            <ShowHotelModel open={isOpen} onClose={closeModel} />
        </section>

)
};

export default ItineraryHotel;
