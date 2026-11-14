export default interface IToggleSwitch {
    changeHandler : (type : "music" | "photos") => void;
    type : "music" | "photos";
}