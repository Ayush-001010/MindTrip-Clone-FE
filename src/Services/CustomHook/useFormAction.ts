import { useMemo } from "react";
import * as Yup from "yup";
import type IFormFieldsInterface from "../Interfaces/FormFieldsInterface";



const useFormAction = (
    fieldsDetails: IFormFieldsInterface,
    initVal?: Record<string, any>
) => {

    // Create Yup validation schema
    const validationSchema = useMemo(() => {

        const schema: Record<string, any> = {};

        fieldsDetails.sections.forEach((section) => {

            section.fields.forEach((field) => {

                if (field.validation) {
                    schema[field.backendName] = field.validation;
                }

            });

        });

        return Yup.object().shape(schema);

    }, [fieldsDetails]);


    // Create initial form values
    const initialValues = useMemo(() => {

        const values: Record<string, any> = {};

        fieldsDetails.sections.forEach((section) => {

            section.fields.forEach((field) => {

                values[field.backendName] =
                    initVal?.[field.backendName] ?? "";

            });

        });

        return values;

    }, [fieldsDetails, initVal]);


    return {
        validationSchema,
        initialValues
    };
};

export default useFormAction;