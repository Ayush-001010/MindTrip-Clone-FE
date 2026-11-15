export default interface IDropInputBox {
    type : "music" | "photos",
    files: File[],
    setFile: (files: File[]) => void
}