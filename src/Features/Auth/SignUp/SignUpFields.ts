import * as Yup from "yup";
import type IFormFieldsInterface from "../../../Services/Interfaces/FormFieldsInterface";

const signUpFields: IFormFieldsInterface = {
    header: "Create your account",
    sections: [
        {
            type: "single",

            fields: [
                {
                    displayName: "Username",
                    backendName: "name",
                    type: "text",
                    placeholder: "Enter your username",

                    validation: Yup.string()
                        .min(3, "Username must be at least 3 characters")
                        .required("Username is required"),
                },

                {
                    displayName: "Email",
                    backendName: "email",
                    type: "email",
                    placeholder: "Enter your email",
                    validation: Yup.string()
        .matches(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Enter a valid email address"
        )
        .required("Email is required"),
                },

                {
                    displayName: "Password",
                    backendName: "password",
                    type: "password",
                    placeholder: "Enter your password",

                    validation: Yup.string()
                        .min(8, "Password must be at least 8 characters")
                        .required("Password is required"),
                },

                {
                    displayName: "Confirm Password",
                    backendName: "confirmPassword",
                    type: "password",
                    placeholder: "Confirm your password",

                    validation: Yup.string()
                        .oneOf(
                            [Yup.ref("password")],
                            "Passwords must match"
                        )
                        .required("Please confirm your password"),
                },
            ],
        },
    ],
};

export default signUpFields;