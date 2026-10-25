import React, { useState } from "react";
import { useChatContext } from "../Chat";
import type IHeader from "./IHeader";
import dayjs from "dayjs";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import TripUser from "./TripUser/TripUser";
import TripWhen from "./TripWhen/TripWhen";
import TripBudget from "./TripBudget/TripBudget";
import TripSelection from "./TripSelection/TripSelection";

const Header: React.FC<IHeader> = () => {
    const [openTripUser, setOpenTripUser] = useState(false);
    const [openTripWhen, setOpenTripWhen] = useState(false);
    const [openTripBudget, setOpenTripBudget] = useState(false);
    const {tripSuggestionsDate , finalItinerary} = useChatContext();

    const hasUnseenDateSuggestion = !!(tripSuggestionsDate?.startDate && tripSuggestionsDate?.endDate) && !(
        finalItinerary?.startDate
        && finalItinerary?.endDate
        && dayjs(finalItinerary.startDate).isSame(tripSuggestionsDate.startDate, "day")
        && dayjs(finalItinerary.endDate).isSame(tripSuggestionsDate.endDate, "day")
    );

    const dateRangeLabel = finalItinerary?.startDate && finalItinerary?.endDate
        ? `${dayjs(finalItinerary.startDate).format("DD MMM")} - ${dayjs(finalItinerary.endDate).format("DD MMM")}`
        : "When";

    const budgetLabel = finalItinerary?.budget ? `₹${finalItinerary.budget.toLocaleString()}` : "Budget";

    const travelerLabel = finalItinerary?.countUserOnTrip ? `${finalItinerary.countUserOnTrip} travelers` : "Who";

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
        <header className="px-3 py-3 flex">
            <section className="w-[400px]">
                <TripSelection />
            </section>
            <section className="flex w-full items-center justify-center">
                <section className="flex w-1/2 ml-20 justify-center">
                    <div className="flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
                        <button
                            type="button"
                            onClick={openTripUserHandler}
                            className="flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white/60 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                        >
                            <FaUser className="h-3 w-3" />
                            {travelerLabel}
                        </button>
                        <button
                            type="button"
                            onClick={openTripWhenHandler}
                            className="relative flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white/60 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                        >
                            <FaCalendarAlt className="h-3 w-3" />
                            {dateRangeLabel}
                            {hasUnseenDateSuggestion && (
                                <span
                                    title="AI suggested dates for your trip"
                                    className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400"
                                />
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={openTripBudgetHandler}
                            className="flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white/60 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                        >
                            <RiMoneyRupeeCircleLine className="h-3.5 w-3.5" />
                            {budgetLabel}
                        </button>
                    </div>
                </section>
                <TripUser open={openTripUser} onClose={closeTripUserHandler} />
                <TripWhen open={openTripWhen} closeHandler={closeTripWhenHandler} />
                <TripBudget open={openTripBudget} closeHandler={closeTripBudgetHandler} />
            </section>
        </header>
    )
};

export default Header;