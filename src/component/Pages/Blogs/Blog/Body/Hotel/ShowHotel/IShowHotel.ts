import type { IBlogHotel } from "../../../../../../../Interface/DataInterface/IBlogData";

export default interface IShowHotel {
    hotelDetails : IBlogHotel[];
    onAddNewHotel: () => void;
}