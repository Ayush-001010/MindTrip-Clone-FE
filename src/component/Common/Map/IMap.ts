import type IHotel from "../../../Interface/DataInterface/IHotel";

export default interface IMap {
    latitude: number;
    longitude: number;
    hotels:IHotel[];
    selectedHotel?: IHotel | null;
    onHotelSelect?: (hotel: IHotel) => void;
  }