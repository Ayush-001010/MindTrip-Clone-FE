import type ITripAPIResponse from "./ITripAPIResponse";
import type IQuestionGatherResponse from "./IQuestionGatherResponse";
import type IItineraryOptions from "./IItineraryOptions";

export default interface IMessageTrip {
    ID: string;
    userID: string;
    tripID: string;
    message: string;
    timestamp: Date;
    response?: ITripAPIResponse | IQuestionGatherResponse | IItineraryOptions;
}
