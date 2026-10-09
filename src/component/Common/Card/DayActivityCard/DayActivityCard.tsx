import React, { useEffect, useState } from "react";
import type IDayActivityCard from "./IDayActivityCard";
import useCommonActivities from "../../../../CustomHooks/useCommonActivities";
import { FaUsers } from "react-icons/fa6";

const TIME_LABEL = {
    "Morning": "🌅 Morning",
    "Afternoon": "🌞 Afternoon",
    "Evening": "🌇 Evening",
    "Whole Day": "🗓️ Whole Day",
} as const;

const CROWD_STYLE = {
    Low: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
    Medium: "border-amber-300/30 bg-amber-400/10 text-amber-100",
    High: "border-rose-300/30 bg-rose-400/10 text-rose-100",
} as const;

const DayActivityCard: React.FC<IDayActivityCard> = ({ activity }) => {
    const { getPlaceImage } = useCommonActivities();
    const [placeImageURL, setPlaceImageURL] = useState<string>("https://d2uqdcpehc2tdl.cloudfront.net/ExploreTrip/Manali.jpg");

    const getPlaceImageURL = async (placeName: string) => {
        const imageURL = await getPlaceImage(placeName);
        setPlaceImageURL(imageURL ?? "https://d2uqdcpehc2tdl.cloudfront.net/ExploreTrip/Manali.jpg");
    }

    useEffect(() => {
        if (activity?.placeName) {
            getPlaceImageURL(activity.placeName);
        }
    }, [activity]);

    return (
        <section className="group flex gap-4 rounded-2xl border border-white/10 bg-white/6 p-3 shadow-[0_14px_40px_rgba(15,23,42,0.24)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/30 hover:bg-white/10 hover:shadow-[0_22px_56px_rgba(14,165,233,0.18)]">
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-slate-800 shadow-lg ring-1 ring-white/10 sm:h-32 sm:w-32">
                <img
                    src={placeImageURL}
                    alt={activity.placeName}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="pr-2 text-lg font-bold tracking-tight text-[#e9ecef]">{activity.placeName}</p>
                    {activity.time && (
                        <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-2.5 py-1 text-[11px] font-semibold text-amber-100">
                            {TIME_LABEL[activity.time] ?? activity.time}
                        </span>
                    )}
                </div>
                {activity.crowded?.level && (
                    <p className={`mt-1.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${CROWD_STYLE[activity.crowded.level]}`} title={activity.crowded.description}>
                        <FaUsers /> {activity.crowded.level} crowd
                    </p>
                )}
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#dee2e6]">{activity.description}</p>
            </div>
        </section>
    );
};

export default DayActivityCard;