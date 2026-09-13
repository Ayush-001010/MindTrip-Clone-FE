import type IHotel from "../../../../../Interface/DataInterface/IHotel";


export default interface IHotelCard {
  hotel: IHotel;
  onClick: () => void;
  selected?: boolean;
}