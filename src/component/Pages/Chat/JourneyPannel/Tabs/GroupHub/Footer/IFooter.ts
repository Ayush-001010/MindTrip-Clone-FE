export default interface IFooter {
    activeTab: "Poll" | "Announcement" | "Opinion" | "Check ins" | "Medical Assistance";
    setActiveTab: React.Dispatch<React.SetStateAction<"Poll" | "Announcement" | "Opinion" | "Check ins" | "Medical Assistance">>;
}