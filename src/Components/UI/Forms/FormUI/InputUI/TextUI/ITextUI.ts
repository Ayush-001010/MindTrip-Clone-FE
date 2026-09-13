import type { FormikProps } from "formik";

export default interface ITextUI {
    backendName: string;
    textFieldType?: string;
    formik: FormikProps<Record<string, any>>;
    placeholder?: string;
    disabled?: boolean;
}