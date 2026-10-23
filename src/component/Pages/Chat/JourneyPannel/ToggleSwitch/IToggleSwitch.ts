export default interface IToggleSwitch {
    active:"location" | "trip" | "split-wise" | "user-chats";
    setActive: React.Dispatch<React.SetStateAction<"location" | "trip" | "split-wise" | "user-chats">>;
}