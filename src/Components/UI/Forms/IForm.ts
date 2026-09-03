import type IFormFieldsInterface from "../../../Services/Interfaces/FormFieldsInterface";


export default interface IForm {
    fieldsDetails: IFormFieldsInterface;
    buttonText?: string;
    submitHandler: (
        value: Record<string, any>,
        noOfItems?: number
    ) => void;
    initialValues?: Record<string, any>;
    headerCss?: string;
    isRowByRow?: boolean;
    hideSubmitButton?: boolean;
    buttonClassName?: string;
}