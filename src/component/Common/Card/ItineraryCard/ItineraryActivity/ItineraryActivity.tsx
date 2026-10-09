import React from "react";
import type IItineraryActivity from "./IItineraryActivity";
import { useGetItineraryCardContext } from "../ItineraryCard";
import DayActivityCard from "../../DayActivityCard/DayActivityCard";

const ItineraryActivity: React.FC<IItineraryActivity> = () => {
    const { days } = useGetItineraryCardContext();
    return (
        <section className="flex flex-col gap-8 pb-6">
            {days.map((data) => {
                const { day } = data;

                return (
                    <section key={day} className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-sm font-semibold text-indigo-200 ring-1 ring-indigo-400/40">
                                Day {day}
                            </span>
                            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                        </div>
                        <div className="flex flex-col gap-4 border-l border-white/10 pl-4">
                            {data.activities.map((activity, activityIndex) => <DayActivityCard activity={activity} key={activityIndex} />)}
                        </div>
                    </section>
                )
            })}
        </section>
    );
};

export default ItineraryActivity;