import React, { ChangeEvent, useState } from "react";
import openEye from "../img/open-eye.svg";
import closedEye from "../img/closed-eye.svg";

type FormInputProps = {
  label: string;
  htmlFor: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
  name: string;
  errorMessage: string;
  value: string;
  pattern?: string;
  error?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function FormInput(props: FormInputProps) {
  const { htmlFor, label, errorMessage, error, ...inputProps } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="mb-2 flex flex-col justify-center gap-2 text-left lg:w-[100%]">
      <label htmlFor={htmlFor} className="relative">
        {label}
        {inputProps.name === "passwordInput" && (
          <img
            src={passwordVisible ? closedEye : openEye}
            className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform"
            alt="display password as plain text"
            onClick={() =>
              setPasswordVisible((passwordVisible) => !passwordVisible)
            }
          />
        )}
      </label>
      <input
        {...inputProps}
        required
        type={
          inputProps.name === "passwordInput"
            ? passwordVisible
              ? "text"
              : "password"
            : inputProps.type
        }
        className={
          `form-element peer w-full  placeholder:text-slate-500 focus-visible:outline ` +
          (props.value !== "" && error
            ? "outline outline-rose-600"
            : "focus-visible:outline-primary ")
        }
      ></input>

      {props.value && error && (
        <span className="text-red-500 text-body-2 hidden text-red peer-invalid:block">
          {props.errorMessage}
        </span>
      )}
    </div>
  );
}
