import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import FormInput from "./FormInput";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import {
  FormType,
  InputValuesContact,
  InputValuesLogin,
  InputValuesRegister,
} from "../constants";
import { useLogin } from "../hooks/useLogin";

interface InputErrorInterface {
  emailInput: boolean;
  nameInput: boolean;
  textAreaInput: boolean;
  [key: string]: boolean;
}

interface FormProps {
  inputs: any[];
  title: string;
  submitMessage: string;
  textArea: string;
  type: FormType;
  inputValues: InputValuesRegister | InputValuesLogin | InputValuesContact;
  setInputValues: React.Dispatch<
    React.SetStateAction<
      InputValuesLogin | InputValuesRegister | InputValuesContact
    >
  >;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => any;
}

export default function Form(props: FormProps) {
  const [inputErrors, setInputErrors] = useState<InputErrorInterface>({
    emailInput: false,
    nameInput: false,
    passwordInput: false,
    textAreaInput: false,
    cnfPasswordInput: false,
  });

  const {
    inputs,
    title,
    submitMessage,
    textArea,
    type,
    inputValues,
    setInputValues,
    handleFormSubmit,
  } = props;

  const { error } = useLogin();

  const textAreaData = {
    name: "textAreaInput",
    cols: 40,
    rows: 10,
    placeholder: "",
    label: textArea,
  };

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputErrors({
      ...inputErrors,
      [e.target.name]: !e.target.validity.valid,
    });

    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  }

  function renderTypeMessage() {
    switch (type) {
      case FormType.LOGIN:
        return (
          <p className="text-slate-600">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-primary hover:text-sky-500">
              Register
            </NavLink>
          </p>
        );
      case FormType.REGISTER:
        return (
          <p className="text-slate-600">
            Already a member?{" "}
            <NavLink to="/login" className="text-primary hover:text-sky-500">
              Login
            </NavLink>
          </p>
        );
      case FormType.CONTACT:
        return <></>;
      default:
        return <></>;
    }
  }

  return (
    <div className="relative mt-4 flex max-w-[90%] flex-col items-center justify-center rounded-lg bg-pure-white px-8 py-8 text-center text-primary shadow-lg sm:px-10 lg:w-[30%] ">
      <div className="absolute left-0 top-0 flex w-full justify-around bg-primary py-4 font-bold text-white ">
        <span>LOGIN</span>
        <span className="absolute right-2">X</span>
      </div>

      <div className="mt-4 w-[75%] ">
        <h2 className="py-4  font-bold">{title}</h2>
        <form
          className="flex max-w-[100%] flex-col gap-4 font-semibold text-primary"
          onSubmit={handleFormSubmit}
        >
          {inputs.map((inputData) => (
            <FormInput
              {...inputData}
              value={inputValues[inputData.name]}
              error={inputErrors[inputData.name]}
              onChange={handleInputChange}
            />
          ))}
          {textArea !== "" && (
            <div className="flex w-[100%] flex-col gap-2">
              <label htmlFor="textarea font">Message</label>

              <textarea
                {...textAreaData}
                className="mb-2 max-w-[100%] resize-none rounded-md border-transparent bg-white p-2 outline-offset-0"
              ></textarea>
            </div>
          )}

          {renderTypeMessage()}
          <Button
            variant="filled"
            text={submitMessage}
            onClick={handleFormSubmit}
          />
          <span className="flex justify-center text-red ">{error.err}</span>
        </form>
      </div>
    </div>
  );
}
