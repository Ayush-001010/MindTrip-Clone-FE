import type IPollOption from "./IPollOption";

export default interface IGroupHubMessage {
    id?: number;
    content : string;
    type? : "announcement" | "medical-emergency" | "poll" | "opinion";
    createdAt?: string;
    base62?: string;
    options?: IPollOption[];
}
