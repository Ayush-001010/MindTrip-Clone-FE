import type { IBlogTravel } from "../../../../../../Interface/DataInterface/IBlogData";

export default interface IAddTravel {
    setTravelData: (data: IBlogTravel) => void;
}