import React, { useState } from "react";
import type IHeader from "./IHeader";
import TripUser from "./TripUser/TripUser";
import TripWhen from "./TripWhen/TripWhen";
import TripBudget from "./TripBudget/TripBudget";

const Header: React.FC<IHeader> = () => {
    const [openTripUser, setOpenTripUser] = useState(false);
    const [openTripWhen , setOpenTripWhen] = useState(false);
    const [openTripBudget, setOpenTripBudget] = useState(false);

    const closeTripUserHandler = () => {
        setOpenTripUser(false);
    }
    const closeTripWhenHandler = () => {
        setOpenTripWhen(false);
    }
    const closeTripBudgetHandler = () => {
        setOpenTripBudget(false);
    }
    const openTripWhenHandler = () => {
        setOpenTripWhen(true);
    }
    const openTripUserHandler = () => {
        setOpenTripUser(true);
    }
    const openTripBudgetHandler = () => {
        setOpenTripBudget(true);
    }

    return (
        <header className="flex w-full items-center justify-between px-3 py-3">
            <section className="flex w-1/2 ml-20 text-[#adb5bd] justify-end">
                <div className="flex w-fit items-center rounded-3xl p-2 border border-2 border-[#adb5bd]">
                    <p onClick={openTripUserHandler} className="cursor-pointer text-xs m-0 hover:text-[#fff] pr-2 pl-2 border-r-2 border-[#adb5bd]">Who</p>
                    <p onClick={openTripWhenHandler} className="cursor-pointer text-xs m-0 hover:text-[#fff] pr-2 pl-2 border-r-2 border-[#adb5bd]">When</p>
                    <p onClick={openTripBudgetHandler} className="cursor-pointer text-xs m-0 hover:text-[#fff] pl-2">Budget</p>
                </div>
            </section>
            <TripUser open={openTripUser} onClose={closeTripUserHandler}/>
            <TripWhen open={openTripWhen} closeHandler={closeTripWhenHandler}/> 
            <TripBudget open={openTripBudget} closeHandler={closeTripBudgetHandler}/>
        </header>
    )
};

export default Header;