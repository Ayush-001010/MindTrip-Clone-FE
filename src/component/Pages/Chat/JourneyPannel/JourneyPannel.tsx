import React, { useEffect, useState } from "react";
import type IJourneyPannel from "./IJourneyPannel";
import ToogleSwitch from "./ToggleSwitch/ToggleSwitch";
import LocationPannel from "./LocationPannel/LocationPannel";
import { useChatContext } from "../Chat";

const JourneyPannel: React.FC<IJourneyPannel> = () => {
    const [pannelType, setPannelType] = useState<"location" | "trip">("location");
    const { isSelectedLocation } = useChatContext();

    useEffect(() => {
        if (isSelectedLocation) {
            setPannelType("location");
        } else {
            setPannelType("trip");
        }
    }, [isSelectedLocation]);

    return (
        <div className="m-3 flex h-185 w-1/2 flex-col rounded-[1.75rem] border border-amber-900/20 bg-[#1a1512]/72 p-4 shadow-[0_24px_48px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <div className="flex justify-end">
                <ToogleSwitch />
            </div>
            <div className="mt-4 flex-1 overflow-hidden rounded-[1.35rem] border border-amber-900/15 bg-[#100d0b]/70 p-2">
                {(pannelType === "location" && isSelectedLocation) && (
                    <LocationPannel />
                )}
            </div>
        </div>
    );
};

export default JourneyPannel;