import type ITripHotelData from "../../../../Interface/DataInterface/ITripHotel";

export default interface ITripHotelList {
    hotels: ITripHotelData[];
    onClose: () => void;
}
