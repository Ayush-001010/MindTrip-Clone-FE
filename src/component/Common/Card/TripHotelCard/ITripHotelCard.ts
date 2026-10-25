import type ITripHotelData from "../../../../Interface/DataInterface/ITripHotel";

export default interface ITripHotelCard {
    hotel: ITripHotelData;
    onClose: () => void;
}
