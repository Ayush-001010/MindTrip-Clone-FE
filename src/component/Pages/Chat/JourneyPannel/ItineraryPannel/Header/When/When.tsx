import React, { useEffect, useState } from "react";
import moment from "moment";
import type IWhen from "./IWhen";
import { FaCalendarAlt } from "react-icons/fa";
import TripWhen from "../../../../Header/TripWhen/TripWhen";

const When: React.FC<IWhen> = ({ startDate, endDate }) => {
    const [isSet , setIsSet] = useState<boolean>(false);
    const [openTripWhen, setOpenTripWhen] = useState<boolean>(false);

    const toggleOpenTripWhen = () => {
        setOpenTripWhen(true);
    }
    const closeTripWhen = () => {
        console.log("Closing TripWhen modal");
        setOpenTripWhen(()=> false);
    }
    useEffect(()=>{
        if(startDate && endDate) {
            setIsSet(true);
        } else {
            setIsSet(false);
        }
    },[startDate , endDate])
    return (
        <section onClick={toggleOpenTripWhen} className="flex border-r-1 text-[#ced4da] mr-1 items-center border-[#ced4da] cursor-pointer">
            <p className="text-sm mr-1">
                <FaCalendarAlt />
            </p>
            {!isSet && (
                <p className="text-sm mr-1">Not Set</p>
            )}
            {isSet && (
                <p className="text-sm mr-1">
                    {moment(startDate).format("DD")} - {moment(endDate).format("DD")}
                </p>
            )}
            <TripWhen
                open={openTripWhen}
                closeHandler={closeTripWhen}
            />
        </section>
    );
};

export default When;