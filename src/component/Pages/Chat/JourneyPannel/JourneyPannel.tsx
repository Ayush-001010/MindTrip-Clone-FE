import React, { useEffect, useState } from "react";
import type IJourneyPannel from "./IJourneyPannel";
import ToogleSwitch from "./ToggleSwitch/ToggleSwitch";
import LocationPannel from "./LocationPannel/LocationPannel";
import { useChatContext } from "../Chat";

const JourneyPannel: React.FC<IJourneyPannel> = () => {
    const [pannelType, setPannelType] = useState<"location" | "trip">("location");
    const { isSelectedLocation, locationLatitude, locationLongitude } = useChatContext();
    const hasSelectedCoordinates = locationLatitude !== 0 || locationLongitude !== 0;

    useEffect(() => {
        if (isSelectedLocation) {
            setPannelType("location");
        }
    }, [isSelectedLocation]);

    return (
        <div className="m-3 flex h-185 w-1/2 flex-col p-4 bg-[#121113] rounded-xl ">
            <div className="flex justify-end">
                <ToogleSwitch active={pannelType} />
            </div>
            <div className="mt-4 min-h-0 flex-1 overflow-hidden ">
                {(pannelType === "location" && (isSelectedLocation || hasSelectedCoordinates)) && (
                    <LocationPannel />
                )}
            </div>
        </div>
    );
};

export default JourneyPannel;