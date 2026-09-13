export default interface IToggleSwitch {
    active:"location" | "trip";
    setActive: React.Dispatch<React.SetStateAction<"location" | "trip">>;
}