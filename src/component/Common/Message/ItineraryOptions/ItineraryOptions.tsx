import React from "react";
import type IItineraryOptionsInterface from "./IItineraryOptions";
import ItineraryPlan from "./ItineraryPlan/ItineraryPlan";
import { FaPoll } from "react-icons/fa";
import { useChatContext } from "../../../Pages/Chat/Chat";

const ItineraryOptions: React.FC<IItineraryOptionsInterface> = ({ itineraryOptions }) => {

    const {createActionHandler} = useChatContext();

    const handlePollClick = () => {
        createActionHandler("poll","Which itinerary option do you prefer?", itineraryOptions.plans[0].itinerary.map(item => item.title).join(", ") , itineraryOptions.plans[1].itinerary.map(item => item.title).join(", ") , itineraryOptions.plans[2]?.itinerary.map(item => item.title).join(", ")  , "None of the above");
    }

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
            <section className="mb-3 flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-sky-400/10 px-2.5 py-1 text-xs font-semibold text-sky-300">
                    {itineraryOptions.days} day{itineraryOptions.days === 1 ? "" : "s"} trip
                </span>
                <span onClick={handlePollClick} className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-300 transition-colors duration-200 hover:bg-amber-400/20">
                    Poll <FaPoll className="h-3 w-3" />
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