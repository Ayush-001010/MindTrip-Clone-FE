import React, { useEffect, useState } from "react";
import type IBody from "./IBody";
import Hotel from "./Hotel/Hotel";
import { useGetBlogContext } from "../Blog";
import Map from "../../../Common/Map/Map";
import Activity from "./Activity/Activity";
import { MdFlightTakeoff } from "react-icons/md";
import { TbBus } from "react-icons/tb";
import { Tooltip } from "antd";
import Travel from "./Travel/Travel";
import Loader from "./Loader/Loader";
import { CiMap } from "react-icons/ci";
import { RiGlobeLine } from "react-icons/ri";
import Globe from "../../../Common/Globe/Globe";
import { BsCameraReels } from "react-icons/bs";
import Animation from "../../Blog/Animation/Animation";

const Body: React.FC<IBody> = ({ }) => {
    const { mode, blogValue, selectedDay, mapMarkerPoints, selectedLongitude, selectedLatitude } = useGetBlogContext();
    const [isTravelSectionVisible, setIsTravelSectionVisible] = useState({
        isVisible: false,
        indexNumber: -1
    });
    const [view, setView] = useState<"map" | "globe" | "animation">("map");
    const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const selectTravelHandler = (index: number) => {
        setIsTravelSectionVisible({
            isVisible: true,
            indexNumber: index
        });
    };

    useEffect(() => {
        const obj = setTimeout(() => {
            if (!isLoading) return;
            setIsLoading(false);
        }, 500); // Adjust the delay as needed
        return () => clearTimeout(obj);
    }, [isLoading]);

    useEffect(() => {
        setIsLoading(true);
    }, [selectedDay]);


    return (
        <div className="flex w-full flex-col gap-4 p-3 sm:p-4 lg:flex-row">
            <section className="h-[60dvh] min-h-[320px] w-full overflow-y-auto pr-2 lg:h-[630px] lg:w-1/2">
                {isLoading && <Loader />}
                {(mode === "create" || (blogValue?.hotel ?? []).length > 0) && (
                    <section className="flex justify-end">
                        <button onClick={() => setIsHotelModalOpen(true)} className="rounded-lg border-1 border-[#495057] p-1 w-[60px] text-[#ced4da] cursor-pointer hover:bg-[#343a40] transition-all duration-300">
                            Hotel
                        </button>
                    </section>
                )}
                {!isLoading && blogValue?.activities.map((activityItem, index) => {
                    if (activityItem.day !== selectedDay) return null;
                    const activitiesInThisDay = blogValue?.activities.filter(activity => activity.day === selectedDay);
                    let lastActivity: boolean = true;
                    activitiesInThisDay.forEach((activity) => {
                        if (activity.index > activityItem.index) lastActivity = false;
                    });
                    // a saved blog only shows the transfer between two activities when one was recorded
                    const showTravelConnector = !lastActivity;
                    return (
                        <section key={index}>
                            <Activity indexNumber={index} blogActivity={activityItem} />
                            {showTravelConnector && (
                                <section className="mt-2 flex items-center gap-3">
                                    <section className="my-1 flex w-16 shrink-0 flex-col items-center cursor-pointer sm:w-28">
                                        <span className="h-20 w-0.5 border-l-2 border-dashed border-[#6c757d]" />
                                        {mode !== "preview" && (
                                            <Tooltip title="Travel Options">
                                                <span onClick={() => selectTravelHandler(index)} className="flex h-14 w-14 shrink-0 items-center justify-center gap-1.5 rounded-full border border-[#343a40] bg-[#212529] text-base text-white transition-all duration-300 hover:bg-[#343a40] hover:font-bold">
                                                    <MdFlightTakeoff />
                                                    <span className="text-gray-400 text-xs">/</span>
                                                    <TbBus />
                                                </span>
                                            </Tooltip>
                                        )}
                                        <span className="h-20 w-0.5 border-l-2 border-dashed border-[#6c757d]" />
                                    </section>
                                    {((mode === "preview") || (isTravelSectionVisible.isVisible && isTravelSectionVisible.indexNumber === index)) && (
                                        <Travel activityIndexNumber={activityItem.index} />
                                    )}
                                </section>
                            )}
                        </section>
                    )
                })}
            </section>
            <section className="flex h-[320px] w-full min-w-0 flex-col sm:h-[420px] lg:h-[630px] lg:w-1/2">
                <section className="flex w-fit shrink-0 rounded-t-lg border border-b-0 border-zinc-800 bg-zinc-900">
                    <button type="button" aria-label="Show map" aria-pressed={view === "map"} className="cursor-pointer rounded-tl-lg border-r border-zinc-800 p-2 text-zinc-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400 aria-pressed:bg-zinc-800 aria-pressed:text-white" onClick={() => setView("map")}>
                        <CiMap className="text-lg" />
                    </button>
                    <button type="button" aria-label="Show globe" aria-pressed={view === "globe"} className="cursor-pointer rounded-tr-lg p-2 text-zinc-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400 aria-pressed:bg-zinc-800 aria-pressed:text-white" onClick={() => setView("globe")}>
                        <RiGlobeLine className="text-lg" />
                    </button>
                    <button type="button" aria-label="Show animation" aria-pressed={view === "animation"} className="cursor-pointer rounded-tr-lg p-2 text-zinc-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400 aria-pressed:bg-zinc-800 aria-pressed:text-white" onClick={() => setView("animation")}>
                        <BsCameraReels className="text-lg" />
                    </button>
                </section>
                <section className="min-h-0 flex-1 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-lg shadow-black/30">
                    {view === "map" && <Map markerPoints={mapMarkerPoints} longitude={selectedLongitude} latitude={selectedLatitude} />}
                    {view === "globe" && (
                        <Globe type="blog" places={(blogValue?.activities ?? [])
                            .filter((activity) => activity.placeName && activity.coordinates &&
                                Number.isFinite(activity.coordinates.latitude) && Number.isFinite(activity.coordinates.longitude) &&
                                (activity.coordinates.latitude !== 0 || activity.coordinates.longitude !== 0))
                            .map((activity) => ({
                                longitude: activity.coordinates.longitude,
                                latitude: activity.coordinates.latitude,
                                placeName: activity.placeName,
                            }))} onSelectPlace={() => {}} />
                    )}
                    {view === "animation" && (
                        <Animation />
                    )}
                </section>
            </section>
            <Hotel open={isHotelModalOpen} onClose={() => setIsHotelModalOpen(false)} />
        </div>
    );
};

export default Body;