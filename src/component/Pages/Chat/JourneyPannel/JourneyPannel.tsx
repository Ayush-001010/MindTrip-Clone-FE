import React, { useEffect, useState } from "react";
import type IJourneyPannel from "./IJourneyPannel";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import LocationPannel from "./Tabs/LocationPannel/LocationPannel";
import { useChatContext } from "../Chat";
import ItineraryPannel from "./Tabs/ItineraryPannel/ItineraryPannel";
import EmptyPannel from "./Tabs/EmptyPannel/EmptyPannel";
import ItineraryPlan from "./Tabs/ItineraryPlan/ItineraryPlan";
import HotelPannel from "./Tabs/HotelPannel/HotelPannel";
import { useParams } from "react-router-dom";
import TripNotCreated from "./Tabs/ItineraryPannel/EmptyItinerary/TripNotCreated/TripNotCreated";
import GroupHub from "./Tabs/GroupHub/GroupHub";

const JourneyPannel: React.FC<IJourneyPannel> = () => {
    const [pannelType, setPannelType] = useState<"location" | "trip" | "split-wise" | "user-chats">("trip");
    const { isSelectedLocation, locationLatitude, locationLongitude, isSelectedItineraryPlan, showHotelInLocationPannel } = useChatContext();
    const hasSelectedCoordinates = locationLatitude !== 0 || locationLongitude !== 0;
    const {tripId} = useParams(); 

    const genratedUI = () => {
        if(!tripId) {
            return <TripNotCreated />;
        }
        switch (pannelType) {
            case "trip":
                return isSelectedItineraryPlan ? <ItineraryPlan /> : <ItineraryPannel />;
            case "location":
                if (showHotelInLocationPannel) {
                    return <HotelPannel />;
                }
                return (isSelectedLocation || hasSelectedCoordinates) ? <LocationPannel /> : <EmptyPannel />;
            case "split-wise":
                return <EmptyPannel />;
            case "user-chats":
                return <GroupHub />;
        }
    }
    
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
        <main className="m-3 flex h-185 w-1/2 flex-col p-4 bg-[#121113] rounded-xl ">
            <section className="flex justify-end">
                <ToggleSwitch active={pannelType} setActive={setPannelType} />
            </section>
            <section className="mt-4 min-h-0 flex-1 overflow-hidden ">
                {genratedUI()}
            </section>
        </main>
    );
};

export default JourneyPannel;