import React  from "react";
import { useChatContext } from "../../Chat";
import type IItineraryPannel from "./IItineraryPannel";
import EmptyItinerary from "./EmptyItinerary/EmptyItinerary";
import Header from "./Header/Header";

const ItineraryPannel: React.FC<IItineraryPannel> = () => {
    const { finalItinerary } = useChatContext();
    if (!finalItinerary) {
        return <EmptyItinerary/>;
    }
    console.log(finalItinerary);

    return (
        <section className="h-full">
            <Header title={finalItinerary.itineraryTitle} startDate={finalItinerary.startDate} endDate={finalItinerary.endDate}  countUserOnTrip={finalItinerary.countUserOnTrip} budget={finalItinerary.budget} />
        </section>
    );
};

export default ItineraryPannel;