export interface IRadioOptionItem {
    label: string;
    value: string;
}

export default interface IRadioOption {
    options: IRadioOptionItem[];
    value: string | null;
    onChange: (value: string) => void;
    title?: string;
    className?: string;
}
