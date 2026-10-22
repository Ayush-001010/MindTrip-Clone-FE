import React from "react";
import type IItineraryActivitiesBox from "./IItineraryActivitiesBox";
import ActivityBox from "./ActivityBox/ActivityBox";

const ItineraryActivitiesBox: React.FC<IItineraryActivitiesBox> = ({ itineraryActivities, day, title, setLongitude, setLatitude }) => {
    return (
        <section>
            <section>
                <p className="font-bold text-lg text-[#e9ecef]">Day {day.toString()}</p>
                <p className="text-[#adb5bd] text-xs">{title}</p>
            </section>
            <section className="mt-2">
                {itineraryActivities?.map((activity, index) => (
                    <section key={`activity-box-${index}`} className="flex flex-col items-center">
                        <div className="w-full border-y border-white/10 py-4">
                            <ActivityBox activity={activity} setLongitude={setLongitude} setLatitude={setLatitude} />
                        </div>
                        {index < itineraryActivities.length - 1 && (
                            <div className="flex h-12 items-center justify-center">
                                <div className="h-full w-px rounded-full bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
                            </div>
                        )}
                    </section>
                ))}
            </section>
        </section>
    );
};

export default ItineraryActivitiesBox;