import React from "react";
import type IItineraryEdit from "./IItineraryEdit";
import { FaEdit } from "react-icons/fa";
import { Tooltip } from "antd";

const ItineraryEdit : React.FC<IItineraryEdit> = () => {
    return (
        <section className="border-r-1 border-[#adb5bd] cursor-pointer flex items-center">
            <Tooltip title="Edit Itinerary">
                <FaEdit className="text-[#f8f9fa] mr-2" />
            </Tooltip>
        </section>
    )
};

export default ItineraryEdit;