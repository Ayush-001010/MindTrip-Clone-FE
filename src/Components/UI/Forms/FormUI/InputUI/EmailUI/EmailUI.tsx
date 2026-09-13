import React from "react";
import type IEmailUI from "./IEmailUI";
import ErrorUI from "../../ErrorUI/ErrorUI";

const EmailUI: React.FunctionComponent<IEmailUI> = ({
  formik,
  backendName,
  placeholder,
  isDisabled,
}) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(backendName, event.target.value);
  };

  const onBlurHandler = () => {
    formik.setFieldTouched(backendName, true);
  };

  return (
    <div className="flex flex-col w-full">
      <input
        type="email"
        value={formik.values[backendName] || ""}
        onChange={changeHandler}
        onBlur={onBlurHandler}
        placeholder={placeholder}
        disabled={isDisabled}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
      />
      {formik.touched[backendName] && (
        <ErrorUI error={formik.errors[backendName] as string} />
      )}
       
    </div>
  );
};

export default EmailUI;
