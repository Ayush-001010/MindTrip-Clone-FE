import React from "react";
import type IUnbookedHotelCard from "./IUnbookedHotelCard";
import HotelSummaryInfo from "../HotelSummaryInfo/HotelSummaryInfo";

const UnbookedHotelCard: React.FC<IUnbookedHotelCard> = ({ hotel, onClose }) => {
    return (
        <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <HotelSummaryInfo hotel={hotel} onClose={onClose} isNotBooked={true} />
        </div>
    );
};

export default UnbookedHotelCard;
