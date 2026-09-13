import * as Yup from "yup";
import type IFormFieldsInterface
    from "../../../Services/Interfaces/FormFieldsInterface";

const signInFields: IFormFieldsInterface = {
    header: "",
    sections: [
        {
            type: "single",
            fields: [
                {
                    displayName: "Email",
                    backendName: "email",
                    type: "email",
                    placeholder: "Enter your email",

                    validation: Yup.string()
                        .email("Enter a valid email address")
                        .required("Email is required"),
                },

                {
                    displayName: "Password",
                    backendName: "password",
                    type: "password",
                    placeholder: "Enter your password",

                    validation: Yup.string()
                        .required("Password is required"),
                },
            ],
        },
    ],
};

export default signInFields;