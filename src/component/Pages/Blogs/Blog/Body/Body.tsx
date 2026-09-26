import React, { useEffect, useState } from "react";
import type IBody from "./IBody";
import Hotel from "./Hotel/Hotel";
import { useGetBlogContext } from "../Blog";
import Map from "../../../../Common/Map/Map";
import Activity from "./Activity/Activity";
import { MdFlightTakeoff } from "react-icons/md";
import { TbBus } from "react-icons/tb";
import { Tooltip } from "antd";
import Travel from "./Travel/Travel";
import Loader from "./Loader/Loader";

const Body: React.FC<IBody> = ({ }) => {
    const { blogValue , selectedDay, mapMarkerPoints , selectedLongitude, selectedLatitude } = useGetBlogContext();
    const [isTravelSectionVisible, setIsTravelSectionVisible] = useState({
        isVisible: false,
        indexNumber: -1
    });
    const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const selectTravelHandler = (index: number) => {
        setIsTravelSectionVisible({
            isVisible: true,
            indexNumber: index
        });
    };

    useEffect(() => {
        console.log(blogValue);
    }, [blogValue]);

    useEffect(() => {
        const obj = setTimeout(() => {
            if(!isLoading) return;
            setIsLoading(false);
        }, 500); // Adjust the delay as needed
        return () => clearTimeout(obj);
    },[isLoading]);

    useEffect(() => {
        setIsLoading(true);
    }, [selectedDay]);

    return (
        <div className="w-full flex p-4">
            <section className="w-1/2 h-[630px] overflow-y-auto pr-2">
                {isLoading && <Loader />}
                <section className="flex justify-end">
                    <button onClick={() => setIsHotelModalOpen(true)} className="rounded-lg border-1 border-[#495057] p-1 w-[60px] text-[#ced4da] cursor-pointer hover:bg-[#343a40] transition-all duration-300">
                        Hotel
                    </button>
                </section>
                { !isLoading && blogValue?.activities.map((activityItem, index) => {
                    if(activityItem.day !== selectedDay) return null;
                    return (
                        <section>
                            <Activity indexNumber={index} key={index} designArr={[
                                { type: "overview" }
                            ]} />
                            {index != blogValue?.activities.length - 1 && (
                                <section className="mt-2 flex items-center gap-3">
                                    <section className="my-1 flex w-28 shrink-0 flex-col items-center cursor-pointer">
                                        <span className="h-20 w-0.5 border-l-2 border-dashed border-[#6c757d]" />
                                        <Tooltip title="Travel Options">
                                            <span onClick={() => selectTravelHandler(index)} className="flex h-14 w-14 shrink-0 items-center justify-center gap-1.5 rounded-full border border-[#343a40] bg-[#212529] text-base text-white transition-all duration-300 hover:bg-[#343a40] hover:font-bold">
                                                <MdFlightTakeoff />
                                                <span className="text-gray-400 text-xs">/</span>
                                                <TbBus />
                                            </span>
                                        </Tooltip>
                                        <span className="h-20 w-0.5 border-l-2 border-dashed border-[#6c757d]" />
                                    </section>
                                    {isTravelSectionVisible.isVisible && isTravelSectionVisible.indexNumber === index && (
                                        <Travel activityIndexNumber={index} />
                                    )}
                                </section>
                            )}
                        </section>
                    )
                })}
            </section>
            <section className="w-1/2 shadow-lg rounded-lg p-2 h-[630px] bg-[#212529]">
                <Map markerPoints={mapMarkerPoints} longitude={selectedLongitude} latitude={selectedLatitude} />
            </section>
            <Hotel open={isHotelModalOpen} onClose={() => setIsHotelModalOpen(false)} />
        </div>
    );
};

export default Body;