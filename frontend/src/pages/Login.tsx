import React, { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import wavesBg from "../img/waves-bg.png";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import {
  FormType,
  InputValuesContact,
  InputValuesLogin,
  InputValuesRegister,
  NAVBAR_VARIANT,
} from "../constants";

// bg-[url('img/travel1.jpg')] bg-cover bg-center brightness-10

export default function Login() {
  const [inputValues, setInputValues] = useState<InputValuesLogin>({
    emailInput: "",
    passwordInput: "",
  });

  const inputs = [
    {
      key: 1,
      label: "Email",
      htmlFor: "email",
      type: "email",
      name: "emailInput",
      autoComplete: "email",
      placeholder: "example@gmail.com",
      errorMessage: "Input should be a valid email address",
    },

    {
      key: 2,
      label: "Password",
      htmlFor: "password",
      type: "password",
      name: "passwordInput",
      autoComplete: "password",
      placeholder: "",
      errorMessage: "Password should be at least 8 characters",
      minLength: 8,
    },
  ];

  const { login, error } = useLogin();

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

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(inputValues);
    await login({
      email: inputValues.emailInput,
      password: inputValues.passwordInput,
    });
  }

  return (
    <div className="flex h-screen flex-col items-center bg-[url(./img/waves-bg.png)] bg-cover bg-center">
      <Navbar variant={NAVBAR_VARIANT.SOLID} />
      <div className="flex h-screen w-full flex-col items-center justify-center ">
        <Form
          inputs={inputs}
          title={"Welcome back!"}
          submitMessage="Login"
          textArea=""
          type={FormType.LOGIN}
          inputValues={inputValues}
          setInputValues={
            setInputValues as React.Dispatch<
              React.SetStateAction<
                InputValuesLogin | InputValuesRegister | InputValuesContact
              >
            >
          }
          handleFormSubmit={handleLogin}
        />
      </div>
    </div>
  );
}
