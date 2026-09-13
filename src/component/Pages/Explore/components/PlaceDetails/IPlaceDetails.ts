import type IExplorePlace from "../../../../../Interface/DataInterface/IExplorePlace";

export default interface IPlaceDetails {
  place: IExplorePlace;
  onClose: () => void;
}