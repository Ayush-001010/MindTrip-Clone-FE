import type ITripHotelData from "../../../../Interface/DataInterface/ITripHotel";

export default interface IUnbookedHotelCard {
    hotel: ITripHotelData;
    onClose: () => void;
}
