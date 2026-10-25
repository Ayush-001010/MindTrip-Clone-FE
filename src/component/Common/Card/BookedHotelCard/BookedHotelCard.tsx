import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import type IBookedHotelCard from "./IBookedHotelCard";
import HotelSummaryInfo from "../HotelSummaryInfo/HotelSummaryInfo";

const formatDate = (date?: Date | string | null) => {
    if (!date) {
        return "N/A";
    }
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) {
        return "N/A";
    }
    return parsed.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
};

const BookedHotelCard: React.FC<IBookedHotelCard> = ({ hotel, onClose }) => {
    return (
        <div className="flex flex-col gap-3 rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-3">
            <HotelSummaryInfo hotel={hotel} onClose={onClose} />
            <div className="flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
                <BsCheckCircleFill className="shrink-0 text-sm" />
                <span>
                    Booked from <span className="font-semibold">{formatDate(hotel.fromDate)}</span> to{" "}
                    <span className="font-semibold">{formatDate(hotel.toDate)}</span>
                </span>
            </div>
        </div>
    );
};

export default BookedHotelCard;
