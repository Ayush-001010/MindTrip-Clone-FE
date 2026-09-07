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
        <div className="space-y-4">
            <p className="text-sm  text-white">
                {description}
            </p>
            <div className="space-y-4">
                {suggestedDestination.length > 0 && <p className="text-sm font-semibold text-white">Suggested Destinations:</p>}
                {suggestedDestination.map(({ name, reason, bestTimeToVisit, activities, popularAttractions, crowded, isCrowded, cordinates }) => (
                    <div key={name}>
                        <p className="flex flex-wrap items-start">
                            <Tooltip title={`Want to explore ${name}? Click to select this location.`} placement="top">
                                <span className="cursor-pointer text-sm underline" onClick={() => selectLocation(cordinates.longitude, cordinates.latitude, { name, reason, bestTimeToVisit, activities, popularAttractions, crowded, isCrowded, cordinates })}>{name}: </span>
                            </Tooltip>
                            <span className="pt-1 text-sm text-[#e9ecef]">{reason}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DestinationResponse;