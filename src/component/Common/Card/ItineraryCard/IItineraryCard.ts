import type { IFinalItineraryDay } from "../../../../Interface/DataInterface/IFinalItineraryResponse";

export default interface IItineraryCard {
    mode : "edit" | "view";
    tips?:string[];
    days : IFinalItineraryDay[];
}