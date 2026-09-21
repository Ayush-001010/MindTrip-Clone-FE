import React, { useState } from "react";
import type IUserCount from "./IUserCount";
import { FaUser } from "react-icons/fa";
import TripUser from "../../../../Header/TripUser/TripUser";

const UserCount: React.FC<IUserCount> = ({ countUserOnTrip }) => {
    const [isOpenTripUser , setIsOpenTripUser] = useState(false);

    const openTripUser = () => {
        setIsOpenTripUser(!isOpenTripUser);
    };
    const closeTripUser = () => {
        setIsOpenTripUser(false);
    };
    return (
        <section onClick={openTripUser} className="flex cursor-pointer items-center text-[#ced4da] cursor-pointer mr-2">
            <p className="mb-0 flex justify-center items-center">
                <span className="text-sm mr-1"><FaUser /></span>
                {countUserOnTrip?.toString()}
            </p>
            <TripUser open={isOpenTripUser} onClose={closeTripUser} />
        </section>
    );
};

export default UserCount;