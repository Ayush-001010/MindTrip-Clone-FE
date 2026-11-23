import type IBlogUniquePlace from "../../../Interface/DataInterface/IBlogUniquePlace";

export default interface IGlobe {
    type : "place" | "blog";
    places: IBlogUniquePlace[];
    onSelectPlace: (place: IBlogUniquePlace) => void;
}