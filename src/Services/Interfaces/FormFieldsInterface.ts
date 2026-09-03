export interface IFormFieldInterface {
    displayName: string;
    backendName: string;
    type: "text" | "email" | "password";
    validation?: any;
    placeholder?: string;
    disabled?: boolean;
}

export interface IFormFieldsSectionInterface {
    type: "single" | "double";
    fields: IFormFieldInterface[];
}

export default interface IFormFieldsInterface {
    header: string;
    sections: IFormFieldsSectionInterface[];
}