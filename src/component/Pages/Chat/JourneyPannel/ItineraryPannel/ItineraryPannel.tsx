import React, { useState }  from "react";
import { useChatContext } from "../../Chat";
import type IItineraryPannel from "./IItineraryPannel";
import EmptyItinerary from "./EmptyItinerary/EmptyItinerary";
import Header from "./Header/Header";
import ItinerarySplitWise from "./Feature/ItinerarySplitWise/ItinerarySplitWise";
import ItineraryCard from "../../../../Common/Card/ItineraryCard/ItineraryCard";

const ItineraryPannel: React.FC<IItineraryPannel> = () => {
    const { finalItinerary } = useChatContext();
    const [featureSelected , setFeatureSelected] = useState<"ItineraryEdit" | "ItineraryPhotos" | "ItinerarySplitWise" | "Itinerary">("ItineraryEdit");
    if (!finalItinerary) {
        return <EmptyItinerary/>;
    }
    console.log("Final Itinerary: ", finalItinerary);

    const genratedSectionDependingOnFeature = () => {
        switch (featureSelected) {
            case "ItineraryEdit":
                return <ItineraryCard days={finalItinerary?.days || []} mode="edit" tips={finalItinerary?.travelTips || []}>
                        <ItineraryCard.ItineraryTips/>
                        <ItineraryCard.ItineraryActivity/>
                </ItineraryCard>;
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
            <Header setFeatureSelected={setFeatureSelected} title={finalItinerary.itineraryTitle} startDate={finalItinerary.startDate} endDate={finalItinerary.endDate}  countUserOnTrip={finalItinerary.countUserOnTrip} budget={finalItinerary.budget} />
            <div className="min-h-0 flex-1 mt-4 overflow-y-auto pr-1">
                {genratedSectionDependingOnFeature()}
            </div>
        </section>
    );
};

export default ItineraryPannel;