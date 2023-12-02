import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import wavesBg from "../img/waves-bg.png";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import { FormType, NAVBAR_VARIANT } from "../constants";

// bg-[url('img/travel1.jpg')] bg-cover bg-center brightness-10

export type InputValuesType = {
  emailInput: string;
  passwordInput: string;
  [key: string]: string;
};

export default function Login() {
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

  return (
    <div className="flex h-screen flex-col bg-[url(./img/waves-bg.png)] bg-cover bg-center">
      <Navbar variant={NAVBAR_VARIANT.SOLID} />
      <div className="flex h-[100%] w-full justify-center">
        <Form
          inputs={inputs}
          title={"Welcome back!"}
          submitMessage="Login"
          textArea=""
          type={FormType.LOGIN}
        />
        <img src="" />

        {/* <LoginCard /> */}
      </div>
    </div>
  );
}
