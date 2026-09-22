import type { IPlaceOption } from "../ActivityPlaceName";

export default interface IAddPlaceName {
    setPlaceName: React.Dispatch<React.SetStateAction<string>>;
    placeName: string;
    placeOptions: IPlaceOption[];
    setLongitude: React.Dispatch<React.SetStateAction<number>>;
    setLatitude: React.Dispatch<React.SetStateAction<number>>;
}