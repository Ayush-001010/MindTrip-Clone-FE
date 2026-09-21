import React, { useState, useEffect } from "react";
import type IItineraryPlanInterface from "./IItineraryPlan";
import { useChatContext } from "../../Chat";
import type { IItineraryPlan } from "../../../../../Interface/DataInterface/IItineraryOptions";
import type { IMapMarkerPoint } from "../../../../Common/Map/IMap";
import Header from "./Header/Header";
import ItineraryActivitiesBox from "./ItineraryActivitiesBox/ItineraryActivitiesBox";
import Map from "../../../../Common/Map/Map";

const ItineraryPlan: React.FC<IItineraryPlanInterface> = () => {

    const { itineraryPlan } = useChatContext();
    const [itineraryPlanState, setItineraryPlanState] = useState<IItineraryPlan>();
    const [placeCoordinates, setPlaceCoordinates] = useState<IMapMarkerPoint[]>([]);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [defaultCoordinates, setDefaultCoordinates] = useState<{ longitude: number; latitude: number }>({ longitude: 0, latitude: 0 });

    const genreateCoordinatesPlace = (planData: IItineraryPlan) => {
        console.log(planData);
        const uniqueCoordinatesForPlaces: IMapMarkerPoint[] = [];
        let firstLongitude : number | null = null;
        let firstLatitude: number | null = null;
        planData.itinerary.forEach((itineraryActivities) => {
            itineraryActivities.activities.forEach((activity) => {
                const coordinates: IMapMarkerPoint = {
                    longitude: activity.coordinates.longitude,
                    latitude: activity.coordinates.latitude,
                    markerLabel:  activity.cityType === "town" ? "Town" : "Village",
                    markerDescription: activity.description
                };
                if (!uniqueCoordinatesForPlaces.some(({ longitude: lng, latitude: lat }) => lng === coordinates.longitude && lat === coordinates.latitude)) {
                    uniqueCoordinatesForPlaces.push(coordinates);
                }
                if(firstLongitude === null && firstLatitude === null) {
                    firstLongitude = activity.coordinates.longitude;
                    firstLatitude = activity.coordinates.latitude;
                }
            });
        });
        setPlaceCoordinates(uniqueCoordinatesForPlaces);
        console.log("Unique Coordinates for Places:", uniqueCoordinatesForPlaces);
        setLongitude(firstLongitude);
        setLatitude(firstLatitude);
        setDefaultCoordinates({
            longitude: firstLongitude ?? 0,
            latitude: firstLatitude ?? 0,
        });
    }
    const genreatePlanType = (): string => {
        switch (itineraryPlanState?.planType) {
            case "A":
                return "Plan A";
            case "B":
                return "Plan B";
            case "C":
                return "Plan C";
            default:
                return itineraryPlanState?.planType ?? "Unknown Plan";
        }
    }
    useEffect(() => {
        if (itineraryPlan) {
            setItineraryPlanState(itineraryPlan);
            genreateCoordinatesPlace(itineraryPlan);
        }
    }, [itineraryPlan]);

    console.log(itineraryPlanState);

    return (
        <div className="flex h-full min-h-0 w-full flex-col">
            <Header title={genreatePlanType()} setLongitude={setLongitude} setLatitude={setLatitude} coordinates={defaultCoordinates} />
            <section className="h-[40vh] min-h-[16rem] shrink-0 overflow-hidden rounded-[1.1rem] border border-slate-200 bg-white shadow-[0_12px_24px_rgba(148,163,184,0.14)]">
                <Map markerPoints={placeCoordinates} longitude={longitude || 0} latitude={latitude || 0} />
            </section>
            <section className="mt-4 min-h-0 flex-1 overflow-y-auto pb-4">
                {itineraryPlanState?.itinerary.map((itineraryActivities, index) => <ItineraryActivitiesBox day={itineraryActivities.day} title={itineraryActivities.title} key={`itinerary-activities-box-${index}`} itineraryActivities={itineraryActivities.activities} setLongitude={setLongitude} setLatitude={setLatitude} />)}
            </section>

        </div>
    );
};

export default ItineraryPlan;