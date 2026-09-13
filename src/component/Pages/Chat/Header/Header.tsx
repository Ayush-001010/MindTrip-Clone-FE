import React, { useState } from "react";
import type IHeader from "./IHeader";
import TripUser from "./TripUser/TripUser";

const Header: React.FC<IHeader> = () => {
    const [openTripUser, setOpenTripUser] = useState(false);

    const closeTripUserHandler = () => {
        setOpenTripUser(false);
    }
    const openTripUserHandler = () => {
        setOpenTripUser(true);
    }

    return (
        <header className="flex w-full items-center justify-between px-3 py-3">
            <section className="flex w-1/2 ml-20 text-[#adb5bd] justify-end">
                <div className="flex w-fit items-center rounded-3xl p-2 border border-2 border-[#adb5bd]">
                    <p className="cursor-pointer text-xs m-0 hover:text-[#fff] pr-2 border-r-2 border-[#adb5bd]">Where</p>
                    <p className="cursor-pointer text-xs m-0 hover:text-[#fff] pr-2 pl-2 border-r-2 border-[#adb5bd]">When</p>
                    <p onClick={openTripUserHandler} className="cursor-pointer text-xs m-0 hover:text-[#fff] pr-2 pl-2 border-r-2 border-[#adb5bd]">Who</p>
                    <p className="cursor-pointer text-xs m-0 hover:text-[#fff] pl-2">Budget</p>
                </div>
            </section>
            <TripUser open={openTripUser} onClose={closeTripUserHandler}/>
        </header>
    )
};

export default Header;