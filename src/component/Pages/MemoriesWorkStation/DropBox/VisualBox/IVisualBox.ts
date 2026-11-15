export default interface IVisualBox {
    files: {file : File[] , tag : string}[];
    setFiles: React.Dispatch<React.SetStateAction<{file : File[] , tag : string}[]>>;
}