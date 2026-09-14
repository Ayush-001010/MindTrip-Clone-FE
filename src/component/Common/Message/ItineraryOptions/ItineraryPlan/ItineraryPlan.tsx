import React, { useEffect, useState } from "react";
import type IItineraryPlanInterface from "./IItineraryPlan";

const ItineraryPlan: React.FC<IItineraryPlanInterface> = ({ plan }) => {
    const [uniquePlaces , setUniquePlaces] = useState<string[]>([]);
    const [uniqueActivities, setUniqueActivities] = useState<string[]>([]);

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
        <section className="mb-4 p-4 border border-gray-700 p-4 rounded-lg">
            {/* Plan Type */}
            <section>
                <p className="text-lg font-bold text-[#fff]">{planTypeGenration(plan.planType)}</p>
            </section>
            {/* Plan Theme */}
            <section className="mb-4">
                <p className="text-xs text-[#adb5bd]">
                    Theme: <span>{plan.theme}</span>
                </p>
            </section>
            {/* Unique Places */}
            <section className="mb-4 ">
                <p className="text-sm text-[#adb5bd] w-full">Places To Visit:</p>
                <p className="flex flex-wrap">
                    {uniquePlaces.map((place, index) => <span className="bg-[#ced4da] m-1 font-semibold text-[#343a40] p-1 rounded-full text-xs" key={`place${plan.planType}-${index}`}>{place}</span>)}
                </p>
            </section>
            {/* Unique Activities */}
            <section className="mb-4">
                <p className="text-sm text-[#adb5bd] w-full">Activities To Do:</p>
                <p className="flex flex-wrap">
                    {uniqueActivities.map((activity, index) => <span className="bg-[#ced4da] m-1 font-semibold text-[#343a40] p-1 rounded-full text-xs" key={`activity${plan.planType}-${index}`}>{activity}</span>)}
                </p>
            </section>
            {/* See More Button */}
            <section>
                <button className="m-1 rounded-full bg-[#f8f9fa] cursor-pointer p-1 text-xs font-semibold text-[#000] shadow transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#adb5bd] hover:shadow-md">See More</button>
            </section>
        </section>
    );
};

export default ItineraryPlan;