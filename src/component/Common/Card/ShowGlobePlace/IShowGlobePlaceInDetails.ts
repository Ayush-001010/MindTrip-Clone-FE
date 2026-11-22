import type IBlogUniquePlace from "../../../../Interface/DataInterface/IBlogUniquePlace";

export default interface IShowGlobePlaceInDetails {
    places: IBlogUniquePlace[];
    onClose: () => void;
}