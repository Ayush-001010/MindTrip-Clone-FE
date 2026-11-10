export default interface ISwitchContentBar {
    active : string;
    changeHandler : (active: "Friends" | "Requests") => void;
}