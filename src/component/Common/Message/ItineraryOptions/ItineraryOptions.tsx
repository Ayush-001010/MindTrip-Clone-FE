import React from "react";
import type IItineraryOptionsInterface from "./IItineraryOptions";
import ItineraryPlan from "./ItineraryPlan/ItineraryPlan";

const ItineraryOptions: React.FC<IItineraryOptionsInterface> = ({ itineraryOptions }) => {
    return (
        <section className="mt-4 max-w-[85%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 px-4 py-3 shadow-sm">
            {/* Destination of the itinerary */}
            <section className="mb-1">
                <p className="text-xl font-bold text-[#f8f9fa]">{itineraryOptions.destination}</p>
            </section>
            {/* Description of the itinerary */}
            <section className="mb-3">
                <p className="text-sm leading-relaxed text-[#adb5bd]">{itineraryOptions.description}</p>
            </section>
            {/* Number of days */}
            <section className="mb-3">
                <span className="inline-flex items-center rounded-full bg-sky-400/10 px-2.5 py-1 text-xs font-semibold text-sky-300">
                    {itineraryOptions.days} day{itineraryOptions.days === 1 ? "" : "s"} trip
                </span>
            </section>
            {/* Itinerary plan */}
            <section className="flex flex-col gap-3">
                {itineraryOptions.plans.map((plan, index) => <ItineraryPlan key={`itinerary-plans-${index}`} plan={plan} />)}
            </section>
        </section>
    )
};

export default ItineraryOptions;