export default interface IAutoSuggestion {
    changeHandler : (value : string) => void | Promise<void>;
    value : string;
    suggestions : string[];
    selectHandler : (value : string , type : "Add" | "Remove") => void | Promise<void>;
    isMultiSelect : boolean;
    selectedValues : string[] | string;
}