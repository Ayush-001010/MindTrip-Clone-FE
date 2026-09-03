import React from "react";
import type IJourneyPannel from "./IJourneyPannel";
import ToogleSwitch from "./ToggleSwitch/ToggleSwitch";

const JourneyPannel: React.FC<IJourneyPannel> = () => {
    return (
        <div className="w-1/2 bg-[#343a40] rounded-xl p-4 h-185 m-3">
            <div className="flex justify-end">
                <ToogleSwitch />
            </div>
        </div>
    );
};

export default JourneyPannel;