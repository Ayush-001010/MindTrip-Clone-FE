import React, { useEffect, useState } from "react";
import type IActivityBox from "./IActivityBox";

import { FaLocationDot } from "react-icons/fa6";
import useCommonActivities from "../../../../../../../CustomHooks/useCommonActivities";

const ActivityBox: React.FC<IActivityBox> = ({ activity, setLongitude, setLatitude }) => {
    const [placeImageURL, setPlaceImageURL] = useState<string>("https://d2uqdcpehc2tdl.cloudfront.net/ExploreTrip/Manali.jpg");
    const { getPlaceImage } = useCommonActivities();

    const getPlaceImageURL = async (placeName: string) => {
        const imageURL = await getPlaceImage(placeName);
        setPlaceImageURL(imageURL ?? "https://d2uqdcpehc2tdl.cloudfront.net/ExploreTrip/Manali.jpg");
        console.log("Fetched place image URL:", imageURL);
    }
    const genratedTimingUI = (time: "Morning" | "Afternoon" | "Evening" | "Whole Day") => {
        switch (time) {
            case "Morning":
                return "🌅 Morning";
            case "Afternoon":
                return "🌞 Afternoon";
            case "Evening":
                return "🌇 Evening";
            case "Whole Day":
                return "🗓️ Whole Day";
            default:
                return "No Time Specified";
        }
    }

    useEffect(() => {
        if (activity?.cityName) {
            getPlaceImageURL(activity.cityName);
        }
    }, [activity]);

    const timingLabel = genratedTimingUI(activity?.time ?? "No Time Specified" as "Morning" | "Afternoon" | "Evening" | "Whole Day");

    return (
        <section className="group flex gap-4 rounded-2xl border border-white/10 bg-white/6 p-3 shadow-[0_14px_40px_rgba(15,23,42,0.24)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/30 hover:bg-white/10 hover:shadow-[0_22px_56px_rgba(14,165,233,0.18)]">
            <section className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-slate-800 shadow-lg ring-1 ring-white/10 sm:h-32 sm:w-32">
                <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={placeImageURL}
                    alt={activity?.cityName ?? "Place"}
                />
            </section>
            <section className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="flex items-center gap-2 pr-2 text-lg font-bold tracking-tight text-[#e9ecef]">
                        {activity?.cityName ?? "Unknown City"}
                        <button
                            type="button"
                            onClick={() => {
                                setLongitude(activity.coordinates.longitude);
                                setLatitude(activity.coordinates.latitude);
                            }}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/12 text-sm text-slate-100 shadow-sm ring-1 ring-white/10 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-sky-300/40 hover:bg-sky-400/15 hover:text-sky-100 hover:shadow-md"
                        >
                            <FaLocationDot />
                        </button>
                    </p>
                    <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-2.5 py-1 text-[11px] font-semibold text-amber-100">
                        {timingLabel}
                    </span>
                </div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#adb5bd]">
                    Activity
                    <span className="ml-2 normal-case tracking-normal text-[#e9ecef]">
                        {activity?.activityName ?? "Unknown Activity"}
                    </span>
                </p>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#dee2e6]">
                    {activity?.description ?? "No Description Available"}
                </p>
            </section>
        </section>
    );
};

export default ActivityBox;