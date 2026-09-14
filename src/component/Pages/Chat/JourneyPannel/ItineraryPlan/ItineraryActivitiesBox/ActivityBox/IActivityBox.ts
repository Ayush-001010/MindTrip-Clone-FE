import type { IItineraryActivity } from "../../../../../../../Interface/DataInterface/IItineraryOptions";

export default interface IActivityBox {
    activity: IItineraryActivity;
    setLongitude: (longitude: number) => void;
    setLatitude: (latitude: number) => void;
}