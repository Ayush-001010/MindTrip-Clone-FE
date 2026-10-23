import React, { useEffect, useState } from "react";
import type IItineraryPlanInterface from "./IItineraryPlan";
import { useChatContext } from "../../../../Pages/Chat/Chat";

const ItineraryPlan: React.FC<IItineraryPlanInterface> = ({ plan }) => {
    const [uniquePlaces , setUniquePlaces] = useState<string[]>([]);
    const [uniqueActivities, setUniqueActivities] = useState<string[]>([]);
    const {setIsSelectedItineraryPlan,setItineraryPlan} = useChatContext();

    const planTypeGenration = (planType:string) => {
        if(planType === 'A') return "Plan A";
        else if(planType === 'B') return "Plan B";
        else if(planType === 'C') return "Plan C";
        else return planType;
    }
    useEffect(() => {
        const places = new Set<string>();
        const activities = new Set<string>();

        plan.itinerary.forEach(item => {
            item.activities.forEach(activity => {
                places.add(activity.cityName);
                activities.add(activity.activityName);
            });
        })

        setUniquePlaces(Array.from(places));
        setUniqueActivities(Array.from(activities));
    }, [plan]);
    
    return (
        <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors duration-200 hover:border-sky-300/30">
            {/* Plan Type */}
            <section className="mb-1 flex items-center justify-between">
                <p className="text-base font-bold text-[#f8f9fa]">{planTypeGenration(plan.planType)}</p>
            </section>
            {/* Plan Theme */}
            <section className="mb-3">
                <p className="text-xs text-[#adb5bd]">
                    Theme: <span className="text-[#dee2e6]">{plan.theme}</span>
                </p>
            </section>
            {/* Unique Places */}
            <section className="mb-3">
                <p className="mb-1.5 text-xs font-medium text-[#adb5bd]">Places To Visit</p>
                <div className="flex flex-wrap gap-1.5">
                    {uniquePlaces.map((place, index) => <span className="rounded-full bg-[#ced4da] px-2 py-1 text-xs font-semibold text-[#343a40]" key={`place${plan.planType}-${index}`}>{place}</span>)}
                </div>
            </section>
            {/* Unique Activities */}
            <section className="mb-3">
                <p className="mb-1.5 text-xs font-medium text-[#adb5bd]">Activities To Do</p>
                <div className="flex flex-wrap gap-1.5">
                    {uniqueActivities.map((activity, index) => <span className="rounded-full bg-[#ced4da] px-2 py-1 text-xs font-semibold text-[#343a40]" key={`activity${plan.planType}-${index}`}>{activity}</span>)}
                </div>
            </section>
            {/* See More Button */}
            <section>
                <button onClick={() => {
                    if(setIsSelectedItineraryPlan) setIsSelectedItineraryPlan(true), setItineraryPlan && setItineraryPlan(plan);
                }} className="cursor-pointer rounded-full bg-[#f8f9fa] px-3 py-1.5 text-xs font-semibold text-[#000] shadow transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#adb5bd] hover:shadow-md">See More</button>
            </section>
        </section>
    );
};

export default ItineraryPlan;