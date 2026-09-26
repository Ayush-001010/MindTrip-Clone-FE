import type { IBlogTravel } from "../../../../../../../Interface/DataInterface/IBlogData";

export default interface IShowTravel {
    travelData: IBlogTravel;
    onEdit: () => void;
}