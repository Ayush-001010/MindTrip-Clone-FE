import type ITripAPIResponse from "./ITripAPIResponse";

export default interface IMesageTrip {
    ID: string;
    userID: string;
    tripID: string;
    message: string;
    timestamp: Date;
    response?: ITripAPIResponse;
}
