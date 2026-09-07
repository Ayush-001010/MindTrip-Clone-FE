import React from "react";
import type IDestinationResponse from "./IDestinationResponse";
import { useChatContext } from "../../../Pages/Chat/Chat";

const DestinationResponse: React.FC<IDestinationResponse> = ({ data }) => {
    const { setIsSelectedLocation, setLocationLongitude, setLocationLatitude , setDestination } = useChatContext();
    const { description, suggestedDestination } = data;

    const selectLocation = (longitude: number, latitude: number , suggestedDestination: any) => {
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
            <p className="text-sm leading-7 text-slate-600">
                {description}
            </p>
            <div className="space-y-4">
                {suggestedDestination.map(({ name, reason, bestTimeToVisit , activities , popularAttractions , crowded , isCrowded , cordinates}) => (
                    <div key={name} className="rounded-[1.3rem] border border-slate-200/90 bg-white/88 p-4 shadow-[0_16px_32px_rgba(148,163,184,0.12)]">
                        <p className="flex flex-wrap items-start gap-2 text-slate-600">
                            <span className="cursor-pointer rounded-full border border-sky-200/90 bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700 transition hover:bg-sky-100" onClick={()=>selectLocation(cordinates.longitude, cordinates.latitude, { name, reason, bestTimeToVisit , activities , popularAttractions , crowded , isCrowded , cordinates })}>{name}</span>
                            <span className="pt-1 text-sm leading-6 text-slate-600">{reason}</span>
                        </p>
                        <p className="mt-3 text-sm text-slate-500">Best Time To Visit:
                            <span className="ml-2 font-medium text-slate-700">{bestTimeToVisit}</span>
                        </p>
                        <p className="mt-3 text-sm text-slate-500">Activities:
                            {activities.map(({ activityName, description }) => (
                                <span key={activityName} className="ml-2 inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700">
                                    {activityName}: {description}
                                </span>
                            ))}
                        </p>
                        <p className="mt-3 text-sm text-slate-500">Popular Attractions:
                            {popularAttractions.map(({ attractionName, description }) => (
                                <span key={attractionName} className="ml-2 inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700">
                                    {attractionName}: {description}
                                </span>
                            ))}
                        </p>
                        <p className="mt-3 text-sm text-slate-500">Crowded Level:
                            {isCrowded ? (
                                <span className="ml-2 inline-flex flex-wrap gap-2 align-middle">
                                    {crowded.map(({ level, description }) => (
                                        <span key={level} className="inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700">
                                            {level}: {description}
                                        </span>
                                    ))}
                                </span>
                            ) : (
                                <span className="ml-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700">Not Crowded</span>
                            )}
                        </p>
                        <p className="mt-3 text-sm text-slate-500">Famous Food:
                            {activities.map(({ activityName, description }) => (
                                <span key={activityName} className="ml-2 inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700">
                                    {activityName}: {description}
                                </span>
                            ))}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DestinationResponse;