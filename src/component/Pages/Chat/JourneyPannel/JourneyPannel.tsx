import React, { useEffect, useState } from "react";
import type IJourneyPannel from "./IJourneyPannel";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import LocationPannel from "./LocationPannel/LocationPannel";
import { useChatContext } from "../Chat";
import ItineraryPannel from "./Tabs/ItineraryPannel/ItineraryPannel";
import EmptyPannel from "./Tabs/EmptyPannel/EmptyPannel";
import ItineraryPlan from "./Tabs/ItineraryPlan/ItineraryPlan";
import HotelPannel from "./Tabs/HotelPannel/HotelPannel";

const JourneyPannel: React.FC<IJourneyPannel> = () => {
    const [pannelType, setPannelType] = useState<"location" | "trip">("trip");
    const { isSelectedLocation, locationLatitude, locationLongitude, isSelectedItineraryPlan, showHotelInLocationPannel } = useChatContext();
    const hasSelectedCoordinates = locationLatitude !== 0 || locationLongitude !== 0;

    useEffect(() => {
        if (isSelectedLocation) {
            setPannelType("location");
        }
    }, [isSelectedLocation]);

    useEffect(() => {
        if (isSelectedItineraryPlan) {
            setPannelType("location");
        }
    }, [isSelectedItineraryPlan]);

    useEffect(() => {
        if (showHotelInLocationPannel) {
            setPannelType("location");
        }
    }, [showHotelInLocationPannel]);


    return (
        <div className="m-3 flex h-185 w-1/2 flex-col p-4 bg-[#121113] rounded-xl ">
            <div className="flex justify-end">
                <ToggleSwitch active={pannelType} setActive={setPannelType} />
            </div>
            <div className="mt-4 min-h-0 flex-1 overflow-hidden ">
                {pannelType === "trip" && !isSelectedItineraryPlan && (
                    <ItineraryPannel />
                )}
                {((pannelType === "location" && !isSelectedItineraryPlan) && (isSelectedLocation || hasSelectedCoordinates)) && (
                    <LocationPannel />
                )}
                {(pannelType === "location" && showHotelInLocationPannel) && (
                    <HotelPannel />
                )}
                {isSelectedItineraryPlan && (
                    <ItineraryPlan />
                )}
                {((pannelType === "location" && !isSelectedItineraryPlan) && !(isSelectedLocation || hasSelectedCoordinates)) && (
                    <EmptyPannel />
                )}
            </div>
        </div>
    );
};

export default JourneyPannel;