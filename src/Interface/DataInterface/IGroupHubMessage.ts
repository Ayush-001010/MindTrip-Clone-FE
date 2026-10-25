import type IPollOption from "./IPollOption";
import type IOpinionComment from "./IOpinionComment";
import type ICheckIn from "./ICheckIn";

export default interface IGroupHubMessage {
    id?: number;
    content : string;
    type? : "announcement" | "medical-emergency" | "poll" | "opinion" | "check-ins";
    createdAt?: string;
    base62?: string;
    options?: IPollOption[];
    imageUrl?: string;
    comments?: IOpinionComment[];
    checkIn?: ICheckIn[];
}
