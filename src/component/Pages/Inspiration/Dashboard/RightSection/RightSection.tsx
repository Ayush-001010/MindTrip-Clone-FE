import React, { useEffect, useState } from "react";

import type IRightSection from "./IRightSection";
import TextLoader from "../../../../Common/Loader/TextLoader/TextLoader";
import Calendar from "../../../../Common/Calendar/Calendar";
import useTripAction from "../../../../../CustomHooks/useTripAction";
import type IImportantDateResponse from "../../../../../Interface/DataInterface/IImportantDateResponse";
import moment from "moment";

const RightSection: React.FC<IRightSection> = ({ selectedOption }) => {
    if (!selectedOption) {
        return null;
    }
    const { fetchImportanDates, createNewTrip } = useTripAction();
    const [loading, setLoading] = useState(false);
    const [loaderText, setLoaderText] = useState("");
    const [dateRange, setDateRange] = useState<IImportantDateResponse[] | null>(null);
    const rangeClickHandler = (startDate: Date, endDate: Date, type: "long-weekend" | "long-birthday-weekend" | "long-anniversary-weekend" | "birthday" | "anniversary") => {
        console.log(startDate, endDate, type);
        let aiMessage = {
            text: "",
            createdAt: new Date()
        };

        switch (type) {
            case "birthday":
                aiMessage.text = `Hello, Can you help me create itinerary for my birthday(${moment(startDate).format("MMMM Do YYYY")})?`
                break;
            case "anniversary":
                aiMessage.text = `Hello, Can you help me create itinerary for my anniversary(${moment(startDate).format("MMMM Do YYYY")})?`
                break;
            case "long-weekend":
                aiMessage.text = `Hello, Can you help me create itinerary for my long weekend(${moment(startDate).format("MMMM Do YYYY")} - ${moment(endDate).format("MMMM Do YYYY")})?`
                break;
            case "long-birthday-weekend":
                aiMessage.text = `Hello, Can you help me create itinerary for my long birthday weekend(${moment(startDate).format("MMMM Do YYYY")} - ${moment(endDate).format("MMMM Do YYYY")})?`
                break;
            case "long-anniversary-weekend":
                aiMessage.text = `Hello, Can you help me create itinerary for my long anniversary weekend(${moment(startDate).format("MMMM Do YYYY")} - ${moment(endDate).format("MMMM Do YYYY")})?`
                break;
        };
        localStorage.setItem("aiMessage", JSON.stringify(aiMessage));
        createNewTrip();
    };


    useEffect(() => {
        if (selectedOption === "search-longweekends") {
            setLoading(true);
            setLoaderText("Searching Long Weekends...");
            fetchImportanDates().then((res: any) => {
                setDateRange(Array.isArray(res?.data) ? (res.data as IImportantDateResponse[]) : []);
            }).finally(() => setLoading(false));
        }
    }, [selectedOption]);

    return (
        <section className="h-[400px] w-full">
            <section className="flex justify-center items-center h-full w-full">
                <TextLoader text={loaderText} loading={loading} />

                {!loading && dateRange && (
                    <section className="flex w-full max-w-[340px] h-full mt-10 flex-col gap-4 items-center justify-center w-full">
                        <header className="flex flex-col gap-1">
                            <h2 className="text-base font-semibold text-white">Search Long Weekend Dates Calendar</h2>
                            <p className="text-sm leading-snug text-[#8b8c89]">
                                View and select date range to create your long weekend itinerary.
                            </p>
                        </header>
                        <Calendar date={dateRange} rangeClickHandler={rangeClickHandler} />
                    </section>
                )}
            </section>
        </section>
    );
};

export default RightSection;