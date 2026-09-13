import React from "react";
import type IItinerary from "./IItinerary";
import { IoAddOutline } from "react-icons/io5";

const Itinerary: React.FC<IItinerary> = () => {
    return (
        <div>
            <button className="flex items-center cursor-pointer border border-[#fff] text-[#fff] p-2 rounded-full text-xs hover:bg-[#fff] hover:text-[#000] transition-colors duration-300">
                <span>
                    <IoAddOutline />
                </span>
                <span>
                    Add Itinerary
                </span>
            </button>
        </div>
    );
};

export default Itinerary;