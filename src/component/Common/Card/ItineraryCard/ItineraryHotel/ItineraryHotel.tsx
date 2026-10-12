import React, { useState } from "react";
import type IItineraryHotel from "./IItineraryHotel";
import { FaHotel } from "react-icons/fa";
import ShowHotelModel from "../../../Model/ShowHotelModel/ShowHotelModel";

const ItineraryHotel: React.FC<IItineraryHotel> = () => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModel = () => setIsOpen(false);
    const openModel = () => setIsOpen(true);

    return (
        <section>
            <p className="text-3xl hover:text-[#9fa0ff] transition-all duration-500 ease-in-out cursor-pointer" onClick={openModel}>
                <FaHotel />
            </p>
            <ShowHotelModel open={isOpen} onClose={closeModel}/>
        </section>
    );
};

export default ItineraryHotel;