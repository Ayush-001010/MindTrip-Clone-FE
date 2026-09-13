import React from "react";
import type ITextUI from "./ITextUI";
import ErrorUI from "../../ErrorUI/ErrorUI";

const TextUI: React.FunctionComponent<ITextUI> = ({
  backendName,
  textFieldType,
  formik,
  placeholder,
  disabled,
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
        type={textFieldType}
        value={formik.values[backendName] || ""}
        onChange={changeHandler}
        onBlur={onBlurHandler}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
      />

      {formik.touched[backendName] && (
        <ErrorUI error={formik.errors[backendName] as string} />
      )}
    </div>
  );
};

export default TextUI;
