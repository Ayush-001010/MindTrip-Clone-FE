import type IHotel from "../../../../../Interface/DataInterface/IHotel";


export default interface IHotelDetails {
  hotel: IHotel;
  onClose: () => void;
}