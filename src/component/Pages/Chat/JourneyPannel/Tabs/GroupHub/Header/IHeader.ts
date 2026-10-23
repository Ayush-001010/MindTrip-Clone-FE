export default interface IHeader {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<"Poll" | "Announcement" | "Opinion" | "Check ins" | "Medical Assistance">>;
}