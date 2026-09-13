import React from "react";
import type ILocationPannel from "./ILocationPannel";
import Map from "../../../../Common/Map/Map";
import { useChatContext } from "../../Chat";
import Header from "./Header/Header";
import BestTimeToVisit from "./BestTimeToVisit/BestTimeToVisit";
import Activities from "./Activities/Activities";
import Crowed from "./Crowed/Crowed";

const LocationPannel: React.FC<ILocationPannel> = () => {
    const { locationLatitude, locationLongitude, destination } = useChatContext();
    const selectedDestinationName = destination?.name || "Selected Location";
    const destLongitude = destination?.cordinates?.longitude ?? locationLongitude;
    const destLatitude = destination?.cordinates?.latitude ?? locationLatitude;

    return (
        <section className="flex h-full min-h-0 flex-col gap-4 overflow-y-auto">
            <Header destinationName={selectedDestinationName} longitude={destLongitude} latitude={destLatitude} />
            <section className="h-[40vh] min-h-[16rem] shrink-0 overflow-hidden rounded-[1.1rem] border border-slate-200 bg-white shadow-[0_12px_24px_rgba(148,163,184,0.14)]">
                <Map latitude={locationLatitude} longitude={locationLongitude} hotels={[]} markerPoints={[[locationLatitude, locationLongitude]]} />
            </section>
            <section className="shrink-0 flex justify-between">
                <BestTimeToVisit bestTimeToVisit={destination?.bestTimeToVisit || null} />
                <Crowed crowedLevel={destination?.crowded[0].level || ""} description={destination?.crowded[0].description || ""} />
            </section>
            <section className="shrink-0">
                <Activities activities={destination?.activities || []} />
            </section>
        </section>
    );
};

export default LocationPannel;