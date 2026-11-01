export default interface IPoll {
    setActiveTab: React.Dispatch<React.SetStateAction<"Poll" | "Announcement" | "Opinion" | "Check ins" | "Medical Assistance">>;
}