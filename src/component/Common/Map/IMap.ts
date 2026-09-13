import type IHotel from "../../../Interface/DataInterface/IHotel";
import type IExplorePlace from "../../../Interface/DataInterface/IExplorePlace";

export default interface IMap {
  latitude: number;
  longitude: number;
  hotels?: IHotel[];
  selectedHotel?: IHotel | null;
  onHotelSelect?: (hotel: IHotel) => void;
  markerPoints?: Array<[number, number]>;
  places?: IExplorePlace[];
  selectedPlace?: IExplorePlace | null;
  onPlaceSelect?: (place: IExplorePlace) => void;
}