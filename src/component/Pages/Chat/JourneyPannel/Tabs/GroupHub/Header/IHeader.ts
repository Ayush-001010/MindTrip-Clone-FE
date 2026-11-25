export default interface IHeader {
    activeTab: string;
    setActiveTab: (tab: "Poll" | "Announcement" | "Opinion" | "Check ins" | "Medical Assistance") => void;
}