import React from "react";
import type IFormItems from "./IFormItems";

import LabelUI from "../FormUI/LabelUI/LabelUI";
import TextUI from "../FormUI/InputUI/TextUI/TextUI";
import EmailUI from "../FormUI/InputUI/EmailUI/EmailUI";

const FormItems: React.FunctionComponent<IFormItems> = ({
    items,
    formik
}) => {

    return (
        <div className="w-full">

            {items.map((section, sectionIndex) => (

                <div
                    key={sectionIndex}
                    className={`grid ${
                        section.type === "single"
                            ? "grid-cols-1"
                            : "grid-cols-2"
                    } gap-4 mb-4`}
                >

                    {section.fields.map((field) => (

                        <div
                            key={field.backendName}
                            className="flex flex-col gap-2"
                        >

                            <LabelUI>
                                {field.displayName}
                            </LabelUI>

                            {field.type === "text" && (
                                <TextUI
                                    backendName={field.backendName}
                                    textFieldType="text"
                                    formik={formik}
                                    placeholder={field.placeholder}
                                    disabled={field.disabled}
                                />
                            )}

                            {field.type === "password" && (
                                <TextUI
                                    backendName={field.backendName}
                                    textFieldType="password"
                                    formik={formik}
                                    placeholder={field.placeholder}
                                    disabled={field.disabled}
                                />
                            )}

                            {field.type === "email" && (
                                <EmailUI
                                    backendName={field.backendName}
                                    formik={formik}
                                    placeholder={field.placeholder}
                                    isDisabled={field.disabled}
                                />
                            )}

                        </div>

                    ))}

                </div>

            ))}

        </div>
    );
};

export default FormItems;