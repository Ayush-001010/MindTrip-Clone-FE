import React, { useState }  from "react";
import { useChatContext } from "../../Chat";
import type IItineraryPannel from "./IItineraryPannel";
import EmptyItinerary from "./EmptyItinerary/EmptyItinerary";
import Header from "./Header/Header";
import ItinerarySplitWise from "./Feature/ItinerarySplitWise/ItinerarySplitWise";

const ItineraryPannel: React.FC<IItineraryPannel> = () => {
    const { finalItinerary } = useChatContext();
    const [featureSelected , setFeatureSelected] = useState<"ItineraryEdit" | "ItineraryPhotos" | "ItinerarySplitWise" | "Itinerary">("ItinerarySplitWise");
    if (!finalItinerary) {
        return <EmptyItinerary/>;
    }

    const genratedSectionDependingOnFeature = () => {
        switch (featureSelected) {
            case "ItineraryEdit":
                return <div>Edit Itinerary Section</div>;
            case "ItineraryPhotos":
                return <div>Photos Section</div>;
            case "ItinerarySplitWise":
                return <ItinerarySplitWise/>
            case "Itinerary":
                return <div>Itinerary Section</div>;
            default:
                return null;
        }
    }

    return (
        <section className="flex h-full min-h-0 flex-col">
            <Header title={finalItinerary.itineraryTitle} startDate={finalItinerary.startDate} endDate={finalItinerary.endDate}  countUserOnTrip={finalItinerary.countUserOnTrip} budget={finalItinerary.budget} />
            <div className="min-h-0 flex-1">
                {genratedSectionDependingOnFeature()}
            </div>
        </section>
    );
};

export default ItineraryPannel;