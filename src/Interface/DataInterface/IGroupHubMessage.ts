export default interface IGroupHubMessage {
    content : string;
    type? : "announcement" | "medical-emergency" | "poll" | "opinion";
    createdAt?: string;
}