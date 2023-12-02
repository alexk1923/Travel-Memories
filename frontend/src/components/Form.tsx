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
import { FormType } from "../constants";
import { useLogin } from "../hooks/useLogin";

interface InputInterface {
  emailInput: string;
  nameInput: string;
  textAreaInput: string;
  [key: string]: string;
}

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
}

export default function Form(props: FormProps) {
  const [inputValues, setInputValues] = useState<InputInterface>({
    emailInput: "",
    nameInput: "",
    passwordInput: "",
    textAreaInput: "",
  });
  const [inputErrors, setInputErrors] = useState<InputErrorInterface>({
    emailInput: false,
    nameInput: false,
    passwordInput: false,
    textAreaInput: false,
  });

  const { inputs, title, submitMessage, textArea, type } = props;

  const { login, error } = useLogin();

  const textAreaData = {
    name: "textAreaInput",
    cols: 40,
    rows: 10,
    placeholder: "",
    label: textArea,
  };

  useEffect(() => {
    // This effect runs when the error state changes
    console.log("Am avut o eroare bai");
    console.log(error);

    if (error) {
      // reset form fields
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        passwordInput: "",
      }));
    }
  }, [error]); // This effect depends on the error state

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

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("type = " + type);

    if (type === FormType.LOGIN) {
      console.log(inputValues);
      await login({
        email: inputValues.emailInput,
        password: inputValues.passwordInput,
      });
    }
  }

  return (
    <div className="my-8 mb-8 flex max-w-[90%] flex-col  justify-center rounded-lg bg-pure-white px-8 py-8 text-primary shadow-lg sm:px-10 ">
      <h2 className="py-4 text-center font-bold">{title}</h2>

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
        {type === FormType.LOGIN && (
          <p className="text-slate-600">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-primary hover:text-sky-500">
              Register
            </NavLink>
          </p>
        )}
        <Button variant="filled" text={submitMessage} onClick={undefined} />
        <span className="flex justify-center text-red ">{error.err}</span>
      </form>
    </div>
  );
}
