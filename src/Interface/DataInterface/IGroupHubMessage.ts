import type IPollOption from "./IPollOption";
import type IOpinionComment from "./IOpinionComment";

export default interface IGroupHubMessage {
    id?: number;
    content : string;
    type? : "announcement" | "medical-emergency" | "poll" | "opinion";
    createdAt?: string;
    base62?: string;
    options?: IPollOption[];
    imageUrl?: string;
    comments?: IOpinionComment[];
}
