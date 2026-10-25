import React from "react";
import { useChatContext } from "../../../Chat";
import type IItineraryPannel from "./IItineraryPannel";
import EmptyItinerary from "./EmptyItinerary/EmptyItinerary";
import Header from "./Header/Header";
import ItineraryCard from "../../../../../Common/Card/ItineraryCard/ItineraryCard";

const ItineraryPannel: React.FC<IItineraryPannel> = () => {
    const { finalItinerary } = useChatContext();
    if (!finalItinerary) {
        return <EmptyItinerary />;
    }

    return (
        <section className="flex h-full min-h-0 flex-col">
            <Header title={finalItinerary.itineraryTitle} startDate={finalItinerary.startDate} endDate={finalItinerary.endDate} countUserOnTrip={finalItinerary.countUserOnTrip} budget={finalItinerary.budget} />
            <div className="min-h-0 flex-1 mt-4 overflow-y-auto pr-1">
                <ItineraryCard days={finalItinerary?.days || []} mode="edit" tips={finalItinerary?.travelTips || []}>
                    <section className="flex justify-end gap-2 my-2">
                        <ItineraryCard.ItineraryHotel />
                        <ItineraryCard.ItineraryTips />
                    </section>
                    <ItineraryCard.ItineraryActivity />
                </ItineraryCard>
            </div>
        </section>
    );
};

export default ItineraryPannel;