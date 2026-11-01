export default interface IOpinion {
    setActiveTab: React.Dispatch<React.SetStateAction<"Poll" | "Announcement" | "Opinion" | "Check ins" | "Medical Assistance">>;
}