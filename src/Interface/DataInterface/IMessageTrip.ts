import type ITripAPIResponse from "./ITripAPIResponse";
import type IQuestionGatherResponse from "./IQuestionGatherResponse";
import type IItineraryOptions from "./IItineraryOptions";
import type IFinalItineraryResponse from "./IFinalItineraryResponse";
import type { IItineraryFallBack } from "./IItinerarayFallBack";
import type IItineraryFinalResponse from "./IItineraryFinalResponse";

export default interface IMessageTrip {
    ID: string;
    userID: string;
    tripID: string;
    message: string;
    timestamp: Date;
    response?: ITripAPIResponse | IQuestionGatherResponse | IItineraryOptions | IFinalItineraryResponse | IItineraryFallBack | IItineraryFinalResponse;
}
