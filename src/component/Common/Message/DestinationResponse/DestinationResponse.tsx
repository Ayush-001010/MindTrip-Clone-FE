import React from "react";
import type IDestinationResponse from "./IDestinationResponse";

const DestinationResponse: React.FC<IDestinationResponse> = ({ data }) => {
    const { description, suggestedDestination } = data;

    return (
        <div className="space-y-4">
            <p className="text-sm text-[#e9ecef]">
                {description}
            </p>
            <div className="space-y-4">
                {suggestedDestination.map(({ name, reason, bestTimeToVisit , activities , popularAttractions , crowded , isCrowded}) => (
                    <div>
                        <p className="flex">
                            <span className="mr-2 underline cursor-pointer text-[#e9ecef]">{name}: </span>
                            <span className="">{reason}</span>
                        </p>
                        <p>Best Time To Visit: 
                            <span>{bestTimeToVisit}</span>
                        </p>
                        <p>Activities: 
                            {activities.map(({ activityName, description }) => (
                                <span key={activityName} className="ml-2">
                                    {activityName}: {description}
                                </span>
                            ))}
                        </p>
                        <p>Famous Food:
                            {activities.map(({ activityName, description }) => (
                                <span key={activityName} className="ml-2">
                                    {activityName}: {description}
                                </span>
                            ))}
                        </p>
                        <p>Popular Attractions: 
                            {popularAttractions.map(({ attractionName, description }) => (
                                <span key={attractionName} className="ml-2">
                                    {attractionName}: {description}
                                </span>
                            ))}
                        </p>
                        <p>Crowded Level:
                            {isCrowded ? (
                                <div>
                                    {crowded.map(({ level, description }) => (
                                        <span key={level} className="ml-2">
                                            {level}: {description}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <span className="ml-2">Not Crowded</span>
                            )}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DestinationResponse;