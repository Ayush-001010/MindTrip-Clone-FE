import React from "react";
import type IDestinationResponse from "./IDestinationResponse";
import { useChatContext } from "../../../Pages/Chat/Chat";
import { Tooltip } from "antd";

const DestinationResponse: React.FC<IDestinationResponse> = ({ data }) => {
    const { setIsSelectedLocation, setLocationLongitude, setLocationLatitude, setDestination } = useChatContext();
    const { description, suggestedDestination } = data;

    const selectLocation = (longitude: number, latitude: number, suggestedDestination: any) => {
        if (setIsSelectedLocation && setLocationLongitude && setLocationLatitude) {
            setIsSelectedLocation(true);
            setLocationLongitude(longitude);
            setLocationLatitude(latitude);
            if (setDestination) {
                setDestination(suggestedDestination);
            }
        }
    }

    return (
        <div className="max-w-[85%] space-y-4 rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 px-4 py-3 shadow-sm">
            <p className="text-sm leading-relaxed text-[#f8f9fa]">
                {description}
            </p>
            <div className="space-y-3">
                {suggestedDestination.length > 0 && <p className="text-sm font-semibold text-white">Suggested Destinations:</p>}
                {suggestedDestination.map(({ name, reason, bestTimeToVisit, activities, popularAttractions, crowded, isCrowded, cordinates }) => (
                    <div key={name} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 transition-colors duration-200 hover:border-sky-300/40 hover:bg-white/[0.06]">
                        <p className="flex flex-wrap items-start gap-x-1">
                            <Tooltip title={`Want to explore ${name}? Click to select this location.`} placement="top">
                                <span className="cursor-pointer text-sm font-semibold text-sky-300 underline underline-offset-2 hover:text-sky-200" onClick={() => selectLocation(cordinates.longitude, cordinates.latitude, { name, reason, bestTimeToVisit, activities, popularAttractions, crowded, isCrowded, cordinates })}>{name}:</span>
                            </Tooltip>
                            <span className="text-sm leading-relaxed text-[#e9ecef]">{reason}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DestinationResponse;