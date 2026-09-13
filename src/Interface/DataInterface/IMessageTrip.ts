import type ITripAPIResponse from "./ITripAPIResponse";
import type IQuestionGatherResponse from "./IQuestionGatherResponse";

export default interface IMessageTrip {
    ID: string;
    userID: string;
    tripID: string;
    message: string;
    timestamp: Date;
    response?: ITripAPIResponse | IQuestionGatherResponse;
}
