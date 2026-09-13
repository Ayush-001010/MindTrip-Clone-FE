import type IExplorePlace from "../../../../../Interface/DataInterface/IExplorePlace";


export default interface IPlaceCard {
  place: IExplorePlace;
  onClick: () => void;
  selected?: boolean;
}