import React from "react";
import type IItineraryPannel from "./IItineraryPannel";
import EmptyItinerary from "./EmptyItinerary/EmptyItinerary";

const ItineraryPannel: React.FC<IItineraryPannel> = () => {

    return (
        <section className="h-full">
            <EmptyItinerary />
        </section>
    );
};

export default ItineraryPannel;