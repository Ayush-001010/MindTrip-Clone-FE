export default interface IDropInputBox {
    type : "music" | "photos",
    file: File | null,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
}