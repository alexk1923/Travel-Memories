import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import FormInput from "../components/FormInput";
import LoginCard from "../components/LoginCard";
import useRegister from "../hooks/useRegister";
import whiteLogo from "../img/logo/default-monochrome-white.svg";
import {
  FormType,
  InputValuesContact,
  InputValuesLogin,
  InputValuesRegister,
  NAVBAR_VARIANT,
} from "../constants";
import Navbar from "../components/Navbar";
import Form from "../components/Form";

export default function Register() {
  const { register, error } = useRegister();
  const [inputValues, setInputValues] = useState<InputValuesRegister>({
    usernameInput: "",
    emailInput: "",
    passwordInput: "",
    cnfPasswordInput: "",
  });

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const dataInput = {
      username: inputValues.usernameInput,
      email: inputValues.emailInput,
      password: inputValues.passwordInput,
    };

    await register(dataInput);
    if (error) {
      // reset form fields
      setInputValues(() => {
        return {
          usernameInput: "",
          emailInput: "",
          passwordInput: "",
          cnfPasswordInput: "",
        };
      });
    }
  }

  const inputs = [
    {
      key: 1,
      label: "Email",
      htmlFor: "email",
      type: "email",
      name: "emailInput",
      id: "email",
      autoComplete: "email",
      placeholder: "example@gmail.com",
      errorMessage: "Input should be a valid email address",
    },

    {
      key: 2,
      label: "Username",
      htmlFor: "username",
      type: "text",
      name: "usernameInput",
      id: "username",
      placeholder: "Username",
      errorMessage:
        "Username must have at least 5 characters, no spaces, no special characters",
      minLength: 5,
      pattern: "^[a-zA-Z0-9]+$",
    },

    {
      key: 3,
      label: "Password",
      htmlFor: "passwordRegister",
      type: "password",
      name: "passwordInput",
      id: "passwordRegister",
      placeholder: "Password",
      errorMessage: "Password should be at least 8 characters",
      minLength: 8,
    },

    {
      key: 4,
      label: "Confirm password",
      htmlFor: "cnfpassword",
      type: "password",
      name: "cnfPasswordInput",
      id: "cnfpassword",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match",
      pattern: inputValues.passwordInput,
      minLength: 8,
    },
  ];

  return (
    <>
      <div className="flex h-screen flex-col bg-[url(./img/waves-bg.png)] bg-cover bg-center">
        <Navbar variant={NAVBAR_VARIANT.SOLID} />
        <div className="flex h-[100%] w-full items-center justify-center lg:items-stretch">
          <Form
            inputs={inputs}
            title={"Become a traveler"}
            submitMessage={"Register"}
            textArea={""}
            type={FormType.REGISTER}
            handleFormSubmit={handleRegister}
            inputValues={inputValues}
            setInputValues={
              setInputValues as React.Dispatch<
                React.SetStateAction<
                  InputValuesLogin | InputValuesRegister | InputValuesContact
                >
              >
            }
          />
        </div>
      </div>
    </>
  );
}
