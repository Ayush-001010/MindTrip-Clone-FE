import type ITripHotelData from "../../../../Interface/DataInterface/ITripHotel";

export default interface IBookedHotelCard {
    hotel: ITripHotelData;
    onClose: () => void;
}
