import React from "react";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import type IItinerarySplitWise from "./IItinerarySplitWise";

const ItinerarySplitWise: React.FC<IItinerarySplitWise> = () => {
    return (
        <section className="cursor-pointer flex items-center">
            <FaMoneyBillTransfer className="text-[#f8f9fa] mx-2" />
        </section>
    );
};

export default ItinerarySplitWise;