import React from "react";
import type ILocationPannel from "./ILocationPannel";
import Map from "../../../../Common/Map/Map";
import { useChatContext } from "../../Chat";

const LocationPannel : React.FC<ILocationPannel> = () => {
    const {locationLatitude , locationLongitude} = useChatContext();

    return (
        <div className="h-full overflow-hidden rounded-[1.1rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.96))] p-1 shadow-[0_18px_32px_rgba(148,163,184,0.16)]">
            <Map latitude={locationLatitude} longitude={locationLongitude} hotels={[]} markerPoints={[[locationLatitude, locationLongitude]]} />
        </div>
    );
};

export default LocationPannel;