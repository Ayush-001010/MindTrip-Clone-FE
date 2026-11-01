export default interface IAnnouncement {
    setActiveTab: React.Dispatch<React.SetStateAction<"Poll" | "Announcement" | "Opinion" | "Check ins" | "Medical Assistance">>;
}