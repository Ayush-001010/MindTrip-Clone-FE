import type IHotel from "../../../Interface/DataInterface/IHotel";
import type IExplorePlace from "../../../Interface/DataInterface/IExplorePlace";

export type IMapMarkerType = "parking" | "location" | "label";

export interface IMapMarkerPoint {
  longitude: number;
  latitude: number;
  markerType?: IMapMarkerType;
  markerLabel?: string;
  markerDescription?: string;
}

export default interface IMap {
  latitude?: number;
  longitude?: number;
  hotels?: IHotel[];
  selectedHotel?: IHotel | null;
  onHotelSelect?: (hotel: IHotel) => void;
  markerPoints?: IMapMarkerPoint[];
  places?: IExplorePlace[];
  selectedPlace?: IExplorePlace | null;
  onPlaceSelect?: (place: IExplorePlace) => void;
}