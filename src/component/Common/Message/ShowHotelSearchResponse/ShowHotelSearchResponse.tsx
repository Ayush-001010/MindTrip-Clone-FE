import React from "react";
import type IShowHotelSearchResponse from "./IShowHotelSearchResponse";
import HotelCard from "../../Card/HotelCard/HotelCard";

const ShowHotelSearchResponse: React.FC<IShowHotelSearchResponse> = ({ data }) => {
    return (
        <section className="mb-2 max-w-[85%] space-y-3 rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-[#f8f9fa] shadow-sm">
            <p className="text-sm text-white/90">{data.agentDescription}</p>
            <div className="flex flex-col gap-4">
                {data.hotels?.map((group, groupIdx) => (
                    <div key={`${group.placeName}-${groupIdx}`} className="space-y-1.5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                            {group.placeName}
                        </p>
                        {group.description && (
                            <p className="text-xs leading-5 text-white/60">{group.description}</p>
                        )}
                        <div className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15">
                            {group.hotel?.map((hotel, hotelIdx) => (
                                <HotelCard key={`${hotel.name}-${hotelIdx}`} data={hotel} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ShowHotelSearchResponse;