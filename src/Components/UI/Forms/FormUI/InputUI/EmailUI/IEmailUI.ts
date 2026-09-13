import type { FormikProps } from "formik";

export default interface IEmailUI {
    formik: FormikProps<Record<string, any>>;
    backendName: string;
    placeholder?: string;
    isDisabled?: boolean;
}