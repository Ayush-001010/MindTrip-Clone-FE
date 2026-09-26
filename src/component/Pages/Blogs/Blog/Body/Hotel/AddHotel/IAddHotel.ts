import type { IBlogHotel } from "../../../../../../../Interface/DataInterface/IBlogData";

export default interface IAddHotel {
    submitHotel: (hotel : IBlogHotel) => void;
}