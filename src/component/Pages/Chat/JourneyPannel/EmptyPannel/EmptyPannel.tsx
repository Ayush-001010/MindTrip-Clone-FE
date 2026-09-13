import React from "react";
import type IEmptyPannel from "./IEmptyPannel";

const EmptyPannel : React.FC<IEmptyPannel> = () => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <p>Chat with MindTrip AI to craft your perfect itinerary.</p>
        </div>
    );
};

export default EmptyPannel;