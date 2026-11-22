import type IBlogUniquePlace from "../../../Interface/DataInterface/IBlogUniquePlace";

export default interface IGlobe {
    type : "place";
    places: IBlogUniquePlace[];
    onSelectPlace: (place: IBlogUniquePlace) => void;
}