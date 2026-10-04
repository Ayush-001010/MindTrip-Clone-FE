export type SelectFilterType = "location" | "profile" | "tags" | "budget" | "numberOfPlace" | null;

export default interface ISelectedOption {
    selectFilterType: SelectFilterType;
    onCommitValue?: (filterType: Exclude<SelectFilterType, null>, value: string) => void;
}