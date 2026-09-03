import React, { createContext, useContext } from "react";
import { Formik } from "formik";

import type IForm from "./IForm";
import FormItems from "./FormItems/FormItems";
import useFormAction from "../../../Services/CustomHook/useFormAction";

interface IFormContext {
  fieldsDetails: IForm["fieldsDetails"];
}

const FormContextUI = createContext<IFormContext | undefined>(undefined);

export const useGetFormContextValue = () => {
  const context = useContext(FormContextUI);

  if (!context) {
    throw new Error("useGetFormContextValue must be used within Form");
  }

  return context;
};

const Form: React.FunctionComponent<IForm> = ({
  fieldsDetails,
  submitHandler,
  initialValues: initVal,
  buttonText = "Submit",
  hideSubmitButton = false,
  buttonClassName
}) => {
  const { validationSchema, initialValues } = useFormAction(
    fieldsDetails,
    initVal
  );

  return (
    <FormContextUI.Provider
      value={{
        fieldsDetails,
      }}
    >
      <div className="w-full">
        {fieldsDetails.header && (
          <h1 className="mb-6 text-2xl font-semibold">
            {fieldsDetails.header}
          </h1>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            submitHandler(values);
          }}
          enableReinitialize
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-6"
            >
              <FormItems items={fieldsDetails.sections} formik={formik} />

              {!hideSubmitButton && (
             <button
             type="submit"
             className={
                 buttonClassName ||
                 "rounded-lg bg-black px-6 py-3 text-white transition hover:opacity-90"
             }
         >
             {buttonText}
         </button>
              )}
            </form>
          )}
        </Formik>
      </div>
    </FormContextUI.Provider>
  );
};

export default Form;
