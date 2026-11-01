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
import { useParams } from "react-router-dom";

const Header: React.FC<IHeader> = () => {
    const [openTripUser, setOpenTripUser] = useState(false);
    const [openTripWhen, setOpenTripWhen] = useState(false);
    const [openTripBudget, setOpenTripBudget] = useState(false);
    const {tripSuggestionsDate , finalItinerary} = useChatContext();
    const {tripId} = useParams();
    const isDisabled = !tripId;

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
        <header className="flex flex-col gap-3 px-3 py-3 md:flex-row md:items-center">
            <section className="w-full md:w-[400px] md:shrink-0">
                <TripSelection />
            </section>
            <section className="flex w-full items-center justify-center">
                <section className="flex w-full justify-center md:ml-6 lg:ml-20 lg:w-1/2">
                    <div className="flex w-fit max-w-full flex-wrap items-center justify-center gap-1 rounded-3xl border border-white/10 bg-white/5 p-1 sm:rounded-full">
                        <button
                            type="button"
                            disabled={isDisabled}
                            onClick={openTripUserHandler}
                            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white/60 transition-colors duration-200 hover:bg-white/10 hover:text-white ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                        >
                            <FaUser className="h-3 w-3" />
                            {travelerLabel}
                        </button>
                        <button
                            type="button"
                            onClick={openTripWhenHandler}
                            disabled={isDisabled}
                            className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white/60 transition-colors duration-200 hover:bg-white/10 hover:text-white ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
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
                            disabled={isDisabled}
                            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white/60 transition-colors duration-200 hover:bg-white/10 hover:text-white ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
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