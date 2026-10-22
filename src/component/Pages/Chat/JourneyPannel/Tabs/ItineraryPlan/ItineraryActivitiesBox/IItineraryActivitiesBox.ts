import type { IItineraryActivity,  } from "../../../../../../Interface/DataInterface/IItineraryOptions";

export default interface IItineraryActivitiesBox {
    itineraryActivities: IItineraryActivity [];
    day: number;
    title: string;
    setLongitude: (longitude: number) => void;
    setLatitude: (latitude: number) => void;
}