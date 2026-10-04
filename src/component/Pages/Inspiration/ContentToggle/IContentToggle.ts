export default interface IContentToggle {
    setContentType: React.Dispatch<React.SetStateAction<"home" | "blog" | "agent">>;
}