import React, { useState } from "react";
import type IItineraryTips from "./IItineraryTips";
import { FaLightbulb } from "react-icons/fa";
import ShowTipsModel from "../../../Model/ShowTipsModel/ShowTipsModel";
import { useGetItineraryCardContext } from "../ItineraryCard";

const ItineraryTips : React.FC<IItineraryTips> = () => {
    const [openModal, setOpenModal] = useState(false);
    const { tips } = useGetItineraryCardContext(); 
    const openFunc = () => setOpenModal(true);
    const closeFunc = () => setOpenModal(false);

    return (
        <section className="flex justify-end">
            <p onClick={openFunc} className="text-3xl hover:text-[#ffea00] transition-all duration-500 ease-in-out cursor-pointer">
                <FaLightbulb/>
            </p>
            <ShowTipsModel openModal={openModal} closeFunc={closeFunc} tips={tips || []}/>
        </section>
    );
};

export default ItineraryTips;