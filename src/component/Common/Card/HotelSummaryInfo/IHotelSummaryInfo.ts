import type ITripHotelData from "../../../../Interface/DataInterface/ITripHotel";

export default interface IHotelSummaryInfo {
    hotel: ITripHotelData;
    onClose: () => void;
    isNotBooked?: boolean;
}
