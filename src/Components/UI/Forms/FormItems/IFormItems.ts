import type { FormikProps } from "formik";
import type IFormFieldsInterface from "../../../../Services/Interfaces/FormFieldsInterface";


export default interface IFormItems {
    items: IFormFieldsInterface["sections"];
    formik: FormikProps<Record<string, any>>;
}