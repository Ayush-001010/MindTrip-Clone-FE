export default interface ISuggestionBox {
    suggestions: string[];
    value: string;
    selectHandler : (value : string , type : "Add" | "Remove") => void | Promise<void>;
}