import React from "react";
import type IItineraryOptionsInterface from "./IItineraryOptions";
import ItineraryPlan from "./ItineraryPlan/ItineraryPlan";

const ItineraryOptions: React.FC<IItineraryOptionsInterface> = ({ itineraryOptions }) => {
    return (
        <section className="mt-4">
            {/* Destination of the itinerary */}
            <section className="mb-2 text-2xl text-[#f8f9fa] underline font-bold">
                <p>{itineraryOptions.destination}</p>
            </section>
            {/* Description of the itinerary */}
            <section className="mb-2">
                <p className="text-sm text-[#adb5bd]">{itineraryOptions.description}</p>
            </section>
            {/* Number of days */}
            <section className="mb-2">
                <p className="text-sm text-[#fff] font-bold">
                    Trip Duration: <span className="font-normal">{itineraryOptions.days} days</span>
                </p>
            </section>
            {/* Itinerary plan */}
            <section>
                {itineraryOptions.plans.map((plan, index) => <ItineraryPlan key={`itinerary-plans-${index}`} plan={plan} />)}
            </section>
        </section>
    )
};

export default ItineraryOptions;