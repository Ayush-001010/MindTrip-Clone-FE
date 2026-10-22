import React, { useState } from "react";
import type IBudget from "./IBudget";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import TripBudget from "../../../../../Header/TripBudget/TripBudget";

const Budget: React.FC<IBudget> = ({ budget }) => {
    const [openBudget, setOpenBudget] = useState<boolean>(false);
    const toggleOpenBudget = () => {
        setOpenBudget(true);
    }
    const closeBudget = () => {
        setOpenBudget(false);
    }
    return (
        <section className="flex cursor-pointer items-center border-r-1 text-[#ced4da] border-[#ced4da] cursor-pointer mr-2">
            <section onClick={toggleOpenBudget} className="flex cursor-pointer items-center">
                <p className="mb-0 flex justify-center items-center">
                    <RiMoneyRupeeCircleLine className="inline mr-1" />
                </p>
                {budget !== null ? (
                    <p className="text-sm mr-1">{budget}</p>
                ) : (
                    <p className="text-sm mr-1">Not Set</p>
                )}
            </section>
            {openBudget && (
                <TripBudget
                    open={openBudget}
                    closeHandler={closeBudget}
                />
            )}
        </section>
    );
};

export default Budget;